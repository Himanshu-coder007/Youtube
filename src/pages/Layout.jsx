// src/pages/Layout.jsx
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { ThemeContext } from '../context/ThemeContext';

const Layout = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Sidebar />
      <main className={`ml-64 p-6 w-full ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;