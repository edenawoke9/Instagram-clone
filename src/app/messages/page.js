"use client"
import React from "react";
import Note from "@/components/notes";
import Search from "@/components/search";
import { useState } from "react";

export default function Message() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className="relative flex h-screen bg-black text-white">
      {/* Left Panel */}
      <div className="flex flex-col w-1/4 px-4 py-6 border-r border-gray-700">
        <Note />
        <div className="mt-4">
          <div className="flex justify-between text-gray-400 text-sm">
            <h1 className="font-semibold text-white">Messages</h1>
            <h2 className="cursor-pointer hover:text-gray-300">Requests</h2>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-full border p-3 border-gray-500">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-lg font-semibold">Your messages</h2>
          <p className="text-gray-400 text-sm">Send a message to start a chat.</p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2" onClick={() => setShowSearch(true)}>Send Message</button>

          {/* Modal (Search) Overlay */}
          {showSearch && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
              <div className=" p-2 rounded shadow-lg">
              <button onClick={() => setShowSearch(false)} className="mt-4 p-2 flex justify-end text-white rounded">
                  x
                </button>
                <Search />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2">
                  Send
                </button>
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
