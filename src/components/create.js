import React, { useState } from "react";
import { Dialog } from '@headlessui/react';




import { Video } from "lucide-react";
import { Photo } from "@mui/icons-material";

export default function Create({open,onClose}) {
    
  
    const fileInputRef = React.useRef(null);
 
  const handleFileSelect = () => {
        fileInputRef.current?.click(); 
    };

  return (
  <Dialog open={open} onClose={onClose} > <div className="fixed inset-0 flex items-center justify-center w-screen bg-black bg-opacity-50">
            <div className="bg-zinc-700 text-white rounded-lg w-1/2 h-1/2  shadow-lg">
                
               
                <div className="flex bg-black  flex-col items-center border-b pb-2">
                   <button onClick={onClose} className="text-white flex w-full justify-end hover:text-gray-400">
                        ✕
                    </button>
                    <p className="font-bold text-lg">Create new post</p>
                    
                </div>

                {/* Content */}
                <div className="flex justify-center h-full flex-col items-center ">
                    <Video  />
                    <Photo className="-mt-2 text-white" fontSize="large" />
                    <button 
                        onClick={handleFileSelect} 
                        className="mt-4 px-6 py-2 bg-blue-500 rounded-md hover:bg-blue-600"
                    >
                        Select from computer
                    </button>

                   
                    <input 
                        ref={fileInputRef} 
                        type="file" 
                        className="hidden" 
                    />
                </div>
            </div>
        </div></Dialog>)
  
}

