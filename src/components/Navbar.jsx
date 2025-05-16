// src/components/Navbar.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { MdApps } from 'react-icons/md';
import { FaVideo } from 'react-icons/fa';
import { FiSun, FiMoon } from 'react-icons/fi';
import { ThemeContext } from '../context/ThemeContext';

const Navbar = ({ initialQuery = '' }) => {
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Your browser does not support voice recognition. Please try Chrome.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      navigate(`/search?q=${encodeURIComponent(transcript)}`);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error', event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className={`flex justify-between items-center mb-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="flex-1 flex justify-center">
        <div className="flex items-center w-full max-w-2xl">
          <SearchBar initialQuery={initialQuery} onSearch={handleSearch} theme={theme} />
          <button
            onClick={handleVoiceSearch}
            className={`ml-2 p-2 rounded-full cursor-pointer ${isListening ? 'bg-red-100 animate-pulse' : theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'}`}
            title="Voice Search"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke={theme === 'dark' ? 'white' : 'currentColor'}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={toggleTheme}
          className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-gray-300 focus:outline-none cursor-pointer"
        >
          {theme === 'dark' ? (
            <FiSun className="h-5 w-5 text-yellow-400" />
          ) : (
            <FiMoon className="h-5 w-5 text-gray-600" />
          )}
        </button>
        <button className={`flex items-center justify-center h-10 w-10 rounded-full cursor-pointer ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} focus:outline-none`}>
          <MdApps className="h-5 w-5" style={{ color: theme === 'dark' ? 'white' : 'gray' }} />
        </button>
        <button className={`flex items-center justify-center h-10 w-10 rounded-full cursor-pointer ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} focus:outline-none`}>
          <FaVideo className="h-5 w-5" style={{ color: theme === 'dark' ? 'white' : 'gray' }} />
        </button>
        <button className={`flex items-center justify-center h-10 w-10 rounded-full cursor-pointer ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} focus:outline-none`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={theme === 'dark' ? 'white' : 'currentColor'}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <button className={`flex items-center justify-center h-10 w-10 rounded-full cursor-pointer ${theme === 'dark' ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'} focus:outline-none`}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke={theme === 'dark' ? 'white' : 'currentColor'}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Navbar;