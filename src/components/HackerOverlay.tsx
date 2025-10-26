"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface HackerOverlayProps {
  onReveal: () => void;
  onEscape: () => void;
}

export default function HackerOverlay({
  onReveal,
  onEscape,
}: HackerOverlayProps) {
  const [progress, setProgress] = useState(0);
  const [showGotYou, setShowGotYou] = useState(false);
  const [escaped, setEscaped] = useState(false);

  useEffect(() => {
    // Loading bar animation (5 seconds)
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // 100 / 50 = 2% per interval, 50 intervals over 5 seconds
      });
    }, 100);

    // After 5 seconds, show "got you" message
    const gotYouTimeout = setTimeout(() => {
      setShowGotYou(true);
    }, 5000);

    // After 8 seconds (5s loading + 3s got you), show terminal
    const revealTimeout = setTimeout(() => {
      onReveal();
    }, 8000);

    // Handle ESC key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setEscaped(true);
        setTimeout(() => {
          onEscape();
        }, 1500);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(gotYouTimeout);
      clearTimeout(revealTimeout);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onReveal, onEscape]);

  if (escaped) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center crt-effect">
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl md:text-4xl font-mono text-hacker-green text-glow-green">
            You escaped! 🏃
          </p>
          <p className="text-sm text-gray-400 font-mono mt-4">
            Redirecting to safety...
          </p>
        </motion.div>
      </div>
    );
  }

  if (showGotYou) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center crt-effect">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl md:text-3xl font-mono text-hacker-green">
            got you ... :)
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center crt-effect"
      role="dialog"
      aria-label="Erasing data animation"
    >
      <div className="text-center">
        <motion.p
          className="text-xl md:text-2xl font-mono text-hacker-green mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          erasing data...
        </motion.p>
        
        <div className="w-64 md:w-96 h-6 bg-gray-900 border border-hacker-green rounded overflow-hidden">
          <motion.div
            className="h-full bg-hacker-green"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "linear" }}
            style={{ boxShadow: '0 0 20px #00ff7f' }}
          />
        </div>
        
        <motion.p
          className="text-sm text-gray-500 font-mono mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {progress}%
        </motion.p>
      </div>
    </div>
  );
}

