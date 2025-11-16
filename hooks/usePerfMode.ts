import { useEffect, useState } from "react";

type PerfMode = "high" | "mid" | "low";

export default function usePerfMode(): PerfMode {
  const [mode, setMode] = useState<PerfMode>("high");

  useEffect(() => {
    try {
      const mem = (navigator as any).deviceMemory || 4; // GB
      const cores = (navigator as any).hardwareConcurrency || 4;
      const dpr = window.devicePixelRatio || 1;

      // Heuristics:
      // low: deviceMemory <= 1.5GB OR cores <= 2 OR dpr > 2.5 on low memory device
      if (mem <= 1.5 || cores <= 2) {
        setMode("low");
        return;
      }
      // mid: memory <= 3 OR cores <= 4
      if (mem <= 3 || cores <= 4 || dpr > 2) {
        setMode("mid");
        return;
      }
      setMode("high");
    } catch {
      setMode("high");
    }
  }, []);

  return mode;
}
