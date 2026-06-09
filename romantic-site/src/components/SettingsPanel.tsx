"use client";
// src/components/SettingsPanel.tsx

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AudioSettings {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
}

interface Props {
  settings: AudioSettings;
  onUpdate: (patch: Partial<AudioSettings>) => void;
  onMuteAll: () => void;
}

export default function SettingsPanel({ settings, onUpdate, onMuteAll }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Gear icon */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.1, rotate: 90 }}
        whileTap={{ scale: 0.95 }}
        className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "rgba(244,231,211,0.85)", backdropFilter: "blur(8px)", border: "1px solid #D9A0A7" }}
        aria-label="Settings"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B3A4A" strokeWidth="2">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute top-12 right-0 w-64 rounded-2xl p-4 shadow-xl"
            style={{
              background: "rgba(244,231,211,0.96)",
              backdropFilter: "blur(12px)",
              border: "1px solid #D9A0A7",
            }}
          >
            <p className="font-playfair text-sm font-semibold text-[#8B3A4A] mb-3">Audio Settings</p>

            {/* Music toggle */}
            <label className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#7D3948] font-inter">🎵 Background Music</span>
              <button
                onClick={() => onUpdate({ musicEnabled: !settings.musicEnabled })}
                className={`w-10 h-5 rounded-full transition-colors relative ${settings.musicEnabled ? "bg-[#D9A0A7]" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings.musicEnabled ? "translate-x-5" : "translate-x-0.5"}`}
                />
              </button>
            </label>

            {/* Music volume */}
            <div className="mb-3">
              <span className="text-xs text-[#7D3948] font-inter">Volume: {Math.round(settings.musicVolume * 100)}%</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.musicVolume}
                onChange={(e) => onUpdate({ musicVolume: parseFloat(e.target.value) })}
                className="w-full mt-1 accent-[#D9A0A7]"
              />
            </div>

            {/* SFX toggle */}
            <label className="flex items-center justify-between mb-2">
              <span className="text-xs text-[#7D3948] font-inter">🔊 Sound Effects</span>
              <button
                onClick={() => onUpdate({ sfxEnabled: !settings.sfxEnabled })}
                className={`w-10 h-5 rounded-full transition-colors relative ${settings.sfxEnabled ? "bg-[#D9A0A7]" : "bg-gray-300"}`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${settings.sfxEnabled ? "translate-x-5" : "translate-x-0.5"}`}
                />
              </button>
            </label>

            {/* SFX volume */}
            <div className="mb-3">
              <span className="text-xs text-[#7D3948] font-inter">SFX Volume: {Math.round(settings.sfxVolume * 100)}%</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={settings.sfxVolume}
                onChange={(e) => onUpdate({ sfxVolume: parseFloat(e.target.value) })}
                className="w-full mt-1 accent-[#D9A0A7]"
              />
            </div>

            {/* Audio status */}
            <div className="text-xs text-[#8B3A4A] bg-[#EADCC8] rounded-lg p-2 mb-3 font-inter">
              Music: {settings.musicEnabled ? "ON 🎵" : "OFF 🔇"} · SFX: {settings.sfxEnabled ? "ON 🔊" : "OFF 🔕"}
            </div>

            {/* Mute all */}
            <button
              onClick={onMuteAll}
              className="w-full text-xs py-1.5 rounded-lg text-[#8B3A4A] font-inter transition-colors"
              style={{ background: "#D9A0A730", border: "1px solid #D9A0A7" }}
            >
              🔇 Mute All
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
