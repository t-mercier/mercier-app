"use client";

import React, { useState } from "react";
import LandingSplash from "@/components/LandingSplash";
import HackerOverlay from "@/components/HackerOverlay";
import CVSection from "@/components/CVSection";

type AppState = "landing" | "hacking" | "cv";

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
    setState("cv");
  };

  const handleEscape = () => {
    setState("cv");
  };

  return (
    <>
      {state === "landing" && <LandingSplash onEnter={handleEnter} />}
      {state === "hacking" && (
        <HackerOverlay onReveal={handleReveal} onEscape={handleEscape} />
      )}
      {state === "cv" && <CVSection />}
    </>
  );
}

