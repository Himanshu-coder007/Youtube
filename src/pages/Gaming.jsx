// src/pages/Gaming.jsx
import React, { useEffect, useState } from 'react';
import { fetchGamingVideos } from '../api/videos';
import VideoCard from '../components/VideoCard';
import Navbar from '../components/Navbar';

const Gaming = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getVideos = async () => {
      try {
        setLoading(true);
        const res = await fetchGamingVideos();
        const processedVideos = (res.data.videos || []).map(video => ({
          ...video,
          id: video.id || Math.random().toString(36).substring(2, 9),
          views: video.view_count || 0,
          timestamp: video.published_at || new Date().toISOString(),
          channel: video.channel || {
            name: 'Unknown Channel',
            profile_image_url: 'https://via.placeholder.com/48'
          }
        }));
        setVideos(processedVideos);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching gaming videos:', err);
        setError('Failed to load gaming videos.');
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
      
      <h1 className="text-2xl font-bold mb-6">Gaming Videos</h1>
      
      {videos.length === 0 ? (
        <div className="text-center mt-12">
          <p className="text-xl text-gray-600">No gaming videos found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videos.map(video => (
            <VideoCard 
              key={video.id} 
              video={video}
              id={video.id}
              title={video.title}
              thumbnail={video.thumbnail_url}
              channel={video.channel}
              views={video.views}
              timestamp={video.timestamp}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Gaming;