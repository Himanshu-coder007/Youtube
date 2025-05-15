// src/pages/ReportHistory.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ReportHistory = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Report History</h1>
        
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} mb-6`}>
          <h2 className="text-2xl font-semibold mb-4">Your reports</h2>
          <p className="text-center py-8">You haven't reported any content yet.</p>
        </div>
        
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className="text-2xl font-semibold mb-4">About reporting content</h2>
          <p className="mb-4">When you report content, it doesn't get automatically removed. The report is sent to YouTube moderators, who will review the content and take appropriate action.</p>
          <p>You can report videos, comments, channels, and more if you believe they violate YouTube's Community Guidelines.</p>
        </div>
      </div>
    </div>
  );
};

export default ReportHistory;