import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getSingleSpot } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import SingleReview from "../SingleReview";
import OpenModalButton from "../OpenModalButton";
import "./SpotPage.css";
import PostReviewModal from "../PostReviewModal";

function SpotPage() {
  let sessionUser
  sessionUser = useSelector((state) => state.session.user);
  let spotId = useParams().spotId;
  // console.log(spotId)
  let reviewsArr = []
  //---GRAB SPOT DATA---//
  const dispatch = useDispatch();
  const singleSpot = useSelector((state) => {
    return state.spots.singleSpot;
  });

  useEffect(() => {
    dispatch(getSingleSpot(spotId));
  }, [dispatch]);

  //---GRAB REVIEWS DATA---//
  const spotReviews = useSelector((state) => {
    return state.reviews.spot;
  });

  useEffect(() => {
    dispatch(getSpotReviews(spotId));
  }, [dispatch]);
  // console.log("reached first console.log")
  // let singleSpotArr = Object.values(singleSpot);
  // console.log("singleSpotArr", singleSpotArr)

  //--- RENDER AS NULL IF OBJ EMPTY ON MOUNT ---//
  if (Object.values(singleSpot).length === 0) {
    return null;
  }
  if (spotReviews.id === null) {
    return null;
  }
  // console.log("reached second console.log");
  // Put all reviews in array
  reviewsArr = Object.values(spotReviews);
  // console.log("reviewsArr", reviewsArr)

  //   console.log("single spot from spotPage", singleSpot);
  //   console.log("image from single spot array", singleSpot.SpotImages[0].url);
  console.log("spotReviews from component", spotReviews);
  console.log("reviewsArr from component", reviewsArr);

  /// check if user has reviews on page:
  if (!sessionUser) {
    sessionUser = { id : 0 }
    console.log("reached console log for check on sessionUser")
  }
  // if (sessionUser === undefined) sessionUser = 0;
  console.log("sessionUser should be 0 now", sessionUser)

  let sessionHasNoReview = true;

  if (reviewsArr.length > 0) {
    reviewsArr.forEach(review => {
      if (review.User.id === sessionUser.id) sessionHasNoReview = false;
    });
  }

  console.log("sessionHasReview", sessionHasNoReview)

  // check if current session is owner
  let isOwner = false;
  if (singleSpot.ownerId === sessionUser.id) isOwner = true;

  return (
    <div className="spot-page-parent">
      <div className="top-info">
        <h1>{singleSpot.name}</h1>
        <h3>
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
            className="other-img"
            src={singleSpot.SpotImages[1].url}
            alt={singleSpot.name}
          />
        ) : null}

        {singleSpot.SpotImages.length > 2 ? (
          <img
            className="other-img"
            src={singleSpot.SpotImages[2].url}
            alt={singleSpot.name}
          />
        ) : null}

        {singleSpot.SpotImages.length > 3 ? (
          <img
            className="other-img"
            src={singleSpot.SpotImages[3].url}
            alt={singleSpot.name}
          />
        ) : null}

        {singleSpot.SpotImages.length > 4 ? (
          <img
            className="other-img"
            src={singleSpot.SpotImages[4].url}
            alt={singleSpot.name}
          />
        ) : null}
      </div>
      <div className="bottom-info">
        <div className="spot-details">
          <h2>{`Hosted by ${singleSpot.User.firstName} ${singleSpot.User.lastName}`}</h2>
          <p>{singleSpot.description}</p>
        </div>
        <div className="reserve-modal">
          <div className="reserve-modal-details">
            <p>{`$${singleSpot.price} / night`}</p>
            <p>
              <span>
                <i className="fa-regular fa-star"></i>
                {!singleSpot.numReviews
                  ? "New"
                  : `${parseFloat(singleSpot.avgStarRating).toFixed(
                      1
                    )} rating ??? `}
                {!singleSpot.numReviews
                  ? " "
                  : `${singleSpot.numReviews} review`}
                {singleSpot.numReviews > 1 ? "s" : null}
              </span>
            </p>
          </div>
          <div className="reserve-modal-button">
            <button className="submit-button-reserve">Reserve</button>
          </div>
        </div>
      </div>
      {/* div section for reviews */}
      <div className="reviews-section-parent">
        <h2 className="reviews-header-text">
          <span>
            <i className="fa-regular fa-star"></i>
            {!singleSpot.numReviews
              ? "New"
              : `${parseFloat(singleSpot.avgStarRating).toFixed(1)} rating ??? `}
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
    </div>
  );
}

  export default SpotPage;
