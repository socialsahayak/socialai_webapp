import React, { useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import './Chatbot.css';

const Chatbot = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const textareaRef = useRef(null);

  // Toggle sidebar state
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  // Handle input change in the textarea
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    adjustTextareaHeight(e.target);
  };

  // Adjust the height of the textarea dynamically
  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = 'auto'; // Reset the height to 'auto' so it can adjust
    const maxHeight = 120;
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px'; // Set height based on scrollHeight
  };

  // Handle sending the message
  const handleSend = async () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, user: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      // Clear the input area
      setInputValue('');
      if (textareaRef.current) {
        // Reset textarea height after sending the message
        textareaRef.current.style.height = 'auto';
        adjustTextareaHeight(textareaRef.current); // Adjust height for any new input
      }

      try {
        const result = await axios.post(
          'https://f8e5-34-125-101-51.ngrok-free.app/process_question',
          { query: inputValue },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const botMessage = { text: result.data.answer || 'No answer provided', user: 'bot' };
        setMessages((prevMessages) => [...prevMessages, botMessage]);
      } catch (error) {
        console.error('Error querying the backend:', error.response || error.message);
        const errorMessage = { text: 'Error querying the backend. Please check the console for more details.', user: 'bot' };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      {/* Sidebar */}
      <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''} d-none d-md-block`} id="sidebar">
        <div className="sidebar-head">
          <a href="#">History</a>
        </div>
        <ul className="sidebar-main p-0">
          <button className='btn btn-primary'>New Chat</button>
          <li>Convo1</li>
        </ul>
      </aside>

      <div className="main flex-grow-1">
        <nav className="navbar navbar-expand-lg">
          <button className="navbar-toggler" type="button" onClick={toggleSidebar}>
            <i className="lni lni-text-align-left"></i>
          </button>
        </nav>
        
        <main className="p-3">
          <div className="container-fluid">
            <div className="mb-3 text-center">
              {/* You can add any header content here */}
            </div>
          </div>

          <div className="CB-right-t">
            <div className="chat-messages">
              {messages.map((message, index) => (
                <div key={index} className={`chat-message ${message.user}`}>
                  <span>{message.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="CB-right-b">
            <div className="input-container">
              <textarea
                ref={textareaRef}
                className="input-field"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type a query..."
                rows={1}
              />
              <button className="send-button" onClick={handleSend}>Send</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chatbot;
