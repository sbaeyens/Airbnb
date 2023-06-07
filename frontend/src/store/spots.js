import { csrfFetch } from "./csrf";

const LOAD = "spots/LOAD";
const LOAD_SPOT = "spots/LOAD_SPOT"
const ADD_SPOT = "spots/ADD_SPOT"
const ADD_PHOTOS = "spots/ADD_PHOTOS"
const ALL_SPOTS_BY_USER = "spots/ALL_SPOTS_BY_USER"
const DELETE_SPOT = "spots/DELETE_SPOT"
const EDIT_SPOT = "spots/EDIT_SPOT"
const CLEAR_SPOT_STATE = "spots/CLEAR_SPOT_STATE";


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

//EDIT SPOT
const updateSpot = payload => ({
  type: EDIT_SPOT,
  payload
})

//CLEAR SPOT STATE
export const clearSpotState = () => {
  return {
    type: CLEAR_SPOT_STATE,
  };
};

//--------THUNKS--------//
export const getAllSpots = () => async (dispatch) => {
  const response = await fetch(`/api/spots`);

  if (response.ok) {
    const payload = await response.json();
    dispatch(load(payload));
  }
};

export const getAllSpotsbyUser = () => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/current`);

  if (response.ok) {
    const payload = await response.json();
    dispatch(allSpotsByUser(payload));
  }
};


export const getSingleSpot = (spotId) => async dispatch => {
  const response = await fetch(`/api/spots/${spotId}`)

  if (response.ok) {
    const payload = await response.json()
    dispatch(loadOneSpot(payload))
    return payload
  }
}

export const addNewSpot = (newSpot) => async dispatch => {
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
      // return details;
    }
  }
};

//Delete Spot Thunk
export const removeSpot = (spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
      method: "DELETE"
  });


  if (response.ok) {
    const details = await response.json();
      dispatch(deleteSpot(spotId));

    }

}

// EDIT Spot Thunk
export const editSpot = (newSpot, spotId) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${spotId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newSpot),
  });

  if (response.ok) {
    const details = await response.json();
    dispatch(updateSpot(details));

    return details;
  }
};

const initialState = {
    allSpots: {},
    singleSpot: {}
}




//--------REDUCER--------//

export default function spotsReducer(state = initialState, action) {
  let result
  let newState
    switch (action.type) {
      case LOAD:
        const allSpots = { ...action.payload.Spots };
        return {
          ...state,
          allSpots,
          // list: sortList(action.list)
        };
      case ALL_SPOTS_BY_USER:
        const allSpotsByUser = { ...action.payload.Spots };
        let allSpotsArr = Object.values(allSpotsByUser);
        let normalizedResult = {};
        allSpotsArr.forEach((spot) => (normalizedResult[spot.id] = spot));

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
        return result;
      case ADD_SPOT:
        const newSpot = { ...action.payload };
        // result = {
        //   ...state,
        //   newSpot,
        // }
        return { ...state };
      case ADD_PHOTOS:
        const photosArray = { ...action.payload };
        return { ...state };
      case DELETE_SPOT:
        newState = { ...state };
        delete newState.allSpots[action.payload];
        newState = {
          ...newState,
          allSpots: { ...newState.allSpots },
        };
        return newState;

      case EDIT_SPOT:
        newState = { ...state };
        return newState;
      case CLEAR_SPOT_STATE:
        return { ...initialState };
      default:
        return state;
    }
}
