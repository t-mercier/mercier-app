"use client";

import React, { useState } from "react";
import LandingSplash from "@/components/LandingSplash";
import HackerOverlay from "@/components/HackerOverlay";
import dynamicImport from 'next/dynamic';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

const Terminal = dynamicImport(() => import('@/components/terminal/Terminal'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-hacker-green font-mono">Loading terminal...</div>
    </div>
  )
});

type AppState = "landing" | "hacking" | "terminal";

export default function Home() {
  const [state, setState] = useState<AppState>("landing");

  const handleEnter = () => {
    // Request fullscreen
    if (document.documentElement.requestFullscreen) {
      document.documentElement
        .requestFullscreen()
        .catch((err) => {
          console.log("Fullscreen request failed:", err);
        });
    }

    setState("hacking");
  };

  const handleReveal = () => {
    // Exit fullscreen when showing terminal
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.log("Exit fullscreen failed:", err);
      });
    }
    setState("terminal");
  };

  const handleEscape = () => {
    // Exit fullscreen when showing terminal
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.log("Exit fullscreen failed:", err);
      });
    }
    setState("terminal");
  };

  return (
    <>
      {state === "landing" && <LandingSplash onEnter={handleEnter} />}
      {state === "hacking" && (
        <HackerOverlay onReveal={handleReveal} onEscape={handleEscape} />
      )}
      {state === "terminal" && <Terminal />}
    </>
  );
}

