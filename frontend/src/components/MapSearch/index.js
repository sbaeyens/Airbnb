import { Link } from "react-router-dom";
import "./MapSearch.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";

function MapSearch() {
    const dispatch = useDispatch();
    const history = useHistory()
  const spots = useSelector((state) => {
    return state.spots.allSpots;
  });

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  console.log("state from Allspots component", spots);

  console.log("process.env", process.env);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!spots) {
    return null;
  }

  // Put all spots in array
  let spotsArr = Object.values(spots);
  // console.log("spotsArr", spotsArr)
  console.log("spotsArr from allspots", spotsArr);

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = { lat: 19.4326, lng: -99.1332 };

  if (!isLoaded) {
    <div>LOADING...</div>;
  }

    const testText = "hello world"

    const spotLinkHandler = (spotId) => {
        console.log(spotId)
        history.push(`/spots/${spotId}`);
    }

  return (
    <div className="map-search-wrapper">
      {isLoaded ? (
        <div className="google-maps-box">
          <GoogleMap
            center={center}
            zoom={3}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            {spots && spotsArr.map((spot) => (
              <Marker
                position={{ lat: Number(spot.lat), lng: Number(spot.lng) }}
                icon={"none"}
                onClick={(e) => spotLinkHandler(spot.id)}
                label={{
                  text: `$${(spot.price).toString()}`,
                  className: "marker-label",
                }}
              ></Marker>
            ))}
          </GoogleMap>
        </div>
      ) : null}
      <NavLink to="/">
        <div className="floating-map-toggle">
          Show List <i className="fa-solid fa-map fa-show"></i>
        </div>
      </NavLink>
    </div>
  );
}

export default MapSearch;
