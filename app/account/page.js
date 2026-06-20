import SideNavigation from "../_components/SideNavigation";
import { auth } from "../_lib/auth";

export const metadata = {
	title: "Guest area",
};

async function page() {
	const session = await auth();

	return (
		<div className="flex items-center gap-4">
			<h2>Account :</h2>
			<h2 className="text-xl text-yellow-600 ">{session.user.name}</h2>
		</div>
	);
}

export default page;
