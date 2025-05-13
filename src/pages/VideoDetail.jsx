// src/pages/VideoDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchVideoById } from "../api/videos";

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchVideoById(id)
      .then((res) => {
        setVideo(res.data.video_details);
        setLoading(false);
      })
      .catch(() => {
        setError("Video not found");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="p-4">Loading...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">{video.title}</h2>
      <video
        controls
        className="w-full max-w-2xl mb-4 rounded"
        src={video.video_url}
      ></video>
      <p className="text-gray-600">{video.description}</p>
      <p className="mt-2 text-sm text-gray-400">
        Channel: {video.channel.name} • {video.view_count} views
      </p>
    </div>
  );
};

export default VideoDetail;
