"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HackerOverlayProps {
  onReveal: () => void;
  onEscape: () => void;
}

const hackerMessages = [
  "> Initializing connection...",
  "> Connecting to remote host 192.168.1.1...",
  "> Connection established.",
  "> Accessing system files...",
  "> !!! WARNING: FILESYSTEM CORRUPTED !!!",
  "> Error: Access denied. Retrying...",
  "> Access granted.",
  "> Deleting user data...",
  "> Encrypting C:\\ drive...",
  "> /dev/sda1: Encryption in progress...",
  "> !!! CRITICAL ERROR !!!",
  "> ALL FILES WILL BE REMOVED IN: 00:00:10",
  "> 00:00:09",
  "> 00:00:08",
  "> 00:00:07",
  "> 00:00:06",
  "> 00:00:05",
  "> 00:00:04",
  "> 00:00:03",
  "> 00:00:02",
  "> 00:00:01",
  "> 00:00:00",
];

export default function HackerOverlay({
  onReveal,
  onEscape,
}: HackerOverlayProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [showReveal, setShowReveal] = useState(false);
  const [escaped, setEscaped] = useState(false);

  useEffect(() => {
    let messageIndex = 0;
    const interval = setInterval(() => {
      if (messageIndex < hackerMessages.length) {
        setMessages((prev) => [...prev, hackerMessages[messageIndex]]);
        messageIndex++;
      } else {
        clearInterval(interval);
      }
    }, 350);

    // Show reveal button after 8 seconds
    const revealTimeout = setTimeout(() => {
      setShowReveal(true);
    }, 8000);

    // Auto-reveal after 10 seconds
    const autoRevealTimeout = setTimeout(() => {
      onReveal();
    }, 10000);

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
      clearInterval(interval);
      clearTimeout(revealTimeout);
      clearTimeout(autoRevealTimeout);
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
            You escaped fullscreen! 🏃
          </p>
          <p className="text-sm text-gray-400 font-mono mt-4">
            Smart move... redirecting to safety...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black overflow-y-auto crt-effect"
      role="dialog"
      aria-label="Hacker overlay animation"
    >
      <div className="min-h-screen p-6 md:p-12 font-mono text-hacker-green text-sm md:text-base">
        {messages.filter(msg => msg).map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            className={
              msg?.includes("WARNING") || msg?.includes("ERROR")
                ? "text-red-500 font-bold text-glow-green-strong"
                : msg?.includes("00:00")
                ? "text-yellow-400 font-bold"
                : ""
            }
          >
            {msg}
            {index === messages.filter(m => m).length - 1 && (
              <span className="inline-block animate-blink ml-1">▋</span>
            )}
          </motion.div>
        ))}

        <AnimatePresence>
          {showReveal && (
            <motion.div
              className="fixed bottom-12 left-1/2 transform -translate-x-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={onReveal}
                className="px-6 py-3 bg-hacker-green text-black font-mono font-bold text-lg hover:bg-white transition-colors duration-200 shadow-[0_0_30px_rgba(0,255,0,0.8)]"
              >
                REVEAL THE TRUTH
              </button>
              <p className="text-xs text-center text-gray-500 mt-2">
                (or press ESC)
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

