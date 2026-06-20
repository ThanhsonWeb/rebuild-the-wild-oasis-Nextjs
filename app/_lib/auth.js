import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authConfig = {
	providers: [
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],

	callbacks: {
		authorized({ auth }) {
			// If auth() find valid session -> return true -> allow access
			return !!auth.user;
			// If false -> NEXTjs return to /api/auth/signin.
		},
	},
};

export const {
	auth, // helper to check current session
	handlers: { GET, POST }, // route handlers for Next.js App Router
	signIn,
	signOut,
} = NextAuth(authConfig);
