// frontend/src/components/LoginFormPage/index.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./DeleteSpotModal.css";
import DemoLoginButton from "../Navigation/DemoLoginButton";
import { removeSpot } from "../../store/spots";

function DeleteSpotModal({spot}) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
    const { closeModal } = useModal();

    let spotId = spot.id

  const handleDelete = (e) => {
    e.preventDefault();

    return dispatch(removeSpot(spotId)).then(closeModal);

  };

    const handleCancel = (e) => {
      e.preventDefault();

        closeModal()
        return

    };

  return (
    <div className="modal">
          <h1>Confirm Delete</h1>
          <p>Are you sure you want to remove this spot from the listing?</p>

      <button onClick={handleDelete} className="submit-button" type="submit">
        Yes {"(Delete Spot)"}
      </button>
      <button onClick={handleCancel} className="submit-button" type="submit">
        No {"(Keep Spot)"}
      </button>
    </div>
  );
}

export default DeleteSpotModal;
