'use client'
import React from "react";
import Image from "next/image";
import  { useRouter } from "next/navigation";
import { useState } from "react";



export default function Login() {
  const router=useRouter()
    const [error,setError]=useState("")
    const [loading,setLoading]=useState("Log In")
    async function handleFormSubmit(event) {
      event.preventDefault(); 
      setLoading("Logging In...");
      setError("");
    
      const formData = new FormData(event.currentTarget); // 'currentTarget' refers to the form itself
      const email = formData.get("value");
      const password = formData.get("password");
    
      try {
        const response = await fetch("/api/sessions", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
    
        const data = await response.json();
        const status=false
    
        if (response.ok) {
          document.cookie = "status=true; path=/";
          router.push("/");
        } else {
          console.error("API returned an error:", data);
          setError(data.message || "Sign in failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Error during sign in:", error);
        setError("An unexpected error occurred.");
      } finally {
        setLoading("Log In");
      }
    }
  return (
    <div className="bg-black flex flex-col justify-center items-center h-screen">
      {/* Container for both images and login box */}
      <div>
      <div className="flex w-full max-w-4xl items-center">
        {/* Left Side - Mobile Screens */}
        <div className="flex-1 hidden md:flex justify-center relative">
          <img src="/applestore.png" className="absolute w-60" alt="Mobile UI Back" />
          <img src="/applestore.png" className="relative w-60" alt="Mobile UI Front" />
        </div>
        

        {/* Right Side - Login Form */}
        <div className="flex-1 bg-black p-8 border border-gray-700 rounded-lg">
          <h1 className="text-white text-center text-3xl font-bold mb-6">Instagram</h1>
          <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="value"
            placeholder="Phone number, username, or email"
            className="w-full p-2 mb-2 bg-gray-900 text-white border border-gray-700 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded"
          />
          <p>{error}</p>
          <button className="w-full bg-blue-500 text-white p-2 rounded font-bold" type="submit">
            {loading}
          </button></form>
          <div className="text-center my-3 text-gray-400">OR</div>
          <button className="w-full flex items-center justify-center bg-blue-700 text-white p-2 rounded">
            Log in with Facebook
          </button>
          <p className="text-blue-400 text-center mt-4 cursor-pointer">
            Forgot password?
          </p>
          <div className="text-center mt-6 text-gray-400">
            Don't have an account? <span className="text-blue-400 cursor-pointer">Sign up</span>
          </div>
          <div className="text-white mt-10 flex flex-col items-center">
            <p>Get the app</p>
            <div className="flex gap-2">
                <Image src="/ig.png" width={136} height={40} alt="playstore link to instagram"/>
                <Image src="/applestore.png" width={136} height={40} alt="apple store link to instagram"/>
            </div>
          </div>
        </div>
      </div>

      </div>
      <div className="flex flex-col items-center gap-2">
      <footer className="flex flex-col mt-20">
  <ul className="flex flex-wrap gap-4 justify-center text-gray-500 text-sm">
    <li><a href="https://about.meta.com" target="_blank">Meta</a></li>
    <li><a href="https://about.meta.com/news/" target="_blank">About</a></li>
    <li><a href="https://about.meta.com/news/" target="_blank">Blog</a></li>
    <li><a href="https://www.metacareers.com/" target="_blank">Jobs</a></li>
    <li><a href="https://www.facebook.com/help/" target="_blank">Help</a></li>
    <li><a href="https://developers.facebook.com/" target="_blank">API</a></li>
    <li><a href="https://www.facebook.com/privacy/policy/" target="_blank">Privacy</a></li>
    <li><a href="https://www.facebook.com/terms.php" target="_blank">Terms</a></li>
    <li><a href="https://www.facebook.com/places/" target="_blank">Locations</a></li>
    <li><a href="https://www.instagram.com/lite/" target="_blank">Instagram Lite</a></li>
    <li><a href="https://www.threads.net/" target="_blank">Threads</a></li>
    <li><a href="https://www.facebook.com/help/instagram/366993040048856" target="_blank">Contact Uploading & Non-Users</a></li>
    <li><a href="https://about.meta.com/technologies/meta-verified/" target="_blank">Meta Verified</a></li>

  </ul>
</footer>
<select className=" pl-4  py-2  rounded text-gray-300 text-sm bg-black" >
  <option value="apple">English</option>
  <option value="banana">French</option>
  <option value="cherry">Chinese</option>
</select>

</div>

      
    </div>
  );
}
