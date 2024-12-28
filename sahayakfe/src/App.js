import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Chatbot from './Components/Chatbot';
import Signup from './Components/Auth/Signup';
import Login from './Components/Auth/Login';
import ProtectedRoute from './Components/ProtectedRoute';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Profile from './Components/Profile';
import Cookies from 'js-cookie';
import Settings from './Components/Settings';
import EditProfile from './Components/EditProfile';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const ThemeContext = React.createContext();
export const UserContext = React.createContext(); // Create UserContext

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState('system');
  const [userProfile, setUserProfile] = useState({ username: '', email: '' });

  // Initialize login state and theme on app load
  useEffect(() => {
    const loginStatus = Cookies.get('isLoggedIn') === 'true';
    setIsLoggedIn(loginStatus);

    const savedTheme = localStorage.getItem('theme') || 'system';
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Apply the selected theme to the document body
  const applyTheme = (selectedTheme) => {
    if (selectedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else if (selectedTheme === 'light') {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    } else {
      document.body.classList.remove('light-mode', 'dark-mode');
    }
  };

  // Handle theme changes and persist them in localStorage
  const handleThemeChange = (selectedTheme) => {
    setTheme(selectedTheme);
    localStorage.setItem('theme', selectedTheme);
    applyTheme(selectedTheme);
  };

  const handleLogout = () => {
    // Clear session data, such as removing tokens or user data
    setIsLoggedIn(false);
    Cookies.remove('isLoggedIn');
    Cookies.remove('authToken'); // Clear authentication token cookie
  };

  const handleProfileUpdate = (updatedProfile) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      username: updatedProfile.username,
      email: updatedProfile.email,
    }));
  };

  return (
    <ThemeContext.Provider value={{ theme, handleThemeChange }}>
      <UserContext.Provider value={{ userProfile, handleProfileUpdate }}> {/* Provide UserContext */}
        <div className="App">
          <Navbar
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            username={userProfile.username}
            email={userProfile.email}
          />

          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

            <Route
              path="/chatbot"
              element={isLoggedIn ? <Chatbot /> : <Login setIsLoggedIn={setIsLoggedIn} />}
            />

            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/edit-profile" element={<EditProfile />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
