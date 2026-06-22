"use client";
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { DeleteBooking } from "../_lib/actions";

function ReservationList({ bookings }) {
	// useOptimistic :  for delete , update ,.. immediately -> better UX

	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		(curBookings, bookingId) => {
			curBookings.filter((b) => b.id !== bookingId);
		},
	);

	async function handleDelete(bookingId) {
		optimisticDelete(bookingId); // update UI instantly
		await DeleteBooking(bookingId); // wait until server confirms
	}

	return (
		<ul className="space-y-6">
			{bookings.map((booking) => (
				<ReservationCard
					booking={booking}
					key={booking.id}
					onDelete={handleDelete}
				/>
			))}
		</ul>
	);
}

export default ReservationList;
