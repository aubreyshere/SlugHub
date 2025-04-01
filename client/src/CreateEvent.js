import './CreateEvent.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: '',
    description: '',
    photo: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '', 
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting values:', values);

    const user_id = localStorage.getItem('userId');
    if (!user_id) {
      console.error('User ID is missing');
      alert('You must be signed in to create an event.');
      return;
    }

    if (!values.title || !values.description || !values.date || !values.location) {
      console.error('Required fields are missing');
      alert('Please fill in all required fields.');
      return;
    }

    const requestBody = { ...values, user_id };
    console.log('Request Body:', requestBody);

    const token = localStorage.getItem('token');

    axios
      .post('http://localhost:4000/create-event', requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('Event created successfully');
        navigate('/');
      })
      .catch((err) => {
        console.error('Error:', err.response?.data || err.message);
        alert('Failed to create event. Please try again.');
      });
  };

  return (
    <div className="createPage">
      <div className="createBox">
        <form className="infoFill" onSubmit={handleSubmit}>
          <div className="leftBox">
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              name="photo"
              style={{ display: 'none' }}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    setValues({ ...values, photo: event.target.result });
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <label htmlFor="fileInput" className="uploadButton">
              {values.photo ? (
                <img src={values.photo} alt="Preview" className="uploadedImage" />
              ) : (
                'Upload Image'
              )}
            </label>
            <br />
            <input
              className="eventNameUpload"
              type="text"
              placeholder="Event title..."
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            <br />
            <input
              className="eventDescriptionUpload"
              type="text"
              placeholder="Event description..."
              name="description"
              value={values.description}
              onChange={handleChange}
            />
          </div>
          <div className="rightBox">
            <div className="trackingInput">
              <div className="dateInput">
                <input
                  className="dateInput"
                  type="date"
                  placeholder="mm-dd-yyyy"
                  name="date"
                  value={values.date}
                  onChange={handleChange}
                />
              </div>
              <div className="timeInput">
                <input
                  className="timeInputStart"
                  type="time"
                  placeholder="00:00"
                  name="startTime"
                  value={values.startTime}
                  onChange={handleChange}
                />
                <input
                  className="timeInputEnd"
                  type="time"
                  placeholder="00:00"
                  name="endTime"
                  value={values.endTime}
                  onChange={handleChange}
                />
            </div>
              <input
                className="locationInput"
                type="text"
                placeholder="Event location..."
                name="location"
                value={values.location}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="postEvent">
              Post Event!
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;