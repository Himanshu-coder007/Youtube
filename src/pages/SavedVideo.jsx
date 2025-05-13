import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectSavedVideos } from "../store/videoSlice";
import VideoCard from "../components/VideoCard";
import { fetchVideosByIds } from "../api/videos"; // You'll need to create this API function

const SavedVideos = () => {
  const savedVideoIds = useSelector(selectSavedVideos);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSavedVideos = async () => {
      try {
        setLoading(true);
        if (savedVideoIds.length > 0) {
          const res = await fetchVideosByIds(savedVideoIds);
          setVideos(res.data.videos || []);
        } else {
          setVideos([]);
        }
        setError("");
      } catch (err) {
        console.error("Error fetching saved videos:", err);
        setError("Failed to load saved videos");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedVideos();
  }, [savedVideoIds]);

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Saved Videos</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-200 rounded-xl h-64"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-6">Saved Videos</h1>
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <p className="text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Saved Videos</h1>
      {videos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          <p className="text-gray-500">You haven't saved any videos yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedVideos;