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
    user_id: '',
  });

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Submitting values:', values); // Debugging log

    const user_id = localStorage.getItem('user_id'); // Get user_id from localStorage
    if (!user_id) {
      console.error('User ID is missing');
      return;
    }

    if (!values.title || !values.description || !values.date || !values.location) {
      console.error('Required fields are missing');
      return;
    }

    const requestBody = { ...values, user_id };

    axios
      .post('http://localhost:4000/create-event', requestBody)
      .then((res) => {
        console.log('Event created successfully');
        navigate('/');
      })
      .catch((err) => {
        console.error('Error:', err.response?.data || err.message);
      });
  };

  return (
    <div className="createPage">
      <div className="createBox">
        <form className="infoFill" onSubmit={handleSubmit}>
          <div className="leftBox">
            {/* File input for image upload (hidden) */}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              name="photo"
              style={{ display: 'none' }} // Hide the file input
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
            {/* Custom upload button or image preview */}
            <label htmlFor="fileInput" className="uploadButton">
              {values.photo ? (
                <img
                  src={values.photo}
                  alt="Preview"
                  className="uploadedImage"
                />
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