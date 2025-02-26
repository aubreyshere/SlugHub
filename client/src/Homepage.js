import React, { useEffect, useState } from 'react';
import './Homepage.css';
import SearchBar from './searchBar'; 
import EventPreview from './EventPreview';

const Homepage = () => {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch('http://localhost:4000/events');
                
                if (!response.ok) {
                    throw new Error('Failed to fetch events');
                }
                
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    if (isLoading) {
        return (
            <div className="homepage">
                <div className="header">
                    <SearchBar />
                    <h1>Recommended</h1>
                </div>
                <div className="loading">Loading events...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="homepage">
                <div className="header">
                    <SearchBar />
                    <h1>Recommended</h1>
                </div>
                <div className="error">
                    <p>Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="homepage">
            <div className="header">
                <SearchBar />
                <h1>Recommended</h1>
            </div>
            <div className="eventsContainer">
                {events.length > 0 ? (
                    events.map(event => (
                        <EventPreview key={event.id} event={event} />
                    ))
                ) : (
                    <div className="noEvents">No events available</div>
                )}
            </div>
        </div>
    );
};

export default Homepage;