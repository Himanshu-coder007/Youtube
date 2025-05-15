// src/pages/Feedback.jsx
import React, { useContext, useState } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Feedback = () => {
  const { theme } = useContext(ThemeContext);
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this to your backend
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
    setFeedback('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Send Feedback</h1>
        
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'} mb-6`}>
          <h2 className="text-2xl font-semibold mb-4">We'd love to hear from you</h2>
          <p className="mb-4">Your feedback helps us improve YouTube Clone.</p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="feedback" className="block mb-2 font-medium">Your feedback</label>
              <textarea
                id="feedback"
                rows="5"
                className={`w-full p-3 rounded ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'} border`}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                required
              ></textarea>
            </div>
            <button 
              type="submit"
              className={`px-6 py-2 rounded-full ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white font-medium transition`}
            >
              Send Feedback
            </button>
          </form>
          
          {submitted && (
            <div className={`mt-4 p-3 rounded ${theme === 'dark' ? 'bg-green-800 text-green-100' : 'bg-green-100 text-green-800'}`}>
              Thank you for your feedback!
            </div>
          )}
        </div>
        
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <h2 className="text-2xl font-semibold mb-4">What happens next?</h2>
          <p>Our team reviews all feedback we receive. While we can't respond to every submission, we use your feedback to improve our product.</p>
        </div>
      </div>
    </div>
  );
};

export default Feedback;