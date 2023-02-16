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

        <button className="profileButton" onClick={openMenu}>
          <i className="fa-solid fa-bars" />{" "}
          <i className="fas fa-user-circle" />
        </button>
      <div className={`${ulClassName} profile-modal`} ref={ulRef}>
        {user ? (
          <>
            <p>hello, {user.username}</p>
            <p>{user.email}</p>
            <p className="manage-spots">
              <Link to="/spots/current">Manage Spots</Link>
            </p>

            <button onClick={logout}>Log Out</button>
          </>
        ) : (
          <>
            <OpenModalMenuItem
              itemText="Log In"
              onItemClick={closeMenu}
              modalComponent={<LoginFormModal />}
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default ProfileButton;
