"use client";
// src/components/StartScreen.tsx

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import NoButton from "./NoButton";
import MilestoneToast from "./MilestoneToast";

interface Props {
  name: string;
  noCount: number;
  onYes: () => void;
  onNo: () => void;
}

export default function StartScreen({ name, noCount, onYes, onNo }: Props) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionKey, setQuestionKey] = useState(0);

  // Pick next question when noCount changes
  useEffect(() => {
    const idx = Math.min(noCount, siteConfig.questions.length - 1);
    setQuestionIndex(idx);
    setQuestionKey((k) => k + 1);
  }, [noCount]);

  const currentQuestion = siteConfig.questions[questionIndex] ?? siteConfig.questions[0];
  const yesScale = 1 + noCount * 0.015;
  const displayName = name !== siteConfig.defaultName ? name : null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-8" style={{ position: "relative", zIndex: 10 }}>
      <MilestoneToast noCount={noCount} />

      {/* Paper card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 22, delay: 0.1 }}
        className="w-full max-w-sm relative"
        style={{
          background: "linear-gradient(145deg, #FFF8F0 0%, #EADCC8 60%, #F4E7D3 100%)",
          border: "1.5px solid #D9A0A780",
          borderRadius: "24px",
          boxShadow: "0 8px 40px rgba(139,58,74,0.12), 0 2px 8px rgba(139,58,74,0.08), inset 0 1px 0 rgba(255,255,255,0.6)",
          padding: "36px 28px 32px",
        }}
      >
        {/* Decorative top flourish */}
        <div className="flex justify-center mb-4">
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 4, repeat: Infinity }}
            style={{ color: "#D9A0A7", fontSize: "1.8rem" }}
          >
            🌸
          </motion.div>
        </div>

        {/* Personalized title */}
        {displayName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mb-1"
            style={{
              fontFamily: "var(--font-caveat), cursive",
              fontSize: "1.1rem",
              color: "#8B3A4A",
              opacity: 0.85,
            }}
          >
            {displayName} ke liye ek chhota sa sawaal ❤️
          </motion.p>
        )}

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6"
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(1.6rem, 5vw, 2.2rem)",
            fontWeight: 700,
            color: "#7D3948",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          Ek chhota sa sawaal 👉👈
        </motion.h1>

        {/* Divider */}
        <div className="flex items-center gap-2 mb-5">
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, transparent, #D9A0A760)" }} />
          <div style={{ color: "#D9A0A7", fontSize: "0.8rem" }}>✦</div>
          <div style={{ flex: 1, height: 1, background: "linear-gradient(to left, transparent, #D9A0A760)" }} />
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.p
            key={questionKey}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="text-center mb-8"
            style={{
              fontFamily: "var(--font-caveat), cursive",
              fontSize: "clamp(1.25rem, 4vw, 1.55rem)",
              color: "#8B3A4A",
              lineHeight: 1.4,
              minHeight: "3.5rem",
            }}
          >
            {currentQuestion}
          </motion.p>
        </AnimatePresence>

        {/* Buttons container – overflow hidden to keep No in card area */}
        <div className="relative flex items-center justify-center gap-5 min-h-[60px]">
          {/* YES button */}
          <motion.button
            onClick={onYes}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: yesScale }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="font-inter font-semibold rounded-full cursor-pointer"
            style={{
              padding: "12px 28px",
              fontSize: "1rem",
              background: "linear-gradient(135deg, #D9A0A7, #8B3A4A)",
              color: "#FFF8F0",
              border: "none",
              boxShadow: "0 4px 18px rgba(139,58,74,0.30)",
              letterSpacing: "0.02em",
            }}
          >
            YES ❤️
          </motion.button>

          {/* NO button */}
          <NoButton noCount={noCount} onClick={onNo} />
        </div>

        {/* No counter */}
        {noCount > 0 && (
          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mt-4"
            style={{
              fontFamily: "var(--font-caveat), cursive",
              fontSize: "0.95rem",
              color: "#8B3A4A",
              opacity: 0.7,
            }}
          >
            No Count: {noCount} 😭
          </motion.p>
        )}

        {/* Decorative postmark */}
        <div className="flex justify-end mt-4">
          <div
            style={{
              fontFamily: "var(--font-caveat), cursive",
              fontSize: "0.65rem",
              color: "#D9A0A770",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              borderLeft: "2px solid #D9A0A740",
              paddingLeft: "6px",
            }}
          >
            written with ❤️
          </div>
        </div>
      </motion.div>
    </div>
  );
}
