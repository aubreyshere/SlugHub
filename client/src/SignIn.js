import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignIn = ({ setIsLoggedIn }) => { 
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Submitting email and password:', { email, password }); 
    
        axios.post('http://localhost:4000/signin', { email, password })
            .then(res => {
                console.log('Response:', res);
                const { token, userId } = res.data; 
    
                // Save token and userId in localStorage
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);

                // Update the login state
                setIsLoggedIn(true);

                // Redirect to the homepage
                navigate('/');
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Sign-in failed. Please check your credentials.'); 
            });
    }

    return (
        <div className="signInPage">
            <div className="signInContainer">
                <div className="signInBox">
                        <form className="signInForm" onSubmit={handleSubmit}>
                            <div className="accountHeader">
                                <h2>- Sign In -</h2>
                            </div>
                            <div className="signInEmail">
                                <h1>Email</h1>
                                <input
                                    className="signInEmailInput"
                                    type="text"
                                    placeholder="Enter Email"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="signInPass">
                                <h1>Password</h1>
                                <input
                                    className="accountInput"
                                    type="password"
                                    placeholder="Enter Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <button className="accountButton">Sign in</button>
                        </form>
                        <div className="signInNoAccount">
                                Don't have an account?
                                <button
                                    className="signInCreateAccountLink"
                                    onClick={() => navigate('/create-account')}
                                >
                                    Create one!
                                </button>
                            </div>
                            <button className="signInForgotPass">Forgot password?</button>
                        </div>
                    </div>
                </div>
    );
};

export default SignIn;