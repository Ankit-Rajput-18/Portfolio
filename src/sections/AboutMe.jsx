// src/sections/AboutMe.jsx
import Reveal from "../components/ui/Reveal";
import { motion } from "framer-motion";
import avatar from "/avatar.jpg";

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function AboutMe() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 text-center md:text-left px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent mb-2">
              About Me
            </h2>
            <p className="text-xl text-gray-700 dark:text-slate-400">A brief introduction to who I am</p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <Reveal delay={0.2}>
            {/* The size has been changed from w-64 h-64 to w-80 h-80 */}
            <div className="relative w-80 h-80 mx-auto md:mx-0 rounded-full group">
              <img
                src={avatar}
                alt="Ankit Rajput"
                className="w-full h-full object-cover rounded-full relative z-10 border-4 border-indigo-500 shadow-xl transform transition-transform duration-300 group-hover:scale-105"
              />
              {/* Subtle pulsing glow */}
              <motion.div
                className="absolute inset-0 rounded-full bg-indigo-500/30"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              />
            </div>
          </Reveal>

          <div className="space-y-6">
            <motion.p
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              className="text-lg leading-relaxed text-gray-700 dark:text-slate-300"
            >
              I’m <span className="font-semibold text-indigo-600 dark:text-indigo-400">Ankit Rajput</span>, a passionate Full Stack Developer who loves crafting digital experiences that are not only functional but also elegant. With a strong foundation in <span className="font-medium text-gray-900 dark:text-white">Java, Python, and Cloud</span>, I specialize in building applications that solve real-world problems at scale.
            </motion.p>
            
            <motion.p
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ delay: 0.2 }}
              className="text-lg leading-relaxed text-gray-700 dark:text-slate-300"
            >
              Beyond coding, I’m deeply curious about <span className="font-medium text-gray-900 dark:text-white">AI-driven solutions</span> and constantly explore how emerging technologies can shape the future. I thrive in collaborative environments and believe in lifelong learning to refine my craft.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}