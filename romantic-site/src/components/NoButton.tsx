"use client";
// src/components/NoButton.tsx

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface Props {
  noCount: number;
  onClick: () => void;
}

// ── Movement config by phase ──────────────────────────────────────────────
//  0–9  : no movement at all
// 10–19 : small jitter (±40px), stays near origin
// 20–34 : medium movement (±120px), viewport-safe
// 35–50 : playful movement (±220px), viewport-safe, hover-triggered only
function getPhase(count: number): 0 | 1 | 2 | 3 {
  if (count < 10) return 0;
  if (count < 20) return 1;
  if (count < 35) return 2;
  return 3;
}

const PHASE_RANGE = [0, 40, 120, 220] as const;

export default function NoButton({ noCount, onClick }: Props) {
  const btnRef = useRef<HTMLButtonElement>(null);
  // offset from natural layout position (transform-based, never absolute)
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  // prevent re-triggering move on the same hover event
  const hasMoved = useRef(false);
  // cooldown so mobile taps don't chain-fire moves
  const cooldownRef = useRef(false);

  const phase = getPhase(noCount);
  const range = PHASE_RANGE[phase];

  // Reset when restarted
  useEffect(() => {
    if (noCount === 0) {
      setOffset({ x: 0, y: 0 });
      hasMoved.current = false;
    }
  }, [noCount]);

  // Also reset offset back toward center after each click (phases 1-3)
  // so it never drifts too far from original position over many clicks
  useEffect(() => {
    if (phase === 0) {
      setOffset({ x: 0, y: 0 });
    }
  }, [phase]);

  const computeSafeOffset = useCallback((): { x: number; y: number } => {
    if (!btnRef.current || range === 0) return { x: 0, y: 0 };

    const btn = btnRef.current;
    const rect = btn.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const margin = 16;

    // Random candidate offset
    const angle = Math.random() * 2 * Math.PI;
    const dist = range * (0.5 + Math.random() * 0.5); // 50–100% of range
    let dx = Math.cos(angle) * dist;
    let dy = Math.sin(angle) * dist;

    // Clamp so button stays inside viewport
    const newLeft = rect.left + dx;
    const newRight = rect.right + dx;
    const newTop = rect.top + dy;
    const newBottom = rect.bottom + dy;

    if (newLeft < margin) dx += margin - newLeft;
    if (newRight > vw - margin) dx -= newRight - (vw - margin);
    if (newTop < margin) dy += margin - newTop;
    if (newBottom > vh - margin) dy -= newBottom - (vh - margin);

    return { x: Math.round(dx), y: Math.round(dy) };
  }, [range]);

  const triggerMove = useCallback(() => {
    if (phase === 0 || cooldownRef.current) return;
    cooldownRef.current = true;
    const newOffset = computeSafeOffset();
    setOffset(newOffset);
    hasMoved.current = true;
    // cooldown: prevent another move for 600ms (safe for fast clickers)
    setTimeout(() => { cooldownRef.current = false; }, 600);
  }, [phase, computeSafeOffset]);

  // Hover: dodge for phases 1–3 (desktop only)
  const handleMouseEnter = useCallback(() => {
    if (phase === 0) return;
    triggerMove();
  }, [phase, triggerMove]);

  // Click: always fire onClick; move only for phases 2–3
  const handleClick = useCallback(() => {
    onClick();
    if (phase >= 2) {
      // slight delay so click registers before DOM shifts
      setTimeout(triggerMove, 80);
    }
  }, [onClick, phase, triggerMove]);

  // Touch start on mobile: for phases 2–3, move on touch-start (pre-emptive)
  // This way the finger doesn't chase the button on the same tap
  const handleTouchStart = useCallback(() => {
    if (phase >= 2) triggerMove();
  }, [phase, triggerMove]);

  // Visual shrink: only from phase 2 onward, and only a little
  const visualScale = phase < 2 ? 1 : Math.max(0.72, 1 - (noCount - 20) * 0.005);

  return (
    <motion.button
      ref={btnRef}
      animate={{ x: offset.x, y: offset.y }}
      transition={{
        type: "spring",
        stiffness: phase >= 3 ? 200 : 260,
        damping: phase >= 3 ? 18 : 22,
        mass: 0.8,
      }}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      className="font-inter font-medium rounded-full cursor-pointer select-none"
      style={{
        // Large touch target for mobile (min 44×44px)
        minWidth: 56,
        minHeight: 44,
        padding: "10px 22px",
        fontSize: "1rem",
        background: "rgba(139,58,74,0.12)",
        border: "1.5px solid #8B3A4A",
        color: "#8B3A4A",
        transform: `scale(${visualScale})`,
        transition: "transform 0.4s ease",
        transformOrigin: "center",
        whiteSpace: "nowrap",
        zIndex: 20,
        touchAction: "manipulation",
        WebkitTapHighlightColor: "transparent",
        // Extend invisible hit area for easier mobile tap
        position: "relative",
      }}
      whileTap={{ scale: visualScale * 0.93 }}
    >
      NO 💔
    </motion.button>
  );
}
