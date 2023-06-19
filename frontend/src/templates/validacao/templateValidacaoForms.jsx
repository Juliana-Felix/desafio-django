import React from "react";

const Alert = ({ type, message }) => {
  const alertClasses = {
    success: "bg-green-200 text-green-800",
    error: "bg-red-200 text-red-800",
  };

  return (
    <div className={`p-4 mb-4 rounded ${alertClasses[type]}`}>
      {message}
    </div>
  );
};

export default Alert;
