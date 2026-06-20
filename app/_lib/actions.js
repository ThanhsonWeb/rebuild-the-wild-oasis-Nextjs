"use server";

import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";

export async function SignInAction() {
	await signIn("google", { redirectTo: "/account" });
}

export async function SignOutAction() {
	await signOut({ redirectTo: "/" });
}

export async function UpdateGuest(formData) {
	// authentication
	const session = await auth();
	if (!session) throw new Error("please Log in first");
	// extract values from formData with .get()
	const nationalID = formData.get("nationalID");
	const [nationality, countryFlag] = formData.get("nationality").split("%");
	

	const updateData = { nationalID, nationality, countryFlag };
	console.log(updateData);
	//Update guests table in Supabase with .update()
	const { data, error } = await supabase
		.from("guests")
		.update(updateData)
		.eq("id", session.user.guestId);

	if(error) throw new Error("Could not update your profile");
}
