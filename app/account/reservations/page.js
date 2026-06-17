
import ReservationCard from "@/app/_components/ReservationCard";

export default function Page() {
  // CHANGE
  const bookings = [];

  return (
    <div>
      <h2 className="font-semibold text-2xl text-yellow-500 mb-7">
        Your reservations
      </h2>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <a className="underline text-yellow-500" href="/cabins">
            luxury cabins &rarr;
          </a>
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
