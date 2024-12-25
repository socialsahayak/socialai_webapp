import React from 'react';

const History = ({ chats, currentChatId, setCurrentChatId, handleNewChat }) => {
  return (
    <aside className="sidebar d-none d-md-block" id="sidebar">
      <div className="sidebar-head">
        <a href="#">History</a>
      </div>
      <ul className="sidebar-main p-0">
        <button className="btn btn-primary mb-3" onClick={handleNewChat}>
          New Chat
        </button>
        {chats.map((chat) => (
          <li
            key={chat.id}
            className={currentChatId === chat.id ? 'active' : ''}
            onClick={() => setCurrentChatId(chat.id)}
          >
            Chat {chat.id}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default History;
