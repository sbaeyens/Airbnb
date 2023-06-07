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



    let futureBookings = []
    let pastBookings = []



    bookingsArr.forEach((booking) => {
        if (differenceInCalendarDays(new Date(booking.endDate), new Date()) > 0) futureBookings.push(booking);
        else pastBookings.push(booking);
    })



    return (
      <div className="trips-wrapper">
        <div className="trips-page-container">
          <span className="trips-header">Trips</span>
          {/* <div className="grey-divider"></div> */}
          <div className="upcoming-trips">
            <span className="upcoming-trips-header">Upcoming Reservations</span>
            {bookings &&
              futureBookings.map((booking) => (
                <FutureBookingCard booking={booking} />
              ))}
          </div>
          {/* <div className="grey-divider"></div> */}
          <div className="past-trips">
            <span className="past-trips-header">Where You've Been</span>
            <div className="past-trips-wrapper">
              {bookings &&
                pastBookings.map((booking) => (
                  <PastBookingCard booking={booking} />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Trips;
