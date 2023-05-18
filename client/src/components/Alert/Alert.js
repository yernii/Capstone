import React, { useState, useEffect } from "react";
import "./Alert.css";

const Alert = ({ message, type }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);

    const timeout = setTimeout(() => {
      setShow(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, []);
  return (
    <div
      className={`alert ${type === "error" ? "alert-error" : "alert-success"}`}
      style={{ display: show ? "block" : "none" }}
    >
      {message}
    </div>
  );
};

export default Alert;
