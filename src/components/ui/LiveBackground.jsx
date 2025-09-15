// src/components/ui/LiveBackground.jsx
import React, { useRef, useEffect } from "react";

function hexToRgba(hex, a = 1) {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map(c => c + c).join("");
  const num = parseInt(h, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r},${g},${b},${a})`;
}

export default function LiveBackground({
  particleCount = 110,
  maxRadius = 3.8,
  lineDistance = 110,
  color = "#a14040ff",
  bgColor = null,
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const stateRef = useRef({
    particles: [],
    width: 0,
    height: 0,
    mouse: { x: null, y: null },
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const effectiveCount = reduced ? Math.max(10, Math.floor(particleCount * 0.15)) : particleCount;

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function resizeToParent() {
      const parent = canvas.parentElement || document.body;
      const rect = parent.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      stateRef.current.width = rect.width;
      stateRef.current.height = rect.height;
    }

    function initParticles() {
      const { width, height } = stateRef.current;
      const particles = [];
      for (let i = 0; i < effectiveCount; i++) {
        const r = rand(1.0, maxRadius);
        particles.push({
          x: rand(0, width),
          y: rand(0, height),
          vx: rand(-0.35, 0.35),
          vy: rand(-0.35, 0.35),
          r,
          life: rand(200, 1000),
          maxLife: rand(200, 1000),
        });
      }
      stateRef.current.particles = particles;
    }

    function clear() {
      if (bgColor) {
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, stateRef.current.width, stateRef.current.height);
      } else {
        ctx.clearRect(0, 0, stateRef.current.width, stateRef.current.height);
      }
    }

    function drawParticle(p) {
      const { x, y, r } = p;
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
      g.addColorStop(0, hexToRgba(color, 0.95));
      g.addColorStop(0.12, hexToRgba(color, 0.55));
      g.addColorStop(0.28, hexToRgba(color, 0.18));
      g.addColorStop(1, "rgba(0,0,0,0)");

      ctx.beginPath();
      ctx.fillStyle = g;
      ctx.arc(x, y, r * 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = hexToRgba(color, 1);
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }

    function update() {
      const s = stateRef.current;
      const { particles, width, height, mouse } = s;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        p.life--;
        if (p.life <= 0) {
          p.life = p.maxLife;
          p.vx = rand(-0.35, 0.35);
          p.vy = rand(-0.35, 0.35);
        }

        if (mouse.x !== null && mouse.y !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            const force = (120 - dist) / 120;
            p.vx += (dx / (dist + 0.001)) * 0.6 * force;
            p.vy += (dy / (dist + 0.001)) * 0.6 * force;
          } else if (dist < 300) {
            const force = (300 - dist) / 300;
            p.vx -= (dx / (dist + 0.001)) * 0.02 * force;
            p.vy -= (dy / (dist + 0.001)) * 0.02 * force;
          }
        }

        p.vx *= 0.985;
        p.vy *= 0.985;
      }

      clear();

      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < lineDistance) {
            const alpha = 0.12 * (1 - dist / lineDistance);
            ctx.beginPath();
            ctx.strokeStyle = hexToRgba(color, alpha);
            ctx.lineWidth = 1;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < particles.length; i++) drawParticle(particles[i]);
    }

    function loop() {
      update();
      rafRef.current = requestAnimationFrame(loop);
    }

    const parent = canvas.parentElement || document.body;
    const ro = new ResizeObserver(() => {
      resizeToParent();
      initParticles();
    });

    ro.observe(parent);
    resizeToParent();
    initParticles();
    loop();

    function onPointerMove(e) {
      const rect = parent.getBoundingClientRect();
      stateRef.current.mouse.x = e.clientX - rect.left;
      stateRef.current.mouse.y = e.clientY - rect.top;
    }
    function onPointerLeave() {
      stateRef.current.mouse.x = null;
      stateRef.current.mouse.y = null;
    }

    parent.addEventListener("pointermove", onPointerMove, { passive: true });
    parent.addEventListener("pointerleave", onPointerLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      parent.removeEventListener("pointermove", onPointerMove);
      parent.removeEventListener("pointerleave", onPointerLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [particleCount, maxRadius, lineDistance, color, bgColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        display: "block",
        pointerEvents: "none",
      }}
      aria-hidden="true"
    />
  );
}