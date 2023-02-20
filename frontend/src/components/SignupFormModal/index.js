import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();
  const [hasSubmitted, setHasSubmitted] = useState(false);


  useEffect(() => {
    let newErrors = [];
    if (email.length === 0) {
      newErrors.push("Email cannot be empty");
    }
    if (username.length < 4) {
      newErrors.push("Username must be at least 4 characters");
    }
    if (password.length < 6) {
      newErrors.push("Password must be at least 6 characters");
    }
    if (firstName.length === 0) {
      newErrors.push("First Name cannot be empty");
    }
    if (lastName.length === 0) {
      newErrors.push("Last Name cannot be empty");
    }



    setErrors(newErrors);
  },[email, username, firstName, lastName, password, confirmPassword])

  const handleSubmit = (e) => {
    e.preventDefault();

    //return if errors
    setHasSubmitted(true);
    if (Object.keys(errors).length > 0) return alert(`Cannot Submit`);

    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors([
      "Confirm Password field must be the same as the Password field",
    ]);
  };

  return (
    <div className="signup-modal">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          <span className="error">
            {hasSubmitted &&
              errors.map((error, idx) => <li key={idx}>{error}</li>)}
          </span>
        </ul>
        <label>
          {/* Email */}
          <input
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          {/* Username */}
          <input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <label>
          {/* First Name */}
          <input
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>
        <label>
          {/* Last Name */}
          <input
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
        <label>
          {/* Confirm Password */}
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button
          disabled={
            errors.length === 0 && confirmPassword === password ? false : true
          }
          className="signup-submit-button"
          type="submit"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
