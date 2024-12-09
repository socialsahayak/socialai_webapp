import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa'; // Import user icon from react-icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles

const Navbar = ({ isLoggedIn, username }) => {
  const navigate = useNavigate();

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
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {/* Navigation Links */}
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/ChatBot" className="nav-link">ChatBot</Link>
            </li>
            
            {/* Profile Icon - only visible if logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <div
                  className="nav-link d-flex align-items-center cursor-pointer"
                  onClick={() => navigate('/profile')}
                >
                  <div className="profile-circle d-flex justify-content-center align-items-center">
                    {username ? (
                      username.charAt(0).toUpperCase() // Show first letter of username
                    ) : (
                      <FaUserCircle size={30} />
                    )}
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
