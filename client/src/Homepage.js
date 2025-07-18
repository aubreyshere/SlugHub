import React, { useEffect, useState } from 'react';
import './Homepage.css';
import SearchBar from './searchBar'; 
import EventPreview from './EventPreview';
import Loading from './Loading';

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
                // filter the events shown
                const now = new Date();
                const upcomingEvents = data
                    .filter(event => new Date(event.date) > now)
                    .sort((a, b) => new Date(a.date) - new Date(b.date)); 
                setEvents(upcomingEvents);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const RecommendedHeader = () => (
        <div className="wavy-header-container">
        {/* wavyyyyy */}
        <svg style={{ position: 'absolute', height: 0 }}>
            <defs>
            <filter id="dropShadowAbove" x="-20%" y="-40%" width="140%" height="140%">
                <feDropShadow dx="0" dy="-3" stdDeviation="3" flood-color="rgba(0,0,0,0.3)" />
                </filter>

                <filter id="dropShadowBelow" x="-20%" y="40%" width="140%" height="140%">
                <feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="rgba(0,0,0,0.3)" />
                </filter>
            </defs>
        </svg>
        
        <svg className="wave-overlap-top" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path 
            d="M0,40 C150,0 300,40 450,20 C600,0 750,20 900,30 C1050,40 1200,10 1200,10 L1200,40 L0,40 Z" 
            fill="#F0C419"
            filter="url(#dropShadowAbove)"
            transform="translate(0, -9)"
            />
        </svg>
        
        <div className="wavy-content">
            <h1 className='recommendedText'>Upcoming Events</h1>
        </div>
        
        <svg className="wave-bottom" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path 
            d="M0,10 C200,30 300,-5 500,25 C700,5 800,35 1000,15 C1100,5 1150,25 1200,15 L1200,0 L0,0 Z"  
            fill="#F0C419"
            filter="url(#dropShadowBelow)"
            transform="translate(0, 10)"
            />
        </svg>
        </div>
      );

    if (isLoading) {
        return (
            <div className="homepage">
                <div className="header">
                    <SearchBar />
                    <RecommendedHeader />
                </div>
                <Loading />
            </div>
        );
    }

    if (error) {
        return (
            <div className="homepage">
                <div className="header">
                    <SearchBar />
                    <RecommendedHeader />
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
                <RecommendedHeader />
            </div>
            <div className="eventsContainer">
                {events.length > 0 ? (
                    events.map(event => (
                        <EventPreview key={event.id} event={event} />
                    ))
                ) : (
                    <div className="noEvents">No upcoming events available</div>
                )}
            </div>
        </div>
    );
};

export default Homepage;