import React, { useState, useEffect, useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import Chatbot from './Components/Chatbot'; // Chatbot component
import Signup from './Components/Auth/Signup'; // Signup component
import Login from './Components/Auth/Login'; // Login component
import ProtectedRoute from './Components/ProtectedRoute'; // ProtectedRoute HOC for private routes
import Navbar from './Components/Navbar'; // Navbar component
import Home from './Components/Home'; // Home component
import Profile from './Components/Profile'; // Profile page
import Cookies from 'js-cookie'; // For managing cookies
import Settings from './Components/Settings'; // Settings component
import './App.css'; // Global styles
import 'bootstrap/dist/css/bootstrap.min.css';

// Create a ThemeContext to manage the theme state globally
export const ThemeContext = React.createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [theme, setTheme] = useState('system'); // Theme state ('light', 'dark', or 'system')

  // Check login status and initialize the theme on app load
  useEffect(() => {
    const loginStatus = Cookies.get('isLoggedIn') === 'true'; // Check if 'isLoggedIn' cookie exists and is true
    setIsLoggedIn(loginStatus); // Update state based on cookie value

    // Retrieve saved theme from localStorage or default to 'system'
    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme); // Set the initial theme
    applyTheme(savedTheme); // Apply the theme to the document body
  }, []);

  // Function to apply the selected theme to the document body
  const applyTheme = (selectedTheme) => {
    if (selectedTheme === 'dark') {
      document.body.classList.add('dark-mode'); // Add 'dark-mode' class
      document.body.classList.remove('light-mode'); // Remove 'light-mode' class
    } else if (selectedTheme === 'light') {
      document.body.classList.add('light-mode'); // Add 'light-mode' class
      document.body.classList.remove('dark-mode'); // Remove 'dark-mode' class
    } else {
      document.body.classList.remove('light-mode', 'dark-mode'); // Default to system preference
    }
  };

  // Handle theme changes (light, dark, system) and persist them in localStorage
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme); // Update theme state
    localStorage.setItem('theme', selectedTheme); // Save the theme to localStorage
    applyTheme(selectedTheme); // Apply the selected theme to the body
  };

  return (
    // Provide the theme context to the application
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      <div className="App bg-dark text-light">
        {/* Pass isLoggedIn and setIsLoggedIn to Navbar */}
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

        {/* Define routes for the application */}
        <Routes>
          {/* Home route, visible to all users */}
          <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          
          {/* Signup and Login routes */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          
          {/* Chatbot route, accessible only when logged in */}
          <Route
            path="/chatbot"
            element={isLoggedIn ? <Chatbot /> : <Login setIsLoggedIn={setIsLoggedIn} />}
          />
          
          {/* Profile route */}
          <Route path="/profile" element={<Profile />} />
          
          {/* Settings route */}
          <Route path="/settings" element={<Settings />} />
          
          {/* Example protected route using ProtectedRoute */}
          <Route
            path="/protected"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
