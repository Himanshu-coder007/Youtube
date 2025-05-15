// src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react';

const SearchBar = ({ initialQuery = '', onSearch, theme }) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className={`w-full px-5 py-3 pr-12 ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-gray-700 border-gray-300'} border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200`}
        />
        <button
          type="submit"
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${theme === 'dark' ? 'hover:bg-gray-600' : 'hover:bg-gray-100'} focus:outline-none focus:ring-1 ${theme === 'dark' ? 'focus:ring-gray-500' : 'focus:ring-gray-300'}`}
        >
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
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;