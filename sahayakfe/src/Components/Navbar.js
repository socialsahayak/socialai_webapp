import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap styles
import './Navbar.css'; // Custom styles

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  // Fetch user information when the component mounts or when login status changes
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/user/info', { withCredentials: true });
        if (response.status === 200) {
          setUsername(response.data.username);
          setEmail(response.data.email);
        }
      } catch (error) {
        console.error('Error fetching user information:', error);
        setUsername('User');
        setEmail('');
      }
    };

    if (isLoggedIn) {
      fetchUserInfo();
    } else {
      setUsername('User');
      setEmail('');
    }
  }, [isLoggedIn]); // Re-fetch user info when isLoggedIn changes

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand">Peak Nudge</Link>
        
        {/* Hamburger menu for mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Navigation Links */}
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/chatbot" className="nav-link">ChatBot</Link>
            </li>

            {/* Profile Section */}
            {isLoggedIn && (
              <li className="nav-item dropdown">
                <div
                  className="nav-link profile-avatar"
                  onClick={toggleProfileDropdown}
                  style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <FaUserCircle size={30} className="me-2" />
                  <span>{username || 'User'}</span>
                </div>
                {isProfileDropdownOpen && (
                  <div className="profile-dropdown">
                    <p className="dropdown-item">
                      <strong>{username}</strong>
                      <br />
                      <small>{email}</small>
                    </p>
                    <hr />
                    <button className="dropdown-item" onClick={() => navigate('/settings')}>
                      Settings
                    </button>
                    <button className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;