"use client";
import React from "react";
import { SparklesCore } from "@/components/ui/sparkles";
import { GlowingEffectDemo } from "@/components/ui/glowing-effect-demo";
import WorldMapDemo from "@/components/ui/world-map-demo";
import AnimatedTestimonialsDemo from "@/components/ui/animated-testimonials-demo";
import Link from 'next/link';


export default function LandingPage() {
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

      {/* Get Started Button */}
      <div className="absolute top-8 right-8 z-50">
        <Link
          href="/signup"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
        >
          Get Started
        </Link>
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
    </div>
  );
} 