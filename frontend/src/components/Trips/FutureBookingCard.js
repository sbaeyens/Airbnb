import "./Trips.css";

function FutureBookingCard({ booking }) {
  if (!booking) return null;
  return (
    <div className="single-review">
      <div className="review-container">
        <div className="review-heading">
          <div className="review-user-icon">
            <i class="fa-regular fa-circle-user"></i>
          </div>
          <div className="review-header">
            <h3 className="review-text">{booking.Spot.name}</h3>
            <h4 className="review-text date">
              {booking.Spot.city}, {booking.Spot.state}
            </h4>
          </div>
        </div>
        <div className="review-body">
          <p className="review-text description">lorem</p>
        </div>
      </div>
    </div>
  );
}

export default FutureBookingCard;
