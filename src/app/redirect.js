'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RedirectToLogin() {
  const router = useRouter();

  useEffect(() => {
    // Check for authentication cookie
    const checkAuth = () => {
      if (typeof window === 'undefined') return false;
      
      const cookies = document.cookie.split(';');
      const statusCookie = cookies.find(cookie => cookie.trim().startsWith('status='));
      return !!statusCookie;
    };
    
    const isAuth = checkAuth();
    
    // Redirect to login if not authenticated
    if (!isAuth) {
      router.push('/login');
    } else {
      router.push('/');
    }
  }, [router]);

  // Show loading spinner while redirecting
  return (
    <div className="bg-black text-white flex items-center justify-center h-screen">
      <div className="w-8 h-8 border-2 border-t-blue-500 border-r-transparent rounded-full animate-spin"></div>
    </div>
  );
}
