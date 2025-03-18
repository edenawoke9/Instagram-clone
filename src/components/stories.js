'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Users from "@/app/jsonfiles/user";

export default function Stories() {
  const [stories, setStories] = useState([]);
  const [showStory, setShowStory] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  // Fetch users and set stories
  useEffect(() => {
    async function fetchUsers() {
      const usersData = await Users();
      setStories(usersData.slice(15, usersData.length));
    }
    fetchUsers();
  }, []);

  // Handle story click
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
    <div className="flex items-center">
      {/* Stories Container */}
      <div className="p-4 rounded-md overflow-x-scroll flex flex-none items-center justify-start max-w-full sm:max-w-[600px] gap-2 pr-6 pl-6">
        {stories.map((story, index) => (
          <button key={index} onClick={() => handleClick(index)} className="flex flex-col items-center">
            <div className="flex justify-center items-center">
              <Image
                src={story.image||"/defaultUser.png"}
                width={100}
                height={100}
                alt="sth"
                className={`rounded-full w-12 h-12 sm:w-14 sm:h-14 p-[2px] bg-gradient-to-r from-pink-600 to-purple-600`}
              />
            </div>
            <span className="truncate text-xs sm:text-sm">{story.name}</span>
          </button>
        ))}
      </div>

      {/* Story Popup */}
      {showStory && activeIndex !== null && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-60 flex flex-col items-center justify-center">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setShowStory(false)}
          >
            ✖
          </button>

          {/* Story Image */}
          <div className="w-full h-full flex items-center justify-center">
            <Image
              src={stories[activeIndex].image}
              width={300}
              height={500}
              alt={stories[activeIndex].name}
              className="w-full h-full  p-4 sm:w-[300px] sm:h-[500px] object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}