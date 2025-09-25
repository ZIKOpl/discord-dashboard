import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [contextMenu, setContextMenu] = useState({ visible: false, x: 0, y: 0, user: null });

  useEffect(() => {
    fetch('http://localhost:4000/users', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleRightClick = (e, user) => {
    e.preventDefault();
    setContextMenu({ visible: true, x: e.pageX, y: e.pageY, user });
  };

  const handleClickOutside = () => setContextMenu({ ...contextMenu, visible: false });

  const handleAction = async (action) => {
    if (!contextMenu.user) return;
    try {
      const res = await fetch(`http://localhost:4000/admin/${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: contextMenu.user.id }),
        credentials: 'include'
      });
      if (res.ok) alert(`${action} réussi sur ${contextMenu.user.username}`);
    } catch (err) {
      console.error(err);
      alert(`Erreur lors du ${action}`);
    }
    setContextMenu({ ...contextMenu, visible: false });
  };

  return (
    <div className="w-64 bg-red-800 p-4 relative" onClick={handleClickOutside}>
      <h2 className="text-xl font-bold mb-4">Connectés</h2>
      <ul>
        {users.map(user => (
          <li
            key={user.id}
            onContextMenu={(e) => handleRightClick(e, user)}
            className="mb-2 cursor-pointer hover:text-red-300"
          >
            {user.username} ({user.roles.join(', ')})
          </li>
        ))}
      </ul>

      {contextMenu.visible && (
        <div
          className="absolute bg-red-700 p-2 rounded shadow-lg z-50"
          style={{ top: contextMenu.y, left: contextMenu.x }}
        >
          <button
            className="block w-full text-left px-2 py-1 hover:bg-red-600 rounded"
            onClick={() => handleAction('ban')}
          >Ban</button>
          <button
            className="block w-full text-left px-2 py-1 hover:bg-red-600 rounded"
            onClick={() => handleAction('kick')}
          >Kick</button>
          <button
            className="block w-full text-left px-2 py-1 hover:bg-red-600 rounded"
            onClick={() => handleAction('mute')}
          >Mute</button>
        </div>
      )}
    </div>
  );
};

export default UserList;
