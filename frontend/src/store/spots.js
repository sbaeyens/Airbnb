import { csrfFetch } from "./csrf";

const LOAD = "spots/LOAD";
const LOAD_SPOT = "spots/LOAD_SPOT"
const ADD_SPOT = "spots/ADD_SPOT"
const ADD_PHOTOS = "spots/ADD_PHOTOS"
const ALL_SPOTS_BY_USER = "spots/ALL_SPOTS_BY_USER"
const DELETE_SPOT = "spots/DELETE_SPOT"

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

// CREATE NEW SPOT
const addPhotos = payload => ({
  type: ADD_PHOTOS,
  payload
})

//ALL SPOTS BY USER
const allSpotsByUser = payload => ({
  type: ALL_SPOTS_BY_USER,
  payload
})

//DELETE SPOT
const deleteSpot = payload => ({
  type: DELETE_SPOT,
  payload
})

//--------THUNKS--------//
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch(`/api/spots`);

  if (response.ok) {
    console.log("response firing from all spot thunk")
    const payload = await response.json();
    dispatch(load(payload));
  }
};

export const getAllSpotsbyUser = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);

  if (response.ok) {
    // console.log("response in all spots by user*******", response)
    const payload = await response.json();
    dispatch(allSpotsByUser(payload));
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
  // console.log("reached addNewSpot Thunk")
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

 // add Photos Thunk
export const addPhotosToSpot = (photosArr, spotId) => async (dispatch) => {
  // console.log("reached addPhotosToSpot Thunk");
  for (let photo of photosArr) {
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(photo),
    });


    if (response.ok) {
      const details = await response.json();
      dispatch(addPhotos(details));
      // console.log("details of photo posted from thunk", details)
      // return details;
    }
  }
};

//Delete Spot Thunk
export const removeSpot = (spotId) => async (dispatch) => {
  // console.log("reached removeSpot Thunk")
  // console.log("Spot ID from inside thunk", spotId);
  const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE"
  });


  if (response.ok) {
    // console.log("reached response.ok")
    const details = await response.json();
    // console.log("details from inside thunk", details)
      dispatch(deleteSpot(spotId));

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
  let newState
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
      case ALL_SPOTS_BY_USER:
        const allSpotsByUser = { ...action.payload.Spots };
        let allSpotsArr = Object.values(allSpotsByUser)
        let normalizedResult = {}
        allSpotsArr.forEach((spot) => (normalizedResult[spot.id] = spot))
        console.log("allSpotsByUser from in spotsReducer", allSpotsByUser)
        console.log("allSpotsArr", allSpotsArr)
        return {
          ...state,
          allSpots: normalizedResult,
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
        // console.log("newSpot from ADD_SPOT REDUCER", newSpot)
        return { ...state }
      case ADD_PHOTOS:
        const photosArray = { ...action.payload }
        // console.log("photosArray from ADD_PHOTOS REDUCER", photosArray)
        return { ...state }
      case DELETE_SPOT:
        newState = { ...state }
        console.log("$$$$$$$$$$$$$ newState", newState)
        delete newState.allSpots[action.payload]
        console.log("$$$$$$$$$$$$$  newState after delete", newState);
        newState = {
          ...newState,
          allSpots: {...newState.allSpots}
        }
        return newState
        // let newAllSpots = newState.allSpots
        // console.log("reached reducer + action.spotId", action.spotId)
        // console.log("newState from reducer", newState)
        // console.log("action.payload from inside reducer", action.payload)
        // let allSpotsArr = Object.values(newAllSpots)
        // console.log("allSpotsArr ********", allSpotsArr)
        // delete allSpotsArr[action.payload]
        // console.log("allSpots from inside reducer", newAllSpots)
        // result = {
        //   ...newState,
        //   newAllSpots
        // }
        // return result
      default:
        return state;
    }
}
