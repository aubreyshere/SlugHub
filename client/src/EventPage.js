import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventPage.css';
import Loading from './Loading';

const EventPage = () => {
    const { eventId } = useParams(); 
    const [event, setEvent] = useState(null);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const defaultImage = "/images/location_on.jpg";

    const fetchUserById = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4000/user/${userId}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('User not found');
                } else {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error; 
        }
    };
    
    const fetchEventById = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:4000/event/${eventId}`);
            
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Event not found');
                } else {
                    throw new Error(`Error: ${response.status} - ${response.statusText}`);
                }
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching event:', error);
            throw error; 
        }
    };
    
    useEffect(() => {
        if (!eventId) {
            setError('Invalid event ID');
            setLoading(false);
            return;
        }

        fetchEventById(eventId)
            .then(async (eventData) => {
                setEvent(eventData);

                if (eventData.user_id) {
                    try {
                        const userData = await fetchUserById(eventData.user_id);
                        setUser(userData);
                    } catch (error) {
                        console.error('Failed to fetch user:', error);
                        setUser(null); 
                    }
                }
            })
            .catch(error => {
                setError(error.message || 'Failed to fetch event');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [eventId]);

    if (loading) {
        return <div><Loading/></div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!event) {
        return <div>Event not found.</div>;
    }

    return (
        <div className="eventPage">
            <div className="eventBox">
                <div className="leftEventBox">
                <img 
                    className='eventImagePage' 
                    src={event?.photo || defaultImage} 
                    alt={event?.title || "Event image"} 
                />
                    <h1 className='eventTitlePage'>{event.title || 'Untitled Event'}</h1>
                    <p className='eventDescriptionPage'>{event.description || 'No description available.'}</p>
                </div>
                <div className="rightEventBox">
                    <div className='userProfile'>
                        <p>Hosted by: {user ? user.username : 'User not found'}</p>
                    </div>
                    <p className='eventDayPage'>Date: {event.date || 'Not specified'}</p>
                    <p className='eventTimePage'>Time: {event.startTime || 'Not specified'} - {event.endTime || 'Not specified'}</p>
                    <p className='eventLocationPage'>Location: {event.location || 'Not specified'}</p>
                </div>
            </div>
        </div>
    );
};

export default EventPage;