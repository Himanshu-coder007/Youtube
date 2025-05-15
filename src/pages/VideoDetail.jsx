import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchVideoById } from "../api/videos";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleLikeVideo,
  toggleSaveVideo,
  selectLikedVideos,
  selectSavedVideos,
} from "../store/videoSlice";
import CommentsSection from "../components/CommentsSection";

// Custom hook for managing subscriptions
const useSubscriptions = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  const toggleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return { isSubscribed, toggleSubscribe };
};

const VideoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPlayButton, setShowPlayButton] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const [isDisliked, setIsDisliked] = useState(false); // New state for dislike

  // Get liked and saved videos from Redux store
  const likedVideos = useSelector(selectLikedVideos);
  const savedVideos = useSelector(selectSavedVideos);
  const isLiked = likedVideos.includes(id);
  const isSaved = savedVideos.includes(id);

  // Use custom subscription hook
  const { isSubscribed, toggleSubscribe } = useSubscriptions();

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
      videoRef.current.pause();
      setIsPlaying(false);
      setShowPlayButton(true);
    }
  };

  const handleVideoClick = () => {
    if (!videoRef.current) return;

    if (videoRef.current.paused) {
      handlePlay();
    } else {
      handlePause();
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const handleCanPlay = () => {
    if (!videoRef.current) return;

    // Try to autoplay with sound muted
    videoRef.current.muted = true;
    handlePlay().catch(() => {
      setShowPlayButton(true);
    });
  };

  const handleLike = () => {
    dispatch(toggleLikeVideo(id));
    setIsDisliked(false); // Remove dislike when liking
  };

  const handleDislike = () => {
    if (isLiked) {
      dispatch(toggleLikeVideo(id)); // Unlike if already liked
    }
    setIsDisliked(!isDisliked); // Toggle dislike state
  };

  const handleSave = () => {
    dispatch(toggleSaveVideo(id));
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M views`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K views`;
    }
    return `${count} views`;
  };

  const getYouTubeEmbedUrl = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11
      ? `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`
      : null;
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="w-full max-w-4xl">
          <div className="animate-pulse bg-gray-200 rounded-lg h-96 w-full mb-6"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-sm">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
        <div className="max-w-md text-center bg-white p-8 rounded-xl shadow-sm">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 10l4.553-2.276A1 1 0 01221 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            No Video Found
          </h2>
          <p className="text-gray-600 mb-6">
            The video you're looking for doesn't exist or was removed.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Browse Videos
          </button>
        </div>
      </div>
    );
  }

  const embedUrl = getYouTubeEmbedUrl(video.video_url);

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mt-6 mb-4 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Back to videos
        </button>

        {/* Video Player */}
        <div className="bg-black rounded-xl overflow-hidden shadow-xl mb-8">
          {embedUrl ? (
            <div className="relative pt-[56.25%]">
              {" "}
              {/* 16:9 aspect ratio */}
              <iframe
                src={
                  showPlayButton
                    ? embedUrl.replace("autoplay=1", "autoplay=0")
                    : embedUrl
                }
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                title={video.title}
              />
            </div>
          ) : (
            <div className="relative pt-[56.25%]">
              {" "}
              {/* 16:9 aspect ratio */}
              <video
                ref={videoRef}
                controls={isPlaying}
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover cursor-pointer"
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
                    className="p-4 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    aria-label="Play video"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16"
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
                    </svg>
                  </button>
                </div>
              )}
              {isPlaying && (
                <button
                  onClick={toggleMute}
                  className="absolute bottom-4 right-4 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                  aria-label={isMuted ? "Unmute" : "Mute"}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    {isMuted ? (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          clipRule="evenodd"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                        />
                      </>
                    ) : (
                      <>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                          clipRule="evenodd"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15.536 8.464a5 5 0 010 7.072"
                        />
                      </>
                    )}
                  </svg>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Video Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {video.title}
          </h1>

          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6">
            <span>{formatViewCount(video.view_count)}</span>
            <span className="mx-2">•</span>
            <span>{formatDate(video.published_at)}</span>
          </div>

          {/* Channel Info */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-4">
                <img
                  src={video.channel.profile_image_url}
                  alt={video.channel.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900">
                  {video.channel.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {formatViewCount(video.channel.subscriber_count)} subscribers
                </p>
              </div>
            </div>
            <button
              onClick={toggleSubscribe}
              className={`px-4 py-2 rounded-full font-medium ${
                isSubscribed
                  ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  : "bg-red-600 text-white hover:bg-red-700"
              } transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2`}
            >
              {isSubscribed ? "Unsubscribe" : "Subscribe"}
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 mb-6">
            {/* Like Button */}
            <button
              onClick={handleLike}
              className={`flex items-center px-4 py-2 rounded-full ${
                isLiked
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-gray-200 transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill={isLiked ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                />
              </svg>
              {isLiked ? "Liked" : "Like"}
            </button>

            {/* Dislike Button */}
            <button
              onClick={handleDislike}
              className={`flex items-center px-4 py-2 rounded-full ${
                isDisliked
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-gray-200 transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill={isDisliked ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                />
              </svg>
              {isDisliked ? "Disliked" : "Dislike"}
            </button>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className={`flex items-center px-4 py-2 rounded-full ${
                isSaved
                  ? "bg-blue-100 text-blue-600"
                  : "bg-gray-100 text-gray-700"
              } hover:bg-gray-200 transition-colors`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill={isSaved ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
              {isSaved ? "Saved" : "Save"}
            </button>

            {/* Download Button */}
            <button className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download
            </button>

            {/* Share Button */}
            <button className="flex items-center px-4 py-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share
            </button>
          </div>

          {/* Video Description */}
          <div className="prose max-w-none">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Description
            </h3>
            <p className="whitespace-pre-line text-gray-700">
              {video.description || "No description available."}
            </p>
          </div>
        </div>

        {/* Comments Section */}
        <CommentsSection videoId={id} channelId={video.channel.id} />
      </div>
    </div>
  );
};

export default VideoDetail;