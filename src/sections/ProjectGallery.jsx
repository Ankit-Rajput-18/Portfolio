// src/sections/ProjectGallery.jsx
import { motion } from "framer-motion";
import Reveal from "../components/ui/Reveal";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectGallery() {
  const projects = [
    {
      title: "StaySphere",
      description: "Comprehensive accommodation booking platform with advanced search, real-time availability, and secure payment processing.",
      tech: ["Node.js", "MongoDB", "Express.js", "JWT", "Tailwind CSS"],
      repo: "https://github.com/Ankit-Rajput-18/staysphere",
      live: "#",
      icon: "🏨"
    },
    {
      title: "Pokémon Explorer",
      description: "Interactive Pokémon viewer with advanced search, battle simulation, and detailed stats visualization powered by PokéAPI.",
      tech: ["React.js", "Axios", "Chart.js", "PokéAPI", "Tailwind CSS"],
      repo: "https://github.com/Ankit-Rajput-18/pokemon-viewer",
      live: "#",
      icon: "🎮"
    },
    {
      title: "Mini CRM",
      description: "Full-featured Customer Relationship Management system with analytics dashboard, sales pipeline, and team collaboration tools.",
      tech: ["MERN Stack", "Chart.js", "JWT", "MongoDB"],
      repo: "https://github.com/Ankit-Rajput-18/Mini-CRM",
      live: "#",
      icon: "📊"
    }
  ];

  return (
    <section id="projects" className="py-20 bg-white dark:bg-slate-900">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-700 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent mb-4">
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600 dark:text-slate-400">
              Some of my recent work and contributions
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 0.1}>
              <motion.div
                className="bg-gray-50 dark:bg-slate-800/50 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden hover:border-indigo-500/50 transition-all duration-300 group cursor-hover"
                whileHover={{ y: -10 }}
              >
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8 text-center">
                  <span className="text-4xl">{project.icon}</span>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-slate-200 mb-3">{project.title}</h3>
                  <p className="text-gray-600 dark:text-slate-400 mb-4 leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 text-gray-800 dark:text-slate-200 py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-hover"
                    >
                      <Github size={16} />
                      Code
                    </a>
                    {project.live !== "#" && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2 cursor-hover"
                      >
                        <ExternalLink size={16} />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}