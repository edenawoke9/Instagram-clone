'use client'
import React, {  useState } from 'react';
import Link from 'next/link';
import { Home, Search, Compass, Clapperboard, Send, Heart, PlusSquare, User } from "lucide-react";
import Searchnav from '@/app/drawrers/search';
import Notifications from './notifications';


// Mobile navigation items (limited to 5 for bottom nav)


export default function MobileNav() {
  const [openSearch,setOpenSearch]=useState(false)
  const [openNav,setOpenNav]=useState(false)
  const mobileNavItems = [
    { icon: <Home size={24} />, label: "Home", href: "/" },
    { icon: <Search size={24} />, label: "Search", href: "", onclick :()=>setOpenSearch(true)},
    { icon: <PlusSquare size={24} />, label: "Create", href: "/create" },
    { icon: <Heart size={24} />, label: "Notifications", href: "", onclick:()=>setOpenNav(true)},
    { icon: <User size={24} />, label: "Profile", href: "/profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {mobileNavItems.map(({ icon, label, href,onclick }, index) => (
          <Link 
            key={index} 
            href={href}
            onClick={onclick}
            className="flex flex-col items-center justify-center text-white p-2"
          >
            <div>{icon}</div>
            <div className="text-[10px] mt-1">{label}</div>
          </Link>
        ))}
      </div>
      {openNav&&<Notifications/>}
      {openSearch&&<Searchnav/>}
    </div>
  );
}