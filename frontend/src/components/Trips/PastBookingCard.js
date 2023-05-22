import "./Trips.css";
import { compareAsc, differenceInCalendarDays, format } from "date-fns";


function PastBookingCard({ booking }) {


  if (!booking) return null;
  return (
    <div className="past-booking-card">
      <img
        src={booking.Spot.previewImage}
        alt="image"
        className="past-booking-img"
      />
      <div className="past-booking-right">
        <div className="past-booking-top-info">
          <span className="past-booking-title">{booking.Spot.name}</span>
          <span className="past-booking-grey-text">
            {booking.Spot.city}, {booking.Spot.state}
          </span>
        </div>
        <div className="past-booking-bottom-info">
          <span className="past-booking-grey-text">
            {format(new Date(booking.startDate), "MMMM dd")} -{" "}
            {format(new Date(booking.endDate), "MMMM dd")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PastBookingCard;
