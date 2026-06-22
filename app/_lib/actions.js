"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings, getGuest } from "./data-service";
import { Asul } from "next/font/google";
import { redirect } from "next/navigation";

export async function SignInAction() {
	await signIn("google", { redirectTo: "/account" });
}

export async function SignOutAction() {
	await signOut({ redirectTo: "/" });
}

export async function UpdateGuest(formData) {
	// 1. authentication
	const session = await auth();
	if (!session) throw new Error("please Log in first");

	// 2. extract values from formData safely
	const nationalID = formData.get("nationalID") ?? null;
	const [nationality, countryFlag] = formData.get("nationality").split("%");

	const updateData = { nationalID, nationality, countryFlag };

	// Ensure we have a guestId; fall back to lookup by email if missing
	let guestId = session.user?.guestId;
	if (!guestId && session.user?.email) {
		try {
			const guest = await getGuest(session.user.email);
			guestId = guest?.id;
		} catch (err) {
			console.error("Failed to lookup guest by email:", err);
		}
	}

	if (!guestId) throw new Error("No guestId found on session");

	// 3. Update guests table in Supabase with .update()

	const { data, error } = await supabase
		.from("guests")
		.update(updateData)
		.eq("id", guestId)
		.select()
		.maybeSingle();

	if (error) {
		throw error;
	}

	revalidatePath("/account/profile");

	return data;
}

export async function DeleteBooking(bookingId) {
	// 1. authentication
	const session = await auth();
	if (!session) throw new Error("please Log in first");
	const guest = await getGuest(session.user.email);
	const guestId = guest?.id;
	// fetch bookings to compare id passed in
	const guestBookings = await getBookings(guestId);
	console.log(guestBookings);
	const guestBookingIds = guestBookings.map((booking) => booking.id);

	if (!guestBookingIds.includes(bookingId))
		throw new Error("there is no id similar");
	// delete booking in supabase
	const { error } = await supabase
		.from("bookings")
		.delete()
		.eq("id", bookingId);

	if (error) throw new Error("Fail to Delete Booking ! ");
	revalidatePath("/account/reservations");
}

export async function UpdateBooking(formData) {
	// 1. authentication
	const session = await auth();
	if (!session) throw new Error("Please log in first");

	// 2. get values
	const bookingId = Number(formData.get("bookingId"));
	const observations = formData.get("observations").slice(0, 1000);
	const numGuests = Number(formData.get("numGuests"));

	const updateBooking = { numGuests, observations };

	// 3. mutation
	const { error } = await supabase
		.from("bookings")
		.update(updateBooking)
		.eq("id", bookingId);

	if (error) throw new Error("Could not update Booking");

	revalidatePath("/account/reservations");

	redirect("/account/reservations");
}
