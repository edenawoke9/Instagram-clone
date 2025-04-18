"use client";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Sidenav from '@/components/sidenav';
import Create from '@/components/create';
import axios from 'axios';
import { FaPlus } from 'react-icons/fa';




export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [open, closeCreate] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loadingComments, setLoadingComments] = useState(false);
  const [id, setId] = useState(null);
  const [profileData, setProfileData] = useState({});

  useEffect(() => {
    // Client-side only access
    if (typeof window !== 'undefined') {
     
      const userData = JSON.parse(localStorage.getItem("user") || {});
     
      setId(userData.id);
      setProfileData(userData);
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`api/users/${id}/individual_post`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPosts(response.data); // Store fetched posts in state
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchPosts();
  }, [id]);

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
      const response = await axios.get(`api/users/${id}/posts/${postId}/comments`, {
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

  // Handle post deletion
  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`api/users/${id}/posts/${postId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // Remove the deleted post from the state
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  // Handle comment creation
  const handleCreateComment = async (postId) => {
    if (!newComment.trim()) return;
    console.log("in the comment ",id)
   
  
    try {
      const response = await axios.post(`api/users/${id}/posts/${postId}/comments`, {
        body: newComment
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Add the new comment to the comments state
      setComments([...comments, response.data]);
      setNewComment(''); // Clear the input field
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  };

  // Handle comment deletion
  const handleDeleteComment = async (postId, commentId) => {
    try {
      await axios.delete(`api/users/${id}/posts/${postId}/comments/${commentId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Remove the deleted comment from the state
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  // Tab content components
  const TabContent = ({ activeTab }) => {
    if (loading) {
      return <div>Loading...</div>; // Show loading state
    }

    if (activeTab === 'posts') {
      if (posts.length > 0) {
        // If posts exist, display them in a flex row
        return (
          <div className="flex justify-start w-full h-screen flex-wrap gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="w-[150px] h-[150px] relative cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <Image
                  src={post.image}
                  alt="Post"
                  width={400}
                  height={400}
                  className="object-fit mt-4 h-64 w-36 rounded-lg"
                />
              </div>
            ))}
          </div>
        );
      } else {

        return (
          <>
            <div className="text-5xl mb-4 p-6 rounded-full border-2 border-gray-700">
              <i className="fas fa-camera"></i>
            </div>
            <div className="text-2xl mb-4">Share Photos</div>
            <div className="text-gray-400 mb-6">
              When you share photos, they will appear on your profile.
            </div>
            <button
              className="text-blue-400 font-bold"
              onClick={() => closeCreate(true)}
            >
              Share your first photo
            </button>
          </>
        );
      }
    }

    if (activeTab === 'saved') {
      return (
        <>
          <div className="text-5xl mb-4 p-6 rounded-full border-2 border-gray-700">
            <i className="fas fa-bookmark"></i>
          </div>
          <div className="text-2xl mb-4">Save</div>
          <div className="text-gray-400 mb-6">
            Save photos and videos that you want to see again.
          </div>
        </>
      );
    }

    if (activeTab === 'tagged') {
      return (
        <>
          <div className="text-5xl mb-4 p-6 rounded-full border-2 border-gray-700">
            <i className="fas fa-tag"></i>
          </div>
          <div className="text-2xl mb-4">Photos of you</div>
          <div className="text-gray-400 mb-6">
            When people tag you in photos, they'll appear here.
          </div>
        </>
      );
    }

    return null;
  };

  return (
    <div className="w-full min-h-screen flex justify-center">
      <Sidenav value={true} />
      <div className="w-full max-w-[600px] mx-auto p-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-lg md:text-xl mr-2 font-bold">
            {profileData.username || ""}
          </div>
          <div className="flex gap-4">
            <button className="px-4 rounded-lg bg-zinc-700 text-white font-medium">
              Edit profile
            </button>
            <button className="px-4 rounded-lg bg-zinc-700 text-white font-medium">
              View archive
            </button>
            <button className="px-4 rounded-lg bg-zinc-700 text-white font-medium">
              <i className="fas fa-cog"></i>
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex gap-6 items-center mb-6">
          <div className="overflow-hidden mr-6">
            <div className="px-2 bg-[#111] border border-gray-700 rounded-lg text-gray-400">
              Note...
            </div>
            <div className="rounded-full m-4">
              <Image
                src={profileData.image || "/defaultUser.png"}
                width={80}
                height={80}
                alt="Profile picture"
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                className=""
              />
            </div>
          </div>
          <div className="flex-col flex flex-wrap">
            <div className="flex flex-wrap justify-between items-center gap-2 md:gap-4 mb-4 text-center">
              <div className="flex-1 flex gap-2">
                <div className="font-bold text-lg md:text-xl">{posts.length}</div>
                <div>posts</div>
              </div>
              <div className="flex-1 flex gap-2">
                <div className="font-bold text-lg md:text-xl">0</div>
                <div>followers</div>
              </div>
              <div className="flex-1 flex gap-2">
                <div className="font-bold text-lg md:text-xl">0</div>
                <div>following</div>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl mb-2">{profileData.name}</h2>
              <div className="flex items-center text-gray-400 mb-2">
                <i className="fas fa-at mr-2"></i> <p>@</p>
                {profileData.username}
              </div>
              <p className="text-gray-300 mb-2">{profileData.bio}</p>
            </div>
          </div>
        </div>

        {/* Add Post Button */}
        <button
          className="mb-2 w-[60px] h-[60px] rounded-full bg-[#111] border border-gray-700 text-white flex items-center justify-center text-2xl cursor-pointer shadow-lg"
          onClick={() => closeCreate(true)}
        >
          <FaPlus />
        </button>

        {/* Tabs */}
        <div className="flex justify-around border-t border-b border-gray-700 mb-6">
          <div
            className={`py-4 flex-1 text-center cursor-pointer ${activeTab === 'posts' ? 'border-b-2 border-white' : ''
              }`}
            onClick={() => setActiveTab('posts')}
          >
            <i className="fas fa-th"></i> POSTS
          </div>
          <div
            className={`py-4 flex-1 text-center cursor-pointer ${activeTab === 'saved' ? 'border-b-2 border-white' : ''
              }`}
            onClick={() => setActiveTab('saved')}
          >
            <i className="fas fa-bookmark"></i> SAVED
          </div>
          <div
            className={`py-4 flex-1 text-center cursor-pointer ${activeTab === 'tagged' ? 'border-b-2 border-white' : ''
              }`}
            onClick={() => setActiveTab('tagged')}
          >
            <i className="fas fa-tag"></i> TAGGED
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <TabContent activeTab={activeTab} />
        </div>
      </div>

      {/* Create Post Modal */}
      {open && <Create open={open} onClose={() => closeCreate(false)} />}

      {/* Post Modal - Updated to include comments functionality */}
      {selectedPost && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
          <div className="bg-zinc-800 rounded-lg max-w-[1000px] w-full max-h-[90vh] flex overflow-hidden">
            {/* Left side - Image */}
            <div className="w-[60%] flex-shrink-0 bg-black flex items-center justify-center">
              <Image
                src={selectedPost.image}
                alt="Post"
                width={600}
                height={600}
                className="object-contain max-h-[90vh] w-full"
              />
            </div>

            {/* Right side - Comments and interaction */}
            <div className="w-[40%] flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center p-4 border-b border-zinc-700">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                  <Image
                    src={profileData.image || "/defaultUser.png"}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="font-semibold">{profileData.username}</div>
                <div className="ml-auto">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="text-zinc-400 hover:text-white"
                  >
                    <i className="fas fa-ellipsis-h"></i>
                  </button>
                </div>
              </div>

              {/* Comments section */}
              <div className="flex-grow overflow-y-auto p-4 border-b border-zinc-700">
                {/* Post caption */}
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-3 flex-shrink-0">
                    <Image
                      src={profileData.image || "/defaultUser.png"}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="font-semibold mr-2">{profileData.username}</span>
                    <span>{selectedPost.description}</span>
                    <div className="text-xs text-zinc-500 mt-1">1w</div>
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
                          src={comment.user?.image || "/defaultUser.png"}
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
                          {comment.user_id === id && (
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
                    if (e.key === 'Enter' && newComment.trim()) {
                      handleCreateComment(selectedPost.id); // Remove id parameter here
                    }
                  }}
                />
                <button
                  className={`text-blue-500 font-semibold ml-2 ${!newComment.trim() ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  onClick={() => handleCreateComment(selectedPost.id)} // Remove id parameter here
                  disabled={!newComment.trim()}
                >
                  Post
                </button>

              </div>

              {/* Actions */}
              <div className="px-4 py-4">
                <button
                  className="px-4 py-2 bg-red-500 rounded-md text-white hover:bg-red-600 w-full"
                  onClick={() => {
                    handleDeletePost(selectedPost.id);
                    setSelectedPost(null);
                  }}
                >
                  Delete Post
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
