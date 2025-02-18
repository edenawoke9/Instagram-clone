'use client';
import { Home, Search, Compass, Clapperboard, Send, Heart, PlusSquare, User, Menu, MessageCircle } from "lucide-react";
import { Pacifico } from "next/font/google";
import { useState } from "react";
import Link from "next/link";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export default function SideNav() {
  const [expandNav, setExpandNav] = useState(true);

  const handleClick = () => {
    setExpandNav(!expandNav);
  };

  return (
    <aside className={`fixed ${expandNav ? "w-64" : "w-20"} bg-black text-white border-r border-r-zinc-800 p-6 transition-all duration-300`}>
      <p className={`${pacifico.className} text-3xl font-semibold ${!expandNav && "hidden"}`}>Instagram</p>

      <ul className="mt-10 space-y-4">
        {[
          { icon: <Home />, label: "Home", href:"#" },
          { icon: <Search />, label: "Search",href:"#" },
          { icon: <Compass />, label: "Explore",href:"#" },
          { icon: <Clapperboard />, label: "Reels",href:"#" },
          { icon: <Send />, label: "Messages", badge: "2",href:"/messages" },
          { icon: <Heart />, label: "Notifications",href:"#" },
          { icon: <PlusSquare />, label: "Create",href:"#"},
          { icon: <User />, label: "Profile",href:"#" },
          { icon: <MessageCircle />, label: "Threads", badge: "9+",href:"/messages" },
          { icon: <Menu />, label: "More",href:"#" },
        ].map(({ icon, label, badge,href }, index) => (
          <Link href={href} key={index} className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg relative cursor-pointer" onClick={handleClick}  >
            {icon}
            {expandNav && <span>{label}</span>}
            {badge && <span className="absolute right-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">{badge}</span>}
          </Link>
        ))}
      </ul>
    </aside>
  );
}
