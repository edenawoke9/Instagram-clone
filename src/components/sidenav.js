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

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = useState(true);

  const handleClick = (href) => {
    if (href === "/messages") {
      setOpen(false);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <CssBaseline />

      <Drawer variant="permanent" open={open}>
        <Box className="p-4 text-white">
          <Typography variant="h6">Instagram</Typography>
        </Box>
        <Divider className="bg-gray-700" />

        <List>
          {[
            { icon: <Home />, label: "Home", href: "#" },
            { icon: <Search />, label: "Search", href: "#" },
            { icon: <Compass />, label: "Explore", href: "#" },
            { icon: <Clapperboard />, label: "Reels", href: "#" },
            { icon: <Send />, label: "Messages", badge: "2", href: "/messages" },
            { icon: <Heart />, label: "Notifications", href: "#" },
            { icon: <PlusSquare />, label: "Create", href: "#" },
            { icon: <User />, label: "Profile", href: "#" },
            { icon: <MessageCircle />, label: "Threads", badge: "9+", href: "/messages" },
            { icon: <Menu />, label: "More", href: "#" },
          ].map(({ icon, label, href }, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => handleClick(href)} className="hover:bg-gray-800 transition duration-300">
                <ListItemIcon className="text-white">{icon}</ListItemIcon>
                <ListItemText primary={label} className="text-white" />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
}
