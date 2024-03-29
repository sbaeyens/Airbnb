import React, { useState } from "react";
import { NavLink, Link} from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import DemoLoginButton from "./DemoLoginButton";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const history = useHistory();
  const [search, setSearch] = useState("");
  const onChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const onClickHandler = (e, company, ticker) => {
    // setValue(company)
    // setStockTick(ticker)
    e.preventDefault();
    let queryObj = {
      location: search
      // dateRange: daterange will go here if/when added to query
    }
    const searchParams = new URLSearchParams(queryObj)
    let queryString = searchParams.toString();
    history.push(`/search?${queryString}`);
    window.location.reload(false);
    // setSearch("");
  };

  return (
    <div className="navbar">
      <div>
        <NavLink exact to="/">
          <img id="nav-logo" src="https://i.imgur.com/vGelKR9.png" alt="logo" />
        </NavLink>
        <NavLink exact to="/">
          <img
            id="nav-typelogo"
            src="https://i.imgur.com/I54iw32.png"
            alt="logo"
          />
        </NavLink>
      </div>
      <div className="search-bar-container">
        <div className="search-bar-inner-wrapper">
          <form onSubmit={onClickHandler}>
            <input
              className="nav-search-bar"
              type="text"
              onChange={onChangeHandler}
              value={search}
              placeholder="Search"
            />
          </form>
        </div>
        <div className="search-bar-inner-search-button">
          <i
            className="fa-solid fa-magnifying-glass"
            id="search-bar-inner-search-icon"
            onClick={onClickHandler}
          />
        </div>
      </div>
      <div className="right-nav">
        {sessionUser ? <Link to="/spots/new" className="create-new-spot-link">Create New Spot</Link> : <></>}
        <div className="profileButton">
          {isLoaded && <ProfileButton user={sessionUser} />}
        </div>
      </div>
      {/* <div className="demoButton">
        {isLoaded && <DemoLoginButton />}
      </div> */}
    </div>
  );
}

export default Navigation;
