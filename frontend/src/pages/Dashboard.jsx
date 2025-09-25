import React from 'react';
import Sidebar from '../components/Sidebar';
import UserList from '../components/UserList';
import Chat from '../components/Chat';
import AdminPanel from '../components/AdminPanel';

const Dashboard = () => {
  return (
    <div className="flex h-screen bg-primary text-white">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Chat />
      </div>
      <UserList />
      <AdminPanel />
    </div>
  );
};

export default Dashboard;
