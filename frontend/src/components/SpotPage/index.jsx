import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getSingleSpot } from "../../store/spots";
import { getSpotReviews } from "../../store/reviews";
import SingleReview from "../SingleReview";

import "./SpotPage.css";

function SpotPage() {
  let spotId = useParams().spotId;
  // console.log(spotId)

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

  let singleSpotArr = Object.values(singleSpot);
  // console.log("singleSpotArr", singleSpotArr)

  //--- RENDER AS NULL IF OBJ EMPTY ON MOUNT ---//
  if (Object.values(singleSpot).length === 0) {
    return null;
  }
  if (Object.values(spotReviews).length === 0) {
    return null;
  }

  // Put all reviews in array
  let reviewsArr = Object.values(spotReviews);

  //   console.log("single spot from spotPage", singleSpot);
  //   console.log("image from single spot array", singleSpot.SpotImages[0].url);
  console.log("spotReviews from component", spotReviews);

  return (
    <div className="spot-page-parent">
      <div className="top-info">
        <h1>{singleSpot.name}</h1>
        <h3>
          {singleSpot.city}, {singleSpot.state}, {singleSpot.country}
        </h3>
      </div>
      <div className="img-gallery">
        <img
          className="single-spot-preview-img"
          src={singleSpot.SpotImages[0].url}
          alt={singleSpot.name}
        />
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
                {singleSpot.avgStarRating} - {singleSpot.numReviews} reviews
              </span>
            </p>
          </div>
          <div className="reserve-modal-button">
            <button>Reserve</button>
          </div>
        </div>
      </div>
      {/* div section for reviews */}
      <div className="reviews-section-parent">
        <h2>
          <span>
            <i className="fa-regular fa-star"></i>
            {singleSpot.avgStarRating} rating - {singleSpot.numReviews} reviews
          </span>
        </h2>
        {/* create single review component */}
        <div>

          {reviewsArr && reviewsArr.map((review) => <SingleReview review={review} />)}

        </div>

      </div>
    </div>
  );
}

export default SpotPage
