import { useState } from "react";
import Image from "next/image";

export default function Stories() {
  const initialStories = [
    { name: "lala", image: "/home.png" },
    { name: "lala", image: "/applestore.png" },
    { name: "lala", image: "/like.png" },
    { name: "lala", image: "/applestore.png" },
    { name: "lala", image: "/ig.png" },
    { name: "lala", image: "/applestore.png" },
    { name: "lala", image: "/applestore.png" },
  ];

  const [stories, setStories] = useState(initialStories);
  const [bcolors, setBcolors] = useState(
    Array(initialStories.length).fill("from-yellow-400 via-pink-500 to-purple-600")
  );

  const [showStory, setShowStory] = useState(false);
  const [activeStory, setActiveStory] = useState(null);

  function handleClick(index) {
    setShowStory(true);
    setActiveStory(stories[index]);

    setStories((prev) => {
      const updatedStories = [...prev];
      const [clickedStory] = updatedStories.splice(index, 1);
      updatedStories.push(clickedStory);
      return updatedStories;
    });

    setBcolors((prev) => {
      const updatedBcolors = [...prev];
      const [clickedColor] = updatedBcolors.splice(index, 1);
      updatedBcolors.push("bg-gray-200");
      return updatedBcolors;
    });
  }

  return (
    <div>
      {/* Story List */}
      <div className="p-4 rounded-md mb-4 flex gap-2 pr-6 pl-6">
        {stories.map((story, index) => (
          <button key={index} onClick={() => handleClick(index)}>
            <Image
              src={story.image}
              width={100}
              height={100}
              alt="sth"
              className={`rounded-full object-cover w-16 h-16 p-[2px] bg-gradient-to-r ${bcolors[index]}`}
            />
            <span>{story.name}</span>
          </button>
        ))}
      </div>

      {/* Story Popup */}
      {showStory && activeStory && (
        <div className="fixed top-0 z-40 left-0 w-screen h-screen bg-black bg-opacity-60 flex items-center justify-center">
          <div className="relative">
            <button className="absolute top-4 right-4 text-white text-2xl" onClick={() => setShowStory(false)}>✖</button>
            <Image src={activeStory.image} width={300} height={500} alt={activeStory.name} className="w-[300px] h-[500px]" />
          </div>
        </div>
      )}
    </div>
  );
}
