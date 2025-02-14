'use client';
import React from "react";
import SideNav from "@/components/sidenav";
import Image from "next/image";
import { useState } from "react";
import PostCard from "@/components/post";
import Stories from "@/components/stories";

export default function Home() {
  
  const users = [
    { name: "mistir_zz", mutual: "meri06564 + 7 more", img: "/user1.jpg" },
    { name: "instagram", mutual: "modernsciencex ...", img: "/instagram.jpg", verified: true },
    { name: "lidet_tesfaye21", mutual: "meri06564 + 23 ...", img: "/user2.jpg" },
    { name: "ashertade", mutual: "meri06564 + 11 ...", img: "/user3.jpg" },
    { name: "giftiko_", mutual: "meri06564 + 6 ...", img: "/user4.jpg" },
  ];

  return (
    <div className="bg-black text-white flex w-full ">
      <div className="w-64"><SideNav /></div>

      <div className="flex  flex-grow p-6 ">
        {/* Stories Section */}
        <div className="flex flex-col pr-20 pl-20 max-w-fit ">
          <Stories/>
        

        {/* Posts Section */}
        <div className="pl-14 pr-14" >
          <PostCard />

        </div> </div>
        <div className="flex flex-col flex-1 bg-red h-fit  p-6 text-white">
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
      <div className="mt-4">
        <div className="flex justify-between text-gray-400 text-sm">
          <p>Suggested for you</p>
          <button className="text-white font-semibold">See All</button>
        </div>
        {users.map((user, index) => (
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
