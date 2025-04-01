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

    const RecommendedHeader = () => (
        <div className="wavy-header-container">
        {/* wavyyyyy */}
        <svg style={{ position: 'absolute', height: 0 }}>
            <defs>
            <filter id="dropShadowAbove" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dy="-3" result="offsetblur"/>
                <feFlood floodColor="rgba(0,0,0,0.3)"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            <filter id="dropShadowBelow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                <feOffset dy="3" result="offsetblur"/>
                <feFlood floodColor="rgba(0,0,0,0.3)"/>
                <feComposite in2="offsetblur" operator="in"/>
                <feMerge>
                <feMergeNode/>
                <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
            </defs>
        </svg>
        
        <svg className="wave-overlap-top" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path 
            d="M0,40 C150,0 300,40 450,20 C600,0 750,20 900,30 C1050,40 1200,10 1200,10 L1200,40 L0,40 Z" 
            fill="#F0C419"
            filter="url(#dropShadowAbove)"
            />
        </svg>
        
        <div className="wavy-content">
            <h1 className='recommendedText'>Recommended</h1>
        </div>
        
        <svg className="wave-bottom" viewBox="0 0 1200 40" preserveAspectRatio="none">
            <path 
            d="M0,10 C200,30 300,-5 500,25 C700,5 800,35 1000,15 C1100,5 1150,25 1200,15 L1200,0 L0,0 Z"  
            fill="#F0C419"
            filter="url(#dropShadowBelow)"
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
                <div className="loading">Loading events...</div>
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
                    <div className="noEvents">No events available</div>
                )}
            </div>
        </div>
    );
};

export default Homepage;