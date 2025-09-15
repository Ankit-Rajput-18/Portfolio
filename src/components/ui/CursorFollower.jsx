// src/components/ui/CursorFollower.jsx
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePos = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e) => {
      if (e.target.closest('a, button, .cursor-hover')) {
        setIsHovering(true);
      }
    };
    
    const handleMouseLeave = (e) => {
      // Check if the new element is also an interactive one
      if (!e.relatedTarget || !e.relatedTarget.closest('a, button, .cursor-hover')) {
        setIsHovering(false);
      }
    };

    document.addEventListener('mousemove', updateMousePos);
    document.addEventListener('mouseover', handleMouseEnter);
    document.addEventListener('mouseout', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', updateMousePos);
      document.removeEventListener('mouseover', handleMouseEnter);
      document.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  const followerSize = isHovering ? 25 : 40; // Hover पर छोटा size
  const followerOpacity = isHovering ? 0.8 : 0.6; // Hover पर ज़्यादा visible
  const followerOffset = isHovering ? { x: 20, y: 20 } : { x: 0, y: 0 }; // Hover पर offset

  return (
    <>
      {/* The trailing follower circle */}
      <motion.div
        className="cursor-follower"
        animate={{
          x: mousePos.x + followerOffset.x - followerSize / 2,
          y: mousePos.y + followerOffset.y - followerSize / 2,
          width: followerSize,
          height: followerSize,
          opacity: followerOpacity,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      />
      {/* The small inner dot */}
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