import React, { useState } from 'react';
import './CreateAccount.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '', 
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting values:', values);  // Debug

    if (values.password !== values.confirmPassword) {
      console.error('Passwords do not match!');
      return;  
    }

    axios
      .post('http://localhost:4000/signup', values)
      .then((res) => {
        console.log('Registered successfully');
        navigate('/sign-in');
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  return (
    <div class="SignUpWaveWrapper">
    <svg width="0" height="0">
        <defs>
            /*need to make the container wavy on the sides!*/
        </defs>
    </svg>
    
    <div className='container'>
      <div className='signUpBox'>
        <div className='signUpHeader'>
          <h2>Create Account</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='email'>
            <h1>Email</h1>
            <input
              className='emailInput'
              type='text'
              placeholder='Enter Email'
              name='email'
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div className='username'>
            <h1>Username</h1>
            <input
              className='usernameInput'
              type='text'
              placeholder='Enter Username'
              name='username'
              value={values.username}
              onChange={handleChange}
            />
          </div>
          <div className='pass'>
            <h1>Password</h1>
            <input
              className='passwordInput'
              type='password'
              placeholder='Enter Password'
              name='pass'
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div className='passConfirm'>
            <h1>Confirm Password</h1>
            <input
              className='passwordConfirmInput'
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <br />
          <button className='createAccount-signButton'>Sign Up</button>
          <br />
          <div className='noAccount'>
            Have an account?
            <button className='createAccountLink' onClick={() => { navigate('/sign-in'); }}>
              Login here!
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  );
};

export default CreateAccount;