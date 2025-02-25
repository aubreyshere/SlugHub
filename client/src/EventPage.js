import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './EventPage.css';

const EventPage = () => {
    const { eventId } = useParams(); 
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchEventById = async (eventId) => {
        try {
            const response = await fetch(`http://localhost:4000/event/${eventId}`);
            
            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching event:', error);
            throw error; 
        }
    };
    
    useEffect(() => {
        const numericEventId = parseInt(eventId, 10);
        
        if (isNaN(numericEventId)) {
            console.error('Invalid event ID');
            setLoading(false);
            return;
        }

        fetchEventById(numericEventId)
            .then(data => {
                setEvent(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching event:', error);
                setLoading(false);
            });
    }, [eventId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!event) {
        return <div>Event not found.</div>;
    }

    return (
        <div className="eventPage">
            <div className="eventBox">
                <div className="leftEventBox">
                    <img className='eventPageImage' src={event.photo} alt={event.title} />
                    <h1 className='eventTitle'>{event.title}</h1>
                    <p className='eventDescription'>{event.description}</p>
                </div>
                <div className="rightEventBox">
                    <div className='userProfile'>
                        <p>Hosted by: User {event.user_id}</p>
                    </div>
                    <p className='eventDay'>Date: {event.date}</p>
                    <p className='eventTime'>Time: {event.startTime} - {event.endTime}</p>
                </div>
            </div>
        </div>
    );
};

export default EventPage;
