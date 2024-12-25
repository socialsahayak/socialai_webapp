import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EditProfile = () => {
  const [userProfile, setUserProfile] = useState({ username: '', email: '' });
  const [updatedProfile, setUpdatedProfile] = useState({ username: '', email: '' });

  // Fetch the user's current profile data
  useEffect(() => {
    axios.get('http://localhost:5000/api/user/info', { withCredentials: true })
      .then(response => {
        setUserProfile(response.data);
        setUpdatedProfile(response.data); // Prepopulate the form with current data
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile({ ...updatedProfile, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('http://localhost:5000/api/user/edit-profile', updatedProfile, { withCredentials: true })
      .then(response => {
        alert('Profile updated successfully');
        setUserProfile(updatedProfile); // Update the UI with the latest profile
      })
      .catch(error => {
        console.error('Error updating profile:', error);
      });
  };

  return (
    <div className="settings-section">
      <h4>Edit Profile</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={updatedProfile.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={updatedProfile.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default EditProfile;