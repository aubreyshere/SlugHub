import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from './Navbar';
import SignIn from './SignIn'; 
import Homepage from './Homepage'
import CreateEvent from './CreateEvent'
import CreateAccount from './CreateAccount'
import EventPage from './EventPage';


var loggedIn = true; // default for now
const root = ReactDOM.createRoot(document.getElementById('root'));

const pages = (
    <BrowserRouter>
    <div>
        <Navbar loggedIn = {loggedIn}/> {/*outside of routes so its shown on all pages */}
    </div>
        <Routes> {/*the routes show the file that will be loaded on each page*/}
            <Route path="/" element={<Homepage />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/event/:eventId" element={<EventPage />} />
        </Routes>
    </BrowserRouter>
);

root.render(pages);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
