import React from 'react';
import './EventPreview.css';
import { useNavigate } from 'react-router-dom';

const EventPreview = ({ event }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/event/${event?.id}`);
    };

    const defaultImage = "images/location_on.jpg";

    const formattedDate = event?.date ? new Date(event?.date).toLocaleDateString() : "Date not available";

    return (
        <div className='previewContainer'>
            <button className='eventAdvertisement' onClick={handleClick}>
                <div className='imageHolder'>
                    <img 
                        className='eventImage' 
                        src={event?.photo || defaultImage} 
                        alt={event?.title || "Event image"} 
                    />
                </div>
                <div className='eventInfo'>
                    <div className='topInfo'>
                        <h1 className='eventTitle'>{event?.title || "No title available"}</h1>
                        <p className='eventDate'>{formattedDate}</p>
                    </div>
                    <div className='bottomInfo'>
                        <p className='eventDescription'>{event?.description || "No description available"}</p>
                        <p className='eventLocation'>{event?.location || "Location not available"}</p>
                        <p className='moreInfo'>click for more info...</p>
                    </div>
                </div>
            </button>
        </div>
    );
};

export default EventPreview;