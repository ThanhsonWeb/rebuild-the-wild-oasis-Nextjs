import ButtonSubmit from "@/app/_components/ButtonSubmit";
import { UpdateBooking } from "@/app/_lib/actions";
import { getBooking, getCabin } from "@/app/_lib/data-service";

export default async function Page({ params }) {
	// bookingId comes from the dynamic route
	const { bookingId } = await params;
	const booking = await getBooking(Number(bookingId));

	const { maxCapacity } = await getCabin(booking.cabinId);

	return (
		<div>
			<h2 className="font-semibold text-2xl text-yellow-600 mb-7">
				Edit Reservation Hello
			</h2>

			<form
				action={UpdateBooking}
				className="bg-gray-900 py-8 px-12 text-lg flex gap-6 flex-col rounded-2xl "
			>
				{/* hidden input */}
				<input type="hidden" name="bookingId" value={booking.id} hidden />

				<div className="space-y-2">
					<label htmlFor="numGuests">How many guests?</label>
					<select
						name="numGuests"
						defaultValue={booking.numGuests}
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
						defaultValue={booking.observations}
						className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
					/>
				</div>

				<div className="flex justify-end items-center gap-6">
					<ButtonSubmit>Update Reservation</ButtonSubmit>
				</div>
			</form>
		</div>
	);
}
