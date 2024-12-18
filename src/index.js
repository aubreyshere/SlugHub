import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from './Navbar';
import SearchBar from './searchBar';
import SignIn from './SignIn'; 


var loggedIn = false;
const root = ReactDOM.createRoot(document.getElementById('root'));

const navigationBar = (
    <BrowserRouter>
    <div>
        <Navbar loggedIn = {loggedIn}/>
    </div>
        <Routes>
            <Route path="/" element={(
                <div>
                    <SearchBar />
                    <h1>Recommended</h1>
                </div>)
            } />
            <Route path="/sign-in" element={<SignIn />} />
        </Routes>
    </BrowserRouter>
);

root.render(navigationBar);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
