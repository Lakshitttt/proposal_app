"use client";
// src/components/StayNoScreen.tsx

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import ShareButton from "./ShareButton";

interface Props {
  onRestart: () => void;
}

export default function StayNoScreen({ onRestart }: Props) {
  const [step, setStep] = useState(0);
  const lines = siteConfig.stayNoEnding;

  useEffect(() => {
    if (step >= lines.length) return;
    const t = setTimeout(() => setStep((s) => s + 1), 1600);
    return () => clearTimeout(t);
  }, [step, lines.length]);

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
        <div className="text-center space-y-4 mb-6">
          {lines.slice(0, step).map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              style={{
                fontFamily: i === lines.length - 1
                  ? "var(--font-caveat), cursive"
                  : "var(--font-playfair), serif",
                fontSize: i === lines.length - 1
                  ? "clamp(1rem, 3vw, 1.2rem)"
                  : "clamp(1.15rem, 3.5vw, 1.45rem)",
                fontWeight: i < 2 ? 600 : 400,
                color: "#7D3948",
                lineHeight: 1.45,
              }}
            >
              {line}
            </motion.p>
          ))}

          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ fontSize: "2.5rem" }}
            >
              🌹
            </motion.div>
          )}
        </div>

        {step >= lines.length && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <ShareButton />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="block mx-auto mt-4 text-sm font-inter rounded-full px-5 py-2"
              style={{
                background: "linear-gradient(135deg, #D9A0A7, #8B3A4A)",
                color: "#FFF8F0",
                border: "none",
                boxShadow: "0 3px 12px rgba(139,58,74,0.22)",
              }}
            >
              ↩ Start Over
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
