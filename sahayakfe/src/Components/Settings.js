import React from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'react-bootstrap'; // Import necessary Bootstrap components
import './Settings.css'; // Import custom styles

const Settings = () => {
  return (
    <Container className="mt-4 text-light">
      <h1 className="text-center mb-4">Settings</h1>

      <div className="settings-container bg-dark p-4 rounded">
        <h3 className="text-center text-light mb-4">Manage Your Settings</h3>

        <ListGroup variant="flush" className="mb-4">
          <ListGroupItem className="bg-dark text-light">
            <Button variant="outline-light" className="w-100">
              General
            </Button>
          </ListGroupItem>
          <ListGroupItem className="bg-dark text-light">
            <Button variant="outline-light" className="w-100">
              Personalization
            </Button>
          </ListGroupItem>
          <ListGroupItem className="bg-dark text-light">
            <Button variant="outline-light" className="w-100">
              Edit Profile
            </Button>
          </ListGroupItem>
          <ListGroupItem className="bg-dark text-light">
            <Button variant="outline-light" className="w-100">
              Security
            </Button>
          </ListGroupItem>
        </ListGroup>
      </div>
    </Container>
  );
};

export default Settings;
