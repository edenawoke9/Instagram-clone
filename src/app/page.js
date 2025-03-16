'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PostCard from "@/components/post";
import Stories from "@/components/stories";
import Users from "./jsonfiles/user";
import Sidenav from "@/components/sidenav";

export default function Home() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers(){
      const userData = await Users();
      setUsers(userData.slice(15, 22));
      console.log(userData);
    }
    fetchUsers();
  }, []);

  return (
    <div className="bg-black overflow-hidden text-white flex flex-col md:flex-row w-full min-h-screen">
      {/* Sidenav - Hidden on small screens, visible on medium and larger screens */}
      <div className="hidden md:flex">
        <Sidenav value="true" />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Stories and Posts Section */}
        <div className="flex flex-col w-full lg:w-auto items-center ">
          <Stories />
          <div className="flex justify-center w-full">
            <PostCard />
          </div>
        </div>

        {/* Profile and Suggestions Section - Hidden on small and medium screens, visible on large screens */}
        <div className="flex-col w-full ml-10 lg:w-96 h-fit hidden lg:flex p-6 text-white">
          {/* Profile Section */}
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
          <div className="mt-4 flex-col">
            <div className="flex justify-between text-gray-400 text-sm">
              <p>Suggested for you</p>
              <button className="text-white font-semibold">See All</button>
            </div>
            {users.map((user, index) => (
              <div key={index} className="flex items-center justify-between mt-3">
                <div className="flex items-center">
                  <Image src={user.image} width={40} height={40} alt={user.name} className="rounded-full w-14 h-14 object-fit" />
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