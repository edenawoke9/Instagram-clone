'use client';
import { Home, Search, Compass, Clapperboard, Send, Heart, PlusSquare, User, Menu, MessageCircle } from "lucide-react";
import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import "@fontsource/pacifico"; // Import for global use


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
  backgroundColor: 'black',
  color: 'white',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
  backgroundColor: 'black',
  color: 'white',
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open ? {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  } : {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function MiniDrawer({value}) {
  const theme = useTheme();
  const [open, setOpen] = useState(value);
  const [sideMenuOpen, setSideMenuOpen] = useState(false); // State to control side menu visibility

  const handleNotificationClick = () => {
    setSideMenuOpen(!sideMenuOpen); 
    setOpen(false)// Toggle side menu visibility
  };

  return (
    <div className="bg-black  min-h-screen hidden md:flex md:flex-col ">
     
     

      <Drawer variant="permanent" open={open} >
      <Box className="text-white flex pl-4 mt-10 font-pacifico  ">
          {open ? (
            <Typography variant="h6" className="font-pacifico">
              Instagram
            </Typography>
          ) : (
            <FaInstagram className="text-2xl"/>
          )}
        </Box>
        

        <List>
          {[
            { icon: <Home />, label: "Home", href: "/" },
            { icon: <Search />, label: "Search", href: "#" },
            { icon: <Compass />, label: "Explore", href: "/explore" },
            { icon: <Clapperboard />, label: "Reels", href: "/reels" },
            { icon: <Send />, label: "Messages", badge: "2", href: "/messages" },
            { 
              icon: <Heart />, 
              label: "Notifications", 
              href: "#", 
              onClick: handleNotificationClick, // Trigger side menu on click
            },
            { icon: <PlusSquare />, label: "Create", href: "#" },
            { icon: <User />, label: "Profile", href: "#" },
           
          ].map(({ icon, label, href, onClick }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton
                href={href}
                onClick={onClick ? onClick : () => {}}
                className="hover:bg-gray-800 transition duration-300"
              >
                <ListItemIcon className="text-white">{icon}</ListItemIcon>
                <ListItemText primary={label} className="text-white" />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <div className="h-full flex pl-4 pb-10  text-white items-end">
          <div className="flext flex-col gap-4">
           <Link href="https://www.threads.net/?hl=en" className="flex"><Image src="/threads.png" width={24} height={24} alt="threads"/> <span>Threads</span></Link > 
           <div className="flex"><Menu/> <span>More</span></div>

          </div>
        </div>
      </Drawer>
     


     
      {sideMenuOpen && (
        <div className="  bg-black bg-opacity-50 z-10">
          <Box className="absolute left-20  h-screen p-2 bg-black text-white">
          <button onClick={() => setSideMenuOpen(false)} className="mt-4 text-xl font-bold pr-4 w-full flex justify-end">X</button>
            <Typography className="text-2xl font-semibold">Notification Side Menu</Typography>
            <List className="flex flex-col gap-2">
              <ListItem >
                <p className="text-xl font-normal"> this is Notification</p>              </ListItem>
              <ListItem>
                <p className="text-xl font-normal"> this is Notification</p>              </ListItem>
            </List>
            
          </Box>
        </div>
      )}
    </div>
  );
}
