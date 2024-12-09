import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import './Login.css';
import './Auth.css';

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post(
        'http://localhost:5000/api/user/login',
        { email, password },
        { withCredentials: true }
      );

      setIsLoggedIn(true);
      Cookies.set('isLoggedIn', 'true', { expires: 7 });
      navigate('/chatbot');
    } catch (error) {
      setError(error.response?.data?.error || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div className="container Authmain bg-dark text-light">
      <h2 className="text-center mb-4">Login</h2>
      <form onSubmit={handleLogin} className="bg-secondary p-4 rounded">
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
              <FontAwesomeIcon icon={faSignInAlt} spin /> Logging in...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faSignInAlt} /> Login
            </>
          )}
        </button>
        <p className="mt-3 text-center">
          Don't have an account?{' '}
          <span
            style={{ color: 'skyblue', cursor: 'pointer' }}
            onClick={navigateToSignup}
          >
            Signup
          </span>
        </p>
      </form>
      {error && <p className="text-danger text-center mt-3">{error}</p>}
    </div>
  );
};

export default Login;
