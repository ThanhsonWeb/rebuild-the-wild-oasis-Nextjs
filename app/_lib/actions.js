"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getGuest } from "./data-service";

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
