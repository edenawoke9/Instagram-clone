import React, { useRef, useState } from "react";
import { Description, Dialog } from '@headlessui/react';
import { Video } from "lucide-react";
import { Photo } from "@mui/icons-material";
import axios from "axios"; // For making HTTP requests

export default function Create({ open, onClose }) {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

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
      // Step 1: Upload the image to ImgBB
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

      const imageUrl = imgbbResponse.data.data.url; 
      const id=parseInt(localStorage.getItem("userId"),10)
      const description=document.getElementById("description").value

    
      const apiResponse = await axios.post(
        "api/users/id/posts", 
        { image:imageUrl,
        description: description },
        {
            headers: {
                "Content-Type":"application/json"

            }
        }
      );

      console.log("Image uploaded and sent to API:", apiResponse.data);
    } catch (error) {
      console.error("Error uploading image:", error);
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
            <button onClick={onClose} className="text-white flex w-full justify-end hover:text-gray-400">
              ✕
            </button>
            <p className="font-bold text-lg">Create new post</p>
          </div>

          {/* Content */}
          <div className="flex justify-center h-full flex-col items-center">
            <Video />
            <Photo className="-mt-2 text-white" fontSize="large" />
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
              
              onChange={handleFileChange}
            />
           
            <label>
                Description:
                
            </label>
            <input
  id="description"
  placeholder="Description"
  className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
/>
          </div>
        </div>
      </div>
    </Dialog>
  );
}