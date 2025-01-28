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
    confirmPassword: '',  // Added confirmPassword
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting values:', values);  // Debugging log

    if (values.password !== values.confirmPassword) {
      console.error('Passwords do not match!');
      return;  // Prevent submission if passwords do not match
    }

    axios
      .post('http://localhost:4000/signup', values)
      .then((res) => {
        console.log('Registered successfully');
        // Optionally redirect to login page after successful registration
        navigate('/sign-in');
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  };

  return (
    <div className='container'>
      <div className='signInBox'>
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
          <div className='email'>
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
              name='password'
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div className='passConfirm'>
            <h1>Confirm Password</h1>
            <input
              className='passwordInput'
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <br />
          <button className='signButton'>Create Account</button>
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
  );
};

export default CreateAccount;