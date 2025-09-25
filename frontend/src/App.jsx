import React from "react";
import Sidebar from "./components/Sidebar.jsx";
import Chat from "./components/Chat.jsx";
import UserList from "./components/UserList.jsx";

function App() {
  return (
    <div className="dashboard">
      <Sidebar />
      <Chat />
      <UserList />
    </div>
  );
}

export default App;
