'use client';
import React, { useEffect, useState } from "react";
import Image from "next/image";
import PostCard from "@/components/post";
import Stories from "@/components/stories";
import Users from "./jsonfiles/user";
import Sidenav from "@/components/sidenav";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated
  useEffect(() => {
    // Check for authentication cookie
    const checkAuth = () => {
      const cookies = document.cookie.split(';');
      const statusCookie = cookies.find(cookie => cookie.trim().startsWith('status='));
      return !!statusCookie;
    };

    const isAuth = checkAuth();
    setIsAuthenticated(isAuth);

    // Redirect to login if not authenticated
    if (!isAuth) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const userData = await Users();
        setUsers(userData.slice(15, 20));
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const [userProfile, setUserProfile] = useState({
    name: "Eden Awoke",
    username: "l_ittl_e_wolf",
    image: "/profile1.jpg"
  });

  // Try to get the logged-in user from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const userData = JSON.parse(localStorage.getItem("user") || '{}');
        if (userData && Object.keys(userData).length > 0) {
          setUserProfile({
            name: userData.name || "Eden Awoke",
            username: userData.username || "l_ittl_e_wolf",
            image: userData.image || "/profile1.jpg"
          });
        } else if (session?.user) {
          // Fallback to session if available
          setUserProfile({
            name: session.user.name || "Eden Awoke",
            username: session.user.username || "l_ittl_e_wolf",
            image: session.user.image || "/profile1.jpg"
          });
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [session]);

  // Show loading state or nothing while checking authentication
  if (!isAuthenticated) {
    return (
      <div className="bg-black text-white flex items-center justify-center h-screen">
        <div className="w-8 h-8 border-2 border-t-blue-500 border-r-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-black overflow-hidden text-white flex flex-col md:flex-row w-full min-h-screen">
      <div className="hidden md:flex">
        <Sidenav value="true" />
      </div>

      <div className="flex-1 flex flex-col lg:flex-row max-w-[1600px] mx-auto">
        <div className="flex flex-col w-full lg:w-[600px] items-center px-1 md:px-4">
          <div className="w-full max-w-[600px]">
            <div className="backdrop-blur-sm bg-black/30 rounded-lg mb-4">
              <Stories />
            </div>

            <motion.div
              className="w-full"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <PostCard />
            </motion.div>
          </div>
        </div>

        <div className="fixed w-full top-0 right-10 flex-col lg:w-[320px] xl:w-[380px] border border-zinc-900 rounded-md mt-10 hidden lg:flex p-6 text-white">
          <div className="flex items-center justify-between mb-8 hover:bg-zinc-900/30 p-3 rounded-lg transition-all duration-200">
            <div className="flex items-center">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-pink-500 p-[2px]">
                <Image
                  src={userProfile.image || "/profile1.jpg"}
                  width={56}
                  height={56}
                  alt="Profile"
                  className="rounded-full object-cover"
                />
              </div>
              <div className="ml-3">
                <p className="font-semibold">{userProfile.username}</p>
                <p className="text-sm text-gray-400">{userProfile.name}</p>
              </div>
            </div>
            <button className="text-blue-500 text-sm font-semibold hover:text-white transition-colors duration-200">
              Switch
            </button>
          </div>

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-gray-400 font-medium">Suggested for you</h3>
            <button className="text-white text-sm font-semibold hover:text-gray-300 transition-colors duration-200">
              See All
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-8 h-8 border-2 border-t-blue-500 border-r-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <motion.div
              className="space-y-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {users.map((user, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-between p-2 hover:bg-zinc-900/30 rounded-lg transition-all duration-200"
                  variants={itemVariants}
                >
                  <div className="flex items-center">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={user.image || "/profile1.jpg"}
                          width={48}
                          height={48}
                          alt={user.name}
                          className="rounded-full w-14 h-14 object-fit"
                        />
                      </div>
                      {user.verified && (
                        <div className="absolute -right-1 -bottom-1 bg-blue-500 rounded-full w-4 h-4 flex items-center justify-center text-[8px] border border-black">
                          ✓
                        </div>
                      )}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-sm">{user.name}</p>
                      <p className="text-xs text-gray-400">Followed by {user.mutual}</p>
                    </div>
                  </div>
                  <button className="text-blue-500 text-sm font-semibold hover:text-white transition-colors duration-200">
                    Follow
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          <div className="mt-8 text-xs text-gray-500">
            <div className="flex flex-wrap gap-x-2 gap-y-1 mb-4">
              <a href="#" className="hover:underline">About</a> •
              <a href="#" className="hover:underline">Help</a> •
              <a href="#" className="hover:underline">Press</a> •
              <a href="#" className="hover:underline">API</a> •
              <a href="#" className="hover:underline">Jobs</a> •
              <a href="#" className="hover:underline">Privacy</a> •
              <a href="#" className="hover:underline">Terms</a> •
              <a href="#" className="hover:underline">Locations</a>
            </div>
            <p className="text-gray-600">© 2025 INSTAGRAM FROM META</p>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-3 flex justify-around items-center z-50">
        <button className="text-white text-xl">
          <i className="fas fa-home"></i>
        </button>
        <button className="text-white text-xl">
          <i className="fas fa-search"></i>
        </button>
        <button className="text-white text-xl">
          <i className="fas fa-plus-square"></i>
        </button>
        <button className="text-white text-xl">
          <i className="fas fa-heart"></i>
        </button>
        <button className="text-white text-xl">
          <div className="w-6 h-6 rounded-full overflow-hidden">
            <Image
              src={userProfile.image || "/profile1.jpg"}
              width={24}
              height={24}
              alt="Profile"
              className="rounded-full w-14 h-14 object-fit"
            />
          </div>
        </button>
      </div>
    </div>
  );
}