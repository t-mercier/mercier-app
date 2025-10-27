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
              Software Engineer II — TomTom Visualization Engines
            </p>
            <p className="text-gray-400 mt-2">Amsterdam Area, Netherlands</p>
          </div>

          {/* About */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-3 text-green-400">
              About Me
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Design has always been my first love, but I&apos;ve always struggled with its subjectivity. I quickly realized I wouldn&apos;t be satisfied just executing someone else&apos;s vision, nor did I have the patience to build a name for myself to earn creative freedom.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              The binary nature of computers always attracted me - things either work, or they don&apos;t, and when they don&apos;t, you can fix it. There is always a way to make it work, and there is no room for subjectivity. So that&apos;s what I decided to focus on.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              To acquire the broadest skills range, I thought it would be best to learn from the root. I love a good challenge but I also wanted to mostly be capable of coding with any language later, so I chose C and C++, and enrolled in Codam, 42 Amsterdam for this intense journey.
            </p>
            <p className="text-gray-300 leading-relaxed mt-3">
              So far, this career transition has been incredibly rewarding. Working on various projects, I&apos;ve found some kind of harmony between design thinking and binary logic, and realized how my creative thinking will be a significant asset in programming.
            </p>
          </div>

          {/* Skills */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-3 text-green-400">
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "C++",
                "Kotlin",
                "Unity",
                "Java",
                "gRPC",
                "Protocol Buffers",
                "Android SDK",
                "TypeScript",
                "Next.js",
                "Docker",
                "Jenkins",
                "Creative Direction"
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

          {/* Achievements */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold mb-3 text-green-400">
              🏆 Achievements
            </h3>
            <div className="space-y-3">
              <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">🥇</span>
                  <span className="font-semibold text-green-400">TomTom NEXT Hackathon Winner</span>
                  <span className="text-gray-400 text-sm">Dec 2022</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Master Level Challenge 3 - Built a solution for truck drivers&apos; safety and efficiency with route optimization, QR codes, and mobile apps.
                </p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">🥇</span>
                  <span className="font-semibold text-green-400">Instagram Content Creator Prize</span>
                  <span className="text-gray-400 text-sm">Dec 2022</span>
                </div>
                <p className="text-gray-300 text-sm">
                  Best Instagram reel during TomTom NEXT Hackathon, showing our project in a creative way.
                </p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-4 border border-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-gray-300">🥈</span>
                  <span className="font-semibold text-green-400">WE.VESTR x Codam Hackathon</span>
                  <span className="text-gray-400 text-sm">Nov 2022</span>
                </div>
                <p className="text-gray-300 text-sm">
                  2nd Place - Built a reporting tool with drag-and-drop interface for financial projections and startup analytics.
                </p>
              </div>
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
        </motion.div>
      </motion.div>

      <Footer />
    </motion.div>
  );
}

