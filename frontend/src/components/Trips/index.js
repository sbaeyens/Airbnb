import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./Trips.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom";
import { getUserBookings } from "../../store/bookings";
import { compareAsc, differenceInCalendarDays, format } from "date-fns";
import FutureBookingCard from "./FutureBookingCard";
import PastBookingCard from "./PastBookingCard";


function Trips() {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    const bookings = useSelector((state) => state.bookings.user)

     useEffect(() => {
       dispatch(getUserBookings());
     }, [dispatch]);

    let bookingsArr = Object.values(bookings)
    console.log(bookingsArr)


    let futureBookings = []
    let pastBookings = []

    console.log("todays date", new Date())

    bookingsArr.forEach((booking) => {
        if (differenceInCalendarDays(new Date(booking.endDate), new Date()) > 0) futureBookings.push(booking);
        else pastBookings.push(booking);
    })

    console.log("futureBookings", futureBookings)
    console.log("pastBookings", pastBookings);


  return (
    <div className="trips-page-container">
      <span className="trips-header">Trips</span>
      <div className="grey-divider"></div>
      <span className="upcoming-trips-header">Upcoming Reservations</span>
      <div className="upcoming-trips">
        {bookings &&
          futureBookings.map((booking) => (
            <FutureBookingCard booking={booking} />
          ))}
      </div>
      <div className="grey-divider"></div>
      <span className="past-trips-header">Where You've Been</span>
      <div className="past-trips">
        {bookings &&
          pastBookings.map((booking) => <PastBookingCard booking={booking} />)}
      </div>
    </div>
  );
}

export default Trips;
