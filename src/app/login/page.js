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
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingg, setLoadingg] = useState("Sign up");

  async function handleSignUp(event) {
    event.preventDefault();
    setLoadingg("Signing Up...");
    setError("");
    setSuccess("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");
    const username = formData.get("username");
    const bio = formData.get("bio");

    try {
      console.log('Signup data:', { email, name, password, username, bio });

      // Make sure we're using the full URL
      const response = await axios.post(
        "/api/users",
        { email, name, password, username, bio },
        {
          headers: { "Content-Type": "application/json" },
          // Add timeout and retry logic
          timeout: 10000
        }
      );

      console.log('Signup response:', response);

      const data = response.data;

      // Check if we have the expected data
      if (!data.user_id || !data.user) {
        console.error('Invalid response data:', data);
        setError('Invalid response from server. Please try again.');
        setLoadingg("Sign up");
        return;
      }

      const id = JSON.stringify(data.user_id);
      const user = JSON.stringify(data.user);

      // Success case
      localStorage.setItem("userId", id);
      localStorage.setItem("user", user);
      document.cookie = "status=true; path=/; max-age=2592000"; // 30 days

      // Show success message before redirecting
      setError("");
      setSuccess("Account created successfully! Redirecting...");
      setLoadingg("Success!");

      // Delay redirect slightly to show success message
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      console.error("Error during sign up:", error);

      // More detailed error handling
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response.data);
        setError(error.response.data.message || `Server error: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
        setError('No response from server. Please check your internet connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoadingg("Sign up");
    }
  }

  return (
    <div className="bg-black flex flex-col ">
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
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-200 p-3 rounded mb-4">
            <p>{error}</p>
          </div>
        )}
        {success && (
          <div className="bg-green-900/30 border border-green-500 text-green-200 p-3 rounded mb-4">
            <p>{success}</p>
          </div>
        )}
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
    <div className="bg-black flex flex-col justify-center items-center mt-10">
      <div>
        <div className="flex w-full max-w-4xl items-center">
          {/* Left Side - Mobile Screens */}
          <div className="flex-1 hidden md:flex justify-center relative">
            <Image
            width={600}
            height={200}
              src="/homepage.png"
              alt="Mobile UI Back"
              className="object-cover"

              priority
            />
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
                  Don&apos;t have an account?{" "}
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
        <footer className="flex flex-col mt-10">
          <ul className="flex flex-wrap gap-4 justify-center text-gray-500 text-sm">
            {/* Footer links */}
          </ul>
        </footer>
        <select className="pl-4 py-2  rounded text-gray-300 text-sm bg-black">
          <option value="apple">English</option>
          <option value="banana">French</option>
          <option value="cherry">Chinese</option>
        </select>
      </div>
    </div>
  );
}