import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Wavy SVG Top */}
      <div className="footer-wave">
        <svg viewBox="0 0 1440 150" preserveAspectRatio="none">
        <path
          d="M0,80 C480,160 960,0 1440,80 L1440,0 L0,0 Z"
          fill="#163785"
          transform="rotate(180, 720, 75) translate(0, -20)"
        />
        </svg>
      </div>
      <div className="footer-content">
        <p>Connect our discord bot to your server!</p>
        <p>Have feedback or questions? Contact us here!</p>
      </div>
    </footer>
  );
};

export default Footer;
