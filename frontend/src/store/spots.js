import { csrfFetch } from "./csrf";

const LOAD = "spots/LOAD";
const LOAD_SPOT = "spots/LOAD_SPOT"
const ADD_SPOT = "spots/ADD_SPOT"

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

// CREATE NEW SPOT
const addSpot = payload => ({
  type: ADD_SPOT,
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

export const addNewSpot = (newSpot) => async dispatch => {
  console.log("reached addNewSpot Thunk")
  const response = await csrfFetch(`/api/spots`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSpot),
  });

  if (response.ok) {
    const details = await response.json();
    dispatch(addSpot(details));

    return details;
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
  let result
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
        result = {
          ...state,
          singleSpot,
        };
        console.log(result)
        return result
      case ADD_SPOT:
        const newSpot = { ...action.payload }
        // result = {
        //   ...state,
        //   newSpot,
        // }
        console.log("newSpot from ADD_SPOT REDUCER", newSpot)
        return {...state}
      default:
        return state;
    }
}
