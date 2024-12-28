import React, { useState, useRef } from 'react';
import axios from 'axios';
import './Chatbot.css';
import History from './History'; // Import the new History component

const Chatbot = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [chats, setChats] = useState([{ id: 1, messages: [] }]);
  const [currentChatId, setCurrentChatId] = useState(1);
  const [loading, setLoading] = useState(false); // For loading state
  const textareaRef = useRef(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://your-ngrok-url.ngrok.io';

  const handleNewChat = () => {
    const newChatId = chats.length + 1;
    const newChat = { id: newChatId, messages: [] };
    setChats((prevChats) => [...prevChats, newChat]);
    setCurrentChatId(newChatId);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    adjustTextareaHeight(e.target);
  };

  const adjustTextareaHeight = (textarea) => {
    textarea.style.height = 'auto';
    const maxHeight = 120;
    textarea.style.height = Math.min(textarea.scrollHeight, maxHeight) + 'px';
  };

  const handleSend = async () => {
    if (inputValue.trim()) {
      const userMessage = { text: inputValue, user: 'user' };

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, messages: [...chat.messages, userMessage] }
            : chat
        )
      );
      setInputValue('');
      setLoading(true);

      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        adjustTextareaHeight(textareaRef.current);
      }

      try {
        const response = await axios.post(
          "http://localhost:5000/api/question",
          { question: inputValue },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const botMessage = {
          text: response.data.answer || 'No answer provided',
          user: 'bot',
        };

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChatId
              ? { ...chat, messages: [...chat.messages, botMessage] }
              : chat
          )
        );
      } catch (error) {
        console.error('Error querying the backend:', error);

        const errorMessage = {
          text: 'Error querying the backend. Please try again later.',
          user: 'bot',
        };

        setChats((prevChats) =>
          prevChats.map((chat) =>
            chat.id === currentChatId
              ? { ...chat, messages: [...chat.messages, errorMessage] }
              : chat
          )
        );
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="d-flex flex-column flex-md-row">
      {/* Use the History Component */}
      <History
        chats={chats}
        currentChatId={currentChatId}
        setCurrentChatId={setCurrentChatId}
        handleNewChat={handleNewChat}
      />

      <div className="main flex-grow-1">
        <main className="p-3">
          <div className="CB-right-t">
            <div className="chat-messages">
              {chats
                .find((chat) => chat.id === currentChatId)
                ?.messages.map((message, index) => (
                  <div key={index} className={`chat-message ${message.user}`}>
                    <span>{message.text}</span>
                  </div>
                ))}
              {loading && (
                <div className="chat-message bot">
                  <span>Bot is typing...</span>
                </div>
              )}
            </div>
          </div>

          <div className="CB-right-b fixed-input">
            <div className="input-container">
              <textarea
                ref={textareaRef}
                className="input-field no-resize"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder="Type a query..."
                rows={1}
              />
              <button
                className="send-button"
                onClick={handleSend}
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chatbot;
