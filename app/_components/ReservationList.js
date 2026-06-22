"use client"
import { useOptimistic } from "react";
import ReservationCard from "./ReservationCard";
import { DeleteBooking } from "../_lib/actions";

function ReservationList({ bookings }) {
	// useOptimistic hook

	const [optimisticBookings, optimisticDelete] = useOptimistic(
		bookings,
		() => {},
	);

	async function handleDelete(bookingId) {
		await DeleteBooking(bookingId);
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
