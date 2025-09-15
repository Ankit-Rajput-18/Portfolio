// src/sections/Achievements.jsx
import { achievements } from "../data/achievements";
import Reveal from "../components/ui/Reveal";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";

export default function Achievements() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % achievements.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + achievements.length) % achievements.length);
  };

  const currentAchievement = achievements[currentIndex];

  function getTagColor(tag) {
    const normalizedTag = tag.toLowerCase();
    if (normalizedTag.includes("java") || normalizedTag.includes("programming")) {
      return "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300";
    }
    if (normalizedTag.includes("sql") || normalizedTag.includes("database")) {
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300";
    }
    if (normalizedTag.includes("ai") || normalizedTag.includes("machine learning")) {
      return "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300";
    }
    if (normalizedTag.includes("dsa") || normalizedTag.includes("problem solving") || normalizedTag.includes("coding")) {
      return "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300";
    }
    if (normalizedTag.includes("oracle") || normalizedTag.includes("deloitte") || normalizedTag.includes("tata")) {
      return "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300";
    }
    return "bg-gray-100 dark:bg-gray-700/30 text-gray-700 dark:text-gray-300";
  }

  return (
    <section id="achievements" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-slate-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 013.138-3.138z" />
              </svg>
              Certifications & Achievements
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent mb-4">
              My Journey of Excellence
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A collection of certifications and achievements that showcase my commitment to continuous learning and professional growth.
            </p>
          </div>
        </Reveal>

        {/* Stats Row */}
        <Reveal delay={0.1}>
          <div className="flex justify-center mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{achievements.length}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Certificates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400">100+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Days Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">5+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Platforms</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400">2025</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Latest</div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Achievement Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <Reveal key={currentIndex} delay={0.1}>
            <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Achievement Badge */}
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-lg">
                  #{String(currentIndex + 1).padStart(2, '0')}
                </div>
              </div>

              {/* Card Content */}
              <div className="grid md:grid-cols-2 gap-8 items-center p-8">
                {/* Certificate Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600">
                  <img
                    src={currentAchievement.image}
                    alt={currentAchievement.title}
                    className="w-full h-full object-contain p-4 bg-white dark:bg-gray-800"
                  />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {currentAchievement.title}
                  </h3>
                  <p className="text-base text-gray-600 dark:text-gray-300 mb-4">
                    {currentAchievement.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {currentAchievement.tags?.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getTagColor(tag)}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer & CTA */}
                  <div className="flex items-center justify-between mt-6">
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg text-sm"
                    >
                      Let's Connect
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Previous Achievement"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 -translate-y-1/2 p-2 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            aria-label="Next Achievement"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}