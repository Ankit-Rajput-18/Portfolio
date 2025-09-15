// src/components/ui/CursorFollower.jsx
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [isStopped, setIsStopped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef(null);

  useEffect(() => {
    const updateMousePos = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsStopped(false);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setIsStopped(true);
      }, 100); // 100ms delay to detect when the cursor has stopped
    };

    const handleMouseEnter = (e) => {
      if (e.target.closest('a, button, .cursor-hover')) {
        setIsHovering(true);
      }
    };
    
    const handleMouseLeave = (e) => {
      if (!e.target.closest('a, button, .cursor-hover')) {
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
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const followerSize = 40;
  // Offset the follower only when hovering over an interactive element
  const followerOffset = isHovering && isStopped ? { x: 20, y: 20 } : { x: 0, y: 0 };
  const followerOpacity = isHovering || isStopped ? 1 : 0.6;
  const scaleFactor = isHovering ? 1.2 : 1;

  return (
    <>
      {/* The trailing follower circle */}
      <motion.div
        className="cursor-follower"
        animate={{
          x: mousePos.x + followerOffset.x - (followerSize * scaleFactor) / 2,
          y: mousePos.y + followerOffset.y - (followerSize * scaleFactor) / 2,
          width: followerSize * scaleFactor,
          height: followerSize * scaleFactor,
          opacity: followerOpacity,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, mass: 0.5 }}
      />
    </>
  );
}