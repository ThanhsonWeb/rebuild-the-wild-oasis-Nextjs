import "@/app/_styles/globals.css";
import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

export const metadata = {
	title: {
		template: " %s | The wild Oasis",
		default: " The Wild Oasis ",
	},
	description: "This is the best place to have a good time with your lovers ^^",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<header className="flex items-center justify-between p-5">
					<Logo />
					<Navigation />
				</header>
				<main>{children}</main>
			</body>
		</html>
	);
}
