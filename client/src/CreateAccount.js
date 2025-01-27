import React from 'react';
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';


const CreateAccount = () => {
     const navigate = useNavigate();

    return (
        <div className = 'container'>
            <div className='signInBox'>
                <form>
                <div className = 'email'>
                    <h1>Email</h1>
                    <input className='emailInput' type="text" placeholder="Enter Email" /> 
                    </div>
                    <div className = 'email'>
                    <h1>Username</h1>
                    <input className='usernameInput' type="text" placeholder="Enter Username" /> 
                    </div>
                    <div className='pass'>
                    <h1>Password</h1>
                    <input className='passwordInput' type="password" placeholder="Enter Password" />
                    </div>
                    <div className='passConfirm'>
                    <h1>Confirm Password</h1>
                    <input className='passwordInput' type="password" placeholder="Enter Password"/>
                    </div>
                    <br />
                    <button className='signButton'>Create Account</button>
                    <br />
                    <div className='noAccount'>
                        Have an account?
                        <button className='createAccountLink' onClick={()=>{navigate('/sign-in')}}>Login here!</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
  };
  
  export default CreateAccount;