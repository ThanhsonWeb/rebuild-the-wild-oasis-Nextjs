import { getBookedDatesByCabinId, getSettings } from "../_lib/data-service";
import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }) {
	const [settings, bookedDates] = await Promise.all([
		getSettings(),
		getBookedDatesByCabinId(cabin.id),
	]);
	console.log(settings);

	return (
		<div className="grid grid-cols-[1fr_1fr] my-10 gap-10 ">
			<DateSelector
				cabin={cabin}
				settings={settings}
				bookedDates={bookedDates}
			/>
			<ReservationForm cabin={cabin} />
		</div>
	);
}

export default Reservation;
