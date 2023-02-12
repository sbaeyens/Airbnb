// import thunk from "redux-thunk"
import { csrfFetch } from "./csrf";

const LOAD = "spots/LOAD";
const LOAD_SPOT = "spots/LOAD_SPOT"

//--------ACTIONS--------//
// ALL SPOTS
const load = payload => ({
  type: LOAD,
  payload
});

// SINGLE SPOT
const loadOneSpot = payload => ({
  type: LOAD_SPOT,
  payload
})


//--------THUNKS--------//
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch(`/api/spots`);

  if (response.ok) {
    const payload = await response.json();
    dispatch(load(payload));
  }
};

export const getSingleSpot = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}`)

  if (response.ok) {
    const payload = await response.json()
    dispatch(loadOneSpot(payload))
  }
}


const initialState = {
    allSpots: {},
    singleSpot: {}
}

// initialSpots.forEach(spot => {
//     initialState[spot.id] = spot
// });


//--------REDUCER--------//

export default function spotsReducer(state = initialState, action) {
    switch (action.type) {
      case LOAD:
        const allSpots = { ...action.payload.Spots };
        //     console.log("allSpots from REDUCER", allSpots)
        //     let item = {...state}
        //     console.log("state from REDUCER", item)
        // // action.payload.Spots.forEach(spot => {
        // //     allSpots[spot.id] = spot;
        // // });
        //     console.log("allSpotsallSpots")

        // let result = {
        //     ...state,
        //     allSpots
        // }
        // console.log("return value from reducer", result)
        return {
          ...state,
          allSpots,
          // list: sortList(action.list)
        };
      case LOAD_SPOT:
        const singleSpot = { ...action.payload };
        let result = {
          ...state,
          singleSpot,
        };
        console.log(result)
        return result
      default:
        return state;
    }
}
