import React, { useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../App'; // Import UserContext

const EditProfile = () => {
  const [username, setUsername] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { handleProfileUpdate } = useContext(UserContext); // Get profile update function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:5000/api/user/edit-profile', 
        { username },
        { withCredentials: true }
      );
      
      if (response.status === 200) {
        // Update profile in the context
        handleProfileUpdate(response.data);

        // Show success message
        setSuccessMessage('Profile updated successfully!');
        
        // After 2 seconds, refresh the page
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">Update</button>
      </form>

      {/* Display success message if profile update was successful */}
      {successMessage && (
        <div style={{ marginTop: '10px', color: 'green' }}>
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default EditProfile;
