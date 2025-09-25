import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-red-800 p-4">
      <h2 className="text-xl font-bold mb-4">Catégories</h2>
      <ul>
        <li className="mb-2 hover:text-red-300 cursor-pointer">Classement Messages</li>
        <li className="mb-2 hover:text-red-300 cursor-pointer">Autres Stats</li>
      </ul>
    </div>
  );
};

export default Sidebar;
