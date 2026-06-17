import SideNavigation from "../_components/SideNavigation";

function layout({ children }) {
	return (
		<div className="grid grid-cols-[15rem_1fr] gap-12 h-full ">
			<SideNavigation />
			<div className="py-2">{children}</div>
		</div>
	);
}

export default layout;
