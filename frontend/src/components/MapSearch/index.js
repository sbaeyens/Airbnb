import { Link } from "react-router-dom";
import "./MapSearch.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useRef, useState } from "react";

function MapSearch() {
    console.log("process.env", process.env)
    const { isLoaded } = useJsApiLoader({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
    });

    const containerStyle = {
      width: "400px",
      height: "400px",
    };

    const center = { lat: 48.8584, lng: 2.2945 };

    if (!isLoaded) {
        <div>LOADING...</div>
    }

  return (
      <div className="map-search-wrapper">
          {isLoaded ? (<div className="google-maps-box">
              <GoogleMap center={center} zoom={15} mapContainerStyle={{ width: '100%', height: '100%' }}>
              </GoogleMap>
          </div>) : (null)}
      <div className="floating-map-toggle">
        Show Map <i className="fa-solid fa-map fa-show"></i>
      </div>
    </div>
  );
}

export default MapSearch;
