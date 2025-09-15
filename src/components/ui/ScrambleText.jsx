import React, { useEffect, useRef, useState } from "react";

/**
 * ScrambleText
 *
 * Props:
 * - text (string)         : default text (shown normally)
 * - hoverText (string)    : text to show on hover (scrambles into this)
 * - mainClassName (string): classes for the outer element
 * - speed (number)        : ms per frame for scramble animation
 * - iterations (number)   : how many steps to reveal characters
 * - chars (string)        : characters used while scrambling
 *
 * Behaviour:
 * - hover / focus => scramble to hoverText
 * - mouseleave / blur => scramble back to original text
 * - safe cleanup of timers on unmount and quick toggles
 */
export default function ScrambleText({
  text = "Hover Me",
  hoverText = "I break things",
  mainClassName = "text-2xl font-bold",
  speed = 40,
  iterations = 12,
  chars = "..",
}) {
  const [displayed, setDisplayed] = useState(text);
  const animRef = useRef(null);
  const targetRef = useRef(text); // current target text
  const isAnimating = useRef(false);

  // keep displayed in sync if props.text changes externally
  useEffect(() => {
    setDisplayed(text);
    // also update default target if not currently animating to something else
    if (!isAnimating.current) targetRef.current = text;
  }, [text]);

  // helper: stop any ongoing animation
  function stopAnim() {
    if (animRef.current) {
      clearInterval(animRef.current);
      animRef.current = null;
    }
    isAnimating.current = false;
  }

  // Create a scramble animation that transitions current displayed -> toText
  function scrambleTo(toText) {
    stopAnim();
    const from = displayed;
    const maxLen = Math.max(from.length, toText.length);
    let frame = 0;
    isAnimating.current = true;
    targetRef.current = toText;

    animRef.current = setInterval(() => {
      frame++;
      const progress = Math.min(1, frame / iterations);

      // build current string
      let out = "";
      for (let i = 0; i < maxLen; i++) {
        const showTargetIndex = Math.floor(progress * maxLen);
        if (i < showTargetIndex) {
          // reveal actual target char if exists, otherwise blank
          out += toText[i] ?? "";
        } else {
          // random char placeholder (keep length consistent)
          out += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayed(out);

      if (frame >= iterations) {
        // final settle to exact target string
        setDisplayed(toText);
        stopAnim();
      }
    }, speed);
  }

  // Handlers
  const handleEnter = () => {
    // if already targeting same text, ignore
    if (targetRef.current === hoverText && isAnimating.current) return;
    scrambleTo(hoverText);
  };

  const handleLeave = () => {
    // if already targeting original and animating, ignore
    if (targetRef.current === text && isAnimating.current) return;
    scrambleTo(text);
  };

  // accessibility: also respond to keyboard focus
  const handleFocus = handleEnter;
  const handleBlur = handleLeave;

  // cleanup on unmount
  useEffect(() => {
    return () => stopAnim();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span
      role="button"
      tabIndex={0}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={mainClassName}
      style={{ cursor: "pointer", display: "inline-block" }}
      aria-label={`${displayed}`}
    >
      {displayed}
    </span>
  );
}
