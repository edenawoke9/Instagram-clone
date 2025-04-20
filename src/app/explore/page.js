'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';



import { useState, useEffect } from "react"
import Image from "next/image"

import axios from "axios"
import { Search, Grid3X3, Film, Bookmark, Heart, MessageCircle } from "lucide-react"
import Sidenav from "@/components/sidenav"
import MobileNav from "@/components/mobileNav"

export default function ExplorePage() {
  const [itemData, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("posts")

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch("/api", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        if (response.ok) {
            console.log(data);
            setPosts(data);
        } else {
            console.log("There is an error", data);
        }
    };
    fetchData();
}, []);


 

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return

    setLoading(true)
    try {
      const response = await axios.get(`/api/search?q=${searchQuery}`)
      setPosts(response.data)
    } catch (error) {
      console.error("Error searching:", error)
      // Filter sample data based on search query
      const filteredPosts = Array(8)
        .fill()
        .map((_, index) => ({
          id: index + 1,
          image: `/placeholder.svg?height=${400 + (index % 3) * 100}&width=${400 + (index % 3) * 100}`,
          likes: Math.floor(Math.random() * 10000),
          comments: Math.floor(Math.random() * 500),
          isVideo: index % 5 === 0,
          user: {
            username: `${searchQuery}_user_${index}`,
            image: "/placeholder.svg?height=32&width=32",
          },
        }))
      setPosts(filteredPosts)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-black  flex text-white">
      <Sidenav />

      <div className=" pb-16 md:pb-0">
        <div className=" flex flex-col w-screen mx-auto px-4 py-6">
          {/* Search bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search"
                className="w-full bg-zinc-900 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-gray-500"
              />
            </div>
          </form>

        
          <div className="flex border-b border-zinc-800 mb-6">
            <button
              className={`flex items-center px-4 py-2 ${activeTab === "posts" ? "border-b-2 border-white" : ""}`}
              onClick={() => setActiveTab("posts")}
            >
              <Grid3X3 size={16} className="mr-2" />
              <span>Posts</span>
            </button>
            <button
              className={`flex items-center px-4 py-2 ${activeTab === "videos" ? "border-b-2 border-white" : ""}`}
              onClick={() => setActiveTab("videos")}
            >
              <Film size={16} className="mr-2" />
              <span>Videos</span>
            </button>
            <button
              className={`flex items-center px-4 py-2 ${activeTab === "saved" ? "border-b-2 border-white" : ""}`}
              onClick={() => setActiveTab("saved")}
            >
              <Bookmark size={16} className="mr-2" />
              <span>Saved</span>
            </button>
          </div>

          
          <Box sx={{ flexGrow: 1, height: "100vh", overflowY: "scroll" }} className="p-10 h-screen relative">

<ImageList variant="masonry" cols={3} gap={8}>
  {itemData.map((item) => (
    <ImageListItem key={item.img}>
      <Image
        srcSet={`${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
        src={`${item.image}?w=248&fit=crop&auto=format`}
        width={248}
        height={248}
        alt={item.description}
        loading="lazy"
      />
    </ImageListItem>
  ))}
</ImageList>
</Box>
        </div>
      </div>

      <MobileNav />
    </div>
  )
}
