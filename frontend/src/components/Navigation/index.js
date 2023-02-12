import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className="navbar">
      <div>
        <NavLink exact to="/">
          <img id="nav-logo" src="https://i.imgur.com/u8XuxDh.png" alt="logo" />
        </NavLink>
      </div>
      <div className="profileButton">
        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </div>
  );
}

export default Navigation;
