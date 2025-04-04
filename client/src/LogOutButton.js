import React from "react";
import { useNavigate } from "react-router-dom";  // For redirecting after logout
import "./LogOutButton.css";

const LogOutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");  // remove JWT token
    navigate("/sign-in");  // goes to sign-in page after logout
  };

  return (
    <button onClick={handleLogout} className="button">
      Log Out
    </button>
  );
};

export default LogOutButton;