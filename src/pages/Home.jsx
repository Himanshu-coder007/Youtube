// src/pages/Home.jsx
import React, { useEffect, useState, useContext } from 'react';
import { fetchHomeVideos } from '../api/videos';
import VideoCard from '../components/VideoCard';
import Navbar from '../components/Navbar';
import { ThemeContext } from '../context/ThemeContext';

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        const res = await fetchHomeVideos();
        setVideos(res.data.videos || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching home videos:', err);
        setError('Failed to load videos.');
        setLoading(false);
      }
    };

    getVideos();
  }, []);

  if (loading) return (
    <div className={`flex justify-center items-center h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
    </div>
  );

  if (error) return (
    <div className={`p-4 text-center mt-8 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white'}`}>
      <p className="text-red-500">{error}</p>
      <button 
        onClick={() => window.location.reload()} 
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className={`p-6 w-full min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar />
      
      <h1 className="text-2xl font-bold mb-6">Recommended Videos</h1>
      
      {videos.length === 0 ? (
        <div className="text-center mt-12">
          <p className="text-xl">No videos found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoCard key={video.id} video={video} theme={theme} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;