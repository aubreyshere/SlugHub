import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from './Navbar';

const root = ReactDOM.createRoot(document.getElementById('root'));

const navigationBar = (
    <div>
        <Navbar />
        <h1>Hello everybody my name is Welcome</h1>
    </div>
);

root.render(navigationBar);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
