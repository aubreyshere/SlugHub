import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
const navigationBar = (
    <div className='nav'>
        <button className='homepage'>Homepage</button>
        <button className='createEvent'>Create Event</button>
        <button className='profile'>Profile</button>
        mrow
    </div>
);
root.render(navigationBar);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
