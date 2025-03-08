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

// Navigation items array
const navItems = [
  { icon: <Home />, label: "Home", href: "/" },
  { icon: <Search />, label: "Search", href: "/" },
  { icon: <Compass />, label: "Explore", href: "/explore" },
  { icon: <Clapperboard />, label: "Reels", href: "/reels" },
  { icon: <Send />, label: "Messages", badge: "2", href: "/messages" },
  { icon: <Heart />, label: "Notifications", href: "/notifications" },
  { icon: <PlusSquare />, label: "Create", href: "/create" },
  { icon: <User />, label: "Profile", href: "/profile" },
];

export default function Sidenav({ value = false }) {
  const theme = useTheme();
  const [open, setOpen] = useState(value);

  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
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
            {navItems.map(({ icon, label, href }, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  href={href}
                  className="hover:bg-gray-800 transition duration-300"
                >
                  <ListItemIcon className="text-white">{icon}</ListItemIcon>
                  <ListItemText primary={label} className="text-white" />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <div className="h-full flex pl-4 pb-10 text-white items-end">
            <div className="flex flex-col gap-4">
              <Link href="https://www.threads.net/?hl=en" className="flex items-center gap-2">
                <Image src="/threads.png" width={24} height={24} alt="threads" /> 
                {open && (<span>Threads</span>)}
              </Link>
              <div className="flex items-center gap-2">
                <Menu /> {open && (<span>More</span>)}
              </div>
            </div>
          </div>
        </Drawer>
      </div>

      {/* Mobile Bottom Navigation - Visible only on mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 md:hidden z-50">
        <div className="flex justify-around items-center h-16">
          {navItems.slice(0, 5).map(({ icon, label, href }, index) => (
            <Link 
              key={index} 
              href={href}
              className="flex flex-col items-center justify-center text-white p-2"
            >
              <div className="text-2xl">{icon}</div>
              <div className="text-xs mt-1">{label}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}