// src/components/CommentsSection.js
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";

const CommentsSection = ({ channelId }) => {
  const { id: videoId } = useParams();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editCommentText, setEditCommentText] = useState("");
  const [userReactions, setUserReactions] = useState({});
  const { theme } = useContext(ThemeContext);

  // Load comments and user reactions from localStorage
  useEffect(() => {
    const storedComments = localStorage.getItem(`video_comments_${videoId}`);
    if (storedComments) {
      setComments(JSON.parse(storedComments));
    }

    const storedReactions = localStorage.getItem(`user_reactions_${videoId}`);
    if (storedReactions) {
      setUserReactions(JSON.parse(storedReactions));
    }
  }, [videoId]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      text: newComment,
      author: "You", // In a real app, this would be the logged-in user
      timestamp: new Date().toISOString(),
      likes: 0,
      dislikes: 0,
    };

    const updatedComments = [comment, ...comments];
    setComments(updatedComments);
    localStorage.setItem(`video_comments_${videoId}`, JSON.stringify(updatedComments));
    setNewComment("");
  };

  const handleLikeComment = (commentId) => {
    const currentReaction = userReactions[commentId];
    let reactionChanged = false;
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        // If already liked, remove like
        if (currentReaction === 'like') {
          reactionChanged = true;
          return { ...comment, likes: comment.likes - 1 };
        } 
        // If disliked, remove dislike and add like
        else if (currentReaction === 'dislike') {
          reactionChanged = true;
          return { 
            ...comment, 
            likes: comment.likes + 1,
            dislikes: comment.dislikes - 1 
          };
        }
        // If no reaction, add like
        else {
          reactionChanged = true;
          return { ...comment, likes: comment.likes + 1 };
        }
      }
      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem(`video_comments_${videoId}`, JSON.stringify(updatedComments));
    
    if (reactionChanged) {
      const newReaction = currentReaction === 'like' ? null : 'like';
      const updatedReactions = {
        ...userReactions,
        [commentId]: newReaction
      };
      setUserReactions(updatedReactions);
      localStorage.setItem(`user_reactions_${videoId}`, JSON.stringify(updatedReactions));
    }
  };

  const handleDislikeComment = (commentId) => {
    const currentReaction = userReactions[commentId];
    let reactionChanged = false;
    
    const updatedComments = comments.map(comment => {
      if (comment.id === commentId) {
        // If already disliked, remove dislike
        if (currentReaction === 'dislike') {
          reactionChanged = true;
          return { ...comment, dislikes: comment.dislikes - 1 };
        } 
        // If liked, remove like and add dislike
        else if (currentReaction === 'like') {
          reactionChanged = true;
          return { 
            ...comment, 
            likes: comment.likes - 1,
            dislikes: comment.dislikes + 1 
          };
        }
        // If no reaction, add dislike
        else {
          reactionChanged = true;
          return { ...comment, dislikes: comment.dislikes + 1 };
        }
      }
      return comment;
    });

    setComments(updatedComments);
    localStorage.setItem(`video_comments_${videoId}`, JSON.stringify(updatedComments));
    
    if (reactionChanged) {
      const newReaction = currentReaction === 'dislike' ? null : 'dislike';
      const updatedReactions = {
        ...userReactions,
        [commentId]: newReaction
      };
      setUserReactions(updatedReactions);
      localStorage.setItem(`user_reactions_${videoId}`, JSON.stringify(updatedReactions));
    }
  };

  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter(comment => comment.id !== commentId);
    setComments(updatedComments);
    localStorage.setItem(`video_comments_${videoId}`, JSON.stringify(updatedComments));
    if (editingCommentId === commentId) {
      setEditingCommentId(null);
      setEditCommentText("");
    }
  };

  const handleStartEdit = (comment) => {
    setEditingCommentId(comment.id);
    setEditCommentText(comment.text);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditCommentText("");
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editCommentText.trim()) return;

    const updatedComments = comments.map(comment => {
      if (comment.id === editingCommentId) {
        return { 
          ...comment, 
          text: editCommentText,
          timestamp: new Date().toISOString() // Update timestamp on edit
        };
      }
      return comment;
    });
    
    setComments(updatedComments);
    localStorage.setItem(`video_comments_${videoId}`, JSON.stringify(updatedComments));
    setEditingCommentId(null);
    setEditCommentText("");
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

  // Theme classes
  const containerClasses = theme === 'dark' 
    ? 'bg-gray-800 text-gray-100 rounded-xl shadow-sm p-6'
    : 'bg-white text-gray-900 rounded-xl shadow-sm p-6';

  const commentFormClasses = theme === 'dark'
    ? 'border-gray-600 bg-gray-700 focus:ring-red-500 focus:border-transparent text-white'
    : 'border-gray-300 focus:ring-red-500 focus:border-transparent';

  const commentBoxClasses = theme === 'dark'
    ? 'bg-gray-700 group-hover:bg-gray-600 text-gray-100'
    : 'bg-gray-50 group-hover:bg-gray-100 text-gray-700';

  const editFormClasses = theme === 'dark'
    ? 'bg-gray-700 border-gray-600 text-white'
    : 'bg-gray-50 border-gray-300';

  const emptyStateIconColor = theme === 'dark' ? 'text-gray-500' : 'text-gray-400';
  const emptyStateTextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-500';

  return (
    <div className={containerClasses}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Comments ({comments.length})</h2>
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
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${commentFormClasses}`}
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={!newComment.trim()}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  newComment.trim() 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : theme === 'dark'
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
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
              className={`h-12 w-12 mx-auto mb-3 ${emptyStateIconColor}`}
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
            <p className={emptyStateTextColor}>No comments yet. Be the first to comment!</p>
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
                {editingCommentId === comment.id ? (
                  <form onSubmit={handleSaveEdit} className={`${editFormClasses} p-4 rounded-lg border`}>
                    <textarea
                      value={editCommentText}
                      onChange={(e) => setEditCommentText(e.target.value)}
                      rows="2"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent ${
                        theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white'
                      }`}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          theme === 'dark' 
                            ? 'bg-gray-600 text-gray-200 hover:bg-gray-500' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={!editCommentText.trim()}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          editCommentText.trim() 
                            ? 'bg-red-600 text-white hover:bg-red-700' 
                            : theme === 'dark'
                              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                              : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        Save
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className={`${commentBoxClasses} p-4 rounded-lg transition-colors`}>
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{comment.author}</h4>
                      <span className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {formatDate(comment.timestamp)}
                      </span>
                    </div>
                    <p className="mt-1">{comment.text}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <button
                        onClick={() => handleLikeComment(comment.id)}
                        className={`flex items-center transition-colors ${
                          userReactions[comment.id] === 'like' 
                            ? 'text-red-600' 
                            : theme === 'dark'
                              ? 'text-gray-400 hover:text-red-500'
                              : 'text-gray-500 hover:text-red-600'
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill={userReactions[comment.id] === 'like' ? 'currentColor' : 'none'}
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
                      <button
                        onClick={() => handleDislikeComment(comment.id)}
                        className={`flex items-center transition-colors ${
                          userReactions[comment.id] === 'dislike' 
                            ? 'text-blue-500' 
                            : theme === 'dark'
                              ? 'text-gray-400 hover:text-blue-500'
                              : 'text-gray-500 hover:text-blue-600'
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1"
                          fill={userReactions[comment.id] === 'dislike' ? 'currentColor' : 'none'}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 14H4.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 017.736 3h4.018a2 2 0 01.485.06l3.76.94m-7 10v5a2 2 0 002 2h.096c.5 0 .905-.405.905-.904 0-.715.211-1.413.608-2.008L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
                          />
                        </svg>
                        <span className="text-sm">{comment.dislikes}</span>
                      </button>
                      {comment.author === "You" && (
                        <div className="flex space-x-2 ml-auto">
                          <button
                            onClick={() => handleStartEdit(comment)}
                            className={`transition-colors p-1 ${
                              theme === 'dark' 
                                ? 'text-gray-400 hover:text-gray-200' 
                                : 'text-gray-500 hover:text-gray-700'
                            }`}
                            title="Edit"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className={`transition-colors p-1 ${
                              theme === 'dark' 
                                ? 'text-gray-400 hover:text-red-500' 
                                : 'text-gray-500 hover:text-red-600'
                            }`}
                            title="Delete"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;