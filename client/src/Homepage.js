import React from 'react';
import './Homepage.css';
import reportWebVitals from './reportWebVitals';
import SearchBar from './searchBar';

const Homepage = () => {
    return (
        <div>
                <div>
                    <SearchBar />
                    <h1>Recommended</h1>
                </div>
        </div>
    );
};


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
export default Homepage;