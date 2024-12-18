import React from 'react';
import './SignIn.css';
import reportWebVitals from './reportWebVitals';
import Navbar from './Navbar';

const SignIn = () => {
    var loggedIn = false;
    return (
        <div>
            <div className='signInBox'>
                <h1>Email or Username</h1>
                <input type="text" />
                <h2>Password</h2>
                <input type="password" />
            </div>
        </div>
    );
};


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default SignIn;