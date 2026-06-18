import DateSelector from "./DateSelector";
import ReservationForm from "./ReservationForm";

function Reservation() {
	return (
		<div className="grid grid-cols-[1fr_1fr] my-10 gap-10 ">
			<DateSelector />
			<ReservationForm />
		</div>
	);
}

export default Reservation;
