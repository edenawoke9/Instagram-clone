'use client';
import { useState } from "react";
import Image from "next/image";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";

export default function PostCard() {
    const [like,setlike]=useState("/unlike.png")
    const handlelike=()=>{
        if (like=="/unlike.png"){
            setlike("/like.png")

        }
        else{
            setlike("/unlike.png")
        }
    }
  return (
    <div className="bg-black text-white max-w-md mx-auto rounded-lg overflow-hidden border border-gray-700">
      
      <div className="flex items-center p-4">
        <Image src="/profile1.jpg" width={40} height={40} alt="Profile" className="rounded-full" />
        <div className="ml-3 flex-1">
          <p className="font-semibold text-sm">sarcastic_us <span className="text-blue-500">✔</span></p>
          <p className="text-xs text-gray-400">3m</p>
        </div>
        <div className="text-gray-400 text-lg">⋮</div>
      </div>

      {/* Image */}
      <div className="relative">
        <Image src="/profile1.jpg" width={400} height={300} alt="Post" className="w-full" />
        
      </div>

      {/* Caption */}
      <div className="p-4">
        <p className="font-semibold text-sm">Britannia Croissant reached Delhi University to celebrate valentines and the crowd went WILD</p>
      </div>

      {/* Footer */}
      <div className="flex justify-between px-4 py-2">
        <div className="flex space-x-4 text-xl">
         <button onClick={handlelike}> <Image src={like} width={20} height={20} alt="like status"/></button>
          <FaRegComment />
        </div>
        <FaRegBookmark />
      </div>

      {/* Likes & Comments */}
      <div className="px-4 pb-4 text-sm">
        <p className="font-semibold">713 likes</p>
        <p><span className="font-semibold">sarcastic_us</span> Britannia came to DU to reveal everyone’s secrets 😂❤️</p>
        <p className="text-gray-400">View all 16 comments</p>
      </div>
    </div>
  );
}
