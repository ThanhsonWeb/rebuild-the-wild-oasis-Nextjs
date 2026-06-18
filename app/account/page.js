import SideNavigation from "../_components/SideNavigation";

export const metadata = {
	title: "Guest area",
};

function page() {
	return (
		<div className="flex items-center gap-4">
			<h2>Account :</h2>
			<h2 className="text-xl text-yellow-600 "> Son</h2>
		</div>
	);
}

export default page;
