"use client"

import Image from "next/image";
import { useReservation } from "../contexts/ReservationContext";
import { differenceInBusinessDays } from "date-fns";
import { createBooking } from "../_lib/actions";

function ReservationForm({ cabin, user }) {
	const { range } = useReservation();
	const { maxCapacity, regularPrice, discount, id } = cabin;

	const startDate = range?.from;
	const endDate = range?.to;
	const numNights = differenceInBusinessDays(endDate, startDate);
	const cabinPrice = numNights * (regularPrice - discount);

	const bookingData = {
		startDate,
		endDate,
		numNights,
		cabinPrice,
		cabinId: id,
	};

	const createBookingWithData = createBooking.bind(null, bookingData);
	return (
		<div className="scale-[1.01]">
			<div className="bg-gray-800 text-primary-300 px-16 py-2 flex justify-between items-center">
				<p>Logged in as</p>

				<div className="flex gap-4 items-center">
					<div className="relative w-8 h-8">
						<Image
							referrerPolicy="no-referrer"
							// 2. Changed objectFit to cover so the avatar doesn't distort
							className="object-cover rounded-full"
							fill
							src={user.image}
							alt={user.name}
						/>
					</div>
					<p>{user.name}</p>
				</div>
			</div>

			<form
				action={createBookingWithData}
				className="bg-gray-900 py-10 px-16 text-lg flex gap-5 flex-col"
			>
				<div className="space-y-2">
					<label htmlFor="numGuests">How many guests?</label>
					<select
						name="numGuests"
						id="numGuests"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						required
					>
						<option value="" key="">
							Select number of guests...
						</option>
						{Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
							<option value={x} key={x}>
								{x} {x === 1 ? "guest" : "guests"}
							</option>
						))}
					</select>
				</div>

				<div className="space-y-2">
					<label htmlFor="observations">
						Anything we should know about your stay?
					</label>
					<textarea
						name="observations"
						id="observations"
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
						placeholder="Any pets, allergies, special requirements, etc.?"
					/>
				</div>

				<div className="flex justify-end items-center gap-6">
					<p className="text-primary-300 text-base">Start by selecting dates</p>

					<button className="bg-yellow-600 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300">
						Reserve now
					</button>
				</div>
			</form>
		</div>
	);
}

export default ReservationForm;
