import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const authConfig = {
	providers: [
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID,
			clientSecret: process.env.AUTH_GOOGLE_SECRET,
		}),
	],
};

export const {
	auth, // helper to check current session in server components, API routes, middleware
	handlers: { GET, POST }, // route handlers for Next.js App Router

} = NextAuth(authConfig);
