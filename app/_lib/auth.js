import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig = {
	providers: [
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
			authorization: { params: { scope: "openid email profile" } },
		}),
	],

	callbacks: {
		authorized({ auth }) {
			// If auth() find valid session -> return true -> allow access
			return !!auth.user;
			// If false -> NEXTjs return to /api/auth/signin.
		},
		// after OAuth success
		async signIn({ user, account, profile }) {
			try {
				const existingGuest = await getGuest(user.email);
				if (!existingGuest) {
					await createGuest({ email: user.email, fullName: user.name });
				}
				return true;
			} catch (err) {
				console.error("SignIn callback error:", err);
				return false;
			}
		},
	},
	
	async session({ session, user }) {
		const guest = await getGuest(session.user.email);
		session.user.guestId = guest.id;
		return session;
	},
};

export const {
	auth, // helper to check current session
	handlers: { GET, POST }, // route handlers for Next.js App Router
	signIn,
	signOut,
} = NextAuth(authConfig);
