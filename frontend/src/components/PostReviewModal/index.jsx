import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./PostReviewModal.css";
import { addNewReview, getSpotReviews } from "../../store/reviews";
import { getSingleSpot } from "../../store/spots";

function PostReviewModal({spotId}) {
    const dispatch = useDispatch();
    const [review, setReview] = useState("");
    const [errors, setErrors] = useState([]);
    const [stars, setStars] = useState(0)
    const { closeModal } = useModal();


    useEffect(() => {
      let newErrors = [];

      //errors to push
      if (review.length < 10) {
        newErrors.push("Review must be 10 or more characters");
      }

      setErrors(newErrors);
    }, [review]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);

         const newReview = {
             review,
             stars
         };

        console.log("newReview from inside handle submit", newReview)

        let createdReview = await dispatch(addNewReview(newReview, spotId))
        await dispatch(getSpotReviews(spotId));
        // await dispatch(getSingleSpot(spotId))
         if(createdReview) closeModal();
      return
    };

  return (
    <div className="review-modal">
      <h1>How was your stay?</h1>
      <form onSubmit={handleSubmit}>
        <label for="review">
          <textarea
            name="review"
            id="review"
            cols="30"
            rows="10"
            placeholder="Leave your review here..."
            onChange={(e) => setReview(e.target.value)}
          >
            {review}
          </textarea>
        </label>
        <div class="rate">
          <input
            type="radio"
            id="star5"
            name="rate"
            value="5"
            checked={stars === 5}
            onChange={() => setStars(5)}
          />
          <label for="star5" title="text">
            5 stars
          </label>
          <input
            type="radio"
            id="star4"
            name="rate"
            value="4"
            checked={stars === 4}
            onChange={() => setStars(4)}
          />
          <label for="star4" title="text">
            4 stars
          </label>
          <input
            type="radio"
            id="star3"
            name="rate"
            value="3"
            checked={stars === 3}
            onChange={() => setStars(3)}
          />
          <label for="star3" title="text">
            3 stars
          </label>
          <input
            type="radio"
            id="star2"
            name="rate"
            value="2"
            checked={stars === 2}
            onChange={() => setStars(2)}
          />
          <label for="star2" title="text">
            2 stars
          </label>
          <input
            type="radio"
            id="star1"
            name="rate"
            value="1"
            checked={stars === 1}
            onChange={() => setStars(1)}
          />
          <label for="star1" title="text">
            1 star
          </label>
        </div>
        <button
          className="submit-button"
          type="submit"
          disabled={errors.length === 0 ? false : true}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
}

export default PostReviewModal;
