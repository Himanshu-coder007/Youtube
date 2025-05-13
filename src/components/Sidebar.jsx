// src/components/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const navItems = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '🔥', label: 'Trending', path: '/trending' },
    { icon: '🎮', label: 'Gaming', path: '/gaming' },
    { icon: '💾', label: 'Saved Videos', path: '/saved-videos' },
  ];

  return (
    <aside className="w-64 h-screen bg-white p-4 fixed top-0 left-0 shadow-sm border-r border-gray-200 overflow-y-auto">
      {/* YouTube Logo and Title */}
      <div className="flex items-center mb-6 pl-2">
        <div className="text-red-600 text-3xl mr-2">▶</div>
        <h1 className="text-xl font-bold text-gray-900">YouTube</h1>
      </div>

      {/* Main Navigation */}
      <ul className="space-y-1">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className="flex items-center p-3 text-gray-900 rounded-lg hover:bg-gray-100"
            >
              <span className="text-xl mr-4">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;