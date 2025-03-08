import React, { useState } from 'react';
import { Home, Search, Compass, Clapperboard, Send, Heart, PlusSquare, User, Menu, MessageCircle } from "lucide-react";
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { FaInstagram } from "react-icons/fa";
import Image from "next/image";
import Searchnav from '@/app/drawrers/search';
import Notifications from '@/app/drawrers/notifications';
import useEffect  from 'react';
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

// Navigation items array
export default function Sidenav({ value = false }) {
  const theme = useTheme();
  const [open, setOpen] = useState(value);
  const [openNot, setOpenNot] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const navItems = [
    { icon: <Home />, label: "Home", href: "/" },
    { icon: <Search />, label: "Search", href: null, onClick: () => setOpenSearch(true) },
    { icon: <Compass />, label: "Explore", href: "/explore" },
    { icon: <Clapperboard />, label: "Reels", href: "/reels" },
    { icon: <Send />, label: "Messages", badge: "2", href: "/messages" },
    { icon: <Heart />, label: "Notifications", href: null, onClick: () => setOpenNot(true) },
    { icon: <PlusSquare />, label: "Create", href: "/create" },
    { icon: <User />, label: "Profile", href: "/profile" },
  ];

  return (
    <>
      <div className="bg-black z-40 min-h-screen hidden md:flex md:flex-col">
        <Drawer variant="permanent" open={open}>
          <Box className="text-white flex pl-4 mt-10 font-pacifico">
            {open ? (
              <Typography variant="h6" className="font-pacifico">
                Instagram
              </Typography>
            ) : (
              <FaInstagram className="text-2xl" />
            )}
          </Box>

          <List>
            {navItems.map(({ icon, label, href, onClick }, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  href={href}
                  className="hover:bg-gray-800 transition duration-300"
                  onClick={onClick}
                >
                  <ListItemIcon className="text-white">{icon}</ListItemIcon>
                  <ListItemText primary={label} className="text-white" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>

      {openNot && <Notifications />}
      {openSearch && <Searchnav />}
    </>
  );
}
