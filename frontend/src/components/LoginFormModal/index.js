// frontend/src/components/LoginFormPage/index.js
import React, { useState, useEffect } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";
import DemoLoginButton from "../Navigation/DemoLoginButton";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [hasSubmitted, setHasSubmitted] = useState(false);


  useEffect(() => {
    let newErrors=[]
    if (credential.length < 4) {
      newErrors.push("email must be at least 4 characters");
    }
    if (password.length < 6) {
      newErrors.push("password must be at least 6 characters");
    }

    setErrors(newErrors)
  },[credential, password])

  const handleSubmit = (e) => {
    e.preventDefault();

    //return if errors
    setHasSubmitted(true);
    if (Object.keys(errors).length > 0) return alert(`Cannot Submit`);

    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  const handleDemo = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      sessionActions.login({ credential: "demo@user.io", password: "password" })
    )
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="login-modal-container">
      <div className="top-bar">
        <div className="mark-div">
          <i
            className="fa-solid fa-xmark"
            style={{ fontSize: "20px" }}
            onClick={closeModal}
          />
        </div>
        <span className="log-in">Log In</span>
      </div>
      <div className="welcome">
        <span>Welcome To Casabnb</span>
      </div>
      <form onSubmit={handleSubmit}>
        {/* <ul>
          <span className="error">
            {hasSubmitted &&
              errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </span>
        </ul> */}
        <div className="login-logout-inputs">
          <label>
            {/* Username or Email */}
            <input
              id="login-username"
              placeholder="Username or Email"
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
            />
          </label>
          <label>
            {/* Password */}
            <input
              id="login-password"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        {hasSubmitted && errors[0] && <div className="error-div">{errors[0]}</div>}
        <button
          // disabled={errors.length === 0 ? false : true}
          className="login"
          type="submit"
        >
          Continue
        </button>
      </form>
      <div className="or">
        <div className="or-sides"></div>
        <span style={{ fontSize: "12px", color: "gray", fontWeight: "250" }}>
          or
        </span>
        <div className="or-sides"></div>
      </div>
      <div className="demo-button-div">
        <button className="demo-butt" onClick={handleDemo}>
          Continue as demo user
        </button>
      </div>
    </div>
  );
}

export default LoginFormModal;
