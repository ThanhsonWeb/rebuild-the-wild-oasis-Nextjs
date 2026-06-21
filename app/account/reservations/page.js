import ReservationCard from "@/app/_components/ReservationCard";
import { auth } from "@/app/_lib/auth";
import { getBookings, getGuest } from "@/app/_lib/data-service";
import { setSeconds } from "date-fns";
import Link from "next/link";

export default async function page() {
	const session = await auth();
	const guest = await getGuest(session?.user?.email); // 8
	const guestId = guest?.id;

	const bookings = await getBookings(guestId);

	return (
		<div>
			<h2 className="font-semibold text-2xl text-yellow-500 mb-7">
				Your reservations
			</h2>

			{bookings.length === 0 ? (
				<p className="text-lg">
					You have no reservations yet. Check out our{" "}
					<Link className="underline text-yellow-500" href="/cabins">
						luxury cabins &rarr;
					</Link>
				</p>
			) : (
				<ul className="space-y-6">
					{bookings.map((booking) => (
						<ReservationCard booking={booking} key={booking.id} />
					))}
				</ul>
			)}
		</div>
	);
}
