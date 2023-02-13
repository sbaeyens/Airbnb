import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots"
import SpotPage from "./components/SpotPage";
import NewSpotForm from "./components/NewSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Switch>
        <Route exact path ={'/'}>
          <AllSpots />
        </Route>
        <Route path={`/spots/new`}>
          <NewSpotForm />
        </Route>
        <Route path={`/spots/:spotId`}>
          <SpotPage />
        </Route>
      </Switch>}
    </>
  );
}

export default App;
