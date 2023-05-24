import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSpotState, getAllSpots } from '../../store/spots';
import SpotCard from '../SpotCard'
import './AllSpots.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom';

function AllSpots() {
const dispatch = useDispatch();
const spots = useSelector((state) => {
  return state.spots.allSpots;
});

useEffect(() => {
  dispatch(getAllSpots());
  return () => {
    dispatch(clearSpotState());
  };
}, [dispatch]);

console.log("state from Allspots component", spots);

if (!spots) {
  return null;
}

// Put all spots in array
let spotsArr = Object.values(spots);
// console.log("spotsArr", spotsArr)
    console.log("spotsArr from allspots", spotsArr);

  return (
    <div className="all-spots-page-wrapper">
      <div className="all-spots-container">
        <div className="all-spots">
          {/* <section className='all-spots'> */}
          {spots &&
            spotsArr.map((spot) => <SpotCard spot={spot} key={spot.name} />)}
          {/* </section> */}
          <NavLink to="/map">
            <div className="floating-map-toggle-main">
              Show Map <i className="fa-solid fa-map fa-show"></i>
            </div>
          </NavLink>
        </div>
      </div>
      <div className="personal-links-footer">
        <div className="footer-left">Built by Sean Baeyens - 2023</div>
        <div className="footer-right">
          <a className="portfolio-link">LinkedIn</a>
          <span className="portfolio-link">Github</span>
          <span className="portfolio-link">Portfolio</span>
        </div>
      </div>
    </div>
  );
}

export default AllSpots
