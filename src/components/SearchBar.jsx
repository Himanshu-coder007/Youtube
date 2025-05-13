// src/components/SearchBar.jsx
import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ 
  initialQuery = '', 
  onSearch,
  fetchSuggestions,
  debounceDelay = 300,
  minCharsForSuggestions = 1
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [error, setError] = useState(null);
  const timerRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Proper debounce implementation with cleanup
  const debounce = useCallback((func, delay) => {
    return (...args) => {
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => func(...args), delay);
    };
  }, []);

  // Fetch suggestions when query changes
  useEffect(() => {
    if (!fetchSuggestions || query.trim().length < minCharsForSuggestions) {
      setSuggestions([]);
      setError(null);
      return;
    }

    const getSuggestions = async () => {
      setIsFetching(true);
      setError(null);
      try {
        const data = await fetchSuggestions(query);
        setSuggestions(data);
        setShowSuggestions(true);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setError('Failed to load suggestions');
        setSuggestions([]);
      } finally {
        setIsFetching(false);
      }
    };

    const debouncedFetch = debounce(getSuggestions, debounceDelay);
    debouncedFetch();

    return () => {
      clearTimeout(timerRef.current);
    };
  }, [query, fetchSuggestions, debounce, debounceDelay, minCharsForSuggestions]);

  // Sync with external initialQuery changes
  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    onSearch(suggestion);
    setShowSuggestions(false);
    setActiveSuggestion(-1);
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        scrollSuggestionIntoView('down');
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveSuggestion(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        scrollSuggestionIntoView('up');
        break;
      case 'Enter':
        if (activeSuggestion >= 0) {
          e.preventDefault();
          handleSuggestionClick(suggestions[activeSuggestion]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setActiveSuggestion(-1);
        break;
      default:
        break;
    }
  };

  const scrollSuggestionIntoView = (direction) => {
    if (suggestionsRef.current && activeSuggestion >= 0) {
      const activeElement = suggestionsRef.current.children[activeSuggestion];
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: direction === 'down' ? 'end' : 'start'
        });
      }
    }
  };

  const handleBlur = () => {
    // Delay hiding to allow click events on suggestions to fire
    setTimeout(() => {
      if (!document.activeElement || !suggestionsRef.current?.contains(document.activeElement)) {
        setShowSuggestions(false);
      }
    }, 200);
  };

  return (
    <form onSubmit={handleSubmit} className="flex-1 max-w-2xl relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveSuggestion(-1);
            setShowSuggestions(true);
          }}
          onFocus={() => query.length >= minCharsForSuggestions && setShowSuggestions(true)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="Search..."
          className="w-full px-5 py-3 pr-12 text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200"
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-expanded={showSuggestions}
          aria-controls="search-suggestions"
          aria-activedescendant={activeSuggestion >= 0 ? `suggestion-${activeSuggestion}` : undefined}
          role="combobox"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-300"
          aria-label="Search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
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

      {/* Suggestions dropdown */}
      {showSuggestions && (
        <ul 
          ref={suggestionsRef}
          id="search-suggestions"
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
          role="listbox"
        >
          {error ? (
            <li className="px-4 py-2 text-red-500">{error}</li>
          ) : isFetching ? (
            <li className="px-4 py-2 text-gray-500">Loading...</li>
          ) : suggestions.length === 0 ? (
            <li className="px-4 py-2 text-gray-500">No suggestions found</li>
          ) : (
            suggestions.map((suggestion, index) => (
              <li
                key={`${suggestion}-${index}`}
                id={`suggestion-${index}`}
                onClick={() => handleSuggestionClick(suggestion)}
                onMouseEnter={() => setActiveSuggestion(index)}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  index === activeSuggestion ? 'bg-gray-100 font-medium' : ''
                }`}
                role="option"
                aria-selected={index === activeSuggestion}
              >
                {suggestion}
              </li>
            ))
          )}
        </ul>
      )}

      {/* Loading indicator */}
      {isFetching && (
        <div className="absolute right-14 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-500"></div>
        </div>
      )}
    </form>
  );
};

SearchBar.propTypes = {
  initialQuery: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  fetchSuggestions: PropTypes.func,
  debounceDelay: PropTypes.number,
  minCharsForSuggestions: PropTypes.number
};

SearchBar.defaultProps = {
  debounceDelay: 300,
  minCharsForSuggestions: 1
};

export default SearchBar;