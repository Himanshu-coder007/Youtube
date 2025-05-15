// src/pages/Premium.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Premium = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">YouTube Premium</h1>
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} mb-6`}>
          <h2 className="text-2xl font-semibold mb-4">Enjoy ad-free videos, background play, and more</h2>
          <p className="mb-4">Try YouTube Premium free for 1 month. Cancel anytime.</p>
          <button className="bg-red-600 text-white px-6 py-2 rounded-full font-medium hover:bg-red-700 transition">
            Try it free
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h3 className="text-xl font-semibold mb-2">Ad-free</h3>
            <p>Watch videos without interruptions by ads</p>
          </div>
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h3 className="text-xl font-semibold mb-2">Background play</h3>
            <p>Listen to videos when your screen is off</p>
          </div>
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h3 className="text-xl font-semibold mb-2">Downloads</h3>
            <p>Save videos for offline viewing</p>
          </div>
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <h3 className="text-xl font-semibold mb-2">YouTube Music Premium</h3>
            <p>Included with your membership</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;