import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const mainNavItems = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '🔥', label: 'Trending', path: '/trending' },
    { icon: '🎮', label: 'Gaming', path: '/gaming' },
    { icon: '💾', label: 'Saved Videos', path: '/saved-videos' },
  ];

  const secondaryNavItems = [
    { icon: '⭐', label: 'Get Premium' },
    { icon: '⚙️', label: 'Settings' },
    { icon: '📜', label: 'Report history' },
    { icon: '❓', label: 'Help' },
    { icon: '📩', label: 'Send feedback' },
  ];

  return (
    <aside className="w-64 h-screen bg-white p-4 fixed top-0 left-0 shadow-sm border-r border-gray-200 overflow-y-auto">
      {/* YouTube Logo and Title */}
      <div className="flex items-center mb-6 pl-2">
        <div className="text-red-600 text-3xl mr-2">▶</div>
        <h1 className="text-xl font-bold text-gray-900">YouTube</h1>
      </div>

      {/* Main Navigation */}
      <ul className="space-y-1 mb-6">
        {mainNavItems.map((item) => (
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

      {/* Premium & Settings Section */}
      <div className="border-t border-gray-200 pt-4">
        <ul className="space-y-1 mb-6">
          {secondaryNavItems.map((item, index) => (
            <li key={index}>
              <button
                className="flex items-center w-full p-3 text-gray-900 rounded-lg hover:bg-gray-100"
                onClick={() => console.log(`${item.label} clicked`)}
              >
                <span className="text-xl mr-4">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer/Copyright */}
      <div className="text-xs text-gray-500 mt-8 px-3">
        <div className="mb-2">© {new Date().getFullYear()} YouTube Clone</div>
        <div className="space-x-2">
          <span>About</span>
          <span>|</span>
          <span>Press</span>
          <span>|</span>
          <span>Copyright</span>
          <span>|</span>
          <span>Contact</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;