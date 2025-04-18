'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Sidenav from '@/components/sidenav';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Skeleton } from '@mui/material';

export default function UserProfile() {
  const params = useParams();
  const userId = params.userId; // Get user ID from the URL
  const currentUserId = parseInt(localStorage.getItem("user"), 10);

  const [userProfile, setUserProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoadingProfile(true);
      try {
        const response = await axios.get(`/api/users/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUserProfile(response.data);
        setIsFollowing(false); // Placeholder for follow status
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId, currentUserId]);

  // Fetch user posts
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users/${userId}/individual_post`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchPosts();
    }
  }, [userId]);

  // Fetch comments when a post is selected
  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost.id);
    }
  }, [selectedPost]);

  // Function to fetch comments for a post
  const fetchComments = async (postId) => {
    setLoadingComments(true);
    try {
      const response = await axios.get(`/api/users/${userId}/posts/${postId}/comments`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setComments(response.data);
    } catch (error) {
      console.error("Failed to fetch comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  // Handle comment creation
  const handleCreateComment = async (postId) => {
    if (!newComment.trim()) return;

    try {
      const response = await axios.post(`/api/users/${userId}/posts/${postId}/comments`, {
        content: newComment,
        user_id: currentUserId,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (postId, commentId) => {
    try {
      await axios.delete(`/api/users/${userId}/posts/${postId}/comments/${commentId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  // Toggle follow status
  const toggleFollow = async () => {
    try {
      if (isFollowing) {
        await axios.delete(`/api/users/${currentUserId}/following/${userId}`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        await axios.post(`/api/users/${currentUserId}/following`, {
          follow_id: userId,
        }, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Failed to update follow status:", error);
    }
  };

  // Tab content components
  const TabContent = ({ activeTab }) => {
    if (loading) {
      return (
        <div className="grid grid-cols-3 gap-1">
          {[...Array(6)].map((_, i) => (
            <Skeleton
              key={i}
              variant="rectangular"
              width={130}
              height={130}
              className="bg-zinc-700 rounded-md"
            />
          ))}
        </div>
      );
    }

    if (activeTab === 'posts') {
      if (posts.length > 0) {
        return (
          <div className="grid grid-cols-3 gap-1">
            {posts.map((post) => (
              <div
                key={post.id}
                className="aspect-square relative cursor-pointer overflow-hidden"
                onClick={() => setSelectedPost(post)}
              >
                {post.is_video ? (
                  <div className="relative w-full h-full">
                    <video
                      src={post.image}
                      className="object-cover w-full h-full hover:scale-105 transition-transform"
                      muted
                    />
                    {/* Video indicator icon */}
                    <div className="absolute top-2 right-2 text-white bg-black/50 p-1 rounded-full">
                      <i className="fas fa-video"></i>
                    </div>
                  </div>
                ) : (
                  <Image
                    src={post.image}
                    alt="Post"
                    fill
                    className="object-cover hover:scale-105 transition-transform"
                  />
                )}
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div className="flex flex-col items-center justify-center py-8">
            <div className="text-5xl mb-4 p-6 rounded-full border-2 border-gray-700">
              <i className="fas fa-camera"></i>
            </div>
            <div className="text-xl mb-2">No Posts Yet</div>
            <div className="text-gray-400 text-center max-w-md">
              When {userProfile?.username || 'this user'} shares photos, you'll see them here.
            </div>
          </div>
        );
      }
    }

    if (activeTab === 'saved') {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-5xl mb-4 p-6 rounded-full border-2 border-gray-700">
            <i className="fas fa-bookmark"></i>
          </div>
          <div className="text-xl mb-2">Saved</div>
          <div className="text-gray-400 text-center">
            Only {userProfile?.username || 'this user'} can see what they've saved.
          </div>
        </div>
      );
    }

    if (activeTab === 'tagged') {
      return (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="text-5xl mb-4 p-6 rounded-full border-2 border-gray-700">
            <i className="fas fa-tag"></i>
          </div>
          <div className="text-xl mb-2">Photos of {userProfile?.username || 'this user'}</div>
          <div className="text-gray-400 text-center">
            When people tag {userProfile?.username || 'this user'} in photos, they'll appear here.
          </div>
        </div>
      );
    }

    return null;
  };

  // Loading skeleton for profile
  if (loadingProfile) {
    return (
      <div className="w-full min-h-screen flex justify-center bg-black text-white">
        <Sidenav value={true} />
        <div className="w-full max-w-[600px] mx-auto p-4 relative">
          {/* Header skeleton */}
          <div className="flex justify-between items-center mb-6">
            <Skeleton variant="text" width={150} height={32} className="bg-zinc-700" />
            <div className="flex gap-4">
              <Skeleton variant="rounded" width={100} height={36} className="bg-zinc-700" />
            </div>
          </div>

          {/* Profile Info skeleton */}
          <div className="flex gap-6 items-center mb-6">
            <Skeleton variant="circular" width={80} height={80} className="bg-zinc-700" />
            <div className="flex-col flex flex-wrap flex-1">
              <div className="flex gap-4 mb-4">
                <Skeleton variant="text" width={80} height={24} className="bg-zinc-700" />
                <Skeleton variant="text" width={80} height={24} className="bg-zinc-700" />
                <Skeleton variant="text" width={80} height={24} className="bg-zinc-700" />
              </div>
              <Skeleton variant="text" width={200} height={24} className="bg-zinc-700 mb-2" />
              <Skeleton variant="text" width={300} height={20} className="bg-zinc-700" />
            </div>
          </div>

          {/* Tabs skeleton */}
          <div className="flex justify-around border-t border-b border-gray-700 mb-6">
            <Skeleton variant="text" width={120} height={40} className="bg-zinc-700" />
            <Skeleton variant="text" width={120} height={40} className="bg-zinc-700" />
            <Skeleton variant="text" width={120} height={40} className="bg-zinc-700" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex justify-center bg-black text-white">
      <Sidenav value={true} />
      <div className="w-full max-w-[600px] mx-auto p-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg md:text-xl mr-2 font-bold">
            {userProfile?.username || ""}
          </div>
          <div className="flex gap-4">
            {userId === currentUserId ? (
              <>
                <button className="px-4 py-2 rounded-lg bg-zinc-700 text-white font-medium text-sm">
                  Edit profile
                </button>
                <button className="px-4 py-2 rounded-lg bg-zinc-700 text-white font-medium text-sm">
                  <i className="fas fa-cog"></i>
                </button>
              </>
            ) : (
              <button
                className={`px-4 py-2 rounded-lg ${isFollowing ? 'bg-zinc-700 text-white' : 'bg-blue-500 text-white'} font-medium`}
                onClick={toggleFollow}
              >
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            )}
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex gap-6 items-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-zinc-700">
              <Image
                src={userProfile?.image || "/profile1.jpg"}
                width={80}
                height={80}
                alt="Profile picture"
                className="object-cover w-full h-full"
              />
            </div>
            {userProfile?.verified && (
              <div className="absolute -right-1 -bottom-1 bg-blue-500 rounded-full w-5 h-5 flex items-center justify-center text-xs border border-black">
                ✓
              </div>
            )}
          </div>
          <div className="flex-col flex flex-wrap">
            <div className="flex flex-wrap justify-between items-center gap-2 md:gap-4 mb-4 text-center">
              <div className="flex-1 flex gap-2 items-center justify-center">
                <div className="font-bold text-lg md:text-xl">{posts.length}</div>
                <div className="text-sm">posts</div>
              </div>
              <div className="flex-1 flex gap-2 items-center justify-center">
                <div className="font-bold text-lg md:text-xl">{userProfile?.followers_count || 0}</div>
                <div className="text-sm">followers</div>
              </div>
              <div className="flex-1 flex gap-2 items-center justify-center">
                <div className="font-bold text-lg md:text-xl">{userProfile?.following_count || 0}</div>
                <div className="text-sm">following</div>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl mb-2">{userProfile?.name}</h2>
              <div className="flex items-center text-gray-400 mb-2">
                <i className="fas fa-at mr-1"></i>
                <p>{userProfile?.username}</p>
              </div>
              <p className="text-gray-300 mb-2">{userProfile?.bio}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex justify-around border-t border-b border-gray-700 mb-6">
          <div
            className={`py-4 flex-1 text-center cursor-pointer ${
              activeTab === 'posts' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setActiveTab('posts')}
          >
            <i className="fas fa-th"></i> POSTS
          </div>
          {userId === currentUserId && (
            <div
              className={`py-4 flex-1 text-center cursor-pointer ${
                activeTab === 'saved' ? 'border-b-2 border-white' : ''
              }`}
              onClick={() => setActiveTab('saved')}
            >
              <i className="fas fa-bookmark"></i> SAVED
            </div>
          )}
          <div
            className={`py-4 flex-1 text-center cursor-pointer ${
              activeTab === 'tagged' ? 'border-b-2 border-white' : ''
            }`}
            onClick={() => setActiveTab('tagged')}
            >
            <i className="fas fa-tag"></i> TAGGED
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col items-center justify-center min-h-[300px]">
          <TabContent activeTab={activeTab} />
        </div>
      </div>

      {/* Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-zinc-800 rounded-lg max-w-[1000px] w-full max-h-[90vh] flex overflow-hidden">
            {/* Left side - Media (Image or Video) */}
            <div className="w-[60%] flex-shrink-0 bg-black flex items-center justify-center">
              {selectedPost.is_video ? (
                <video
                  src={selectedPost.image}
                  controls
                  autoPlay
                  className="object-contain max-h-[90vh] w-full"
                />
              ) : (
                <Image
                  src={selectedPost.image}
                  alt="Post"
                  width={600}
                  height={600}
                  className="object-contain max-h-[90vh] w-full"
                />
              )}
            </div>

            {/* Right side - Comments and interaction */}
            <div className="w-[40%] flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center p-4 border-b border-zinc-700">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                  <Image
                    src={userProfile?.image || "/profile1.jpg"}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="font-semibold">{userProfile?.username}</div>
                <div className="ml-auto">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-zinc-400 hover:text-white"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              </div>

              {/* Comments section */}
              <div className="flex-grow overflow-y-auto p-4 border-b border-zinc-700">
                {/* Post caption */}
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                    <Image
                      src={userProfile?.image || "/profile1.jpg"}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-semibold mr-2">{userProfile?.username}</span>
                    <span>{selectedPost.description}</span>
                    <div className="text-xs text-zinc-500 mt-1">
                      {new Date(selectedPost.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Comments */}
                {loadingComments ? (
                  <div className="flex justify-center items-center py-4">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-300"></div>
                  </div>
                ) : comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment.id} className="flex mb-4 group">
                      <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0 bg-zinc-600">
                        <Image
                          src={comment.user?.image || "/profile1.jpg"}
                          alt="User"
                          width={32}
                          height={32}
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <div>
                          <span className="font-semibold mr-2">{comment.user?.username || "User"}</span>
                          <span>{comment.content}</span>
                        </div>
                        <div className="text-xs text-zinc-500 mt-1 flex items-center">
                          <span>{new Date(comment.created_at).toLocaleDateString()}</span>
                          {comment.user_id === currentUserId && (
                            <button
                              onClick={() => handleDeleteComment(selectedPost.id, comment.id)}
                              className="ml-2 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center text-zinc-500 py-4">
                    No comments yet. Be the first to comment!
                  </div>
                )}
              </div>

              {/* Interaction buttons */}
              <div className="p-4 border-b border-zinc-700">
                <div className="flex justify-between mb-2">
                  <div className="flex gap-4">
                    <button className="text-xl hover:text-zinc-400">
                      <i className="far fa-heart"></i>
                    </button>
                    <button className="text-xl hover:text-zinc-400">
                      <i className="far fa-comment"></i>
                    </button>
                    <button className="text-xl hover:text-zinc-400">
                      <i className="far fa-paper-plane"></i>
                    </button>
                  </div>
                  <button className="text-xl hover:text-zinc-400">
                    <i className="far fa-bookmark"></i>
                  </button>
                </div>
                <div className="font-semibold mb-1">{comments.length} comments</div>
                <div className="text-xs text-zinc-500">
                  {new Date(selectedPost.created_at).toLocaleDateString().toUpperCase()}
                </div>
              </div>

              {/* Comment input */}
              <div className="p-4 flex items-center border-b border-zinc-700">
                <button className="text-xl mr-3">
                  <i className="far fa-smile"></i>
                </button>
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-grow bg-transparent outline-none"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCreateComment(selectedPost.id);
                    }
                  }}
                />
                <button
                  className={`text-blue-500 font-semibold ml-2 ${!newComment.trim() ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleCreateComment(selectedPost.id)}
                  disabled={!newComment.trim()}
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}