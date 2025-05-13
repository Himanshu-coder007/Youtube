// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { fetchHomeVideos } from "../api/videos";
import { Link } from "react-router-dom";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchHomeVideos()
      .then((res) => {
        setVideos(res.data.videos);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load videos");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {videos.map((video) => (
        <div key={video.id} className="bg-white shadow rounded p-2">
          <Link to={`/videos/${video.id}`}>
            <img
              src={video.thumbnail_url}
              alt={video.title}
              className="w-full h-40 object-cover rounded"
            />
            <h3 className="text-md font-semibold mt-2">{video.title}</h3>
            <p className="text-sm text-gray-500">{video.channel.name}</p>
            <p className="text-xs text-gray-400">{video.view_count} views</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
