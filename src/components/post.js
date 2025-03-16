'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";

export default function PostCard() {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(0);
    const [posts, setPosts] = useState([]);

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
            } else {
                console.log("There is an error", data);
            }
        };
        fetchData();
    }, []);

    const getTimeDifference = (time) => {
        const created = new Date(time);
        const now = new Date();
        const diffMs = now - created;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));
        return `${diffMinutes} minutes ago`;
    };

    const handleLike = () => {
        setIsLiked((prev) => !prev);
        setLikes((prevLikes) => prevLikes + 1);
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
                        <Image
                            src={post.image || "/profile1.jpg"}
                            width={400}
                            height={300}
                            alt="Post"
                            className="w-full"
                        />
                    </div>

                    <div className="flex justify-between px-4 py-2">
                        <div className="flex space-x-4 text-xl">
                            <button onClick={handleLike} aria-label="Like">
                                {isLiked ? (
                                    <Image src="/like.png" width={20} height={20} alt="Liked" />
                                ) : (
                                    <FaRegHeart />
                                )}
                            </button>
                            <FaRegComment />
                        </div>
                        <FaRegBookmark />
                    </div>

                    <div className="px-4 pb-4 text-sm">
                        <p className="font-semibold">{likes} likes</p>
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