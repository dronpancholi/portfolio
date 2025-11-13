"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Instagram,
  MessageSquare,
  Clipboard,
  Check,
} from "lucide-react";
import { SOCIAL_LINKS } from "../constants";
import GlassCard from "./ui/GlassCard";

/* -------------------- THEME: default to LIGHT -------------------- */
function useForceLightTheme() {
  useEffect(() => {
    const r = document.documentElement;
    r.classList.add("light");
    r.classList.remove("dark");
    // Optional: if you use next-themes, also ensure data-theme
    r.setAttribute("data-theme", "light");
  }, []);
}

/* ------------------------ ICON TYPING ------------------------ */
type SocialProfileName = typeof SOCIAL_LINKS.profiles[number]["name"];
const ICON_MAP: Partial<
  Record<SocialProfileName, React.ComponentType<{ className?: string; style?: React.CSSProperties }>>
> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
  Discord: MessageSquare,
};

/* =================== SHARED KEYFRAME (NO GAPS) =================== */
/* We use a class keyframe so both foreground rows and the pill’s
   internal proxy rows are guaranteed to stay in sync. */
const GlobalStyles = () => (
  <style>{`
    @keyframes xloop25 {
      from { transform: translateX(0%); }
      to   { transform: translateX(-25%); }
    }
    .ticker-rail { width:400%; display:flex; align-items:center; }
    .ticker-chunk { padding-left:0.75rem; padding-right:0.75rem; }
    .ticker-anim { animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform; }
    /* Different speeds */
    .speed-25s { animation-duration: 25s; }
    .speed-33s { animation-duration: 33s; }
    .speed-40s { animation-duration: 40s; }
    /* Optional delays */
    .delay-0   { animation-delay: 0s; }
    .delay-15  { animation-delay: 1.5s; }
    .delay-3   { animation-delay: 3s; }
    .run-anim  { animation-name: xloop25; }
  `}</style>
);

/* =================== TOKEN COLOUR MIX (per-line) =================== */
const TOKENS = [
  "text-[#AEEBFF]", // aqua
  "text-[#C9B7FF]", // lavender
  "text-[#A0FFC9]", // mint
  "text-[#FFE6A3]", // pale gold
  "text-[#FFBBD4]", // rose
  "text-[#9ED0FF]", // sky
] as const;

function Colorize(tokens: (string | { t: string; cls?: string })[]) {
  let i = 0;
  return tokens.map((tok, idx) => {
    if (typeof tok === "string") {
      return (
        <span key={idx} className="text-black/45 dark:text-white/35">
          {tok}
        </span>
      );
    }
    const cls = tok.cls ?? TOKENS[i++ % TOKENS.length];
    return <span key={idx} className={cls}>{tok.t}</span>;
  });
}

function Line1() {
  return Colorize([
    { t: "const" }, " ", { t: "identity" }, " ", "=", " ", "{", " ",
    { t: "name" }, ":", " ", { t: `"Dron Pancholi"` }, ", ", { t: "focus" }, ":", " ",
    "[", { t: `"AI"` }, ",", " ", { t: `"Systems"` }, ",", " ", { t: `"Design"` }, "]", " ", "};",
  ]);
}
function Line2() {
  return Colorize([
    { t: "const" }, " ", { t: "principles" }, " ", "=", " ", "[",
    { t: `"Clarity"` }, ", ", { t: `"Depth"` }, ", ", { t: `"Intention"` }, "]", ";",
  ]);
}
function Line3(email: string) {
  return Colorize([
    { t: "function" }, " ", { t: "contact" }, "(", { t: "email" }, ")", " ", "{", " ",
    { t: "return" }, " ", { t: `\`mailto:\${email}\``}, ";", " ", "}",
  ]);
}

/* ------------- Seamless row: 4 chunks, translate -25% ------------- */
function SeamlessRow({
  chunk,
  speedClass,
  delayClass = "delay-0",
  className = "",
}: {
  chunk: React.ReactNode;
  speedClass: "speed-25s" | "speed-33s" | "speed-40s";
  delayClass?: "delay-0" | "delay-15" | "delay-3";
  className?: string;
}) {
  const rail = useMemo(
    () => Array.from({ length: 4 }).map((_, i) => <span key={i} className="ticker-chunk">{chunk}</span>),
    [chunk]
  );
  return (
    <div className={`relative w-[min(100%,1100px)] overflow-hidden select-none ${className}`} aria-hidden>
      <div className={`ticker-rail run-anim ticker-anim ${speedClass} ${delayClass}`}>
        {rail}
      </div>
    </div>
  );
}

/* =================== LIQUID PILL (with proxy) =================== */
/* We re-render the 3 ticker lines INSIDE the pill (clipped) and apply
   the same distortion filter + blur/saturation to that proxy content.
   This produces *perceptual refraction + light blending* even in LIGHT theme. */
function LiquidPill({
  children,
  proxy1,
  proxy2,
  proxy3,
}: {
  children: React.ReactNode;
  proxy1: React.ReactNode;
  proxy2: React.ReactNode;
  proxy3: React.ReactNode;
}) {
  return (
    <motion.div
      className="glass flex items-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-full"
      whileHover={{ 
        filter: "brightness(1.06) saturate(1.08)", 
        scale: 1.015 
      }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
    >
      {/* PROXY BACKDROP (clipped and filtered) */}
      <div className="contact-proxy" style={{ filter: 'url(#liquid-refraction)' }}>
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%-11px)] space-y-1 sm:space-y-[7px] pointer-events-none">
            <div className="w-[min(100%,1100px)]">{proxy1}</div>
            <div className="w-[min(100%,1100px)]">{proxy2}</div>
            <div className="w-[min(100%,1100px)]">{proxy3}</div>
          </div>
        </div>
        {/* Lens volume (inner highlights/shadows) */}
        <div className="absolute inset-0 rounded-full shadow-[inset_1px_1px_5px_rgba(255,255,255,0.55),inset_-4px_-6px_12px_rgba(0,0,0,0.32)] pointer-events-none" />
        {/* Shine sweep */}
        <div className="lens-shine" />
      </div>

      {/* CONTENT (icons) */}
      <div className="relative z-[20] flex items-center gap-5 sm:gap-7">
        {children}
      </div>
    </motion.div>
  );
}

/* ======================= HEADER FILTER (refraction) ======================= */
const LiquidRefractionFilter: React.FC = () => (
  <svg style={{ display: "none" }} aria-hidden="true">
    <defs>
      <filter id="liquid-refraction" x="-20%" y="-20%" width="140%" height="140%">
        <feTurbulence baseFrequency="0.006" numOctaves="2" seed="9" result="noise" />
        <feGaussianBlur stdDeviation="1" in="noise" result="softNoise" />
        <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="10" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </defs>
  </svg>
);

/* =============================== CONTACT =============================== */
const Contact: React.FC = () => {
  useForceLightTheme();
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Prebuilt tokenised chunks (reused for outer rows and pill proxy rows)
  const chunk1 = useMemo(() => <>{Line1()}</>, []);
  const chunk2 = useMemo(() => <>{Line2()}</>, []);
  const chunk3 = useMemo(() => <>{Line3(SOCIAL_LINKS.email)}</>, []);

  return (
    <section id="contact" className="py-16 md:py-24 text-center scroll-mt-24">
      <GlobalStyles />
      <LiquidRefractionFilter />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-3"
      >
        Start a Conversation
      </motion.h2>

      {/* Lead */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-lg text-[var(--text-secondary)] mb-12 max-w-xl mx-auto"
      >
        I am open to new projects and collaborations. For inquiries, please reach out via email.
      </motion.p>

      {/* Email card */}
      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-xl mx-auto"
      >
        <GlassCard>
          <div className="p-8 md:p-10 flex flex-col items-center justify-center text-center">
            <Mail className="w-12 h-12 text-[var(--accent)] mb-4" />
            <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)] mb-6">
              Email me directly at
            </h3>

            <div className="w-full max-w-md flex items-center justify-between bg-black/5 dark:bg-white/5 rounded-xl p-3">
              <span className="text-sm sm:text-base text-[var(--text-secondary)] font-mono truncate">
                {SOCIAL_LINKS.email}
              </span>

              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-1 w-24 h-9 text-sm font-semibold bg-[var(--accent)] text-black dark:text-[var(--text-main)] rounded-lg hover:brightness-110 transition-all"
                aria-label="Copy email address"
              >
                {copied ? (
                  <motion.span key="copied-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1">
                    <Check size={16} />
                    Copied
                  </motion.span>
                ) : (
                  <span className="flex items-center gap-1">
                    <Clipboard size={16} />
                    Copy
                  </span>
                )}
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* ======= Social pill + continuous multi-line code background ======= */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-24 flex justify-center"
      >
        {/* Neutral substrate (helps refraction in light theme) */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[90vw] h-[90px] sm:w-[min(92vw,1100px)] sm:h-[120px] rounded-full pointer-events-none z-0"
          style={{ background: "rgba(0,0,0,0.03)", filter: "blur(18px) saturate(120%)" }}
        />

        {/* Foreground tikers (outer scene) — NO gradients, mixed tokens */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-[1] space-y-1 sm:space-y-[7px] select-none">
          <div className="flex justify-center">
            <div className="relative w-[min(100%,1100px)] overflow-hidden select-none" aria-hidden>
              <div className={`ticker-rail run-anim ticker-anim speed-25s delay-0 text-[11px] sm:text-[13px]`}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="ticker-chunk">{chunk1}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className={`relative w-[min(100%,1100px)] overflow-hidden select-none`} aria-hidden>
              <div className={`ticker-rail run-anim ticker-anim speed-33s delay-15 text-[11px] sm:text-[13px]`}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="ticker-chunk">{chunk2}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-[min(100%,1100px)] overflow-hidden select-none" aria-hidden>
              <div className={`ticker-rail run-anim ticker-anim speed-40s delay-3 text-[11px] sm:text-[13px]`}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="ticker-chunk">{chunk3}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10">
          <LiquidPill
            proxy1={<SeamlessRow chunk={chunk1} speedClass="speed-25s" delayClass="delay-0" className="text-[11px] sm:text-[13px]" />}
            proxy2={<SeamlessRow chunk={chunk2} speedClass="speed-33s" delayClass="delay-15" className="text-[11px] sm:text-[13px]" />}
            proxy3={<SeamlessRow chunk={chunk3} speedClass="speed-40s" delayClass="delay-3" className="text-[11px] sm:text-[13px]" />}
          >
            {SOCIAL_LINKS.profiles.map((profile) => {
              const Icon = ICON_MAP[profile.name] || Github;
              return (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.name}
                >
                  <motion.div
                    whileHover={{ scale: 1.28 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    className="transition-all"
                  >
                    <Icon
                      className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.85)] 
                                dark:text-[#FFF7C5] dark:drop-shadow-[0_0_10px_rgba(255,247,200,0.75)]"
                      style={{
                        WebkitTextStroke: "1px rgba(0,0,0,0.45)", // visible in light mode
                      }}
                    />
                  </motion.div>
                </a>
              );
            })}
          </LiquidPill>
        </div>

      </motion.div>
    </section>
  );
};

export default Contact;