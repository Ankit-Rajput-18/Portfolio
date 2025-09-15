// src/sections/Hero.jsx
import { motion } from "framer-motion";
import LiveBackground from "../components/ui/LiveBackground";
import ScrambleText from "../components/ui/ScrambleText";
import RotatingText from "../components/ui/RotatingText";
import { useState, useEffect } from "react";

export default function Hero() {
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  // Updated colors based on your request
  const particleColor = isDark ? "#ff3b3b" : "#e53e3e"; // Red for light, more red for dark
  const bgColor = isDark ? null : "#ffffff";

  return (
    <section
      id="hero"
      className="hero-full-bleed relative flex items-center justify-center min-h-screen text-slate-900 dark:text-white
      bg-white dark:bg-slate-950
      bg-gradient-to-b from-gray-50 to-white dark:from-slate-950 dark:to-slate-900"
    >
      <LiveBackground
        particleCount={110}
        maxRadius={4.0}
        lineDistance={120}
        color={particleColor}
        bgColor={bgColor}
      />

      <motion.div
        className="relative z-10 w-full max-w-6xl mx-auto px-6 md:px-8 py-0 flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.p
          className="text-sm uppercase tracking-widest mb-3 text-gray-500 dark:text-slate-200/60"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
        >
          Hello — I build things for the web
        </motion.p>

        <motion.h1
          className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight flex items-center justify-center gap-3 flex-wrap"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.6 }}
          style={{ letterSpacing: "-0.02em" }}
        >
          <ScrambleText
            text="I make things"
            hoverText="I solve problems"
            mainClassName="text-blue-600 dark:text-blue-400"
            speed={35}
            iterations={14}
          />
          <RotatingText
            texts={[
              "Full Stack Developer",
              "Java Enthusiast",
              "Python Explorer",
              "Cloud Learner",
              "AI Enthusiast",
            ]}
            interval={2500}
            mainClassName="text-gray-900 dark:text-white"
            boxClassName="h-9 px-3 rounded-md bg-gray-200/60 dark:bg-white/10 backdrop-blur-sm border border-gray-300 dark:border-white/10 flex items-center justify-center"
          />
        </motion.h1>

        <motion.div
          className="mx-auto mb-6"
          initial={{ width: 0, opacity: 0.8 }}
          animate={{ width: "64px", opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
          style={{ background: isDark ? "linear-gradient(90deg,#ff3b3b,#ff8a80)" : "linear-gradient(90deg,#e53e3e,#ef4444)" }}
        />

        <motion.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.05, duration: 0.5 }}
        >
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 text-white font-medium shadow-md transition"
          >
            View Projects
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center justify-center px-5 py-3 rounded-lg bg-white/20 hover:bg-white/30 dark:bg-white/10 dark:hover:bg-white/20 text-gray-900 dark:text-white font-medium backdrop-blur-sm border border-gray-300 dark:border-white/10 transition"
          >
            Download Resume
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}