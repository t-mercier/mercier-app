"use client";

import { motion } from "framer-motion";
import Footer from "./Footer";

export default function CVSection() {
  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Header reveal */}
      <motion.div
        className="text-center pt-20 pb-12 px-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Hehe — got you! 😄
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 font-light">
          Welcome to my small universe.
        </p>
      </motion.div>

      {/* CV Content */}
      <motion.div
        className="max-w-4xl mx-auto px-6 pb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-2xl border border-gray-700">
          {/* Name & Title */}
          <div className="border-b border-gray-600 pb-6 mb-6">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Timothée Mercier
            </h2>
            <p className="text-lg md:text-xl text-green-400 font-medium">
              Software Engineer II — TomTom
            </p>
            <p className="text-gray-400 mt-2">Amsterdam, Netherlands</p>
          </div>

          {/* About */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-3 text-green-400">
              About Me
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Builder of playful UX experiments and automation systems.
              Specialized in Unity, C++, Java, and gRPC integrations. I enjoy
              creating interactive experiences that surprise and delight users —
              like this one!
            </p>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-3 text-green-400">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Unity",
                "C++",
                "Java",
                "gRPC",
                "TypeScript",
                "React",
                "Next.js",
                "Python",
                "Docker",
              ].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 bg-gray-700 rounded-full text-sm font-mono text-gray-200 border border-gray-600 hover:border-green-400 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-semibold mb-3 text-green-400">
              Get in Touch
            </h3>
            <a
              href="mailto:hello@mercier.app"
              className="inline-block text-lg text-blue-400 hover:text-blue-300 transition-colors underline"
            >
              hello@mercier.app
            </a>
          </div>
        </div>

        {/* Fun message */}
        <motion.div
          className="text-center mt-12 text-gray-500 font-mono text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <p>
            P.S. No files were harmed in the making of this prank. Your data is
            safe. 🛡️
          </p>
        </motion.div>
      </motion.div>

      <Footer />
    </motion.div>
  );
}

