import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Navbar from './Navbar';
import SignIn from './SignIn';
import Homepage from './Homepage';
import CreateEvent from './CreateEvent';
import CreateAccount from './CreateAccount';
import EventPage from './EventPage';
import ProtectedRoute from './ProtectedRoute'; 
import SearchPage from './SearchPage';
import Profile from './Profile';
import Footer from './Footer'; 

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') !== null);

    // Update `isLoggedIn` when the token changes in localStorage
    useEffect(() => {
        const handleStorageChange = () => {
            setIsLoggedIn(localStorage.getItem('token') !== null);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <BrowserRouter>
            <div>
                <Navbar loggedIn={isLoggedIn} setLoggedIn={setIsLoggedIn} />
            </div>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/sign-in" element={<SignIn setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/event/:eventId" element={<EventPage />} />
                <Route path="/search" element={<SearchPage />} />
                {/* Protected Routes */}
                <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
                </Route>
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};

root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();