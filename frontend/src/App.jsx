import React, { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/users/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  if (!user) return <Login />;

  return <Dashboard />;
}

export default App;
