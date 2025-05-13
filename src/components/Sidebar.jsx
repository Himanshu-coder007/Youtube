// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-gray-100 p-4 fixed top-0 left-0 shadow">
      <ul className="space-y-4">
        <li>
          <Link to="/" className="text-gray-800 hover:text-blue-500 block">Home</Link>
        </li>
        <li>
          <Link to="/trending" className="text-gray-800 hover:text-blue-500 block">Trending</Link>
        </li>
        <li>
          <Link to="/gaming" className="text-gray-800 hover:text-blue-500 block">Gaming</Link>
        </li>
        <li>
          <Link to="/saved-videos" className="text-gray-800 hover:text-blue-500 block">Saved Videos</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
