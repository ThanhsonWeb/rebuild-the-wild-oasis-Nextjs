"use server";

import { auth, signIn, signOut } from "./auth";

export async function SignInAction() {
	await signIn("google", { redirectTo: "/account" });
}

export async function SignOutAction() {
	await signOut({ redirectTo: "/" });
}

export async function UpdateGuest(formData) {
	console.log("server action");
	// authentication
	const session = await auth();
	if (!session) throw new Error("please Log in first");
	// take value base on name
	const nationalID = formData.get("nationalID");
	const [nationality, countryFlag] = formData.get("nationality").split("%");

	const updateData = { nationalID, nationality, countryFlag };
	console.log(updateData);
}
