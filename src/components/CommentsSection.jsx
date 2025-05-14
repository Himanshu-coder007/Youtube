// src/components/CommentsSection.js
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const CommentsSection = ({ channelId }) => {
  const { id: videoId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Load comments and subscription status from localStorage
  useEffect(() => {
    const storedComments = localStorage.getItem(`video_comments_${videoId}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }

    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || '[]');
    setIsSubscribed(subscriptions.includes(channelId));
  }, [videoId, channelId]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      text: newComment,
      author: "You", // In a real app, this would be the logged-in user
      timestamp: new Date().toISOString(),
      likes: 0,
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`video_comments_${videoId}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  const handleLikeComment = (commentId) => {
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      return comment;
    });
    setComments(updatedComments);
    localStorage.setItem(`video_comments_${videoId}`, JSON.stringify(updatedComments));
  };

  const handleToggleSubscribe = () => {
    const subscriptions = JSON.parse(localStorage.getItem('subscriptions') || []);
    let updatedSubscriptions;
    
    if (isSubscribed) {
      updatedSubscriptions = subscriptions.filter(id => id !== channelId);
    } else {
      updatedSubscriptions = [...subscriptions, channelId];
    }
    
    localStorage.setItem('subscriptions', JSON.stringify(updatedSubscriptions));
    setIsSubscribed(!isSubscribed);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Generate animated profile photo URL based on username
  const getAnimatedAvatar = (username) => {
    const colors = ['ffadad', 'ffd6a5', 'fdffb6', 'caffbf', '9bf6ff', 'a0c4ff', 'bdb2ff', 'ffc6ff'];
    const color = colors[username.length % colors.length];
    return `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${username}&backgroundColor=${color}`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Comments ({comments.length})</h2>
        <button
          onClick={handleToggleSubscribe}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            isSubscribed 
              ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
              : 'bg-red-600 text-white hover:bg-red-700'
          }`}
        >
          {isSubscribed ? 'Subscribed' : 'Subscribe'}
        </button>
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleAddComment} className="mb-8">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <img
              src={getAnimatedAvatar("You")}
              alt="Your profile"
              className="h-10 w-10 rounded-full transition-transform hover:scale-110"
            />
          </div>
          <div className="flex-1 min-w-0">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              rows="2"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  newComment.trim() 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                Comment
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <div className="text-center py-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3 group">
              <div className="flex-shrink-0">
                <img
                  src={getAnimatedAvatar(comment.author)}
                  alt={comment.author}
                  className="h-10 w-10 rounded-full transition-transform group-hover:scale-110"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="bg-gray-50 p-4 rounded-lg group-hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{comment.author}</h4>
                    <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                  </div>
                  <p className="mt-1 text-gray-700">{comment.text}</p>
                  <div className="mt-2 flex items-center">
                    <button
                      onClick={() => handleLikeComment(comment.id)}
                      className="flex items-center text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1"
                        fill="none"
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
                      <span className="text-sm">{comment.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;