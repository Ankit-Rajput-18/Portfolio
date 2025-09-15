// src/sections/WorkTimeline.jsx
import { motion } from "framer-motion";
import { experience } from "../data/experience";
import Reveal from "../components/ui/Reveal";

const timelineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function WorkTimeline() {
  return (
    <section id="experience" className="py-20 bg-white dark:bg-gray-900 text-gray-800 dark:text-slate-200">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent mb-4">
              My Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-400">
              A brief overview of my professional journey
            </p>
          </div>
        </Reveal>

        <motion.div
          className="relative border-l-4 border-indigo-600/50 dark:border-indigo-500/50 space-y-12 pl-6"
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {experience.map((exp, index) => (
            <motion.div key={index} variants={itemVariants} className="relative">
              <div className="absolute -left-10 top-2 w-5 h-5 bg-indigo-600 dark:bg-indigo-500 rounded-full shadow-lg border-2 border-indigo-300 transform -translate-x-1/2">
                <div className="absolute inset-0 rounded-full animate-ping-slow bg-indigo-500/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                    <p className="text-indigo-600 dark:text-indigo-400 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-slate-500 text-right min-w-[100px]">{exp.duration}</span>
                </div>
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-4">{exp.location}</p>
                <ul className="list-disc list-inside text-gray-700 dark:text-slate-300 space-y-2">
                  {exp.responsibilities.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}