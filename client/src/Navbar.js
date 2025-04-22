import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ loggedIn, setLoggedIn }) => {
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(prev => !prev);
    };

    return (
        <div className="navBarContainer">
            <nav className="navbar">
                <div className="logoNav">
                    <img className="logoImage" alt="logoImage" src="/images/Slug-No-Background-Clip-Art.png" />
                    SlugHub
                </div>
                <button className="menu-toggle" onClick={toggleMenu}>☰
                <ul className={`nav-links ${menuOpen ? 'show' : ''}`}>
                    <button className="buttonNav" onClick={() => { navigate('/'); setMenuOpen(false); }}>
                        <img src="/images/Home.png" alt="homeNav" />
                    </button>
                    <button
                        className="buttonNav"
                        onClick={() => {
                            navigate(loggedIn ? '/create-event' : '/sign-in');
                            setMenuOpen(false);
                        }}
                    >
                        <img src="/images/Plus.png" alt="createNav" />
                    </button>
                    <button
                        className="buttonNav"
                        onClick={() => {
                            navigate(loggedIn ? '/profile' : '/sign-in');
                            setMenuOpen(false);
                        }}
                    >
                        <img src="/images/settings.png" alt="profileNav" />
                    </button>
                </ul>
                </button>

            </nav>

            {/* waveeee */}
            <svg 
                className="nav-wave" 
                viewBox="0 10 1200 110" 
                preserveAspectRatio="none"
            >
                <defs>
                    <filter id="blurFilter">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                    </filter>
                </defs>
                <path 
                    d="M0,0V25c47.79,12,103.59,18,158,15,70.36-3,136.33-18,206.8-20C438.64,17,512.34,28,583,38c69.27,10,138.3,13,209.4,7,36.15-3,69.85-10,104.45-16C989.49,14,1113-8,1200,28V0Z"
                    fill="#000"
                    filter="url(#strongShadow)"
                    opacity="0.3"
                    transform="translate(0, 4) scale(1.02, 1)"
                />
                <path 
                    d="M0,0V25c47.79,12,103.59,18,158,15,70.36-3,136.33-18,206.8-20C438.64,17,512.34,28,583,38c69.27,10,138.3,13,209.4,7,36.15-3,69.85-10,104.45-16C989.49,14,1113-8,1200,28V0Z" 
                    fill="#163785"
                />
            </svg>
        </div>   
    );
};

export default Navbar;
