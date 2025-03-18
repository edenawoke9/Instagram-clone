'use client'
import { useState, useEffect, useMemo } from 'react';
import MiniDrawer from '@/components/sidenav';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { Modal, Sheet, ModalClose } from '@mui/joy';
import { Divider } from '@mui/material';
import Users from '../jsonfiles/user.js';
import Image from 'next/image';
import axios from 'axios';

export default function Reels() {
  const [reels, setReels] = useState([]);
  const [error, setError] = useState("");
  const id = parseInt(localStorage.getItem("userid"), 10);

  useEffect(() => {
    const fetchreels = async () => {
      try {
        const response = await axios.get(`/api/users/${id}/reels`);
        setReels(response.data);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data");
      }
    };
    fetchreels();
  }, [id]);

  const [openShare, setOpenShare] = useState(false);

  const handleOpenShare = () => setOpenShare(true);
  const handleCloseShare = () => setOpenShare(false);

  return (
    <div className="flex min-h-screen">
      <MiniDrawer value="true" />
      <div className="flex flex-col gap-4 justify-center items-center flex-grow overflow-auto">
        {reels.map((reel, index) => (
          <div className="flex gap-2" key={index}>
            <Box
              component="ul"
              className="flex justify-center items-center w-[400px] h-screen p-0 m-auto"
            >
              <Card component="li" className="w-[400px] min-w-[300px] h-screen relative">
                <CardCover>
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  >
                    <source src={reel.image} type="video/mp4" />
                  </video>
                </CardCover>
                <CardContent className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
                  <div className="flex flex-col justify-end h-full">
                    {/* User Info */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src={reel.user.image || '/defaultUser.png'}
                          alt={reel.user.name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <Typography className="text-white font-bold">
                          {reel.user.name}
                        </Typography>
                        <button className="text-blue-500 text-sm">Follow</button>
                      </div>
                      <Typography className="text-white">
                        {reel.description}
                      </Typography>
                      <div className="bg-black bg-opacity-20 w-fit pr-4 pl-4 rounded-sm text-white">
                        {reel.audio}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Box>
            <div className="flex flex-col justify-end pb-6 gap-2">
              <Heart />
              <span className="text-sm">14.8k</span>
              <MessageCircle />
              <span className="text-sm">140</span>
              <Send onClick={handleOpenShare} />
              <Bookmark />
            </div>
          </div>
        ))}
      </div>
      <Share open={openShare} onClose={handleCloseShare} />
    </div>
  );
}

function Share({ open, onClose }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await Users();
        setUsers(response);
      } catch (error) {
        console.error("Error loading users:", error);
      }
    }
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return users.filter(user => user.name && user.name.toLowerCase().includes(searchLower));
  }, [searchTerm, users]);

  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={onClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Sheet
        variant="outlined"
        className="flex flex-col text-white bg-zinc-800 items-center w-1/3"
        sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
      >
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Typography component="h2" id="modal-title" level="h4" textColor="inherit" sx={{ fontWeight: 'lg', mb: 1 }}>
          Share
        </Typography>
        <Divider />
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-transparent text-white border-none outline-none placeholder-zinc-500 my-4"
          aria-label="Search users"
        />
        <div className="flex gap-4 flex-wrap justify-center">
          {filteredUsers.map((user, index) => (
            <div className="flex flex-col items-center" key={index}>
              <Image
                src={user.image || "/defaultUser.png"}
                alt={user.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <p className="mt-2 text-sm">{user.name}</p>
            </div>
          ))}
        </div>
      </Sheet>
    </Modal>
  );
}