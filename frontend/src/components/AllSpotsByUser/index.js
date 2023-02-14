import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SpotCard from "../SpotCard";
import { getAllSpotsbyUser } from "../../store/spots";

import "./AllSpotsByUser.css";

function AllSpotsByUser() {
    const sessionUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch();
    const spots = useSelector((state) => {
      return state.spots.allSpots;
    });

    useEffect(() => {
      dispatch(getAllSpotsbyUser());
    }, [dispatch]);

    console.log("sessionUser from allspotsbyuser", sessionUser);

    if (!spots) {
      return null;
    }

    // Put all spots in array
    let spotsArr = Object.values(spots);
    // console.log("spotsArr", spotsArr)

    return (
      <div className="all-spots">
        {/* <section className='all-spots'> */}
        {spots &&
                spotsArr.map((spot) => <SpotCard spot={spot} sessionUser={sessionUser} key={spot.name} />)}
        {/* </section> */}
      </div>
    );


}

export default AllSpotsByUser;
