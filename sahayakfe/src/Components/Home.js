import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios'; // Import axios for HTTP requests
import './Home.css';

function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simulating login state
  const [username, setUsername] = useState(''); // Simulating a username

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Check if the user is logged in by making a request to the backend
    axios.get('http://localhost:5000/api/user/info', { withCredentials: true })
      .then(response => {
        setIsLoggedIn(true);
        setUsername(response.data.username);
      })
      .catch(error => {
        setIsLoggedIn(false);
        console.error('Error fetching user info:', error);
      });
  }, []); // Run once when component mounts

  const handleGetStartedClick = () => {
    if (isLoggedIn) {
      // If logged in, navigate to the desired page (e.g., profile or chatbot)
      navigate('/chatBot'); // Change this to the desired route
    } else {
      // If not logged in, navigate to the login page
      navigate('/login');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section id="home" className="section home bg-dark text-white">
        <div className="container text-center py-5">
          <h1>Welcome to Peak Nudge</h1>
          {isLoggedIn ? (
            // <p>Welcome, {username}!</p>
            <button className="cta btn btn-primary" onClick={handleGetStartedClick}>
              Get Started
            </button>
          ) : (
            <button className="cta btn btn-primary" onClick={handleGetStartedClick}>
              Get Started
            </button>
          )}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section services bg-secondary text-white py-5">
        <div className="container text-center">
          <h2 className="services-title mb-4">Our Services</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="service-card p-4 mb-4 bg-dark rounded">
                <img src="/image3.avif" alt="Social Media Management" className="service-icon mb-3" />
                <h3>Social Media Management</h3>
                <p>We help you manage your social media presence effectively and boost engagement with smart strategies.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card p-4 mb-4 bg-dark rounded">
                <img src="/image4.avif" alt="Content Creation" className="service-icon mb-3" />
                <h3>Content Creation</h3>
                <p>Our team creates high-quality content that resonates with your audience and enhances your brand image.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="service-card p-4 mb-4 bg-dark rounded">
                <img src="/image6.avif" alt="Analytics and Reporting" className="service-icon mb-3" />
                <h3>Analytics and Reporting</h3>
                <p>Get in-depth analytics to understand your audience better and make data-driven decisions for growth.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="section about bg-dark text-white py-5">
        <div className="container text-center">
          <h2>About Us</h2>
          <p>Peak Nudge helps influencers maximize engagement with precision-crafted hashtags, perfect timing, and tailored content strategies. Empowering creators to achieve their best, one post at a time.</p>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="section feedback bg-secondary text-white py-5">
        <div className="container text-center">
          <h2>Feedback</h2>
          <p>We'd love to hear your feedback! Share your thoughts below.</p>
          
          {/* Feedback form */}
          <form className="feedback-form">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="form-control mb-3"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="form-control mb-3"
            />
            <textarea
              name="message"
              placeholder="Your Feedback"
              rows="5"
              required
              className="form-control mb-3"
            ></textarea>
            <button type="submit" className="feedback-button btn btn-primary">Submit Feedback</button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;
