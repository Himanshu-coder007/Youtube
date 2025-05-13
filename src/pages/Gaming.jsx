// src/pages/Gaming.jsx
import React, { useEffect, useState } from 'react';
import { fetchGamingVideos } from '../api/videos';
import VideoCard from '../components/VideoCard';

const Gaming = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchGamingVideos()
      .then(res => {
        setVideos(res.data.videos || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching gaming videos:', err);
        setError('Failed to load gaming videos.');
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
};

export default Gaming;
