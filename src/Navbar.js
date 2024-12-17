import React from 'react';
import './Navbar.css';   // to alter the appearance of Navbar.js program

const Navbar = (props) => {
    return (
        <nav className='navbar'>
            <ul className='nav-links'>
                <li>
                    <a href='/'>Home</a>
                </li>
                <li>
                    {props.loggedIn === true ? <a href='/create-event'>Create an Event</a> : <a href='/sign-in'>Create an Event</a>}
                </li>
                <li>
                    {props.loggedIn === true ? <a href='/profile'>Profile</a> : <a href='/sign-in'>Profile</a>}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;