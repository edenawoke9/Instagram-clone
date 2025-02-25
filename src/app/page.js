'use client';
import React from "react";

import Image from "next/image";
import { useState } from "react";
import PostCard from "@/components/post";
import Stories from "@/components/stories";

import users from "./jsonfiles/user.json"
import MiniDrawer from "@/components/sidenav";

export default function Home() {
  
  

  return (
    <div className="bg-black text-white flex w-screen h-screen overflow-auto">
      <div className="  hidden   md:flex"><MiniDrawer value="true"  /></div>

      <div className="flex-1 flex  p-6 ">
        
        <div className="flex  flex-col md:pr-20 md:pl-20  ">
          <Stories/>
        

        
        <div className=" flex justify-center" >
          <PostCard />

        </div> </div>
        <div className=" flex-col flex-1 bg- h-fit hidden lg:flex p-6 text-white">
        <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image src="/profile1.jpg" width={50} height={50} alt="Profile" className="rounded-full" />
          <div className="ml-3">
            <p className="font-semibold text-sm">l_ittl_e_wolf</p>
            <p className="text-xs text-gray-400">Eden Awoke</p>
          </div>
        </div>
        <button className="text-blue-500 text-sm font-semibold">Switch</button>
      </div>

      {/* Suggested Section */}
      <div className="mt-4  flex-col">
        <div className="flex justify-between text-gray-400 text-sm">
          <p>Suggested for you</p>
          <button className="text-white font-semibold">See All</button>
        </div>
        {users.users.map((user, index) => (
          <div key={index} className="flex items-center justify-between mt-3">
            <div className="flex items-center">
              <Image src={user.img} width={40} height={40} alt={user.name} className="rounded-full" />
              <div className="ml-3">
                <p className="font-semibold text-sm flex items-center">
                  {user.name}
                  {user.verified && <span className="text-blue-500 ml-1">✔</span>}
                </p>
                <p className="text-xs text-gray-400">Followed by {user.mutual}</p>
              </div>
            </div>
            <button className="text-blue-500 text-sm font-semibold">Follow</button>
          </div>
        ))}
      </div>

        </div>
       
      </div>
      
    </div>
  );
}
