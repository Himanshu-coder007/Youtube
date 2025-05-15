// src/pages/Help.jsx
import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Help = () => {
  const { theme } = useContext(ThemeContext);

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "You can reset your password by going to the account settings page and clicking on 'Forgot password'."
    },
    {
      question: "How do I change my channel name?",
      answer: "Channel names can be changed in your YouTube Studio settings under the 'Channel' section."
    },
    {
      question: "Why can't I upload videos?",
      answer: "There might be several reasons including account restrictions, file format issues, or size limitations. Check your account status and try again."
    },
    {
      question: "How do I enable dark mode?",
      answer: "Dark mode can be enabled in the settings menu under 'Appearance'."
    }
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Help Center</h1>
        
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} mb-6`}>
          <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                <h3 className="font-medium text-lg">{faq.question}</h3>
                <p className={`mt-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
          <p className="mb-4">If you can't find what you're looking for, you can contact our support team.</p>
          <button className={`px-4 py-2 rounded-full ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white transition`}>
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default Help;