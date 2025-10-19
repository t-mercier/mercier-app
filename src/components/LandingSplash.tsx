"use client";

import { motion } from "framer-motion";

interface LandingSplashProps {
  onEnter: () => void;
}
export default function LandingSplash({ onEnter }: LandingSplashProps) {
  return (
           <div className="fixed inset-0 bg-black grid place-items-center crt-effect relative">
      {/* Enter button */}
      <motion.button
        onClick={onEnter}
        className="z-10 px-6 py-2.5 bg-transparent border border-hacker-green/60 text-hacker-green font-mono text-sm hover:border-hacker-green hover:bg-hacker-green/10 transition-all duration-300 cursor-pointer tracking-wider"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        whileHover={{
          boxShadow: "0 0 15px rgba(0, 255, 0, 0.3)",
          scale: 1.02
        }}
        whileTap={{ scale: 0.98 }}
      >
        ENTER
      </motion.button>

      {/* Footer text */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-gray-700 font-mono tracking-widest pointer-events-none z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        mercier.app
      </motion.div>
    </div>
  );
}


