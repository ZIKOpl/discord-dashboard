import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io('http://localhost:4000');

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', msg => setMessages(prev => [...prev, msg]));
  }, []);

  const sendMessage = () => {
    if (input.trim() === '') return;
    socket.emit('sendMessage', input);
    setInput('');
  };

  return (
    <div className="flex-1 flex flex-col p-4 bg-red-900">
      <div className="flex-1 overflow-y-auto mb-2">
        {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      </div>
      <div className="flex">
        <input
          className="flex-1 p-2 rounded-l bg-red-700 text-white"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="bg-red-600 px-4 rounded-r" onClick={sendMessage}>Envoyer</button>
      </div>
    </div>
  );
};

export default Chat;
