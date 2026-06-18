"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Button from "./Button";

function Filter() {
	const searchParams = useSearchParams();
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
		<div>
			<button
				className="px-5 py-2 hover:bg-gray-800"
				onClick={() => handleFilter("all")}
			>
				All cabins
			</button>
			<Button handleFilter={handleFilter} filter="small">
				1&mdash; 3 guests
			</Button>
			<Button handleFilter={handleFilter} filter="medium">
				4&mdash; 7 guests
			</Button>
			<Button handleFilter={handleFilter} filter="large">
				8&mdash; 12 guests
			</Button>
		</div>
	);
}

export default Filter;
