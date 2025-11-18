// small utility to decide quality level
export function detectQuality() {
  const deviceMemory = (navigator as any).deviceMemory || 4;
  const cpu = navigator.hardwareConcurrency || 4;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  // conservative rules: high-quality if modern CPU + memory + dpr
  const isHigh = deviceMemory >= 4 && cpu >= 4 && dpr >= 1.25;
  const isMedium = deviceMemory >= 2 && cpu >= 2;
  return { isHigh, isMedium };
}

// call once at mount and set CSS tokens
export function applyQuality() {
  const q = detectQuality();
  const el = document.querySelector(".liquid-pill__proxyInner") as HTMLElement|null;

  if (q.isHigh) {
    document.documentElement.style.setProperty("--liquid-displace-scale", "6");
    document.documentElement.style.setProperty("--glass-blur", "18px");
    document.documentElement.style.setProperty("--glass-shine-opacity", "0.9");
    if (el) el.style.filter = "url(#liquidRefraction)";
  } else if (q.isMedium) {
    document.documentElement.style.setProperty("--liquid-displace-scale", "3");
    document.documentElement.style.setProperty("--glass-blur", "14px");
    document.documentElement.style.setProperty("--glass-shine-opacity", "0.65");
    // For medium devices, keep the liquid effect but with a reduced, less costly displacement.
    if (el) el.style.filter = "url(#liquidRefraction)";
  } else {
    // low quality — no displacement, tiny blur, no noise overlay
    document.documentElement.style.setProperty("--liquid-displace-scale", "0");
    document.documentElement.style.setProperty("--glass-blur", "10px");
    document.documentElement.style.setProperty("--glass-shine-opacity", "0.45");
    if (el) el.style.filter = "none";
  }
}