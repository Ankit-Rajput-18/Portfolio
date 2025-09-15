// src/sections/Skills.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { skills } from "../data/skills";
import Reveal from "../components/ui/Reveal";

// Import icons dynamically based on their string name
import * as FaIcons from 'react-icons/fa';
import * as SiIcons from 'react-icons/si';
import * as VscIcons from 'react-icons/vsc';

const getIconComponent = (iconName) => {
  const IconComponent = FaIcons[iconName] || SiIcons[iconName] || VscIcons[iconName];
  return IconComponent || null;
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("programming");

  const categories = Object.keys(skills);

  return (
    <section id="skills" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:bg-slate-800">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent mb-4">
              Technical Skills
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-400">
              Technologies I work with and my proficiency levels
            </p>
          </div>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full font-medium transition-colors duration-300 ${
                activeCategory === category
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600 dark:hover:text-white"
              }`}
            >
              {skills[category].title}
            </button>
          ))}
        </div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills[activeCategory].items.map((skill, index) => {
            const Icon = getIconComponent(skill.icon);
            return (
              <Reveal key={skill.name} delay={index * 0.1}>
                <div className="bg-gray-50 dark:bg-slate-900/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-xl p-6 hover:border-indigo-500/50 transition-all duration-300 cursor-hover">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {Icon && <Icon style={{ color: skill.color.split(' ')[1] }} className="text-2xl" />}
                      <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200">{skill.name}</h3>
                    </div>
                    <span className="text-indigo-600 dark:text-indigo-400 font-semibold">{skill.level}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <motion.div 
                      className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                    />
                  </div>
                </div>
              </Reveal>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}