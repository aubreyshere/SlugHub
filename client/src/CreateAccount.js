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
    console.log('Submitting values:', values); 

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
    <div class="signUpPage">
    <div className='signInContainer'>
      <div className='signUpBox'>
        <div className='accountHeader'>
          <h2>- Create Account -</h2>
        </div>
        <form className='signInForm' onSubmit={handleSubmit}>
          <div>
            <h1>Email</h1>
            <input
              className='accountInput'
              type='text'
              placeholder='Enter Email'
              name='email'
              value={values.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <h1>Username</h1>
            <input
              className='accountInput'
              type='text'
              placeholder='Enter Username'
              name='username'
              value={values.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <h1>Password</h1>
            <input
              className='accountInput'
              type='password'
              placeholder='Enter Password'
              name='pass'
              value={values.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <h1>Confirm Password</h1>
            <input
              className='accountInput'
              type='password'
              placeholder='Confirm Password'
              name='confirmPassword'
              value={values.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <button className='accountButton'>Sign Up</button>
        </form>
        <div className='signInNoAccount'>
            Have an account?
            <button className='createAccountLink' onClick={() => { navigate('/sign-in'); }}>
              Login here!
            </button>
          </div>
      </div>
    </div>
  </div>
  );
};

export default CreateAccount;