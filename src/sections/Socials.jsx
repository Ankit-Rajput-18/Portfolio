// src/sections/Socials.jsx
import Reveal from "../components/ui/Reveal";
import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { socials } from "../data/socials"; // Import socials data
import { motion } from "framer-motion";

export default function Socials() {
  const iconMap = {
    GitHub: <Github size={24} />,
    LinkedIn: <Linkedin size={24} />,
    Email: <Mail size={24} />,
    LeetCode: <Code2 size={24} />,
  };

  return (
    <section id="socials" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-5xl mx-auto text-center">
        <Reveal>
          <h2 className="text-3xl font-bold mb-12">Find Me Online</h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap justify-center gap-6">
            {socials.map((s) => (
              <motion.a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-6 py-3 rounded-full text-white font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                style={{ backgroundColor: s.color }}
                whileHover={{ backgroundColor: s.hoverColor, scale: 1.05 }}
              >
                {iconMap[s.name]}
                <p>{s.name}</p>
              </motion.a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}