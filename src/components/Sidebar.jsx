// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-white p-4 fixed top-0 left-0 shadow-sm border-r border-gray-200 overflow-y-auto">
      {/* YouTube Logo and Title */}
      <div className="flex items-center mb-6 pl-2">
        <div className="text-red-600 text-3xl mr-2">▶</div>
        <h1 className="text-xl font-bold text-gray-900">YouTube</h1>
      </div>

      {/* Main Navigation */}
      <ul className="space-y-1">
        <li>
          <Link 
            to="/" 
            className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <span className="text-xl mr-4">🏠</span>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/trending" 
            className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <span className="text-xl mr-4">🔥</span>
            <span>Trending</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/gaming" 
            className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <span className="text-xl mr-4">🎮</span>
            <span>Gaming</span>
          </Link>
        </li>
        <li>
          <Link 
            to="/saved-videos" 
            className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100"
          >
            <span className="text-xl mr-4">💾</span>
            <span>Saved Videos</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;