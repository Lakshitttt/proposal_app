"use client";
// src/components/YesScreen.tsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";
import Celebration from "./Celebration";
import ShareButton from "./ShareButton";

interface Props {
  noCount: number;
  onRestart: () => void;
}

const STORY_LINES = siteConfig.yesMessages.story;

export default function YesScreen({ noCount, onRestart }: Props) {
  const [step, setStep] = useState(0);
  const [celebrate, setCelebrate] = useState(true);

  // Auto-advance story lines
  useEffect(() => {
    if (step >= STORY_LINES.length + 3) return;
    const delay = step === 0 ? 1200 : 2200;
    const t = setTimeout(() => setStep((s) => s + 1), delay);
    return () => clearTimeout(t);
  }, [step]);

  useEffect(() => {
    const t = setTimeout(() => setCelebrate(false), 4500);
    return () => clearTimeout(t);
  }, []);

  const clickMessage =
    noCount === 0
      ? siteConfig.yesMessages.zeroClicks
      : siteConfig.yesMessages.manyClicks;

  const lines = [
    "Yay 🥹❤️",
    "Mujhe pata tha.",
    `Tumne No ko ${noCount} baar click kiya.`,
    clickMessage,
    ...STORY_LINES,
    "🌹",
    siteConfig.yesMessages.thankYou,
  ];

  return (
    <>
      <Celebration active={celebrate} />
      <div
        className="flex flex-col items-center justify-center min-h-screen px-4 py-8"
        style={{ position: "relative", zIndex: 10 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 22 }}
          className="w-full max-w-sm"
          style={{
            background: "linear-gradient(145deg, #FFF8F0 0%, #EADCC8 60%, #F4E7D3 100%)",
            border: "1.5px solid #D9A0A780",
            borderRadius: "24px",
            boxShadow: "0 8px 40px rgba(139,58,74,0.14), inset 0 1px 0 rgba(255,255,255,0.6)",
            padding: "40px 28px 32px",
          }}
        >
          <div className="text-center space-y-4">
            {lines.slice(0, step).map((line, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{
                  fontFamily: i === 0 || line === "🌹"
                    ? "var(--font-playfair), serif"
                    : i < 2
                    ? "var(--font-playfair), serif"
                    : "var(--font-caveat), cursive",
                  fontSize: i === 0
                    ? "clamp(2rem, 6vw, 2.6rem)"
                    : line === "🌹"
                    ? "2.5rem"
                    : line === siteConfig.yesMessages.thankYou
                    ? "1.2rem"
                    : "clamp(1.1rem, 3.5vw, 1.35rem)",
                  fontWeight: i === 0 ? 700 : 400,
                  color: "#7D3948",
                  lineHeight: 1.45,
                }}
              >
                {line}
              </motion.p>
            ))}
          </div>

          {/* Share & restart */}
          {step >= lines.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6"
            >
              <ShareButton />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onRestart}
                className="block mx-auto mt-4 text-xs font-inter"
                style={{ color: "#8B3A4A99" }}
              >
                ↩ Restart
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </>
  );
}
