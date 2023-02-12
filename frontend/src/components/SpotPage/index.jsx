import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getSingleSpot } from "../../store/spots";

import "./SpotPage.css";

function SpotPage() {
  let spotId = useParams().spotId;
  // console.log(spotId)

  const dispatch = useDispatch();
  const singleSpot = useSelector((state) => {
    return state.spots.singleSpot;
  });


  useEffect(() => {
    dispatch(getSingleSpot(spotId));
  }, [dispatch]);

    let singleSpotArr = Object.values(singleSpot)
    console.log("singleSpotArr", singleSpotArr)

  if (Object.values(singleSpot).length === 0) {
    return null;
  }
  console.log("single spot from spotPage", singleSpot);

  console.log("image from single spot array", singleSpot.SpotImages[0].url);

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
                      <button>
                          Reserve
                      </button>
                  </div>
        </div>
      </div>
    </div>
  );
}

export default SpotPage
