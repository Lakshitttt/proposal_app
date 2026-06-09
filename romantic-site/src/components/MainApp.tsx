"use client";
// src/components/MainApp.tsx

import { useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useProgress } from "@/hooks/useProgress";
import { useAudio } from "@/hooks/useAudio";
import BackgroundLayers from "./BackgroundLayers";
import SettingsPanel from "./SettingsPanel";
import StartScreen from "./StartScreen";
import YesScreen from "./YesScreen";
import EasterEggScreen from "./EasterEggScreen";
import StayNoScreen from "./StayNoScreen";

interface Props {
  name: string;
}

export default function MainApp({ name }: Props) {
  const { progress, hydrated, incrementNo, setPhase, reset } = useProgress();
  const audio = useAudio();

  // Start bg music safely
  const ensureBgMusic = useCallback(() => {
    audio.startBgMusic();
  }, [audio]);

  // Start music on FIRST click/tap anywhere
  useEffect(() => {
    const startMusic = () => {
      audio.startBgMusic();
    };

    window.addEventListener("click", startMusic, { once: true });
    window.addEventListener("touchstart", startMusic, { once: true });

    return () => {
      window.removeEventListener("click", startMusic);
      window.removeEventListener("touchstart", startMusic);
    };
  }, [audio]);

  // Yes: fade bg → yes sfx → success → ending
  const handleYes = useCallback(() => {
    ensureBgMusic();

    audio.stopBgMusic();
    audio.playYes();

    setTimeout(() => {
      audio.playSuccess();
    }, 700);

    setTimeout(() => {
      audio.playEnding();
    }, 2500);

    setPhase("yes");
  }, [audio, ensureBgMusic, setPhase]);

  const handleNo = useCallback(() => {
    ensureBgMusic();
    audio.playNo();
    incrementNo();
  }, [audio, ensureBgMusic, incrementNo]);

  // Easter egg threshold
  useEffect(() => {
    if (progress.noCount >= 50 && progress.phase === "start") {
      setPhase("easter-egg");
    }
  }, [progress.noCount, progress.phase, setPhase]);

  // Easter egg -> Yes
  const handleEasterYes = useCallback(() => {
    audio.stopBgMusic();

    audio.playYes();

    setTimeout(() => {
      audio.playSuccess();
    }, 700);

    setTimeout(() => {
      audio.playEnding();
    }, 2500);

    setPhase("yes");
  }, [audio, setPhase]);

  // Easter egg -> Stay No
  const handleEasterStayNo = useCallback(() => {
    audio.stopBgMusic();
    setPhase("stay-no");
  }, [audio, setPhase]);

  const handleRestart = useCallback(() => {
    reset();
  }, [reset]);

  if (!hydrated) return null;

  return (
    <>
      <BackgroundLayers />

      <SettingsPanel
        settings={audio.settings}
        onUpdate={audio.updateSettings}
        onMuteAll={audio.muteAll}
      />

      <AnimatePresence mode="wait">
        {progress.phase === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <StartScreen
              name={name}
              noCount={progress.noCount}
              onYes={handleYes}
              onNo={handleNo}
            />
          </motion.div>
        )}

        {progress.phase === "easter-egg" && (
          <motion.div
            key="easter-egg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <EasterEggScreen
              onYes={handleEasterYes}
              onStayNo={handleEasterStayNo}
            />
          </motion.div>
        )}

        {progress.phase === "yes" && (
          <motion.div
            key="yes"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <YesScreen
              noCount={progress.noCount}
              onRestart={handleRestart}
            />
          </motion.div>
        )}

        {progress.phase === "stay-no" && (
          <motion.div
            key="stay-no"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <StayNoScreen onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}