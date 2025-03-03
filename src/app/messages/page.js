"use client"

import { useState, useEffect } from "react"
import { PhoneCallIcon as Call, Info, Send, Video, SearchIcon, Sidebar } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import Search from "@/components/search"
import Sidenav from "@/components/sidenav"

const userList = [
  { id: 1, name: "Alice Johnson", image: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Bob Smith", image: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Charlie Brown", image: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "Diana Prince", image: "/placeholder.svg?height=40&width=40" },
]

export default function Message() {
  const router = useRouter()
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const value = searchParams.get("value")
    if (value) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(value))
        setSelectedUser(parsedUser)
      } catch (error) {
        console.error("Error parsing user data:", error)
      }
    }
  }, [searchParams])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: "user" }])
      setInputMessage("")
      setTimeout(() => {
        setMessages((prev) => [...prev, { text: "This is a sample response.", sender: "other" }])
      }, 1000)
    }
  }

  const startChat = (user) => {
    setSelectedUser(user)
    setMessages([])
    router.push(`/message?value=${encodeURIComponent(JSON.stringify(user))}`)
  }

  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative flex h-screen bg-zinc-900 text-white">
      {/* Left Panel */}
      <Sidenav value={false}/>

      <div className="flex flex-col w-1/4 px-4 py-6 border-r border-zinc-700">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800 text-white rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SearchIcon className="absolute left-3 top-2.5 text-zinc-400" size={20} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => startChat(user)}
              className={`flex items-center space-x-3 p-3 rounded-md cursor-pointer ${
                selectedUser?.id === user.id ? "bg-zinc-700" : "hover:bg-zinc-800"
              }`}
            >
              <img
                src={user.image || "/placeholder.svg"}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span>{user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <>
            <div className="text-white flex items-center justify-between p-4 border-b border-b-zinc-800">
              <div className="flex items-center space-x-3">
                <img
                  src={selectedUser.image || "/placeholder.svg"}
                  alt={selectedUser.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <p className="text-white font-semibold">{selectedUser.name}</p>
              </div>
              <div className="flex gap-4">
                <Call className="cursor-pointer hover:text-zinc-300" />
                <Video className="cursor-pointer hover:text-zinc-300" />
                <Info className="cursor-pointer hover:text-zinc-300" />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === "user" ? "bg-blue-600" : "bg-zinc-700"}`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="border-t border-zinc-800 p-4 flex items-center space-x-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-zinc-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button type="submit" className="bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition-colors">
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col justify-center items-center text-center">
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-full border p-3 border-zinc-500">
                <svg
                  className="w-10 h-10 text-zinc-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16h6M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold">Your messages</h2>
              <p className="text-zinc-400 text-sm">Select a user to start chatting</p>
              <button 
                onClick={() => setShowSearch(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2"
              >
                Send Message
              </button>
            </div>
          </div>
        )}

        {showSearch && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className=" p-4 rounded-lg w-96 relative">
              <button 
                onClick={() => setShowSearch(false)}
                className="absolute top-4 text-xl right-2 text-white hover:text-zinc-300"
              >
                ×
              </button>
              <Search 
                onSelectUser={(user) => {
                  startChat(user)
                  setShowSearch(false)
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}