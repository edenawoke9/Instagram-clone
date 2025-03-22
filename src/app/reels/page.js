'use client'
import { useState, useEffect, useMemo, useRef } from 'react';
import SideNav from '@/components/sidenav';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Heart, MessageCircle, Send, Bookmark, Music, Volume2, VolumeX } from 'lucide-react';
import { Modal, Sheet, ModalClose, Button, IconButton, Tooltip } from '@mui/joy';
import { Divider, CircularProgress } from '@mui/material';
import Users from '../jsonfiles/user.js';
import Image from 'next/image';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function Reels() {
  const [reels, setReels] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentReelIndex, setCurrentReelIndex] = useState(0);
  const [likes, setLikes] = useState({});
  const [saved, setSaved] = useState({});
  const [muted, setMuted] = useState(true);
  const videoRefs = useRef([]);
  const id = parseInt(localStorage.getItem("userid"), 10);

  useEffect(() => {
    const fetchreels = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/users/${id}/reels`);
        setReels(response.data);

        // Initialize likes state
        const initialLikes = {};
        const initialSaved = {};
        response.data.forEach(reel => {
          initialLikes[reel.id] = false;
          initialSaved[reel.id] = false;
        });
        setLikes(initialLikes);
        setSaved(initialSaved);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchreels();
  }, [id]);

  // Handle video visibility using IntersectionObserver
  useEffect(() => {
    if (!reels.length) return;

    const observers = [];
    videoRefs.current = videoRefs.current.slice(0, reels.length);

    videoRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCurrentReelIndex(index);
              ref.play().catch(err => console.error("Video play error:", err));
            } else {
              ref.pause();
            }
          });
        },
        { threshold: 0.6 } // Play when 60% of the video is visible
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [reels]);

  const [openShare, setOpenShare] = useState(false);
  const [currentReelForShare, setCurrentReelForShare] = useState(null);

  const handleOpenShare = (reel) => {
    setCurrentReelForShare(reel);
    setOpenShare(true);
  };

  const handleCloseShare = () => setOpenShare(false);

  const toggleLike = (reelId) => {
    setLikes(prev => ({...prev, [reelId]: !prev[reelId]}));
  };

  const toggleSave = (reelId) => {
    setSaved(prev => ({...prev, [reelId]: !prev[reelId]}));
  };

  const toggleMute = () => {
    setMuted(prev => !prev);

    // Apply mute state to all videos
    videoRefs.current.forEach(ref => {
      if (ref) ref.muted = !muted;
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen">
        <SideNav value="true" />
        <div className="flex-grow flex justify-center items-center">
          <CircularProgress />
          <span className="ml-3 text-white">Loading reels...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen">
        <SideNav value="true" />
        <div className="flex-grow flex justify-center items-center">
          <div className="text-red-500 text-center">
            <h3 className="text-xl mb-2">Error Loading Reels</h3>
            <p>{error}</p>
            <Button
              variant="outlined"
              color="danger"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-black text-white">
      <SideNav value="true" />

      {/* Mute/Unmute floating button */}
      <button
        className="fixed top-6 right-6 z-50 bg-black/50 p-2 rounded-full backdrop-blur-sm"
        onClick={toggleMute}
      >
        {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      <div className="flex flex-col gap-4 justify-center items-center flex-grow overflow-auto snap-y snap-mandatory">
        {reels.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[70vh]">
            <div className="text-6xl mb-6">📱</div>
            <h2 className="text-2xl font-bold mb-2">No Reels Found</h2>
            <p className="text-gray-400 text-center max-w-md">
              There are no reels available at the moment. Check back later or create your own!
            </p>
          </div>
        ) : (
          reels.map((reel, index) => (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex gap-4 snap-start snap-always h-screen w-full justify-center items-center"
              key={reel.id}
            >
              <Box
                component="div"
                className="flex justify-center items-center w-[390px] h-[85vh] p-0 relative"
              >
                <Card component="div" className="w-full h-full rounded-xl overflow-hidden border border-zinc-800 shadow-xl">
                  <CardCover>
                    <video
                      ref={el => videoRefs.current[index] = el}
                      loop
                      muted={muted}
                      playsInline
                      className="w-full h-full object-cover"
                    >
                      <source src={reel.image} type="video/mp4" />
                    </video>
                  </CardCover>

                  {/* Progress bar */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-zinc-800">
                    <div className="h-full bg-gradient-to-r from-pink-500 to-purple-500 w-0 reel-progress"></div>
                  </div>

                  {/* Top gradient overlay */}
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black/70 to-transparent pointer-events-none"></div>

                  <CardContent className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Bottom gradient overlay */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 to-transparent pointer-events-none"></div>

                    <div className="flex flex-col justify-end h-full relative z-10">
                      {/* User Info */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                            <Image
                              src={reel.user.image || '/defaultUser.png'}
                              alt={reel.user.name}
                              width={40}
                              height={40}
                              className="rounded-full border-2 border-white"
                            />
                            <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-[2px]">
                              <span className="text-[8px] flex items-center justify-center">✓</span>
                            </div>
                          </div>
                          <Typography className="text-white font-bold">
                            {reel.user.name}
                          </Typography>
                          <Button
                            variant="outlined"
                            color="neutral"
                            size="sm"
                            className="ml-2 text-xs py-0.5 px-2 border border-white/50 text-white hover:bg-white/20"
                          >
                            Follow
                          </Button>
                        </div>
                        <Typography className="text-white text-sm">
                          {reel.description}
                        </Typography>
                        <div className="flex items-center gap-2 mt-2">
                          <Music size={14} />
                          <div className="bg-black/40 backdrop-blur-sm py-1 px-3 rounded-full text-white/90 text-xs flex items-center">
                            {reel.audio || "Original Audio"}
                            <div className="animate-marquee ml-2 truncate max-w-[150px]">
                              {reel.user.name} • {reel.audio || "Original Audio"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Box>

              <div className="flex flex-col justify-end h-[85vh] pb-10 gap-6">
                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center"
                  onClick={() => toggleLike(reel.id)}
                >
                  <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm">
                    <Heart
                      size={24}
                      className={likes[reel.id] ? "text-red-500 fill-red-500" : "text-white"}
                    />
                  </div>
                  <span className="text-xs mt-1 font-medium">14.8k</span>
                </motion.button>

                <motion.button whileTap={{ scale: 0.8 }} className="flex flex-col items-center">
                  <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm">
                    <MessageCircle size={24} />
                  </div>
                  <span className="text-xs mt-1 font-medium">140</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center"
                  onClick={() => handleOpenShare(reel)}
                >
                  <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm">
                    <Send size={24} />
                  </div>
                  <span className="text-xs mt-1 font-medium">Share</span>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.8 }}
                  className="flex flex-col items-center"
                  onClick={() => toggleSave(reel.id)}
                >
                  <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm">
                    <Bookmark
                      size={24}
                      className={saved[reel.id] ? "text-yellow-500 fill-yellow-500" : "text-white"}
                    />
                  </div>
                  <span className="text-xs mt-1 font-medium">Save</span>
                </motion.button>

                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 p-0.5 rounded-md bg-white/20 rotate-45 overflow-hidden">
                    <Image
                      src={reel.user.image || '/defaultUser.png'}
                      alt="Reel cover"
                      width={32}
                      height={32}
                      className="-rotate-45 object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      <Share
        open={openShare}
        onClose={handleCloseShare}
        reel={currentReelForShare}
      />
    </div>
  );
}

function Share({ open, onClose, reel }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const response = await Users();
        setUsers(response);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    }

    if (open) {
      fetchUsers();
      setSelected([]);
    }
  }, [open]);

  const filteredUsers = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return users.filter(user => user.name && user.name.toLowerCase().includes(searchLower));
  }, [searchTerm, users]);

  const toggleSelect = (userId) => {
    setSelected(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
          open={open}
          onClose={onClose}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Sheet
              variant="outlined"
              className="flex flex-col text-white bg-zinc-800 w-full"
              sx={{ maxWidth: 400, borderRadius: 'xl', p: 0, boxShadow: 'lg', overflow: 'hidden' }}
            >
              <div className="p-4 flex items-center justify-between border-b border-zinc-700">
                <Typography component="h2" id="modal-title" level="h4" textColor="inherit" className="font-bold text-center flex-1 ml-8">
                  Share
                </Typography>
                <ModalClose color="neutral" />
              </div>

              {/* Search box */}
              <div className="p-3 border-b border-zinc-700">
                <div className="bg-zinc-900 rounded-lg px-3 py-2 flex items-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-zinc-400 mr-2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent text-white border-none outline-none placeholder-zinc-500"
                    aria-label="Search users"
                  />
                </div>
              </div>

              {/* User list */}
              <div className="overflow-y-auto p-2" style={{ maxHeight: '50vh' }}>
                {loading ? (
                  <div className="flex justify-center items-center p-8">
                    <CircularProgress size={24} />
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {filteredUsers.map((user) => (
                      <motion.div
                        key={user.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`flex items-center p-2 rounded-lg cursor-pointer hover:bg-zinc-700/50 transition-colors ${selected.includes(user.id) ? 'bg-zinc-700/70' : ''}`}
                        onClick={() => toggleSelect(user.id)}
                      >
                        <Image
                          src={user.image || "/defaultUser.png"}
                          alt={user.name}
                          width={48}
                          height={48}
                          className="rounded-full w-12 h-12 object-cover border border-zinc-600"
                        />
                        <div className="ml-3 flex-1">
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-zinc-400">{user.username || "user"}</p>
                        </div>
                        <div className={`w-5 h-5 rounded-full border ${selected.includes(user.id) ? 'bg-blue-500 border-blue-500' : 'border-zinc-400'} flex items-center justify-center`}>
                          {selected.includes(user.id) && (
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                          )}
                        </div>
                      </motion.div>
                    ))}

                    {filteredUsers.length === 0 && (
                      <div className="text-center p-6 text-zinc-400">
                        No users found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Message input area */}
              <div className="p-3 border-t border-zinc-700">
                <textarea
                  className="w-full bg-zinc-900 text-white rounded-lg p-3 outline-none placeholder-zinc-500 text-sm resize-none h-20"
                  placeholder="Write a message..."
                ></textarea>
              </div>

              {/* Send button */}
              <div className="p-3 border-t border-zinc-700">
                <Button
                  color="primary"
                  variant="solid"
                  fullWidth
                  disabled={selected.length === 0}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Send
                </Button>
              </div>
            </Sheet>
          </motion.div>
        </Modal>
      )}
    </AnimatePresence>
  );
}

// Add some custom CSS for animations
const customStyles = `
  @keyframes marquee {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }

  .animate-marquee {
    white-space: nowrap;
    animation: marquee 10s linear infinite;
  }

  .reel-progress {
    animation: progress 15s linear forwards;
  }

  @keyframes progress {
    0% { width: 0; }
    100% { width: 100%; }
  }
`;

// Insert custom styles into document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(customStyles));
  document.head.appendChild(styleElement);
}
