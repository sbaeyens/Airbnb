import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots"
import SpotPage from "./components/SpotPage";
import NewSpotForm from "./components/NewSpotForm";
import AllSpotsByUser from "./components/AllSpotsByUser";
import EditSpotForm from "./components/EditSpotForm";
import MapSearch from "./components/MapSearch";
import SearchResults from "./components/SearchResults";
import Trips from "./components/Trips";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path={"/search"}>
            <SearchResults />
          </Route>
          <Route exact path={"/"}>
            <AllSpots />
          </Route>
          <Route exact path={"/map"}>
            <MapSearch />
          </Route>
          <Route path={`/spots/new`}>
            <NewSpotForm />
          </Route>
          <Route path={`/spots/current`}>
            <AllSpotsByUser />
          </Route>
          <Route path={`/spots/:spotId/edit`}>
            <EditSpotForm />
          </Route>
          <Route path={`/spots/:spotId`}>
            <SpotPage />
          </Route>
          <Route path={`/trips`}>
            <Trips />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
