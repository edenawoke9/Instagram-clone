'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";

export default function PostCard() {
    const [posts, setPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState({});
    const [likeCounts, setLikeCounts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                setPosts(data);

                // Initialize like counts and liked status for each post
                const initialLikeCounts = {};
                const initialLikedPosts = {};

                data.forEach(post => {
                    initialLikeCounts[post.id] = post.likes_count || Math.floor(Math.random() * 1000);
                    initialLikedPosts[post.id] = false;
                });

                setLikeCounts(initialLikeCounts);
                setLikedPosts(initialLikedPosts);
            } else {
                console.log("There is an error", data);
            }
        };
        fetchData();
    }, []);

    const getTimeDifference = (time) => {
        if (!time) return "2d";

        const created = new Date(time);
        const now = new Date();
        const diffMs = now - created;

        // Convert to seconds, minutes, hours, days
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);

        // Format based on time difference
        if (diffSeconds < 60) {
            return `${diffSeconds}s`;
        } else if (diffMinutes < 60) {
            return `${diffMinutes}m`;
        } else if (diffHours < 24) {
            return `${diffHours}h`;
        } else if (diffDays < 7) {
            return `${diffDays}d`;
        } else if (diffDays < 30) {
            return `${Math.floor(diffDays / 7)}w`;
        } else {
            return `${Math.floor(diffDays / 30)}mo`;
        }
    };

    const handleLike = (postId) => {
        // Toggle liked status for this specific post
        setLikedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId]
        }));

        // Update like count based on liked status
        setLikeCounts(prev => ({
            ...prev,
            [postId]: prev[postId] + (likedPosts[postId] ? -1 : 1)
        }));
    };

    return (
        <div>
            {posts.map((post, index) => (
                <div key={index} className="bg-black text-white overflow-hidden border-b border-gray-700">
                    <div className="flex p-4">
                        <Image
                            src={post.user.image || "/profile1.jpg"}
                            width={40}
                            height={40}
                            alt="Profile"
                            className="rounded-full"
                        />
                        <div className="ml-3 flex-1">
                            <p className="font-semibold text-sm">
                                {post.user.name || "Name Here"} <span className="text-blue-500">✔</span>
                            </p>
                            <p className="text-xs text-gray-400">{getTimeDifference(post.created_at)}</p>
                        </div>
                        <div className="text-gray-400 text-lg">⋮</div>
                    </div>

                    <div className="shadow-inner border-gray-700">
                        {post.is_video ? (
                            <video
                                src={post.image || "/defaultUser.png"}
                                className="w-full h-96 object-cover"
                                controls
                                muted
                            />
                        ) : (
                            <Image
                                src={post.image || "/defaultUser.png"}
                                width={200}
                                height={200}
                                alt="Post"
                                className="w-full h-96 object-fill"
                            />
                        )}
                    </div>

                    <div className="flex justify-between px-4 py-2">
                        <div className="flex space-x-4 text-xl">
                            <button onClick={() => handleLike(post.id)} aria-label="Like">
                                {likedPosts[post.id] ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ed4956" width="24" height="24">
                                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </svg>
                                ) : (
                                    <FaRegHeart className="text-white hover:text-gray-300" />
                                )}
                            </button>
                            <FaRegComment />
                        </div>
                        <FaRegBookmark />
                    </div>

                    <div className="px-4 pb-4 text-sm">
                        <p className="font-semibold">{likeCounts[post.id] || 0} likes</p>
                        <p>
                            <span className="font-semibold">{post.user.name || "name here"}</span> {post.description}
                        </p>
                        <button className="text-gray-400">View all 16 comments</button>
                        <textarea
                            className="text-gray-400 border-none focus:ring-0 focus:outline-none bg-black block"
                            type="text"
                            placeholder="Add comment"
                        ></textarea>
                    </div>
                </div>
            ))}
        </div>
    );
}