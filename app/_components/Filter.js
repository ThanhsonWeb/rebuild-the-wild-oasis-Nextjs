"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Button from "./Button";

function Filter() {
	const searchParams = useSearchParams();
	const activeFilter = searchParams.get("capacity");

	// b2 new hook
	const router = useRouter();
	const pathname = usePathname();

	function handleFilter(filter) {
		const params = new URLSearchParams(searchParams);
		params.set("capacity", filter);
		// b3 create a new URL to change URL
		router.replace(`${pathname}?${params.toString()}`);
	}

	return (
		<div className="my-5 flex justify-end " >
			<Button
				handleFilter={handleFilter}
				filter="all"
				activeFilter={activeFilter}
			>
				All Cabins
			</Button>
			<Button
				handleFilter={handleFilter}
				filter="small"
				activeFilter={activeFilter}
			>
				1&mdash; 3 guests
			</Button>
			<Button
				handleFilter={handleFilter}
				filter="medium"
				activeFilter={activeFilter}
			>
				4&mdash; 7 guests
			</Button>
			<Button
				handleFilter={handleFilter}
				filter="large"
				activeFilter={activeFilter}
			>
				8&mdash; 12 guests
			</Button>
		</div>
	);
}

export default Filter;
