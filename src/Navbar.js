import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';   // to alter the appearance of Navbar.js program

const Navbar = (props) => {
    const navigate = useNavigate();

    return (
        <nav className='navbar'>
            <ul className='nav-links'>
                <li>
                    <button onClick = {()=>{navigate('/')}}>Home</button>
                </li>
                <li>
                    {props.loggedIn === true ? <button onClick = {()=>{navigate('/create-event')}}>Create Event</button> : <button onClick = {()=>{navigate('/sign-in')}}>Create Event</button>}
                </li>
                <li>
                {props.loggedIn === true ? <button onClick = {()=>{navigate('/profile')}}>Profile</button> : <button onClick = {()=>{navigate('/sign-in')}}>Profile</button>}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;