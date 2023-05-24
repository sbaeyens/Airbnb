import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

// import "./Navigation.css";


function ProfileButton({ user }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push(`/`);
  };

  const ulClassName = "profile-dropdown float-menu" + (showMenu ? "" : " hidden");

  return (
    <div>
      <div className="profileButton" onClick={openMenu}>
        <i className="fa-solid fa-bars" /> <i className="fas fa-user-circle" />
      </div>
      <div className={`${ulClassName} profile-modal`} ref={ulRef}>
        {user ? (
          <>
            <p>Hello, {user.username}</p>
            <p className="profile-dropdown-email">{user.email}</p>
            <p className="manage-spots">
              <Link to="/spots/current">
                <i className="fa-solid fa-home menu-icon" />
                Manage Listings
              </Link>
            </p>
            <p className="manage-trips">
              <Link to="/trips">
                <i className="fa-solid fa-passport menu-icon" />
                Manage Trips
              </Link>
            </p>

            <button className="logout-button" onClick={logout}>
              Log Out
            </button>
          </>
        ) : (
          <>
            <div className="menu-links">
              <OpenModalMenuItem
                classAttribute={"submit-button-card"}
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
            </div>
            <div className="menu-links">
              <OpenModalMenuItem
                classAttribute={"menu-links"}
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
