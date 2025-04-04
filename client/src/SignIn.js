import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

const SignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState(''); 
    function handleSubmit(event) {
        event.preventDefault();
        console.log('Submitting email and password:', { email, password }); 
    
        axios.post('http://localhost:4000/signin', { email, password })
            .then(res => {
                console.log('Response:', res);
                const { token, userId } = res.data; 
    
                localStorage.setItem('token', token);
                localStorage.setItem('userId', userId);
    
                navigate('/'); 
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Sign-in failed. Please check your credentials.'); 
            });
    }

    return (
    <div class="waveWrapper">
        <svg width="0" height="0">
            <defs>
                /*need to make the container wavy on the sides!*/
            </defs>
        </svg>
        <div className = 'signInContainer'>
            <div className='signInBox'>
                <div className = 'signInForm'>
                    <form onSubmit={handleSubmit}>
                    <div className = 'signInHeader'>
                    <h2>— Sign In —</h2>
                    </div>
                    <div className = 'signInEmail'>
                    <h1>Email</h1>
                    <input className='signInEmailInput' type="text" placeholder="Enter Email" onChange={ e => setEmail(e.target.value)}/> 
                    </div>
                    <div className='signInPass'>
                    <h1>Password</h1>
                    <input className='signInPasswordInput' type="password" placeholder="Enter Password" onChange={ e => setPassword(e.target.value)}/>
                    </div>
                    <br />
                    <button className='signIn-signButton'>Sign in</button>
                    <br />
                    <div className='signInNoAccount'>
                        Don't have an account?
                        <button className='signInCreateAccountLink' onClick={()=>{navigate('/create-account')}}>Create one!</button>
                    </div>
                    <button className='signInForgotPass'>Forgot password?</button>
                </form>
                </div>
                
            </div>
        </div>
    </div>
    );
};


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default SignIn;