"use client";
// src/components/MilestoneToast.tsx

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/siteConfig";

interface Props {
  noCount: number;
}

export default function MilestoneToast({ noCount }: Props) {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [lastShown, setLastShown] = useState(0);

  useEffect(() => {
    const milestones = siteConfig.milestones as Record<number, { text: string; emoji: string }>;
    const m = milestones[noCount];
    if (m && noCount !== lastShown) {
      setMessage(`${m.emoji} ${m.text}`);
      setVisible(true);
      setLastShown(noCount);
      const t = setTimeout(() => setVisible(false), 3500);
      return () => clearTimeout(t);
    }
  }, [noCount, lastShown]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl text-center max-w-xs shadow-xl"
          style={{
            background: "rgba(234,220,200,0.96)",
            backdropFilter: "blur(10px)",
            border: "1px solid #D9A0A7",
            color: "#8B3A4A",
            fontFamily: "var(--font-caveat), cursive",
            fontSize: "1.1rem",
          }}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
