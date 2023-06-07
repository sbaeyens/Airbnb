import { Link } from "react-router-dom";
import "./MapView.css";
import { GoogleMap, useJsApiLoader, Marker, OverlayView } from "@react-google-maps/api";
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

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (!spots) {
    return null;
  }

  // Put all spots in array
  let spotsArr = Object.values(spots);


  const containerStyle = {
    width: "400px",
    height: "400px",
  };

  const center = { lat: Number(singleSpot.lat), lng: Number(singleSpot.lng) };

  if (!isLoaded) {
    <div>LOADING...</div>;
  }

  let homeIcon = <i className="fa-solid fa-star star-heading"></i>

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
                <OverlayView
                  position={{ lat: Number(singleSpot.lat), lng: Number(singleSpot.lng) }}
                  mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                >
                  <div className="marker-label-viewer">
                    <i className="fa-solid fa-house" />
                  </div>
                </OverlayView>
              ))}
          </GoogleMap>
        </div>
      ) : null}
    </div>
  );
}

export default MapView;
