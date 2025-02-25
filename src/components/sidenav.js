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
    <div className="bg-black min-h-screen hidden md:flex ">
     

      <Drawer variant="permanent" open={open} className="flex pl-20">
        <Box className=" text-white flex  mt-10">
          {open ? <Typography variant="h6">Instagram</Typography> : <FaInstagram />}
        </Box>
        

        <List>
          {[
            { icon: <Home />, label: "Home", href: "/" },
            { icon: <Search />, label: "Search", href: "#" },
            { icon: <Compass />, label: "Explore", href: "/explore" },
            { icon: <Clapperboard />, label: "Reels", href: "#" },
            { icon: <Send />, label: "Messages", badge: "2", href: "/messages" },
            { 
              icon: <Heart />, 
              label: "Notifications", 
              href: "#", 
              onClick: handleNotificationClick, // Trigger side menu on click
            },
            { icon: <PlusSquare />, label: "Create", href: "#" },
            { icon: <User />, label: "Profile", href: "#" },
            { icon: <MessageCircle />, label: "Threads", badge: "9+", href: "/messages" },
            { icon: <Menu />, label: "More", href: "#" },
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
      </Drawer>

      {/* Side menu - conditionally rendered */}
      {sideMenuOpen && (
        <div className=" inset-0 bg-black bg-opacity-50 z-10">
          <Box className="absolute  h-screen bg-black text-white">
            <Typography variant="h6">Notification Side Menu</Typography>
            <List>
              <ListItem>
                <ListItemText primary="Notification 1" />
              </ListItem>
              <ListItem>
                <ListItemText primary="Notification 2" />
              </ListItem>
            </List>
            <button onClick={() => setSideMenuOpen(false)} className="mt-4 text-red-500">Close</button>
          </Box>
        </div>
      )}
    </div>
  );
}
