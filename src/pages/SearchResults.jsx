// src/pages/SearchResults.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchHomeVideos } from '../api/videos';
import VideoCard from '../components/VideoCard';
import Navbar from '../components/Navbar';

const SearchResults = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get('q') || '';

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        const res = await fetchHomeVideos(searchQuery);
        setVideos(res.data.videos || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching search results:', err);
        setError('Failed to load search results.');
        setLoading(false);
      }
    };

    if (searchQuery) {
      getVideos();
    } else {
      setVideos([]);
      setLoading(false);
    }
  }, [searchQuery]);

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );

  if (error) return (
    <div className="p-4 text-red-500 text-center mt-8">
      <p>{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="p-6 w-full">
      <Navbar initialQuery={searchQuery} />
      
      <h1 className="text-2xl font-bold mb-6">Search Results for "{searchQuery}"</h1>
      
      {videos.length === 0 ? (
        <div className="text-center mt-12">
          <p className="text-xl text-gray-600">No videos found</p>
          <p className="text-gray-500">Try a different search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;