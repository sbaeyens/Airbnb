import "./Trips.css";
import { compareAsc, differenceInCalendarDays, format } from "date-fns";

function FutureBookingCard({ booking }) {

    let stayLength = (booking) => {
       let days = differenceInCalendarDays(
                      new Date(booking.endDate),
                      new Date(booking.startDate)
        )
        return days
    }

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
            <div className="booking-card-lower-left-inner">
              <div className="booking-card-bottom-left">
                <span className="booking-card-dates-and-nights">Dates</span>
                <span className="booking-card-length">
                  {format(new Date(booking.startDate), "MMMM dd")} -{" "}
                  {format(new Date(booking.endDate), "MMMM dd")}
                </span>
                <span className="booking-card-dates-and-nights">Nights</span>
                <span className="booking-card-length">
                  {stayLength(booking)} nights
                </span>
              </div>
            </div>
            <div className="booking-card-bottom-right">
              <span className="booking-card-description">
                {" "}
                {booking.Spot.description}
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
