import React from "react";
import { useNavigate } from "react-router-dom";  // For redirecting after logout
import "./LogOutButton.css";

const LogOutButton = ({ setIsLoggedIn }) => { // Accept setIsLoggedIn as a prop
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove JWT token
    setIsLoggedIn(false);  // Update the login state
    navigate("/sign-in");  // Redirect to sign-in page
  };

  return (
    <button onClick={handleLogout} className="button">
      <p>
        Log Out
      </p>
    </button>
  );
};

export default LogOutButton;