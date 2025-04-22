import './CreateEvent.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '', 
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setPreview(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const user_id = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!user_id || !token) {
      alert('You must be signed in to create an event.');
      return;
    }

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('date', values.date);
    formData.append('startTime', values.startTime);
    formData.append('endTime', values.endTime);
    formData.append('location', values.location);
    formData.append('photo', file); // actual file upload
    formData.append('user_id', user_id);

    axios
      .post('http://localhost:4000/create-event', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
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
              onChange={handleFileChange}
            />
            <label htmlFor="fileInput" className="uploadButton">
              {preview ? (
                <img src={preview} alt="Preview" className="uploadedImage" />
              ) : (
                'Upload Image'
              )}
            </label>
            <div className='inputContainer'>
              <input
                className="eventNameUpload"
                type="text"
                placeholder="Event title..."
                name="title"
                value={values.title}
                onChange={handleChange}
              />
              <p className='subtitle'>* max 100 characters</p>
            </div>
            <div className='inputContainer2'>
              <textarea
                className="eventDescriptionUpload"
                placeholder="Event description..."
                name="description"
                value={values.description}
                onChange={handleChange}
                rows={6}
              />
              <p className='subtitle'>* max 500 characters</p>
            </div>
          </div>
          <div className="rightBox">
            <div className="trackingInput">
              <input
                className="dateInput"
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
              />
              <div className="timeInput">
                <input
                  className="timeInputStart"
                  type="time"
                  name="startTime"
                  value={values.startTime}
                  onChange={handleChange}
                />
                <br />
                <input
                  className="timeInputEnd"
                  type="time"
                  name="endTime"
                  value={values.endTime}
                  onChange={handleChange}
                />
              </div>
              <div className='topBorder'>
                <input
                  className="locationInput"
                  type="text"
                  placeholder="Event location..."
                  name="location"
                  value={values.location}
                  onChange={handleChange}
                />
                <p className='subtitle'>* max 100 characters</p>
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
