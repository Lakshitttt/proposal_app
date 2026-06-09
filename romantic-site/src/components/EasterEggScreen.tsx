"use client";
// src/components/EasterEggScreen.tsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import ShareButton from "./ShareButton";

interface Props {
  onYes: () => void;
  onStayNo: () => void;
}

const LINES = siteConfig.easterEgg.lines;
const AFTER_LINES = siteConfig.easterEgg.afterLines;

export default function EasterEggScreen({ onYes, onStayNo }: Props) {
  const [step, setStep] = useState(0);
  const totalLines = LINES.length + 1 /* achievement */ + AFTER_LINES.length;

  useEffect(() => {
    if (step >= totalLines) return;
    const delay = step < 3 ? 1400 : 1800;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step, totalLines]);

  const allContent: { text: string; type: "line" | "achievement" | "after" }[] = [
    ...LINES.map((t) => ({ text: t, type: "line" as const })),
    { text: `🏆 Achievement Unlocked\n${siteConfig.easterEgg.achievement}`, type: "achievement" as const },
    ...AFTER_LINES.map((t) => ({ text: t, type: "after" as const })),
  ];

  const showButtons = step >= totalLines;

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-4 py-8"
      style={{ position: "relative", zIndex: 10 }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 20 }}
        className="w-full max-w-sm"
        style={{
          background: "linear-gradient(145deg, #FFF8F0 0%, #EADCC8 60%, #F4E7D3 100%)",
          border: "1.5px solid #D9A0A780",
          borderRadius: "24px",
          boxShadow: "0 8px 40px rgba(139,58,74,0.14), inset 0 1px 0 rgba(255,255,255,0.6)",
          padding: "40px 28px 32px",
        }}
      >
        {/* Trophy header */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
          className="text-center mb-4 text-4xl"
        >
          🏆
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mb-6"
          style={{
            fontFamily: "var(--font-playfair), serif",
            fontSize: "clamp(1.3rem, 4vw, 1.7rem)",
            fontWeight: 700,
            color: "#7D3948",
          }}
        >
          Secret Ending Unlocked
        </motion.p>

        <div className="space-y-3 text-center">
          {allContent.slice(0, step).map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              {item.type === "achievement" ? (
                <div
                  className="mx-auto px-4 py-3 rounded-xl"
                  style={{
                    background: "rgba(139,58,74,0.08)",
                    border: "1px solid #D9A0A7",
                    maxWidth: "240px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "var(--font-caveat), cursive",
                      fontSize: "1.05rem",
                      color: "#8B3A4A",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              ) : (
                <p
                  style={{
                    fontFamily: "var(--font-caveat), cursive",
                    fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
                    color: "#7D3948",
                    lineHeight: 1.4,
                  }}
                >
                  {item.text}
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Buttons */}
        <AnimatePresence>
          {showButtons && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex gap-3 justify-center mt-7"
            >
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={onStayNo}
                className="font-inter text-sm rounded-full px-5 py-2.5"
                style={{
                  background: "rgba(139,58,74,0.10)",
                  border: "1.5px solid #8B3A4A",
                  color: "#8B3A4A",
                }}
              >
                Stay No 😌
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
                onClick={onYes}
                className="font-inter text-sm font-semibold rounded-full px-5 py-2.5"
                style={{
                  background: "linear-gradient(135deg, #D9A0A7, #8B3A4A)",
                  border: "none",
                  color: "#FFF8F0",
                  boxShadow: "0 4px 14px rgba(139,58,74,0.28)",
                }}
              >
                Try Yes ❤️
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
