import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';   // to alter the appearance of Navbar.js program

const Navbar = (props) => {
    const navigate = useNavigate();

    return (
        <nav className='navbar'>
            <ul className='nav-links'>
                <button className = 'buttonNav' onClick = {()=>{navigate('/')}}>Home</button>
                {props.loggedIn === true ? <button className = 'buttonNav' onClick = {()=>{navigate('/create-event')}}>Create Event</button> : <button className = 'buttonNav' onClick = {()=>{navigate('/sign-in')}}>Create Event</button>}
                {props.loggedIn === true ? <button className = 'buttonNav' onClick = {()=>{navigate('/profile')}}>Profile</button> : <button className = 'buttonNav' onClick = {()=>{navigate('/sign-in')}}>Profile</button>}
            </ul>
        </nav>
    );
}

export default Navbar;