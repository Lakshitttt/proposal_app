"use client";
// src/hooks/useProgress.ts

import { useCallback, useEffect, useState } from "react";

interface Progress {
  noCount: number;
  phase: "start" | "easter-egg" | "yes" | "stay-no";
}

const STORAGE_KEY = "romantic_progress";

const DEFAULT: Progress = { noCount: 0, phase: "start" };

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(DEFAULT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setProgress({ ...DEFAULT, ...JSON.parse(stored) });
    } catch { /* ignore */ }
    setHydrated(true);
  }, []);

  const save = useCallback((p: Progress) => {
    setProgress(p);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(p)); } catch { /* ignore */ }
  }, []);

  const incrementNo = useCallback(() => {
    setProgress((prev) => {
      const next = { ...prev, noCount: prev.noCount + 1 };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const setPhase = useCallback((phase: Progress["phase"]) => {
    setProgress((prev) => {
      const next = { ...prev, phase };
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch { /* ignore */ }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    save(DEFAULT);
  }, [save]);

  return { progress, hydrated, incrementNo, setPhase, reset };
}
