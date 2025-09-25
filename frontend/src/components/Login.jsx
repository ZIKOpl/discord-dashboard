import React from 'react';

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-900">
      <a href="http://localhost:4000/auth/login" className="px-6 py-3 bg-red-600 rounded text-white font-bold hover:bg-red-700">
        Se connecter avec Discord
      </a>
    </div>
  );
};

export default Login;
