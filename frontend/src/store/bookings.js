import { csrfFetch } from "./csrf";

const LOAD_SPOT_BOOKINGS = "bookings/LOAD_SPOT_BOOKINGS";
const ADD_SPOT_BOOKING = "bookings/ADD_SPOT_BOOKING";


//--------ACTIONS--------//
// SPOT BOOKINGS
const loadSpotBookings = (payload) => ({
  type: LOAD_SPOT_BOOKINGS,
  payload,
});

// ADD SPOT BOOKING
const addSpotBooking = (payload) => ({
  type: ADD_SPOT_BOOKING,
  payload,
});


//--------THUNKS--------//
export const getSpotBookings = (spotId) => async (dispatch) => {
  const response = await fetch(`/api/spots/${spotId}/bookings`);
  if (response.ok) {
    const payload = await response.json();
    dispatch(loadSpotBookings(payload));
  }
};

export const addNewBooking = (newBooking) => async (dispatch) => {
  const response = await csrfFetch(`/api/spots/${newBooking.spotId}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBooking),
  });

  if (response.ok) {
    const details = await response.json();
    dispatch(addSpotBooking(details));

    return details;
  }
};

// INTIAL STATE
const initialState = {
  spot: {},
};

//--------REDUCER--------//
export default function reviewsReducer(state = initialState, action) {
  let result;
  let newState;
  switch (action.type) {
    case LOAD_SPOT_BOOKINGS:
      const bookings = { ...action.payload.Bookings };
      console.log("bookings from inside reducer", bookings);
      let bookingsArr = Object.values(bookings);
      let normalizedBookings = {};
      bookingsArr.forEach(
        (booking) => (normalizedBookings[booking.id] = booking)
      );
      result = {
        ...state,
        spot: normalizedBookings,
      };
      return result;
    case ADD_SPOT_BOOKING:
          const newBooking = { ...action.payload };
          console.log("newBooking from reducer", newBooking)

      return { ...state };

    default:
      return state;
  }
}
