"use client";
import { useState } from 'react';
import Image from 'next/image';
import Sidenav from '@/components/sidenav';
// Profile data
const profileData = {
  username: 'L_ittl_e_wolf',
  displayName: 'Eden Awoke',
  followers: 184,
  following: 127,
  posts: 0,
  bio: {
    quote: 'Isaiah 40:31',
    description: 'To the stars...'
  },
  profilePicture: '/like.png',}

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
          <div className="absolute top-4 left-4 py-2 px-4 bg-[#111] border border-gray-700 rounded-lg text-gray-400">Note...</div>
          <div className="text-2xl font-bold">{profileData.username}</div>
          <div className="flex gap-4 ">
            <button className="py-2 px-4 rounded-lg  bg-zinc-700  text-white font-medium">Edit profile</button>
            <button className="py-2 px-4 rounded-lg  bg-zinc-700  text-white font-medium">View archive</button>
            <button className="py-2 px-4 rounded-lg  bg-zinc-700  text-white font-medium"><i className="fas fa-cog"></i></button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex items-center mb-6">
          <div className="w-[100px] h-[100px] rounded-full overflow-hidden mr-6 relative">
            <Image 
              src={profileData.profilePicture} 
              width={100} 
              height={100}
              alt="Profile picture" 
             
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </div>
          <div className="profile-details">
            <div className="flex justify-between items-center gap-4 mb-6 text-center">
              <div className=" flex-1 flex gap-2 ">
                <div className="font-bold text-xl">{profileData.posts}</div>
                <div>posts</div>
              </div>
              <div className=" flex-1 flex gap-2">
                <div className="font-bold text-xl">{profileData.followers}</div>
                <div>followers</div>
              </div>
              <div className=" flex-1 flex gap-2">
                <div className="font-bold text-xl">{profileData.following}</div>
                <div>following</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="mb-6">
          <h2 className="text-xl mb-2">{profileData.displayName}</h2>
          <div className="flex items-center text-gray-400 mb-2">
            <i className="fas fa-at mr-2"></i> {profileData.username}
          </div>
          <p className="text-gray-300 mb-2">{profileData.bio.quote}</p>
          <p className="text-gray-300 mb-2">{profileData.bio.description}</p>
        </div>

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
        <button className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[60px] h-[60px] rounded-full bg-[#111] border border-gray-700 text-white flex items-center justify-center text-2xl cursor-pointer shadow-lg">
          <i className="fas fa-plus"></i>
        </button>
      </div>
    </div>
  );
}
