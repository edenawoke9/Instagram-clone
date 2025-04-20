'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Users from "@/app/jsonfiles/user";
function Stories() {
  const [showStory, setShowStory] = useState(false)
  const [activeIndex, setActiveIndex] = useState(null)
  const [progress, setProgress] = useState(0)
  const [storyInterval, setStoryInterval] = useState(null)
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers(){
      const userData = await Users();
      setUsers(userData.slice(15,22));
    }
    fetchUsers();
  }, []);

function handleClick(index) {
  setShowStory(true)
  setActiveIndex(index)
  setProgress(0)


  if (storyInterval) {
    clearInterval(storyInterval)
  }

  const interval = setInterval(() => {
    setProgress((prev) => {
      if (prev >= 100) {
        clearInterval(interval)

    
        setActiveIndex((prevIndex) => {
          if (prevIndex < users.length - 1) {
            setProgress(0)
            return prevIndex + 1
          } else {
            setShowStory(false)
            return null
          }
        })

        return 0
      }
      return prev + 2 
    })
  }, 100)

  setStoryInterval(interval)
}

useEffect(() => {
  return () => {
    if (storyInterval) {
      clearInterval(storyInterval)
    }
  }
}, [storyInterval])

return (
  <div>
    <div className="p-4 rounded-md overflow-x-auto scrollbar-hide flex flex-none items-center justify-start max-w-full sm:max-w-[600px] gap-4 pr-6 pl-6">
      {users.map((story, index) => (
        <button key={index} onClick={() => handleClick(index)} className="flex flex-col items-center min-w-[70px]">
          <div
            className={`p-[2px] rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 ${story.color === "bg-gray-200" ? "opacity-50" : ""}`}
          >
            <div className="p-[2px] bg-black rounded-full">
              <Image
                src={story.image || "/defaultUser.png"}
                width={60}
                height={60}
                alt={story.name}
                className="rounded-full w-14 h-14 object-fit"
              />
            </div>
          </div>
          <span className="truncate text-xs mt-1 max-w-[70px]">{story.name}</span>
        </button>
      ))}
    </div>

 
    {showStory && activeIndex !== null && (
      <div className="w-full fixed h-screen bg-black bg-opacity-90 flex justify-center">
     
      <div className="z-50 fixed   flex items-center justify-center"> 
       
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-800">
          <div
            className="h-full bg-white transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

       
        {activeIndex > 0 && (
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation()
              setActiveIndex((prev) => prev - 1)
              setProgress(0)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}

        {activeIndex < users.length - 1 && (
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation()
              setActiveIndex((prev) => prev + 1)
              setProgress(0)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        )}

        <button
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2"
          onClick={() => {
            setShowStory(false)
            if (storyInterval) {
              clearInterval(storyInterval)
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* User info */}
        <div className="absolute top-6 left-4 flex items-center">
          <Image
            src={users[activeIndex].image || "/defaultUser.png"}
            width={32}
            height={32}
            alt={users[activeIndex].name}
            className="rounded-full w-14 h-14 object-fit border-2 border-white"
          />
          <span className="ml-2 text-white font-semibold">{users[activeIndex].name}</span>
          <span className="ml-2 text-gray-300 text-sm">1h</span>
        </div>

        {/* Story Content */}
        <div
          className="w-full h-full max-w-md flex items-center justify-center p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src={users[activeIndex].image || "/defaultUser.png"}
            width={500}
            height={800}
            alt={users[activeIndex].name}
            className="max-h-[80vh] object-contain w-64 h-screen rounded-lg"
          />
        </div>

        {/* Story input */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center bg-black/30 rounded-full p-2 max-w-md mx-auto">
          <input
            type="text"
            placeholder={`Reply to ${users[activeIndex].name}...`}
            className="bg-transparent border-none flex-1 text-white focus:outline-none focus:ring-0 text-sm"
          />
          <button className="text-white p-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div></div>
    )}
  </div>
)
}

export default Stories