// src/components/ui/CursorFollower.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorFollower() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Check if device is laptop/desktop with hover
    const canHover = window.matchMedia("(hover: hover)").matches;
    const isLargeScreen = window.matchMedia("(min-width: 1024px)").matches;

    if (canHover && isLargeScreen) {
      setEnabled(true);
    } else {
      setEnabled(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const updateMousePos = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", updateMousePos);

    return () => {
      document.removeEventListener("mousemove", updateMousePos);
    };
  }, [enabled]);

  if (!enabled) return null; // mobile/tablet pe kuch render hi na ho

  return (
    <>
      <motion.div
        className="cursor-follower"
        animate={{
          x: mousePos.x - 20,
          y: mousePos.y - 20,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      />
      <motion.div
        className="cursor-dot"
        animate={{
          x: mousePos.x - 5,
          y: mousePos.y - 5,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.5 }}
      />
    </>
  );
}
