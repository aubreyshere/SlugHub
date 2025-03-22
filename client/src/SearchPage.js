import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import EventPreview from './EventPreview';
import { useLocation } from 'react-router-dom';

const SearchPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get the search query from the URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || '';

  // Fetch events based on the search query
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:4000/search?q=${searchQuery}`);
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [searchQuery]); // Re-fetch events when the search query changes

  return (
    <div className="searchPage">
      <div className="resultBox">
        <h1>Results for "{searchQuery}":</h1>
        {isLoading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : events.length > 0 ? (
          <div className="eventResults">
            {events.map((event) => (
              <EventPreview key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="noEvents">No events found</div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;