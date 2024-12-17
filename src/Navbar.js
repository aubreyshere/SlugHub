import React from 'react';
import './Navbar.css';   // to alter the appearance of Navbar.js program

const Navbar = () => {
    return (
        <nav className='navbar'>
            <ul className='nav-links'>
                <li>
                    <a href='/'>Home</a>
                </li>
                <li>
                    <a href='/create-event'>Create an Event</a>
                </li>
                <li>
                    <a href='/profile'>Profile</a>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;