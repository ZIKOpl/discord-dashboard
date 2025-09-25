import React from 'react';

const AdminPanel = () => {
  return (
    <div className="w-64 bg-red-800 p-4">
      <h2 className="text-xl font-bold mb-4">Admin</h2>
      <button className="w-full mb-2 bg-red-600 p-2 rounded">Ban</button>
      <button className="w-full mb-2 bg-red-600 p-2 rounded">Mute</button>
      <button className="w-full mb-2 bg-red-600 p-2 rounded">Kick</button>
    </div>
  );
};

export default AdminPanel;
