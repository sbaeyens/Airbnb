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
    <div className="login-modal">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          <span className="error">
            {hasSubmitted &&
              errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </span>
        </ul>
        <label>
          {/* Username or Email */}
          <input
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
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          disabled={errors.length === 0 ? false : true}
          className="login-submit-button"
          type="submit"
        >
          Log In
        </button>
      </form>
      <div>
        <button className="demo-submit-button demo" onClick={handleDemo}>
          Demo User
        </button>
      </div>
    </div>
  );
}

export default LoginFormModal;
