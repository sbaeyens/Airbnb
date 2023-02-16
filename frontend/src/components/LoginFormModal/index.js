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
    return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password"} ))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          disabled={errors.length === 0 ? false : true}
          className="submit-button"
          type="submit"
        >
          Log In
        </button>
      </form>
      <div className="demoButton">
        <button onClick={handleDemo}>Demo User</button>
      </div>
    </div>
  );
}

export default LoginFormModal;
