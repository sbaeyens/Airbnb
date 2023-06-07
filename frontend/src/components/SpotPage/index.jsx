import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getSingleSpot } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import SingleReview from "../SingleReview";
import OpenModalButton from "../OpenModalButton";
import "./SpotPage.css";
import PostReviewModal from "../PostReviewModal";
import { addNewBooking, getSpotBookings } from "../../store/bookings";
import { compareAsc, differenceInCalendarDays, format } from "date-fns";
import MapView from "../MapView";
import MapSearch from "../MapSearch";
import { clearSpotState } from "../../store/spots";


function SpotPage() {
  let sessionUser
  sessionUser = useSelector((state) => state.session.user);
  let bookings = useSelector((state) => state.bookings)
  let spotId = useParams().spotId;
  const [checkin, setCheckin] = useState("")
  const [checkout, setCheckout] = useState("");
  let reviewsArr = []
  //---GRAB SPOT DATA---//
  const dispatch = useDispatch();
  const singleSpot = useSelector((state) => {
    return state.spots.singleSpot;
  });

  useEffect(() => {
    dispatch(getSingleSpot(spotId));
    dispatch(getSpotBookings(spotId))
    return () => {
      dispatch(clearSpotState());
    };
  }, []);

  //---GRAB REVIEWS DATA---//
  const spotReviews = useSelector((state) => {
    return state.reviews.spot;
  });

  useEffect(() => {
    dispatch(getSpotReviews(spotId));
  }, [dispatch]);

  //--- RENDER AS NULL IF OBJ EMPTY ON MOUNT ---//
  if (Object.values(singleSpot).length === 0) {
    return null;
  }
  if (spotReviews.id === null) {
    return null;
  }

  // Put all reviews in array
  reviewsArr = Object.values(spotReviews);


  /// check if user has reviews on page:
  if (!sessionUser) {
    sessionUser = { id : 0 }
  }

  let sessionHasNoReview = true;

  if (reviewsArr.length > 0) {
    reviewsArr.forEach(review => {
      if (review.User.id === sessionUser.id) sessionHasNoReview = false;
    });
  }

  // check if current session is owner
  let isOwner = false;
  if (singleSpot.ownerId === sessionUser.id) isOwner = true;

  const handleReserve = async (e) => {
    e.preventDefault()

    let startDate = new Date(checkin);
    let endDate = new Date(checkout);
    let newBooking = {
      spotId,
      "userId": sessionUser.id,
      startDate,
      endDate
    }
    dispatch(addNewBooking(newBooking))

  }

  let costSummaryNights = (singleSpot.price) * (differenceInCalendarDays(new Date(checkout), new Date(checkin)));
  let costCleaningFee = Math.round(singleSpot.price * .25)
  let costServiceFee = costSummaryNights * .10
  let totalCostBeforeTaxes = (costSummaryNights + costCleaningFee + costServiceFee)

  return (
    <div className="spot-page-parent">
      <div className="spot-page-wrapper">
        <div className="top-info">
          <h1 className="spot-name">{singleSpot.name}</h1>
          <h3 className="spot-subheading">
            <span className="subheading-bold">
              <i className="fa-solid fa-star star-subhead"></i>
              {!singleSpot.numReviews
                ? "New"
                : `${parseFloat(singleSpot.avgStarRating).toFixed(1)}  • `}
            </span>
            <span>
              {!singleSpot.numReviews ? " " : `${singleSpot.numReviews} review`}
              {singleSpot.numReviews > 1 ? "s" : null}
              {" • "}
            </span>
            {singleSpot.city}, {singleSpot.state}, {singleSpot.country}
          </h3>
        </div>

        <div className="image-grid">
          {singleSpot.SpotImages.length > 0 ? (
            <img
              className="image-grid-col-2 image-grid-row-2"
              src={singleSpot.SpotImages[0].url}
              alt={singleSpot.name}
            />
          ) : null}

          {singleSpot.SpotImages.length > 1 ? (
            <img
              className="other-img img1"
              src={singleSpot.SpotImages[1].url}
              alt={singleSpot.name}
            />
          ) : null}

          {singleSpot.SpotImages.length > 2 ? (
            <img
              className="other-img img2"
              src={singleSpot.SpotImages[2].url}
              alt={singleSpot.name}
            />
          ) : null}

          {singleSpot.SpotImages.length > 3 ? (
            <img
              className="other-img img3"
              src={singleSpot.SpotImages[3].url}
              alt={singleSpot.name}
            />
          ) : null}

          {singleSpot.SpotImages.length > 4 ? (
            <img
              className="other-img img4"
              src={singleSpot.SpotImages[4].url}
              alt={singleSpot.name}
            />
          ) : null}
        </div>
        <div className="bottom-info">
          <div className="spot-details">
            <h2 className="spot-description-heading">{`${singleSpot.name} hosted by ${singleSpot.User.firstName} ${singleSpot.User.lastName}`}</h2>
            <div className="grey-divider"></div>
            <div className="perks-container">
              <div className="perk">
                <div className="perk-logo">
                  <i class="fa-solid fa-crown"></i>
                </div>
                <div className="perk-text">
                  <div className="perk-heading">
                    {singleSpot.User.firstName} is a Superhost
                  </div>
                  <div className="perk-description">
                    Superhosts are experienced, highly rated hosts who are
                    committed to providing great stays for guests.
                  </div>
                </div>
              </div>
              <div className="perk">
                <div className="perk-logo">
                  <i class="fa-solid fa-location-dot"></i>
                </div>
                <div className="perk-text">
                  <div className="perk-heading">Great Location</div>
                  <div className="perk-description">
                    100% of recent guests gave the location a 5-star rating.
                  </div>
                </div>
              </div>
              <div className="perk">
                <div className="perk-logo">
                  <i class="fa-solid fa-key"></i>
                </div>
                <div className="perk-text">
                  <div className="perk-heading">Self Check-in</div>
                  <div className="perk-description">
                    Check yourself in with the lockbox.
                  </div>
                </div>
              </div>
              <div className="perk">
                <div className="perk-logo">
                  <i class="fa-solid fa-calendar"></i>
                </div>
                <div className="perk-text">
                  <div className="perk-heading">
                    Free Cancelation for 48 hours
                  </div>
                  <div className="perk-description"></div>
                </div>
              </div>
            </div>
            <div className="grey-divider"></div>
            <h2 className="spot-description-heading">About this place</h2>
            <p>{singleSpot.description}</p>
          </div>

          <div className="reserve-modal">
            <div className="reserve-modal-details">
              <p>
                <span className="price-lrg">${singleSpot.price}</span> night
              </p>
              <p>
                <span>
                  <i className="fa-solid fa-star reserve-star"></i>
                  {!singleSpot.numReviews
                    ? "New"
                    : `${parseFloat(singleSpot.avgStarRating).toFixed(
                        1
                      )} rating • `}
                  {!singleSpot.numReviews
                    ? " "
                    : `${singleSpot.numReviews} review`}
                  {singleSpot.numReviews > 1 ? "s" : null}
                </span>
              </p>
            </div>
            <div className="booking-selection">
              <div className="check-in">
                <span className="date-input-label">CHECK-IN</span>
                <div className="date-input-wrapper">
                  <input
                    className="date-input"
                    type="date"
                    id="start"
                    name="trip-start"
                    value={checkin}
                    min={Date()}
                    onChange={(e) => setCheckin(e.target.value)}
                  />
                </div>
              </div>
              <div className="check-out">
                <span className="date-input-label">CHECKOUT</span>
                <div className="date-input-wrapper">
                  <input
                    className="date-input"
                    type="date"
                    id="end"
                    name="trip-end"
                    value={checkout}
                    min={Date()}
                    onChange={(e) => setCheckout(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="reserve-modal-button">
              <button className="submit-button-reserve" onClick={handleReserve}>
                Reserve
              </button>
            </div>
            {costSummaryNights > 1 ? (
              <div className="price-summary">
                <div className="cost-summary-line nightly-charge-summary">
                  <span>
                    ${singleSpot.price} x{" "}
                    {differenceInCalendarDays(
                      new Date(checkout),
                      new Date(checkin)
                    )}{" "}
                    nights
                  </span>
                  <span>${costSummaryNights.toLocaleString()}</span>
                </div>
                <div className="cost-summary-line cleaning-fee">
                  <span>Cleaning Fee</span>
                  <span>${costCleaningFee}</span>
                </div>
                <div className="cost-summary-line service-fee">
                  <span>Service Fee</span>
                  <span>${costServiceFee}</span>
                </div>
                <div className="summary-line"></div>
                <div className="cost-summary-line service-fee">
                  <span className="summary-text">Total Before Taxes</span>
                  <span className="summary-text">
                    ${totalCostBeforeTaxes.toLocaleString()}
                  </span>
                </div>
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        </div>
        <div className="grey-divider"></div>
        {/* div section for reviews */}
        <div className="reviews-section-parent">
          <h2 className="reviews-header-text">
            <span>
              <i className="fa-solid fa-star star-heading"></i>
              {!singleSpot.numReviews
                ? "New"
                : `${parseFloat(singleSpot.avgStarRating).toFixed(
                    1
                  )} rating • `}
              {!singleSpot.numReviews ? " " : `${singleSpot.numReviews} review`}
              {singleSpot.numReviews > 1 ? "s" : null}
            </span>
          </h2>
          {/* post a review button - Only visible for:
            - logged in user
            - if current user hasn't made review */}
          <div>
            {isOwner === false &&
            sessionUser.id !== 0 &&
            sessionHasNoReview &&
            reviewsArr.length === 0 ? (
              <h2>Be the first to post a review!</h2>
            ) : null}
          </div>
          <div>
            {isOwner === false && sessionUser.id !== 0 && sessionHasNoReview ? (
              <OpenModalButton
                classAttribute={"submit-button"}
                buttonText="Post Review"
                modalComponent={<PostReviewModal spotId={spotId} />}
              />
            ) : null}
          </div>
          {/* create single review component */}
          <div className="reviews-list">
            {reviewsArr &&
              reviewsArr.map((review) => (
                <SingleReview review={review} sessionUser={sessionUser} />
              ))}
          </div>
        </div>
        <div className="grey-divider"></div>
        <h2 className="spot-description-heading">Where you'll be</h2>
        <div className="mapview-div">
          <MapView singleSpot={singleSpot}></MapView>
        </div>
      </div>
    </div>
  );
}

  export default SpotPage;
