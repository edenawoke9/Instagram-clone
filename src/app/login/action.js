
'use client';
import { signIn, signOut } from "next-auth/react";

// Login function using CredentialsProvider
export const login = async (email, password) => {
  await signIn("credentials", {
    redirect: false,
    email,
    password,
  });
};

// Logout function
export const logout = async () => {
  await signOut();
};
export const signup=async (email,password,name,username,bio)=>{
  await signIn("credentials",{
    redirect:false,
    email,
    password,
    username,
    name,
    bio

  })
}
