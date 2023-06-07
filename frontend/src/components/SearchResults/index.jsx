import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSpots } from "../../store/spots";
import SpotCard from "../SpotCard";
import "./SearchResults.css";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function SearchResults() {
  const dispatch = useDispatch();
    const history = useHistory
  const spots = useSelector((state) => {
    return state.spots?.allSpots;
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

   let url = window.location.href
   let searchParams = new URL(url).searchParams
   const entries = new URLSearchParams(searchParams).entries()
   const queryArr = Array.from(entries)

   let searchLocation = queryArr[0][1] ? queryArr[0][1] : "paris";

    let searchResultsArray = []
    if (spotsArr.length > 0) {

        for (let spot of spotsArr) {
            if (spot.city.toLowerCase().includes(searchLocation.toLowerCase())) {
              searchResultsArray.push(spot);
            }
            else if (spot.state.toLowerCase().includes(searchLocation.toLowerCase())) {
              searchResultsArray.push(spot);
            }
            else if (spot.country.toLowerCase().includes(searchLocation.toLowerCase())) {
              searchResultsArray.push(spot);
            }
        }
    }
    let firstSpotLat = searchResultsArray[0]?.lat;
  let firstSpotLng = searchResultsArray[0]?.lng ? (Number(searchResultsArray[0].lng) + 0.270) : 0 ;


   const center = { lat: Number(firstSpotLat), lng: Number(firstSpotLng)};


   if (!isLoaded) {
     <div>LOADING...</div>;
   }

   const testText = "hello world";

   const spotLinkHandler = (spotId) => {
     history.push(`/spots/${spotId}`);
   };

    return (
      <div className="search-page-wrapper">
        <div className="search-spots-container">
          <div className="search-results-summary">
            {`${searchResultsArray.length} stays in ${searchLocation} `}
          </div>
          <div className="search-all-spots">
            {/* <section className='all-spots'> */}
            {spots &&
              searchResultsArray.map((spot) => (
                <SpotCard spot={spot} key={spot.name} />
              ))}
            {/* </section> */}
          </div>
        </div>
        <div className="map-search-wrapper-search">
          { (isLoaded && (searchResultsArray.length > 0)) ? (
            <div className="google-maps-box-search">
              <GoogleMap
                center={center}
                zoom={10}
                mapContainerStyle={{ width: "100%", height: "100%" }}
              >
                {spots &&
                  spotsArr.map((spot) => (
                    <Marker
                      position={{
                        lat: Number(spot.lat),
                        lng: Number(spot.lng),
                      }}
                      icon={"none"}
                      onClick={(e) => spotLinkHandler(spot.id)}
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
      </div>
    );
}

export default SearchResults;
