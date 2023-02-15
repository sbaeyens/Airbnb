import { csrfFetch } from "./csrf";

const LOAD_SPOT_REVIEWS = "reviews/LOAD_SPOT_REVIEWS";
const ADD_NEW_REVIEW = "reviews/ADD_NEW_REVIEW"

//--------ACTIONS--------//
// ALL SPOTS
const load = (payload) => ({
  type: LOAD_SPOT_REVIEWS,
  payload,
});

//CREATE NEW REVIEW
const addReview = payload => ({
  type: ADD_NEW_REVIEW,
  payload
})

//--------THUNKS--------//
export const getSpotReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const payload = await response.json();
    dispatch(load(payload));
  }
};

//add new review thunk
export const addNewReview = (newReview, spotId) => async dispatch => {
  console.log("reached addNewReview Thunk")
  const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReview),
  });

  if (response.ok) {
    const details = await response.json();
    dispatch(addReview(details));

    return details;
  }
}

// INTIAL STATE
const initialState = {
  spot: {},
  user: {},
};


//--------REDUCER--------//
export default function reviewsReducer(state = initialState, action) {
  let result
  switch (action.type) {
    case LOAD_SPOT_REVIEWS:
      const reviews = { ...action.payload.Reviews };
      console.log("action.payload.Reviews from REDUCER", reviews);
      let reviewsArr = Object.values(reviews);
      let normalizedReviews = {};
      reviewsArr.forEach((review) => (normalizedReviews[review.id] = review));
      result = {
        ...state,
        spot: normalizedReviews,
      };
      return result;
    case ADD_NEW_REVIEW:
      const newReview = { ...action.payload };
      let spot = state.spot
      spot[newReview.id] = newReview
      console.log("newReview from ADD_NEW_REVIEW", newReview);
      console.log("spot from inside reducer", spot)
      result = {
        ...state,
        spot
      }
      console.log("result from inside reducer", result)
      return result;
    default:
      return state;
  }
}
