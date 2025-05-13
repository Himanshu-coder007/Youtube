import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectLikedVideos } from "../store/videoSlice";
import VideoCard from "../components/VideoCard";
import { fetchVideosByIds } from "../api/videos";
import { useNavigate } from "react-router-dom";

const LikedVideos = () => {
  const likedVideoIds = useSelector(selectLikedVideos);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        setLoading(true);
        if (likedVideoIds && likedVideoIds.length > 0) {
          // Filter out any invalid IDs before making the API call
          const validIds = likedVideoIds.filter(id => 
            typeof id === 'string' && id.length > 0
          );
          
          if (validIds.length > 0) {
            const response = await fetchVideosByIds(validIds);
            // Filter out any null or undefined videos from response
            const validVideos = (response.data?.videos || []).filter(
              video => video && video.id
            );
            setVideos(validVideos);
          } else {
            setVideos([]);
          }
        } else {
          setVideos([]);
        }
        setError("");
      } catch (err) {
        console.error("Error fetching liked videos:", err);
        setError("Failed to load liked videos. Please try again.");
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedVideos();
  }, [likedVideoIds]);

  if (loading) {
    return (
      <div className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Liked Videos</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 rounded-xl aspect-video mb-3"></div>
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <div className="bg-gray-200 rounded-full h-9 w-9"></div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="bg-gray-200 h-4 rounded w-4/5"></div>
                    <div className="bg-gray-200 h-3 rounded w-3/5"></div>
                    <div className="bg-gray-200 h-3 rounded w-2/5"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold mb-6">Liked Videos</h1>
          <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto text-red-500 mb-4"
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
            <h3 className="text-lg font-medium text-gray-800 mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-500 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Liked Videos</h1>
          {videos.length > 0 && (
            <span className="text-sm text-gray-500">
              {videos.length} {videos.length === 1 ? "video" : "videos"}
            </span>
          )}
        </div>

        {videos.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="max-w-md mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 mx-auto text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-800 mb-2">
                No liked videos yet
              </h3>
              <p className="text-gray-500 mb-6">
                Videos you like will appear here
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Browse Videos
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {videos.map((video) => (
              <VideoCard 
                key={video.id} 
                video={video} 
                isLiked={true} // Pass isLiked prop to show the liked state
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedVideos;