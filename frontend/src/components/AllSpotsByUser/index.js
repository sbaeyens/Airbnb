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

    // console.log("sessionUser from allspotsbyuser", sessionUser);

    if (!spots) {
      return null;
    }

    // Put all spots in array
    let spotsArr = Object.values(spots);
    // console.log("spotsArr", spotsArr)
    console.log("spotsArr from allspotsbyuser", spotsArr)
    return (
      <div>
        <div className="manage-spots-header-text">
          <h1>Manage Spots</h1>
        </div>
        <div className="all-spots">
          {/* <section className='all-spots'> */}
          {spots &&
            spotsArr.map((spot) => (
              <SpotCard spot={spot} sessionUser={sessionUser} key={spot.name} />
            ))}
          {/* </section> */}
        </div>
      </div>
    );


}

export default AllSpotsByUser;
