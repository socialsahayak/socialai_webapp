import React, { useState } from 'react';
import { Container, ListGroup, ListGroupItem, Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './Settings.css';
import EditProfile from './EditProfile'; // Import the EditProfile component

const Settings = () => {
  const [activeSection, setActiveSection] = useState(null); // State to track active section
  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false); // Modal for delete account
  const [theme, setTheme] = useState('system'); // Theme state
  const navigate = useNavigate(); // React Router navigate function

  const handleButtonClick = (section) => {
    // Toggles the section on click
    setActiveSection(activeSection === section ? null : section);
  };

  // Handle theme toggle
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme === 'dark' ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', newTheme);
  };

  // Placeholder function for upgrading account
  const handleUpgrade = () => {
    alert('Upgrade feature coming soon!');
  };

  // Handle delete all chats with axios
  const handleDeleteAllChats = async () => {
    try {
      const response = await axios.delete('/api/delete-all-chats');

      if (response.status === 200) {
        alert('All chats deleted successfully!');
      } else {
        alert('Failed to delete chats. Please try again later.');
      }
    } catch (error) {
      console.error('Error deleting chats:', error);
      alert('An error occurred while deleting chats.');
    }
  };

  // Handle delete account with axios
  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/user/delete-account', { withCredentials: true });

      if (response.status === 200) {
        alert(response.data.message || 'Account deleted successfully!');
         setTimeout(() => {
          window.location.reload(); // Refresh the page
        }, 2000);

        // Redirect to the homepage after successful account deletion
        navigate('/');
      } else {
        alert(response.data.error || 'Failed to delete account. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('An unexpected error occurred while deleting your account.');
    } finally {
      setShowDeleteAccountModal(false); // Close the modal regardless of success or failure
    }
  };

  return (
    <Container className="mt-4 text-light">
      <h1 className="text-center mb-4">Settings</h1>

      <div className="settings-container bg-dark p-4 rounded">
        <h3 className="text-center text-light mb-4">Manage Your Settings</h3>

        {/* Settings List */}
        <ListGroup variant="flush" className="mb-4">
          <ListGroupItem
            className={`bg-dark text-light ${activeSection === 'editProfile' ? 'active' : ''}`}
          >
            <Button
              variant="outline-light"
              className="w-100"
              onClick={() => handleButtonClick('editProfile')}
            >
              Edit Profile
            </Button>
          </ListGroupItem>

          <ListGroupItem className="bg-dark text-light">
            <Button
              variant="outline-light"
              className="w-100"
              onClick={handleUpgrade}
            >
              Upgrade
            </Button>
          </ListGroupItem>

          <ListGroupItem className="bg-dark text-light">
            <Button
              variant="outline-light"
              className="w-100"
              onClick={() => setShowDeleteAccountModal(true)}
            >
              Delete Account
            </Button>
          </ListGroupItem>

          {/* <ListGroupItem className="bg-dark text-light">
            <Button
              variant="outline-light"
              className="w-100"
              onClick={toggleTheme}
            >
              Toggle Theme ({theme})
            </Button>
          </ListGroupItem> */}

          <ListGroupItem className="bg-dark text-light">
            <Button
              variant="outline-light"
              className="w-100"
              onClick={handleDeleteAllChats}
            >
              Delete All Chats
            </Button>
          </ListGroupItem>
        </ListGroup>

        {/* Conditional Rendering of Edit Profile Section */}
        {activeSection === 'editProfile' && <EditProfile />}

        {/* Delete Account Modal */}
        <Modal show={showDeleteAccountModal} onHide={() => setShowDeleteAccountModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Account Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete your account? This action cannot be undone.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowDeleteAccountModal(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleDeleteAccount}>
              Delete Account
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </Container>
  );
};

export default Settings;
