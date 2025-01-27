import React, { useState } from 'react';
import './SignIn.css';
import { useNavigate } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';



const SignIn = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState(''); // add this
    const [password, setPassword] = useState(''); // add this
    function handleSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:4000/users', {email, password}).then(res => console.log(res)).catch(err => console.log(err));
    }

    return (

        <div className = 'container'>
            <div className='signInBox'>
                <form onSubmit={handleSubmit}>
                    <div className = 'user'>
                    <h1>Email</h1>
                    <input className='usernameInput' type="text" placeholder="Enter Email" onChange={ e => setEmail(e.target.value)}/> 
                    </div>
                    <div className='pass'>
                    <h1>Password</h1>
                    <input className='passwordInput' type="password" placeholder="Enter Password" onChange={ e => setPassword(e.target.value)}/>
                    </div>
                    <br />
                    <button className='signButton'>Sign in</button>
                    <br />
                    <div className='noAccount'>
                        Don't have an account?
                        <button className='createAccountLink' onClick={()=>{navigate('/create-account')}}>Create one!</button>
                    </div>
                    <button className='forgotPass'>forgot password?</button>
                </form>
            </div>
        </div>
    );
};


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default SignIn;