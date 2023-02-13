import { csrfFetch } from "./csrf";

const LOAD_SPOT_REVIEWS = "reviews/LOAD_SPOT_REVIEWS";

//--------ACTIONS--------//
// ALL SPOTS
const load = (payload) => ({
  type: LOAD_SPOT_REVIEWS,
  payload,
});

//--------THUNKS--------//
export const getSpotReviews = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/reviews`);

  if (response.ok) {
    const payload = await response.json();
    dispatch(load(payload));
  }
};


// INTIAL STATE
const initialState = {
  spot: {},
  user: {},
};


//--------REDUCER--------//
export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SPOT_REVIEWS:
      const spot = { ...action.payload.Reviews };
        console.log("action.payload.Reviews from REDUCER", spot)
      let result = {
        ...state,
        spot,
      };
          return result
    default:
      return state;
  }
}
