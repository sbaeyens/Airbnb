import React from "react";
import { NavLink, Link} from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import DemoLoginButton from "./DemoLoginButton";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar">
      <div>
        <NavLink exact to="/">
          <img id="nav-logo" src="https://i.imgur.com/u8XuxDh.png" alt="logo" />
        </NavLink>
      </div>
      <div className="right-nav">
        {sessionUser ? <Link to="/spots/new">Create New Spot</Link> : <></>}
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
