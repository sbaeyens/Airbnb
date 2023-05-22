import "./Trips.css";
import { compareAsc, differenceInCalendarDays, format } from "date-fns";

function FutureBookingCard({ booking }) {

    let stayLength = (booking) => {
        differenceInCalendarDays(
                      new Date(booking.endDate),
                      new Date(booking.startDate)
                    )}
  if (!booking) return null;
  return (
    <div className="future-booking-card">
      <div className="left-future-booking-card-info">
        <div className="booking-card-inner">
          <div className="booking-card-upper">
            <span className="booking-card-name">{booking.Spot.name}</span>
            <span className="booking-card-location">
              {booking.Spot.city}, {booking.Spot.state}
            </span>
          </div>
          <div className="booking-card-lower">
            <div className="booking-card-bottom-left">
              <span className="booking-card-dates-and-nights">Dates</span>
              <span className="booking-card-dates">
                {booking.startDate} - {booking.endDate}
              </span>
              <span className="booking-card-dates-and-nights">Nights</span>
                          <span className="booking-card-length">{ stayLength(booking)}</span>
            </div>
            <div className="booking-card-bottom-right">
              <span className="booking-card-description">
                lorem ipsum description. Add to backend route
              </span>
            </div>
          </div>
        </div>
      </div>
      <img
        src={booking.Spot.previewImage}
        alt="image"
        className="future-booking-img"
      />
    </div>
  );
}

export default FutureBookingCard;
