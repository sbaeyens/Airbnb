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

  // const [mapCenter, setMapCenter] = useState({
  //   lat: Number(48.8566),
  //   lng: Number(2.3522),
  // });

  useEffect(() => {
    dispatch(getAllSpots());
  }, [dispatch]);

  // useEffect(() => {
  //   setMapCenter({
  //     lat: Number(firstSpotLat),
  //     lng: Number(searchResultsArray[0]?.lng + 0.27),
  //   });
  //   console.log("fired setMapCenter()")
  // }, [spots]);

    console.log("state from Allspots component", spots);

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
    console.log("queryArr[0][1]", queryArr[0][1])

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
    console.log("searchResultsArray.length", searchResultsArray.length);
    let firstSpotLat = searchResultsArray[0]?.lat;
  console.log("first spot lat", firstSpotLat)
  let firstSpotLng = searchResultsArray[0]?.lng ? (Number(searchResultsArray[0].lng) + 0.270) : 0 ;
  console.log("first spot lng", firstSpotLng)
  // let testCenter = { "lat": spotsArr[0].lat, "lng": spotsArr[0].lng }
    // console.log("testCenter", testCenter)

   const center = { lat: Number(firstSpotLat), lng: Number(firstSpotLng)};
  console.log(center)
  // const newCenter = {
  //   lat: Number(48.8566),
  //   lng: Number(2.3522),
  // };

   if (!isLoaded) {
     <div>LOADING...</div>;
   }

   const testText = "hello world";

   const spotLinkHandler = (spotId) => {
     console.log(spotId);
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
