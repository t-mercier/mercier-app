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
  "> ALL FILES WILL BE REMOVED IN: 00:00:05",
  "> 00:00:04",
  "> 00:00:03",
  "> 00:00:02",
  "> 00:00:01",
];

export default function HackerOverlay({
  onReveal,
  onEscape,
}: HackerOverlayProps) {
  const [messages, setMessages] = useState<string[]>([]);
  const [showReveal, setShowReveal] = useState(false);
  const [escaped, setEscaped] = useState(false);
  const [showGlitch, setShowGlitch] = useState(false);
  const [showGotYou, setShowGotYou] = useState(false);

  useEffect(() => {
    let messageIndex = 0;
    
    // Phase 1: Show hacker messages
    const messageInterval = setInterval(() => {
      if (messageIndex < hackerMessages.length) {
        setMessages((prev) => [...prev, hackerMessages[messageIndex]]);
        messageIndex++;
      } else {
        clearInterval(messageInterval);
      }
    }, 350);

    // Phase 2: Show glitch effect (after countdown)
    const glitchTimeout = setTimeout(() => {
      setShowGlitch(true);
    }, 5500); // After countdown messages (5.5 seconds)

    // Phase 3: Show "got you" message (3 seconds of glitch)
    const gotYouTimeout = setTimeout(() => {
      setShowGotYou(true);
    }, 8500); // 5s countdown + 3s glitch

    // Phase 4: Show terminal (3 seconds after "got you")
    const revealTimeout = setTimeout(() => {
      onReveal();
    }, 11500); // 5s countdown + 3s glitch + 3s got you

    // Show reveal button option
    const revealTimeout2 = setTimeout(() => {
      setShowReveal(true);
    }, 4000);

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
      clearInterval(messageInterval);
      clearTimeout(glitchTimeout);
      clearTimeout(gotYouTimeout);
      clearTimeout(revealTimeout);
      clearTimeout(revealTimeout2);
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

  if (showGotYou) {
        const hackerArt = `

⠀⠀⠀⠀⠀⠀⠀⢀⣠⡤⠐⠊⠉⠉⠀⠀⠈⠑⠄⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⡄⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⠜⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⠖⠢⡀⠹⣄⠀⠀⠀⠀
⠀⠀⠀⡤⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠊⠀⠀⣾⣿⣦⠫⡆⠀⠀⠀
⠀⢀⡏⠀⢀⠴⠂⠉⠐⢦⣄⠀⠀⠀⡇⠀⠀⠀⠀⠉⠁⢣⠰⡀⠀⠀
⢰⢈⠃⠀⣿⣷⠄⠀⠀⠈⢸⠃⠀⠀⠈⢦⡀⠀⠀⠀⠀⠸⠀⢯⡄⠀
⢸⠏⠀⠀⢻⠁⠀⠀⠀⡠⠊⠀⠀⠀⠀⠀⠈⠁⠐⠒⠊⠀⠀⠈⣼⠀
⢸⠀⠀⠀⠈⠢⠤⠤⠚⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹
⢸⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⠀⠀⠀⠀⠀⠀⠀⠀
⠀⢃⡆⠀⠀⠀⠀⠀⠀⠀⠀⠘⣧⡀⠀⠀⠀⣸⠀⠀⠀⠀⠀⠀⠀⡆
⠀⠈⢻⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⠛⠋⠁⠀⠀⠀⠀⠀⠀⣠⠃
⠀⠀⠘⡳⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⠋⠀

    `;

    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center crt-effect" style={{ height: '100vh' }}>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <pre className="text-xs md:text-sm font-mono text-hacker-green whitespace-pre">
            {hackerArt}
          </pre>
          <p className="text-sm font-mono text-hacker-green mt-4">
            got you !
          </p>
          <p className="text-xs text-gray-400 font-mono mt-2">
            &gt; Loading terminal...
          </p>
        </motion.div>
      </div>
    );
  }

  if (showGlitch) {
    return (
      <div
        className="fixed inset-0 bg-black flex items-center justify-center crt-effect chaos-mode"
        style={{ height: '100vh' }}
        role="dialog"
        aria-label="System glitch animation"
      >
        <motion.div
          className="text-center chaos-text"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
        >
          <p className="text-xl md:text-2xl font-mono text-hacker-green">
            SYSTEM ERROR...
          </p>
          <p className="text-sm text-red-500 font-mono mt-2">
            CORRUPTION DETECTED
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

