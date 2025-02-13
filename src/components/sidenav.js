import { Home, Search, Compass, Clapperboard, Send, Heart, PlusSquare, User, Menu, MessageCircle } from "lucide-react";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });

export default function SideNav() {
  return (
    <aside className="fixed  z-40 w-64 h-screen bg-black text-white border-r border-r-zinc-800 p-6">
      <p className={`${pacifico.className} text-3xl font-semibold`}>Instagram</p>

      <ul className="mt-10 space-y-4">
        <li className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg">
          <Home /> <span>Home</span>
        </li>
        <li className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg">
          <Search /> <span>Search</span>
        </li>
        <li className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg">
          <Compass /> <span>Explore</span>
        </li>
        <li className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg">
          <Clapperboard /> <span>Reels</span>
        </li>
        <li className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg relative">
          <Send /> <span>Messages</span>
          <span className="absolute right-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">2</span>
        </li>
        <li className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg">
          <Heart /> <span>Notifications</span>
        </li>
        <li className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg">
          <PlusSquare /> <span>Create</span>
        </li>
        <li className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg">
          <User /> <span>Profile</span>
        </li>
        <li className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg relative">
          <MessageCircle /> <span>Threads</span>
          <span className="absolute right-4 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">9+</span>
        </li>
        <li className="flex items-center gap-4 p-2 hover:bg-gray-800 rounded-lg">
          <Menu /> <span>More</span>
        </li>
      </ul>
    </aside>
  );
}
