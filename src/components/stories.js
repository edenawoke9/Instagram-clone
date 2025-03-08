'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Users from "@/app/jsonfiles/user";

export default function Stories() {
 
  const [stories, setStories] = useState([]);
  useEffect(()=>{
    async function fetchUsers(){
      const usersData= await Users()
      setStories(usersData.slice(15,usersData.length))

    }
    fetchUsers()

  },[Users])

 
  const [showStory, setShowStory] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  function handleClick(index) {
    setShowStory(true);
    setActiveIndex(index);
  }

  // Effect to handle story progression
  useEffect(() => {
    if (showStory && activeIndex !== null) {
      const timer = setTimeout(() => {
        setStories((prevStories) => {
          const updatedStories = [...prevStories];
          const [seenStory] = updatedStories.splice(activeIndex, 1);
          seenStory.color = "bg-gray-200"; // Mark as seen
          updatedStories.push(seenStory);
          return updatedStories;
        });

        // Move to next story or wrap around
        setActiveIndex((prevIndex) => {
          if (prevIndex < stories.length - 1) return prevIndex + 1;
          return 0;
        });
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [showStory, activeIndex, stories.length]);

  // Effect to close popup when all stories are seen
  useEffect(() => {
    const allSeen = stories.every(story => story.color === "bg-gray-200");
    if (allSeen && showStory) {
      setShowStory(false);
      setActiveIndex(null);
    }
  }, [stories, showStory]);

  return (
    <div>
      {/* Story List */}
      <div className="p-4 rounded-md mb-4 overflow-auto flex flex-none max-w-[600px] gap-2 pr-6 pl-6">
        {stories.map((story, index) => (
          <button key={index} onClick={() => handleClick(index)}>
            <Image
              src={story.image}
              width={100}
              height={100}
              alt="sth"
              className={`rounded-full w-14 h-14 p-[2px] bg-gradient-to-r ${story.color}`}
            />
            <span>{story.name}</span>
          </button>
        ))}
      </div>

      {/* Story Popup */}
      {showStory && activeIndex !== null && (
        <div className="fixed z-40 top-0 left-0 w-screen h-screen bg-black bg-opacity-60 flex items-center justify-center">
          <div className="relative">
            <button
              className="absolute top-4 right-4 text-white text-2xl"
              onClick={() => setShowStory(false)}
            >
              ✖
            </button>
            <Image
              src={stories[activeIndex].image}
              width={300}
              height={500}
              alt={stories[activeIndex].name}
              className="w-[300px] h-[500px]"
            />
          </div>
        </div>
      )}
    </div>
  );
}