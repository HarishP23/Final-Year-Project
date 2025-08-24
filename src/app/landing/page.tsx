"use client";
import React, { useState, useEffect } from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { GlowingEffectDemo } from "@/components/ui/glowing-effect-demo";
import WorldMapDemo from "@/components/ui/world-map-demo";
import AnimatedTestimonialsDemo from "@/components/ui/animated-testimonials-demo";
import Link from 'next/link';
import { User, LogOut, ChevronDown } from 'lucide-react';


export default function LandingPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.profile-menu')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setShowProfileMenu(false);
    // Show success message and refresh the page
    alert('Logged out successfully!');
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Robot Image - Top Left */}
      <div className="absolute top-8 left-8 z-50">
        <img
          src="/robot-assistant.png"
          alt="Virtual Assistant Robot"
          className="w-16 h-16 md:w-20 md:h-20 object-contain"
        />
      </div>

      {/* Navigation Buttons */}
      <div className="absolute top-8 right-8 z-50 flex gap-4">
        {isLoggedIn ? (
          /* Profile Menu */
          <div className="relative profile-menu">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setShowProfileMenu(!showProfileMenu);
                }
              }}
              aria-haspopup="true"
              aria-expanded={showProfileMenu}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <span className="hidden md:block">
                {user?.firstName || 'User'}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 profile-menu">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{user?.email}</p>
                </div>
                
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Dashboard
                </Link>
                
                <button
                  onClick={handleLogout}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleLogout();
                    }
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200 flex items-center gap-2 hover:bg-red-50 focus:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-inset"
                >
                  <LogOut className="w-4 h-4" />
                  Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Sign In / Sign Up Buttons */
          <>
            <Link
              href="/sign-in"
              className="inline-flex items-center px-4 py-2 text-white font-medium rounded-lg hover:text-blue-300 transition-colors duration-200"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get Started
            </Link>
          </>
        )}
      </div>

      {/* Hero Section with Sparkles */}
      <div className="relative h-screen flex flex-col items-center justify-center overflow-hidden pt-64">
        {/* Background Sparkles - Behind the AI Learning Assistant text */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <div className="relative w-[40rem] h-40">
            {/* Gradients */}
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

            {/* Core component */}
            <SparklesCore
              background="transparent"
              minSize={0.4}
              maxSize={1}
              particleDensity={1200}
              className="w-full h-full"
              particleColor="#FFFFFF"
            />

            {/* Radial Gradient to prevent sharp edges */}
            <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 mb-8">
          {isLoggedIn && (
            <div className="mb-8 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
              <p className="text-lg text-white">
                Welcome back, <span className="font-semibold text-blue-300">{user?.firstName}</span>! 🎉
              </p>
              <p className="text-sm text-neutral-300 mt-1">
                Ready to continue your learning journey?
              </p>
              <div className="mt-3">
                <Link
                  href="/dashboard"
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105"
                >
                  Go to Dashboard →
                </Link>
              </div>
            </div>
          )}
          
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-4">
            AI Learning Assistant
          </h1>
          <p className="text-sm md:text-base text-neutral-400 mb-12">
            developed by
          </p>
          <div className="max-w-4xl mx-auto">
            <AnimatedTestimonialsDemo />
          </div>
        </div>
      </div>

      {/* Glowing Effect Demo Section */}
      <div className="py-20 px-4 bg-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-white">
            Our Features
          </h2>
          <GlowingEffectDemo />
        </div>
      </div>

      {/* World Map Demo Section */}
      <WorldMapDemo />

      {/* Navigation Footer */}
      <div className="py-16 px-4 bg-gray-900">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Ready to Get Started?</h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="/skillgap"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Analyze Skills
            </Link>
            <Link
              href="/generate"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Generate Roadmap
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200"
            >
              View Dashboard
            </Link>
          </div>
          <div className="flex justify-center gap-6 text-sm text-gray-400">
            <Link href="/sign-in" className="hover:text-white transition-colors">
              Sign In
            </Link>
            <Link href="/sign-up" className="hover:text-white transition-colors">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 