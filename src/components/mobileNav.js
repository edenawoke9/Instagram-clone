import React from 'react';
import Link from 'next/link';
import { Home, Search, Compass, Clapperboard, Send, Heart, PlusSquare, User } from "lucide-react";

// Mobile navigation items (limited to 5 for bottom nav)
const mobileNavItems = [
  { icon: <Home size={24} />, label: "Home", href: "/" },
  { icon: <Search size={24} />, label: "Search", href: "/search" },
  { icon: <PlusSquare size={24} />, label: "Create", href: "/create" },
  { icon: <Heart size={24} />, label: "Notifications", href: "/notifications" },
  { icon: <User size={24} />, label: "Profile", href: "/profile" },
];

export default function MobileNav() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {mobileNavItems.map(({ icon, label, href }, index) => (
          <Link 
            key={index} 
            href={href}
            className="flex flex-col items-center justify-center text-white p-2"
          >
            <div>{icon}</div>
            <div className="text-[10px] mt-1">{label}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}