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
      alert('Passwords do not match!');
      return;
    }
  
    // Client-side validation
    if (!values.email || !values.username || !values.password || !values.confirmPassword) {
      alert('Please fill in all fields.');
      return;
    }
  
    if (values.password.length < 8) {
      alert('Password must be at least 8 characters long.');
      return;
    }
  
    axios
      .post('http://localhost:4000/signup', values)
      .then((res) => {
        console.log('Registered successfully');
        alert('Signup successful! Please verify your email before logging in.');
        navigate('/sign-in');
      })
      .catch((err) => {
        console.error('Error:', err);
        if (err.response?.data?.message) {
          alert(err.response.data.message);
        }
      });
  };
  

  return (
    <div className="signUpPage">
      <div className="signInContainer">
        <div className="signUpBox">
          <div className="accountHeader">
            <h2>- Create Account -</h2>
          </div>
          <form className="signInForm" onSubmit={handleSubmit}>
            <div>
              <h1>Email</h1>
              <input
                className="accountInput"
                type="email"
                placeholder="Enter Email"
                name="email"
                value={values.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <h1>Username</h1>
              <input
                className="accountInput"
                type="text"
                placeholder="Enter Username"
                name="username"
                value={values.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <h1>Password</h1>
              <input
                className="accountInput"
                type="password"
                placeholder="Enter Password"
                name="password"  
                value={values.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <h1>Confirm Password</h1>
              <input
                className="accountInput"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <button className="accountButton">Sign Up</button>
          </form>
          <div className="signInNoAccount">
            Have an account?
            <button className="createAccountLink" onClick={() => { navigate('/sign-in'); }}>
              Login here!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
