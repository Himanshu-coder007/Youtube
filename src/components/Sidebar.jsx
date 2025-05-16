// src/components/Sidebar.jsx
import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectSubscribedChannels } from '../store/subscribeSlice';
import logo from '../assets/logo.svg';
import { ThemeContext } from '../context/ThemeContext';

const Sidebar = () => {
  const { theme } = useContext(ThemeContext);
  const subscribedChannels = useSelector(selectSubscribedChannels);
  const location = useLocation();
  const navigate = useNavigate();
  
  const mainNavItems = [
    { icon: '🏠', label: 'Home', path: '/' },
    { icon: '🔥', label: 'Trending', path: '/trending' },
    { icon: '🎮', label: 'Gaming', path: '/gaming' },
    { icon: '💾', label: 'Watch Later', path: '/saved-videos' },
    { icon: '❤️', label: 'Liked Videos', path: '/liked-videos' },
  ];

  const secondaryNavItems = [
    { icon: '⭐', label: 'Get Premium', path: '/premium' },
    { icon: '⚙️', label: 'Settings', path: '/settings' },
    { icon: '📜', label: 'Report history', path: '/report-history' },
    { icon: '❓', label: 'Help', path: '/help' },
    { icon: '📩', label: 'Send feedback', path: '/feedback' },
  ];

  // Function to check if a path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  // Function to handle logo click
  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <aside className={`w-64 h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} p-4 fixed top-0 left-0 shadow-sm border-r ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} overflow-y-auto`}>
      {/* YouTube Logo and Title */}
      <div 
        className="flex items-center mb-6 pl-2 cursor-pointer" 
        onClick={handleLogoClick}
      >
        <img 
          src={logo} 
          alt="YouTube Logo" 
          className="h-8 w-auto mr-2" 
        />
        <h1 className="text-xl font-bold">YouTube</h1>
      </div>

      {/* Main Navigation */}
      <ul className="space-y-1 mb-6">
        {mainNavItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center p-3 rounded-lg ${
                isActive(item.path) 
                  ? theme === 'dark' 
                    ? 'bg-gray-700 font-semibold' 
                    : 'bg-gray-200 font-semibold'
                  : theme === 'dark' 
                    ? 'hover:bg-gray-800' 
                    : 'hover:bg-gray-100'
              }`}
            >
              <span className="text-xl mr-4">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Subscriptions Section */}
      <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
        <h3 className={`px-3 py-2 text-sm font-semibold ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
          SUBSCRIPTIONS
        </h3>
        <ul className="space-y-1">
          {subscribedChannels.map((channel) => (
            <li key={channel.id}>
              <Link
                
                className={`flex items-center p-3 rounded-lg ${
                  isActive(`/channel/${channel.id}`)
                    ? theme === 'dark'
                      ? 'bg-gray-700 font-semibold'
                      : 'bg-gray-200 font-semibold'
                    : theme === 'dark'
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                }`}
              >
                <img 
                  src={channel.image} 
                  alt={channel.name}
                  className="h-6 w-6 rounded-full mr-4"
                />
                <span>{channel.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Premium & Settings Section */}
      <div className={`border-t ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
        <ul className="space-y-1 mb-6">
          {secondaryNavItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center w-full p-3 rounded-lg ${
                  isActive(item.path)
                    ? theme === 'dark'
                      ? 'bg-gray-700 font-semibold'
                      : 'bg-gray-200 font-semibold'
                    : theme === 'dark'
                      ? 'hover:bg-gray-800'
                      : 'hover:bg-gray-100'
                }`}
              >
                <span className="text-xl mr-4">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Footer/Copyright */}
      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} mt-8 px-3`}>
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