"use client"

import { useState, useEffect, useRef, Suspense } from "react"
import { PhoneCallIcon as Call, Info, Send, Video, SearchIcon, Image as ImageIcon, Smile, Mic, PaperclipIcon } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import Search from "@/components/search"
import Sidenav from "@/components/sidenav"
import Image from "next/image"

const userList = [
  { id: 1, name: "Alice Johnson", image: "/defaultUser.png", lastMessage: "Hey, how are you?", time: "2h", unread: 2, isOnline: true },
  { id: 2, name: "Bob Smith", image: "/defaultUser.png", lastMessage: "Did you see the new post?", time: "1d", unread: 0, isOnline: false },
  { id: 5, name: "Eden Awoke", image: "/defaultUser.png", lastMessage: "Check out this video", time: "Just now", unread: 3, isOnline: true },
]

function MessagesContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedUser, setSelectedUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [showSearch, setShowSearch] = useState(false)
  const [showAttachments, setShowAttachments] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Rest of your component logic remains the same...
  // Check for user in URL parameters
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

  // Set Eden Awoke as default user if no user is selected from URL
  useEffect(() => {
    if (!selectedUser && !searchParams.get("value")) {
      const edenAwoke = userList.find(user => user.name === "Eden Awoke")
      if (edenAwoke) {
        setSelectedUser(edenAwoke)
        router.push(`/messages?value=${encodeURIComponent(JSON.stringify(edenAwoke))}`)
      }
    }
  }, [selectedUser, searchParams, router])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (inputMessage.trim()) {
      setMessages([...messages, {
        id: Date.now(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      }])
      setInputMessage("")
      setIsTyping(true)

      setTimeout(() => {
        setIsTyping(false)
        setMessages((prev) => [...prev, {
          id: Date.now() + 1,
          text: "This is a sample response. How can I help you today?",
          sender: "other",
          timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
        }])
      }, 2000)
    }
  }

  const handleAttachment = (type) => {
    setShowAttachments(false)
    const attachmentTypes = {
      image: "Sent an image",
      video: "Sent a video",
      audio: "Sent a voice message",
      file: "Sent a file"
    }
    setMessages([...messages, {
      id: Date.now(),
      text: attachmentTypes[type],
      sender: "user",
      isAttachment: true,
      attachmentType: type,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    }])
  }

  const startChat = (user) => {
    setSelectedUser(user)
    setMessages([])
    router.push(`/messages?value=${encodeURIComponent(JSON.stringify(user))}`)
  }

  const filteredUsers = userList.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="relative flex h-screen bg-zinc-900 text-white">
      <Sidenav value={false}/>

      <div className="flex flex-col w-1/4 px-4 py-6 border-r border-zinc-700">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-4 px-2">Messages</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-800 text-white rounded-full px-4 py-2 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <SearchIcon className="absolute left-3 top-2.5 text-zinc-400" size={20} />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredUsers.map((user,index) => (
            <div
              key={user.id?? index}
              onClick={() => startChat(user)}
              className={`flex items-center justify-between p-3 rounded-md cursor-pointer ${
                selectedUser?.id === user.id ? "bg-zinc-700" : "hover:bg-zinc-800"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <Image
                      src={user.image || "/placeholder.svg"}
                      alt={user.name}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  {user.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-zinc-900"></div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{user.name}</div>
                  <div className="text-xs text-zinc-400 truncate max-w-[120px]">{user.lastMessage}</div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="text-xs text-zinc-400">{user.time}</div>
                {user.unread > 0 && (
                  <div className="bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center mt-1">
                    {user.unread}
                  </div>
                )}
              </div>
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
                <div key={message.id || index} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                  {message.sender === "other" && (
                    <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                      <Image
                        src={selectedUser.image || "/placeholder.svg"}
                        alt={selectedUser.name}
                        width={32}
                        height={32}
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col">
                    <div
                      className={`max-w-xs px-4 py-2 rounded-lg ${message.sender === "user" ? "bg-blue-600" : "bg-zinc-700"} ${message.isAttachment ? "flex items-center space-x-2" : ""}`}
                    >
                      {message.isAttachment && (
                        <>
                          {message.attachmentType === "image" && <ImageIcon size={16} className="mr-2" />}
                          {message.attachmentType === "video" && <Video size={16} className="mr-2" />}
                          {message.attachmentType === "audio" && <Mic size={16} className="mr-2" />}
                          {message.attachmentType === "file" && <PaperclipIcon size={16} className="mr-2" />}
                        </>
                      )}
                      {message.text}
                    </div>
                    <span className="text-xs text-zinc-500 mt-1 px-1">{message.timestamp}</span>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <Image
                      src={selectedUser.image || "/placeholder.svg"}
                      alt={selectedUser.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-zinc-700 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "200ms" }}></div>
                      <div className="w-2 h-2 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: "400ms" }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className="border-t border-zinc-800 p-4 flex items-center space-x-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowAttachments(!showAttachments)}
                  className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-700"
                >
                  <PaperclipIcon size={20} />
                </button>

                {showAttachments && (
                  <div className="absolute bottom-12 left-0 bg-zinc-800 rounded-lg shadow-lg p-2 flex flex-col space-y-2 border border-zinc-700">
                    <button
                      onClick={() => handleAttachment('image')}
                      className="flex items-center space-x-2 p-2 hover:bg-zinc-700 rounded-md"
                    >
                      <ImageIcon size={18} />
                      <span>Image</span>
                    </button>
                    <button
                      onClick={() => handleAttachment('video')}
                      className="flex items-center space-x-2 p-2 hover:bg-zinc-700 rounded-md"
                    >
                      <Video size={18} />
                      <span>Video</span>
                    </button>
                    <button
                      onClick={() => handleAttachment('audio')}
                      className="flex items-center space-x-2 p-2 hover:bg-zinc-700 rounded-md"
                    >
                      <Mic size={18} />
                      <span>Audio</span>
                    </button>
                    <button
                      onClick={() => handleAttachment('file')}
                      className="flex items-center space-x-2 p-2 hover:bg-zinc-700 rounded-md"
                    >
                      <PaperclipIcon size={18} />
                      <span>File</span>
                    </button>
                  </div>
                )}
              </div>

              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-zinc-800 text-white rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                type="button"
                className="text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-700"
              >
                <Smile size={20} />
              </button>

              <button
                type="submit"
                className="bg-blue-600 rounded-full p-2 hover:bg-blue-700 transition-colors"
                disabled={!inputMessage.trim()}
              >
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

export default function MessagesPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen bg-zinc-900 text-white items-center justify-center">
        <div className="animate-pulse">Loading messages...</div>
      </div>
    }>
      <MessagesContent />
    </Suspense>
  )
}