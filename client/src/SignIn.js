import React from 'react';
import './SignIn.css';
import reportWebVitals from './reportWebVitals';

const SignIn = () => {
    return (

        <div className = 'container'>
            <div className='signInBox'>
                <div className = 'user'>
                <h1>Email or Username</h1>
                <input className='usernameInput' type="text" />
                </div>
                <div className='pass'>
                <h1>Password</h1>
                <input className='passwordInput' type="password" />
                </div>
                <br />
                <button className='signButton'>Sign in</button>
                <br />
                <button className='forgotPass'>forgot password?</button>
            </div>
        </div>
    );
};


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default SignIn;