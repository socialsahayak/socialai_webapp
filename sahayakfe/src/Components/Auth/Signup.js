import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './Auth.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/user/signup', {
        username: name,
        email,
        password,
      });
      console.log('Signup successful:', res.data);
      setError('');
      setSuccess('Signup successful! You can now log in.');
      setName('');
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log('Signup error:', error);
      setSuccess('');
      setError('Signup failed. Please try again.');
    }
    setIsLoading(false);
  };

  const navigateToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container Authmain bg-dark text-light">
      <h2 className="text-center mb-4">Signup</h2>
      <form onSubmit={handleSignup} className="bg-secondary p-4 rounded">
        <div className="mb-3 input-group">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faUser} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 input-group">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 input-group">
          <span className="input-group-text">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? (
            <>
              <FontAwesomeIcon icon={faSignInAlt} spin /> Signing up...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSignInAlt} /> Signup
            </>
          )}
        </button>
        <p className="mt-3 text-center">
          Already have an account?{' '}
          <span
            style={{ color: 'skyblue', cursor: 'pointer' }}
            onClick={navigateToLogin}
          >
            Login
          </span>
        </p>
      </form>
      {error && <p className="text-danger text-center mt-3">{error}</p>}
      {success && <p className="text-success text-center mt-3">{success}</p>}
    </div>
  );
};

export default Signup;
