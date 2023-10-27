import React from "react";

const Alert = ({text, type}) => {
  return (
    <div className="fixed z-50 inset-0 flex items-center justify-center px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
        <div></div>
        <p>{text}</p>
    </div>
  );
};

export default Alert;

