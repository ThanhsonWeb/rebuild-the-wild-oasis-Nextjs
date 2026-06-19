/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "cmzzfqlehqfrztjvsxrk.supabase.co",
				port: "",
				pathname: "/storage/v1/object/public/**",
			},
			// Your new Google configuration (added here)
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
