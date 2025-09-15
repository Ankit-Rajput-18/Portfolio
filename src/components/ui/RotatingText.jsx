import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function RotatingText({
  texts = [],
  interval = 2500,
  mainClassName = "text-lg md:text-xl font-semibold",
  boxClassName = "px-3 py-1 rounded-md bg-white/10 backdrop-blur-sm border border-blue-500/40",
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, interval);
    return () => clearInterval(timer);
  }, [texts, interval]);

  return (
    <div className={boxClassName} style={{backgroundColor:"rgb(133, 96, 221)" , minWidth: "200px", height: "3rem", overflow: "hidden" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={texts[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className={`${mainClassName} text-center`}
        >
          {texts[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
