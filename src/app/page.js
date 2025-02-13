'use client';
import React from "react";
import SideNav from "@/components/sidenav";
import Image from "next/image";
import { useState } from "react";
import PostCard from "@/components/post";

export default function Home() {
  const[bcolor,setbcolot]=useState(" from-yellow-400 via-pink-500 to-purple-600 ")
  const handleclick=()=>{
    setbcolot(" bg-gray-200")

  }

  return (
    <div className="bg-black text-white flex w-full ">
      <div  className="w-64"><SideNav /></div>
  
      <div className="flex flex-1 flex-col flex-grow p-6">
        {/* Stories Section */}
        <div className="p-4 rounded-md mb-4 flex gap-2">
          <button onClick={handleclick}>
          <Image
  src="/applestore.png"
  width={100}
  height={100}
  alt="sth"
className={`rounded-full object-cover w-16 h-16  p-[2px] bg-gradient-to-r ${bcolor}`}
/>

          </button>
          <button onClick={handleclick}>
          <Image
  src="/applestore.png"
  width={100}
  height={100}
  alt="sth"
className={`rounded-full object-cover w-16 h-16  p-[2px] bg-gradient-to-r ${bcolor}`}
/>

          </button>
          <button onClick={handleclick}>
          <Image
  src="/applestore.png"
  width={100}
  height={100}
  alt="sth"
className={`rounded-full object-cover w-16 h-16  p-[2px] bg-gradient-to-r ${bcolor}`}
/>

          </button>
          <button onClick={handleclick}>
          <Image
  src="/applestore.png"
  width={100}
  height={100}
  alt="sth"
className={`rounded-full object-cover w-16 h-16  p-[2px] bg-gradient-to-r ${bcolor}`}
/>

          </button>
          <button onClick={handleclick}>
          <Image
  src="/applestore.png"
  width={100}
  height={100}
  alt="sth"
className={`rounded-full object-cover w-16 h-16  p-[2px] bg-gradient-to-r ${bcolor}`}
/>

          </button>
          <button onClick={handleclick}>
          <Image
  src="/applestore.png"
  width={100}
  height={100}
  alt="sth"
className={`rounded-full object-cover w-16 h-16  p-[2px] bg-gradient-to-r ${bcolor}`}
/>

          </button>
          <button onClick={handleclick}>
          <Image
  src="/applestore.png"
  width={100}
  height={100}
  alt="sth"
className={`rounded-full object-cover w-16 h-16  p-[2px] bg-gradient-to-r ${bcolor}`}
/>

          </button>

      
         
        </div>

        {/* Posts Section */}
        <div className="p-4 flex flex-col items-center">
          <PostCard/>
          
        </div>
      </div>
    </div>
  );
}
