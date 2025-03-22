import React, { useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import axios from "axios"; // For making HTTP requests

export default function Create({ open, onClose }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isVideo, setIsVideo] = useState(false); // State to track if the file is a video

  // Handle file selection
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  // Handle file change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      // Step 1: Upload the file to ImgBB (for images) or another service (for videos)
      const formData = new FormData();
      formData.append("image", file);

      const imgbbResponse = await axios.post(
        "https://api.imgbb.com/1/upload?key=4acced4216f74b7e6a57f444c2028c4c", // Replace with your ImgBB API key
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const fileUrl = imgbbResponse.data.data.url; // URL of the uploaded file
      const id = parseInt(localStorage.getItem("userId"), 10);
      const description = document.getElementById("description").value;

      // Step 2: Send the file URL and description to your API
      const apiResponse = await axios.post(
        "api/users/id/posts", // Replace with your API endpoint
        {
          file: fileUrl,
          description: description,
          isVideo: isVideo, // Include whether the file is a video
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("File uploaded and sent to API:", apiResponse.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
      onClose(); // Close the dialog after uploading
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="fixed inset-0 flex items-center justify-center w-screen bg-black bg-opacity-50">
        <div className="bg-zinc-700 text-white rounded-lg w-1/2 h-1/2 shadow-lg">
          <div className="flex bg-black flex-col items-center border-b pb-2">
            <button
              onClick={onClose}
              className="text-white flex w-full justify-end hover:text-gray-400"
            >
              ✕
            </button>
            <p className="font-bold text-lg">Create new post</p>
          </div>

          {/* Content */}
          <div className="flex justify-center  h-fit  flex-col items-center">
            <Image src="/digital-asset.png" width={200} height={200} alt="digital assets logo"/>
            <button
              onClick={handleFileSelect}
              className="mt-4 px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Select from computer"}
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept={isVideo ? "video/*" : "image/*"} // Allow only videos or images based on the selection
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Description Input */}
            <label className="mt-4">
              Description:
              <input
                id="description"
                placeholder="Description"
                className="ml-2 px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>

            {/* Is it Video? Toggle */}
            <label className=" mt-2 mb-4 flex items-center">
              Is it Video?
              <input
                type="checkbox"
                checked={isVideo}
                onChange={(e) => setIsVideo(e.target.checked)}
                className="ml-2 h-5 w-5 rounded"
              />
            </label>
          </div>
        </div>
      </div>
    </Dialog>
  );
}