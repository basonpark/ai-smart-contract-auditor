"use client";

import { useEffect, useRef } from 'react';
import Lenis from 'lenis'; // Import the correct package

const LenisScroller = () => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2, // Adjust duration for smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
      // Other options like 'direction', 'gestureDirection', 'smoothWheel', etc., can be added here
      // smoothWheel: true, // Might improve mouse wheel smoothness
      // smoothTouch: true, // Might improve touch smoothness
    });

    lenisRef.current = lenis;

    // Update Lenis on each animation frame
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Cleanup function
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy(); // Properly destroy the Lenis instance
        lenisRef.current = null;
      }
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return null; // This component does not render anything visible
};

export default LenisScroller;
