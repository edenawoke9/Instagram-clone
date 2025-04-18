'use client';
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState("Log In");
  const [isLogin, setIsLogin] = useState(true);

  // Toggle between Login and SignUp
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError(""); // Clear any previous errors
  };

  async function handleFormSubmit(event) {
    event.preventDefault();
    setLoading("Logging In...");
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("value");
    const password = formData.get("password");

    try {
      const response = await fetch("/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data)

      if (response.ok) {
        const id = JSON.stringify(data.user_id);
        const user=JSON.stringify(data.user)
        localStorage.setItem("user",user)
        
        localStorage.setItem("userId", id);
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

  // SignUp Component
  // In the SignUp component, first add the bio input field
function SignUp() {
  const [error, setError] = useState("");
  const [loadingg, setLoadingg] = useState("Sign up");

  async function handleSignUp(event) {
    event.preventDefault();
    setLoadingg("Signing Up...");
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const username = formData.get("username");
    const bio = formData.get("bio");

    try {
      const response = await axios.post(
        "api/users",
        { email, name, password, username, bio },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = response.data;
      const id = JSON.stringify(data.user_id);
      const user = JSON.stringify(data.user);

      if (response.status === 201) {
        localStorage.setItem("userId", id);
        localStorage.setItem("user", user);
        document.cookie = "status=true; path=/";
        router.push("/");
      } else {
        console.error("API returned an error:", data);
        setError(data.message || "Sign up failed. Please check your inputs.");
      }
    } catch (error) {
      console.error("Error during sign up:", error);
      setError(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setLoadingg("Sign up");
    }
  }

  return (
    <div>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 mb-2 bg-gray-900 text-white border border-gray-700 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 mb-2 bg-gray-900 text-white border border-gray-700 rounded"
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full p-2 mb-2 bg-gray-900 text-white border border-gray-700 rounded"
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full p-2 mb-2 bg-gray-900 text-white border border-gray-700 rounded"
          required
        />
        <textarea
          name="bio"
          placeholder="Bio (optional)"
          className="w-full p-2 mb-4 bg-gray-900 text-white border border-gray-700 rounded resize-none h-24"
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button 
          className="w-full bg-blue-500 text-white p-2 rounded font-bold hover:bg-blue-600 transition-colors" 
          type="submit"
        >
          {loadingg}
        </button>
      </form>
      <div className="text-center my-3 text-gray-400">OR</div>
      <button className="w-full flex items-center justify-center bg-blue-700 text-white p-2 rounded hover:bg-blue-800 transition-colors">
        Log in with Facebook
      </button>
      <p className="text-blue-400 text-center mt-4 cursor-pointer">
        Forgot password?
      </p>
      <div className="text-center mt-6 text-gray-400">
        Already have an account?{" "}
        <span className="text-blue-400 cursor-pointer" onClick={toggleForm}>
          Log In
        </span>
      </div>
    </div>
  );
}

  return (
    <div className="bg-black flex flex-col justify-center items-center h-screen">
      <div>
        <div className="flex w-full max-w-4xl items-center">
          {/* Left Side - Mobile Screens */}
          <div className="flex-1 hidden md:flex justify-center relative">
            <img src="/applestore.png" className="absolute w-60" alt="Mobile UI Back" />
            <img src="/applestore.png" className="relative w-60" alt="Mobile UI Front" />
          </div>

          {/* Right Side - Login/SignUp Form */}
          <div className="flex-1 bg-black p-8 border border-gray-700 rounded-lg">
            <h1 className="text-white text-center text-3xl font-bold mb-6">Instagram</h1>
            {isLogin ? (
              <div>
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
                  </button>
                </form>
                <div className="text-center my-3 text-gray-400">OR</div>
                <button className="w-full flex items-center justify-center bg-blue-700 text-white p-2 rounded">
                  Log in with Facebook
                </button>
                <p className="text-blue-400 text-center mt-4 cursor-pointer">
                  Forgot password?
                </p>
                <div className="text-center mt-6 text-gray-400">
                  Don't have an account?{" "}
                  <span className="text-blue-400 cursor-pointer" onClick={toggleForm}>
                    Sign up
                  </span>
                </div>
              </div>
            ) : (
              <SignUp />
            )}
            <div className="text-white mt-10 flex flex-col items-center">
              <p>Get the app</p>
              <div className="flex gap-2">
                <Image src="/ig.png" width={136} height={40} alt="playstore link to instagram" />
                <Image src="/applestore.png" width={136} height={40} alt="apple store link to instagram" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <footer className="flex flex-col mt-20">
          <ul className="flex flex-wrap gap-4 justify-center text-gray-500 text-sm">
            {/* Footer links */}
          </ul>
        </footer>
        <select className="pl-4 py-2 rounded text-gray-300 text-sm bg-black">
          <option value="apple">English</option>
          <option value="banana">French</option>
          <option value="cherry">Chinese</option>
        </select>
      </div>
    </div>
  );
}