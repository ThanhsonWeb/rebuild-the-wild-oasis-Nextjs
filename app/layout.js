import "@/app/_styles/globals.css";
import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import Header from "./_components/Header";
import { Roboto } from "next/font/google";
import { ReservationProvider } from "./contexts/ReservationContext";
const roboto = Roboto({
	subsets: ["latin"],
	display: "swap",
});

export const metadata = {
	title: {
		template: " %s | The wild Oasis",
		default: " The Wild Oasis ",
	},
	description:
		"Luxurious cabin hotel, located in the heart of the New York, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${roboto.className}  text-gray-500 min-h-screen`}>
				<Header />
				<main className="max-w-7xl mx-auto my-10 p-10 ">
					<ReservationProvider>{children}</ReservationProvider>
				</main>
			</body>
		</html>
	);
}
