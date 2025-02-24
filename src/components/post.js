'use client';
import { useState } from "react";
import Image from "next/image";
import { FaRegHeart, FaRegComment, FaRegBookmark } from "react-icons/fa";

export default function PostCard() {
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        setIsLiked(prev => !prev);
    };

    return (
        <div className="bg-black text-white max-w-md   overflow-hidden border-b border-gray-700 ">
            <div className="flex  p-4">
                <Image src="/profile1.jpg" width={40} height={40} alt="Profile" className="rounded-full" />
                <div className="ml-3 flex-1">
                    <p className="font-semibold text-sm">sarcastic_us <span className="text-blue-500">✔</span></p>
                    <p className="text-xs text-gray-400">3m</p>
                </div>
                <div className="text-gray-400 text-lg">⋮</div>
            </div>

            {/* Image */}
            <div className="shadow-inner border-gray-700">
                <Image src="/profile1.jpg" width={400} height={300} alt="Post" className="w-full" />
            </div>

            {/* Caption */}
            

            {/* Footer */}
            <div className="flex justify-between px-4 py-2">
                <div className="flex space-x-4 text-xl">
                    <button onClick={handleLike}>
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

            {/* Likes & Comments */}
            <div className="px-4 pb-4 text-sm">
                <p className="font-semibold">{isLiked ? "714 likes" : "713 likes"}</p>
                <p><span className="font-semibold">sarcastic_us</span> Britannia came to DU to reveal everyone’s secrets 😂❤️</p>
                <button className="text-gray-400">View all 16 comments</button>
                <textarea className="text-gray-400 border-none focus:ring-0 focus:outline-none bg-black block" type="text" placeholder="Add comment"></textarea>

            </div>
        </div>
    );
}
