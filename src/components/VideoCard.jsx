// src/components/VideoCard.jsx
import React from "react";
import { Link } from "react-router-dom";

const VideoCard = ({ video }) => {
  return (
    <Link
      to={`/videos/${video.id}`}
      className="bg-white shadow rounded p-2 hover:shadow-md"
    >
      <img
        src={video.thumbnail_url}
        alt={video.title}
        className="w-full h-40 object-cover rounded"
      />
      <h3 className="text-md font-semibold mt-2">{video.title}</h3>
      <p className="text-sm text-gray-500">{video?.channel?.name || "Unknown Channel"}</p>
      <p className="text-xs text-gray-400">{video.view_count} views</p>
    </Link>
  );
};

export default VideoCard;
