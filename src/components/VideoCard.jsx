// src/components/VideoCard.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const VideoCard = ({ video }) => {
  const { theme } = useContext(ThemeContext);

  // Format view count (e.g., 1000 -> 1K, 1000000 -> 1M)
  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  // Format time since publication (simplified)
  const formatPublishTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays < 1) return "Today";
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <div className={`w-full mb-6 cursor-pointer hover:scale-[1.02] transition-transform duration-200 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-900'}`}>
      <Link to={`/videos/${video.id}`} className="block">
        {/* Thumbnail with duration */}
        <div className="relative w-full pb-[56.25%] rounded-xl overflow-hidden bg-gray-200">
          <img
            src={video.thumbnail_url}
            alt={video.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {video.duration && (
            <span className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
              {video.duration}
            </span>
          )}
        </div>

        {/* Video info */}
        <div className="flex mt-3">
          {/* Channel icon */}
          <div className="flex-shrink-0 mr-3">
            <img
              src={video?.channel?.profile_image_url || "https://via.placeholder.com/48"}
              alt={video?.channel?.name || "Channel"}
              className="w-9 h-9 rounded-full object-cover"
            />
          </div>

          {/* Video details */}
          <div className="flex-1 min-w-0">
            <h3 className={`text-sm font-medium line-clamp-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {video.title}
            </h3>
            <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {video?.channel?.name || "Unknown Channel"}
            </p>
            <div className={`flex items-center text-xs mt-1 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              <span>{formatViewCount(video.view_count)}</span>
              <span className="mx-1">•</span>
              <span>{formatPublishTime(video.published_at)}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;