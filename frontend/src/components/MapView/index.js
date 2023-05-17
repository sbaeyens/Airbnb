import { Link } from "react-router-dom";
import "./MapView.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useRef, useState, useEffect } from "react";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";

function MapView({singleSpot}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const spots = useSelector((state) => {
    return state.spots.allSpots;
  });

  console.log("singleSpot from mapcview", singleSpot)
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
  console.log("spotsArr from mapView", spotsArr);

  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = { lat: singleSpot.lat, lng: singleSpot.lng };

  if (!isLoaded) {
    <div>LOADING...</div>;
  }



  return (
    <div className="map-search-wrapper-viewer">
      {isLoaded ? (
        <div className="google-maps-box-viewer">
          <GoogleMap
            center={center}
            zoom={12}
            mapContainerStyle={{ width: "100%", height: "100%" }}
          >
            {spots &&
              spotsArr.map((spot) => (
                <Marker
                  position={{ lat: singleSpot.lat, lng: singleSpot.lng }}
                  icon={"none"}
                  label={{
                    text: `$${spot.price.toString()}`,
                    className: "marker-label",
                  }}
                ></Marker>
              ))}
          </GoogleMap>
        </div>
      ) : null}
    </div>
  );
}

export default MapView;
