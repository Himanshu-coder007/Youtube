// src/pages/Trending.jsx
import React, { useEffect, useState } from 'react';
import { fetchTrendingVideos } from '../api/videos';
import VideoCard from '../components/VideoCard';
import Navbar from '../components/Navbar';

const Trending = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        const res = await fetchTrendingVideos();
        setVideos(res.data.videos || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trending videos:', err);
        setError('Failed to load trending videos.');
        setLoading(false);
      }
    };

    getVideos();
  }, []);

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
      <Navbar />
      
      <h1 className="text-2xl font-bold mb-6">Trending Videos</h1>
      
      {videos.length === 0 ? (
        <div className="text-center mt-12">
          <p className="text-xl text-gray-600">No trending videos found</p>
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

export default Trending;