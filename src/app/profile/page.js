"use client";
import { useState } from 'react';
import Image from 'next/image';
import Sidenav from '@/components/sidenav';

const profileData=JSON.parse(localStorage.getItem("user"))

console.log(profileData)
console.log(profileData.username)




// Tab content components
const TabContent = ({ activeTab }) => {
  switch (activeTab) {
    case 'posts':
      return (
        <>
          <div className="text-5xl mb-4 p-6 rounded-full border-2 border-gray-700">
            <i className="fas fa-camera"></i>
          </div>
          <div className="text-2xl mb-4">Share Photos</div>
          <div className="text-gray-400 mb-6">
            When you share photos, they will appear on your profile.
          </div>
          <button className="text-blue-400 font-bold">Share your first photo</button>
        </>
      );
    case 'saved':
      return (
        <>
          <div className="text-5xl mb-4 p-6 rounded-full border-2 border-gray-700">
            <i className="fas fa-bookmark"></i>
          </div>
          <div className="text-2xl mb-4">Save</div>
          <div className="text-gray-400 mb-6">
            Save photos and videos that you want to see again.
          </div>
        </>
      );
    case 'tagged':
      return (
        <>
          <div className="text-5xl mb-4 p-6 rounded-full border-2 border-gray-700">
            <i className="fas fa-tag"></i>
          </div>
          <div className="text-2xl mb-4">Photos of you</div>
          <div className="text-gray-400 mb-6">
            When people tag you in photos, they'll appear here.
          </div>
        </>
      );
    default:
      return null;
  }
};

export default function Profile() {
  const [activeTab, setActiveTab] = useState('posts');

  return (
    <div className="w-full min-h-screen flex justify-center">
        <Sidenav value={true}/>
      <div className="w-full max-w-[600px] mx-auto p-4 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          
          <div className="text-lg md:text-xl mr-2   font-bold">{profileData.username}</div>
          <div className="flex gap-4 ">
            <button className=" px-4 rounded-lg  bg-zinc-700  text-white font-medium">Edit profile</button>
            <button className=" px-4 rounded-lg  bg-zinc-700  text-white font-medium">View archive</button>
            <button className=" px-4 rounded-lg  bg-zinc-700  text-white font-medium"><i className="fas fa-cog"></i></button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex gap-6 items-center mb-6">
          <div className=" overflow-hidden mr-6 ">
          <div className="   px-2 bg-[#111] border border-gray-700 rounded-lg text-gray-400">Note...</div>
          <div className=' rounded-full m-4 '>
            <Image 
              src={profileData.image||"/defaultUser.png"} 
              width={80} 
              height={80}
              alt="Profile picture" 
             
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
              className=''
            /></div>
          </div>
          <div className="flex-col flex flex-wrap">
            <div className="flex flex-wrap justify-between items-center gap-2 md:gap-4 mb-4 text-center">
              <div className=" flex-1 flex gap-2 ">
                <div className="font-bold text-lg md:text-xl">0</div>
                <div>posts</div>
              </div>
              <div className=" flex-1 flex gap-2">
                <div className="font-bold text-lg md:text-xl">0</div>
                <div>followers</div>
              </div>
              <div className=" flex-1 flex gap-2">
                <div className="font-bold text-lg md:text-xl">0</div>
                <div>following</div>
              </div>
            </div>
            <div className="mb-6">
          <h2 className="text-xl mb-2">{profileData.name}</h2>
          <div className="flex items-center text-gray-400 mb-2">
            <i className="fas fa-at mr-2"></i> <p>@</p>{profileData.username}
          </div>
          <p className="text-gray-300 mb-2">{profileData.bio}</p>
          
        </div>
          </div>
        </div>
        <button className="  mb-2 w-[60px] h-[60px] rounded-full bg-[#111] border border-gray-700 text-white flex items-center justify-center text-2xl cursor-pointer shadow-lg">
          <i className="fas fa-plus"></i>
        </button>

        {/* Bio Section */}
        

        {/* Tabs */}
        <div className="flex justify-around border-t border-b border-gray-700 mb-6">
          <div 
            className={`py-4 flex-1 text-center cursor-pointer ${activeTab === 'posts' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('posts')}
          >
            <i className="fas fa-th"></i> POSTS
          </div>
          <div 
            className={`py-4 flex-1 text-center cursor-pointer ${activeTab === 'saved' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('saved')}
          >
            <i className="fas fa-bookmark"></i> SAVED
          </div>
          <div 
            className={`py-4 flex-1 text-center cursor-pointer ${activeTab === 'tagged' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setActiveTab('tagged')}
          >
            <i className="fas fa-tag"></i> TAGGED
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <TabContent activeTab={activeTab} />
        </div>

        {/* New Post Button */}
        
      </div>
    </div>
  );
}
