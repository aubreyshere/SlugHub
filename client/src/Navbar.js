import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ loggedIn, setLoggedIn }) => {
    const navigate = useNavigate();

    return (
        <nav className='navbar'>
            <ul className='nav-links'>
                <button className='buttonNav' onClick={() => navigate('/')}>Home</button>
                <button
                    className='buttonNav'
                    onClick={() => navigate(loggedIn ? '/create-event' : '/sign-in')}
                >
                    Create Event
                </button>
                <button
                    className='buttonNav'
                    onClick={() => navigate(loggedIn ? '/profile' : '/sign-in')}
                >
                    Profile
                </button>
            </ul>
        </nav>
    );
};

export default Navbar;