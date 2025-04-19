import React, { useState, useEffect } from 'react';
import './SearchPage.css';
import EventPreview from './EventPreview';
import { useLocation, useNavigate } from 'react-router-dom';
import SearchBar from './searchBar'; 

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(query);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:4000/search?q=${query}`);
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
  }, [query]); 

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="searchPage">
      <div className="searchPageBox">
      <div className="topBoxResults">
        <h1>Top results for "{query}":</h1>
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <img className="search-icon" src="/images/search-icon-png-21.png" alt="searchIcon" />
          </button>
        </form>
      </div>
      <div className="resultBox">
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
    </div>
  );
};

export default SearchPage;
