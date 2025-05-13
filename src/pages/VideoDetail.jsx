import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchVideoById } from "../api/videos";

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const getVideoDetails = async () => {
      try {
        setLoading(true);
        const res = await fetchVideoById(id);
        if (!res.data?.video_details) {
          throw new Error("Video not found");
        }
        setVideo(res.data.video_details);
        setError("");
      } catch (err) {
        console.error("Error fetching video:", err);
        setError(err.message || "Failed to load video");
        setVideo(null);
      } finally {
        setLoading(false);
      }
    };

    getVideoDetails();

    return () => {
      // Cleanup video reference on unmount
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.src = "";
        videoRef.current.load();
      }
    };
  }, [id]);

  const handlePlay = async () => {
    try {
      if (videoRef.current) {
        await videoRef.current.play();
        setIsPlaying(true);
        setShowPlayButton(false);
      }
    } catch (err) {
      console.error("Play failed:", err);
      setShowPlayButton(true);
    }
  };

  const handlePause = () => {
    if (videoRef.current) {
      setIsPlaying(false);
      setShowPlayButton(true);
    }
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;
    
    if (videoRef.current.paused) {
      handlePlay();
    } else {
      videoRef.current.pause();
    }
  };

  const handleCanPlay = () => {
    if (!videoRef.current) return;
    
    // Try to autoplay with sound muted
    videoRef.current.muted = true;
    handlePlay().catch(() => {
      // Autoplay was prevented - show play button
      setShowPlayButton(true);
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">No video data available</p>
      </div>
    );
  }

  // Extract video ID from YouTube URL for embed
  const getYouTubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11)
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`
      : null;
  };

  const embedUrl = getYouTubeEmbedUrl(video.video_url);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-1"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back
        </button>

        <div className="relative aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
          {embedUrl ? (
            // YouTube embed iframe
            <iframe
              src={showPlayButton ? embedUrl.replace('autoplay=1', 'autoplay=0') : embedUrl}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
              title={video.title}
            ></iframe>
          ) : (
            // Regular video element for non-YouTube videos
            <>
              <video
                ref={videoRef}
                controls={isPlaying}
                playsInline
                className="w-full h-full cursor-pointer"
                poster={video.thumbnail_url}
                onClick={handleVideoClick}
                onCanPlay={handleCanPlay}
                onPlay={() => setIsPlaying(true)}
                onPause={handlePause}
                onEnded={handlePause}
              >
                <source src={video.video_url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {showPlayButton && !isPlaying && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer"
                  onClick={handleVideoClick}
                >
                  <button
                    className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all"
                    aria-label="Play video"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-12 w-12"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-bold">{video.title}</h1>
        <div className="flex items-center mt-2 text-sm text-gray-600">
          <span>{video.view_count} views</span>
          <span className="mx-2">•</span>
          <span>{video.published_at}</span>
        </div>

        <div className="mt-4 flex items-start">
          <div className="flex-shrink-0 mr-3">
            <img
              src={video.channel.profile_image_url}
              alt={video.channel.name}
              className="h-10 w-10 rounded-full"
            />
          </div>
          <div>
            <h3 className="font-medium">{video.channel.name}</h3>
            <p className="text-sm text-gray-500">
              {video.channel.subscriber_count} subscribers
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="whitespace-pre-line">{video.description}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;