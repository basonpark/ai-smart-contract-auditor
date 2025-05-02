"use client";

import { useEffect } from 'react';
import gsap from 'gsap';
// Attempt to import ScrollSmoother - might be undefined if not included in the installed package
import { ScrollSmoother } from 'gsap/ScrollSmoother';

const GsapScroller = () => {
  useEffect(() => {
    // Check if ScrollSmoother was successfully imported
    if (!ScrollSmoother) {
      console.warn("ScrollSmoother plugin not found. Please ensure it's installed and included in your GSAP bundle. This is a premium GreenSock plugin.");
      return;
    }

    // Register the plugin *inside* the effect
    gsap.registerPlugin(ScrollSmoother);

    // Create the ScrollSmoother instance
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.5, // Adjust the smoothness level
      effects: true, // Optional: Enables parallax effects
    });

    // Cleanup
    return () => {
      if (smoother) {
        smoother.kill();
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return null;
};

export default GsapScroller;
