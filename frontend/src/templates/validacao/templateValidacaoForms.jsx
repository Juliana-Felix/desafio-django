import React from "react";
import "./PopupErrorMessage.css";

const PopupErrorMessage = ({ message }) => {
  return (
    <div className="popup-error-message">
      <p>{message}</p>
    </div>
  );
};

export default PopupErrorMessage;
