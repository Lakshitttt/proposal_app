"use client";
// src/hooks/useAudio.ts

import { useCallback, useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/siteConfig";

interface AudioSettings {
  musicEnabled: boolean;
  sfxEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
}

const DEFAULT_SETTINGS: AudioSettings = {
  musicEnabled: true,
  sfxEnabled: true,
  musicVolume: siteConfig.audio.defaultMusicVolume,
  sfxVolume: siteConfig.audio.defaultSfxVolume,
};

const STORAGE_KEY = "romantic_audio_settings";
const FADE_DURATION_MS = 1000;
const FADE_STEPS = 20;

export function useAudio() {
  const [settings, setSettings] = useState<AudioSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const bgRef = useRef<HTMLAudioElement | null>(null);
  const hasStarted = useRef(false);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Keep a stable ref to current settings so callbacks don't go stale
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  // Load settings from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
        setSettings(parsed);
        settingsRef.current = parsed;
      }
    } catch { /* ignore */ }
    setIsLoaded(true);
  }, []);

  // Save settings to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(settings)); } catch { /* ignore */ }
  }, [settings, isLoaded]);

  // Create background audio element once
  useEffect(() => {
    if (typeof window === "undefined") return;
    const audio = new Audio();
    audio.src = siteConfig.audio.bgMusic;
    audio.loop = true;
    audio.volume = settingsRef.current.musicVolume;
    audio.preload = "auto";
    audio.addEventListener("canplaythrough", () => console.log("[Audio] bg-music loaded"));
    audio.addEventListener("error", () => console.log("[Audio] bg-music not found — place bg-music.mp3 in public/audio/"));
    bgRef.current = audio;
    return () => { audio.pause(); bgRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync volume / enabled state
  useEffect(() => {
    if (!bgRef.current) return;
    bgRef.current.volume = settings.musicVolume;
    if (!settings.musicEnabled) {
      bgRef.current.pause();
    } else if (hasStarted.current) {
      bgRef.current.play().catch(() => {});
    }
  }, [settings.musicEnabled, settings.musicVolume]);

  // ── Fade helpers ─────────────────────────────────────────────────────────

  const clearFade = useCallback(() => {
    if (fadeTimerRef.current) {
      clearInterval(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  }, []);

  /** Smooth fade-out over FADE_DURATION_MS, then pause & reset volume */
  const stopBgMusic = useCallback(() => {
    const audio = bgRef.current;
    if (!audio || audio.paused) return;
    clearFade();

    const startVol = audio.volume;
    const stepSize = startVol / FADE_STEPS;
    const intervalMs = FADE_DURATION_MS / FADE_STEPS;

    fadeTimerRef.current = setInterval(() => {
      if (!bgRef.current) { clearFade(); return; }
      const next = bgRef.current.volume - stepSize;
      if (next <= 0) {
        bgRef.current.volume = 0;
        bgRef.current.pause();
        // Restore original volume so future play() starts at the right level
        bgRef.current.volume = settingsRef.current.musicVolume;
        hasStarted.current = false;
        clearFade();
      } else {
        bgRef.current.volume = next;
      }
    }, intervalMs);
  }, [clearFade]);

  const startBgMusic = useCallback(() => {
    if (!bgRef.current || hasStarted.current || !settingsRef.current.musicEnabled) return;
    clearFade();
    bgRef.current.volume = settingsRef.current.musicVolume;
    hasStarted.current = true;
    bgRef.current.play().catch(() => {
      console.log("[Audio] Autoplay blocked — user interaction needed");
      hasStarted.current = false;
    });
  }, [clearFade]);

  // ── SFX ──────────────────────────────────────────────────────────────────

  const playSfx = useCallback((src: string) => {
    if (!settingsRef.current.sfxEnabled) return;
    const sfx = new Audio(src);
    sfx.volume = settingsRef.current.sfxVolume;
    sfx.addEventListener("error", () => console.log(`[Audio] SFX not found: ${src}`));
    sfx.play().catch(() => {});
  }, []);

  const playNo      = useCallback(() => playSfx(siteConfig.audio.noSound),  [playSfx]);
  const playYes     = useCallback(() => playSfx(siteConfig.audio.yesSound), [playSfx]);
  const playSuccess = useCallback(() => playSfx(siteConfig.audio.success),  [playSfx]);
  const playEnding  = useCallback(() => playSfx(siteConfig.audio.ending),   [playSfx]);

  const updateSettings = useCallback((patch: Partial<AudioSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const muteAll = useCallback(() => {
    setSettings((prev) => ({ ...prev, musicEnabled: false, sfxEnabled: false }));
  }, []);

  return {
    settings,
    updateSettings,
    muteAll,
    startBgMusic,
    stopBgMusic,
    playNo,
    playYes,
    playSuccess,
    playEnding,
  };
}
