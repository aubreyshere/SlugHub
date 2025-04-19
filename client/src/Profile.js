import React, { useState, useEffect } from 'react';
import './Profile.css';
import EventPreview from './EventPreview'; // Import the EventPreview component
import LogOutButton from "./LogOutButton";

const Profile = ({ setIsLoggedIn }) => { // Accept setIsLoggedIn as a prop
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]); // State for user events
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found. Please log in.');
        }

        // Fetch user data
        const userResponse = await fetch('http://localhost:4000/api/user', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!userResponse.ok) throw new Error('Failed to fetch user data');
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch user events
        const eventsResponse = await fetch('http://localhost:4000/api/user/events', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!eventsResponse.ok) throw new Error('Failed to fetch user events');
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="profileBox">
      <h2>Profile Information</h2>
      <div className="leftProfileBox">
        <div>
        {user ? (
          <>
            <p className="usernameDisplay">
              <strong>Username:</strong> {user.username}
            </p>
            <p className="emailDisplay">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="passwordDisplay">
              <strong>Password:</strong> ********
            </p>
          </>
        ) : (
          <p>No user data available.</p>
        )}
        </div>
        <div className='logOutBox'>
        <LogOutButton setIsLoggedIn={setIsLoggedIn} /> {/* Pass setIsLoggedIn */}
        </div>
      </div>
      <h2>Active Events</h2>
      <div className="rightProfileBox">
        <div className="activeEvents">
          {events.length > 0 ? (
            <div className="eventsList">
              {events.map((event) => (
                <EventPreview key={event.id} event={event} /> 
              ))}
            </div>
          ) : (
            <p>No active events at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;