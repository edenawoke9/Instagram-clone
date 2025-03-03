'use client'
import { useState } from 'react';
import MiniDrawer from '@/components/sidenav';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Heart, MessageCircle, Send, Bookmark } from 'lucide-react';
import { Modal, Sheet, ModalClose } from '@mui/joy';
import { Divider } from '@mui/material';
import users from '../jsonfiles/user.json';
import Image from 'next/image';
import { useMemo } from 'react';
import { Link } from 'lucide-react';
const videos = [
  {
    src: 'https://assets.codepen.io/6093409/river.mp4',
    owner: 'Eden Awoke',
    followingstatus: 'true',
    description: 'this is a mock video',
    audio: 'song',
  },
  {
    src: 'https://assets.codepen.io/6093409/river.mp4',
    owner: 'Eden Awoke',
    followingstatus: 'true',
    description: 'this is a mock video',
    audio: 'song',
  },
  {
    src: 'https://assets.codepen.io/6093409/river.mp4',
    owner: 'Eden Awoke',
    followingstatus: 'true',
    description: 'this is a mock video',
    audio: 'song',
  },
 
];

export default function Reels() {
  const [openShare, setOpenShare] = useState(false);

  const handleOpenShare = () => setOpenShare(true);
  const handleCloseShare = () => setOpenShare(false);

  return (
    <div className="flex min-h-screen">
      <MiniDrawer value="true" />
      <div className="flex flex-col gap-4 justify-center items-center flex-grow overflow-auto">
        {videos.map((video, index) => (
          <div className="flex gap-2" key={index}>
            <Box
              component="ul"
              className="flex justify-center items-center w-[400px] h-screen p-0 m-auto"
            >
              <Card component="li" className="w-[400px] min-w-[300px] h-screen">
                <CardCover>
                  <video
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover"
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                </CardCover>
                <CardContent>
                  <Typography component="div" className="h-full flex flex-col justify-end text-white">
                    <div>{video.owner} <span>{video.followingstatus ? "following" : "follow"}</span></div>
                    <div>{video.description}</div>
                    <div className="bg-black bg-opacity-20 w-fit pr-4 pl-4 rounded-sm">{video.audio}</div>
                  </Typography>
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

  

  const socialMedia = [
    { name: "Facebook", icon: "/facebook-logo.png" },
    { name: "Messenger", icon: "/messenger.png" },
    { name: "WhatsApp", icon: "/whatsapp.png" },
    { name: "Email", icon: "/email.png" },
    { name: "Threads", icon: "/threads.png" },
  ];

  // Memoize filtered users to prevent recalculating on every render
  const filteredUsers = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    return users.filter(user => 
      user.name.toLowerCase().includes(searchLower)
    );
  }, [searchTerm]);

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
        <Typography
          component="h2"
          id="modal-title"
          level="h4"
          textColor="inherit"
          sx={{ fontWeight: 'lg', mb: 1 }}
        >
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
                src={user.img}
                alt={user.name}
                width={64}
                height={64}
                className="rounded-full"
              />
              <p className="mt-2 text-sm">{user.name}</p>
            </div>
          ))}
        </div>
        <Divider className="my-4" />
        
        <div className="flex gap-4">
          {socialMedia.map((media, index) => (
            <div className="flex flex-col items-center" key={index}>
              <Image
                src={media.icon}
                alt={media.name}
                width={32}
                height={32}
                className='bg-white rounded-full'
              />
              <p className="mt-2 text-sm">{media.name}</p>
            </div>
          ))}

        </div>
        <button className="mt-4 text-blue-500">Copy link</button>
      </Sheet>
    </Modal>
  );
}


