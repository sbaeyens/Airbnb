// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteReview.css";
import DemoLoginButton from "../Navigation/DemoLoginButton";
import { removeReview } from "../../store/reviews";

function DeleteReview({ review }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const { closeModal } = useModal();

    let reviewId = review.id;
    console.log("reviewId from inside component", reviewId)

  const handleDelete = (e) => {
    e.preventDefault();

    return dispatch(removeReview(reviewId)).then(closeModal);
  };

  const handleCancel = (e) => {
    e.preventDefault();

    closeModal();
    return;
  };

  return (
    <div className="delete-modal">
      <h1>Confirm Delete</h1>
      <p>Are you sure you want to remove this review?</p>

      <button
        onClick={handleDelete}
        className="submit-button-red"
        type="submit"
      >
        Yes {"(Delete Review)"}
      </button>
      <button
        onClick={handleCancel}
        className="submit-button-grey"
        type="submit"
      >
        No {"(Keep Review)"}
      </button>
    </div>

  );
}

export default DeleteReview;
