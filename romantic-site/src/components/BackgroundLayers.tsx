"use client";
// src/components/BackgroundLayers.tsx

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Floating petal SVG
function Petal({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      animate={{
        y: ["0vh", "110vh"],
        x: [0, Math.random() > 0.5 ? 40 : -40],
        rotate: [0, 360],
        opacity: [0.7, 0.3, 0],
      }}
      transition={{
        duration: Math.random() * 8 + 8,
        delay: Math.random() * 10,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
        <ellipse cx="7" cy="9" rx="5" ry="8" fill="#D9A0A7" fillOpacity="0.6" transform={`rotate(${Math.random() * 60 - 30} 7 9)`} />
      </svg>
    </motion.div>
  );
}

// Sparkle
function Sparkle({ style }: { style: React.CSSProperties }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={style}
      animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
      transition={{
        duration: Math.random() * 2 + 1.5,
        delay: Math.random() * 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 0L5.8 4.2L10 5L5.8 5.8L5 10L4.2 5.8L0 5L4.2 4.2Z" fill="#E7B8C4" fillOpacity="0.8" />
      </svg>
    </motion.div>
  );
}

// Corner flower glow blobs
function CornerGlow({ pos }: { pos: "tl" | "tr" | "bl" | "br" }) {
  const posStyle: Record<string, React.CSSProperties> = {
    tl: { top: -60, left: -60 },
    tr: { top: -60, right: -60 },
    bl: { bottom: -60, left: -60 },
    br: { bottom: -60, right: -60 },
  };
  return (
    <motion.div
      className="absolute pointer-events-none rounded-full"
      style={{
        width: 260,
        height: 260,
        background: "radial-gradient(circle, #D9A0A755 0%, #C7A6C930 50%, transparent 70%)",
        filter: "blur(40px)",
        ...posStyle[pos],
      }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function BackgroundLayers() {
  // Generate stable random data
  const petals = Array.from({ length: 18 }, (_, i) => ({
    key: i,
    style: {
      left: `${(i * 5.5) % 100}%`,
      top: `-${Math.random() * 20 + 5}%`,
    } as React.CSSProperties,
  }));

  const sparkles = Array.from({ length: 30 }, (_, i) => ({
    key: i,
    style: {
      left: `${(i * 3.3) % 100}%`,
      top: `${(i * 7.1) % 100}%`,
    } as React.CSSProperties,
  }));

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {/* Layer 1: Animated gradient */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #F4E7D3 0%, #E7B8C4 40%, #C7A6C9 80%, #D9A0A7 100%)",
            "linear-gradient(135deg, #EADCC8 0%, #D9A0A7 40%, #E7B8C4 70%, #C7A6C9 100%)",
            "linear-gradient(135deg, #FFF8F0 0%, #E7B8C4 50%, #D9A0A7 80%, #C7A6C9 100%)",
            "linear-gradient(135deg, #F4E7D3 0%, #E7B8C4 40%, #C7A6C9 80%, #D9A0A7 100%)",
          ],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* Layer 2: Film grain */}
      <div
        className="absolute inset-0 opacity-[0.04] animate-grain"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Layer 3: Floating petals */}
      {petals.map((p) => (
        <Petal key={p.key} style={p.style} />
      ))}

      {/* Layer 4: Sparkles */}
      {sparkles.map((s) => (
        <Sparkle key={s.key} style={s.style} />
      ))}

      {/* Layer 5: Corner glow flowers */}
      <CornerGlow pos="tl" />
      <CornerGlow pos="tr" />
      <CornerGlow pos="bl" />
      <CornerGlow pos="br" />

      {/* Layer 6: Soft haze */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(244,231,211,0.25) 100%)",
        }}
      />
    </div>
  );
}
