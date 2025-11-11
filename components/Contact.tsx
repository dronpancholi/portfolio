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
  Record<SocialProfileName, React.ComponentType<{ className?: string }>>
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
    .ticker-anim { animation-timing-function: linear; animation-iteration-count: infinite; }
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
    { t: "const" }, " ", { t: "dron" }, " ", "=", " ", "{", " ",
    { t: "name" }, ":", " ", { t: `"Dron Pancholi"` }, ", ", { t: "city" }, ":", " ",
    { t: `"Surendranagar"` }, ", ", { t: "tier" }, ":", " ", { t: `"Black Core"` }, " ", "}; ",
  ]);
}
function Line2() {
  return Colorize([
    { t: "const" }, " ", { t: "vision" }, " ", "=", " ", { t: `"Build Empires"` }, "; ",
    { t: "const" }, " ", { t: "motto" }, " ", "=", " ", { t: `"Faith • Trust • Transparency"` }, "; ",
    { t: "const" }, " ", { t: "socials" }, "=", "[",
    { t: `"LinkedIn"` }, ", ", { t: `"GitHub"` }, ", ", { t: `"Instagram"` }, ", ", { t: `"Discord"` }, "]", "; ",
  ]);
}
function Line3(email: string) {
  return Colorize([
    { t: "function" }, " ", { t: "contact" }, "()", " ", "{", " ",
    { t: "return" }, " ", "{", " ", { t: "email" }, ":", " ", { t: `"${email}"` },
    ", ", { t: "responseTime" }, ":", " ", { t: `"fast"` }, " ", "}", " ", "}", " ",
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
    <div
      className="
        relative z-[3] flex items-center gap-7 px-8 py-3 rounded-full overflow-hidden isolate
        bg-white/14 border border-black/10 dark:border-white/20
        shadow-[0_8px_30px_rgba(0,0,0,0.18)]
      "
      /* base translucency kept here; no opacity change */
    >
      {/* PROXY BACKDROP (clipped inside pill) */}
      <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        {/* Distortion + blend over a blurred/saturated copy */}
        <div
          className="absolute inset-0"
          style={{
            backdropFilter: "blur(34px) saturate(265%)",
            WebkitBackdropFilter: "blur(34px) saturate(265%)",
          }}
        />
        {/* Re-render the moving code lines INSIDE the pill (perfectly synced) */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%-11px)] space-y-[7px] pointer-events-none">
            <div className="w-[min(100%,1100px)]">{proxy1}</div>
            <div className="w-[min(100%,1100px)]">{proxy2}</div>
            <div className="w-[min(100%,1100px)]">{proxy3}</div>
          </div>
        </div>
        {/* Apply header-style refraction to the proxy */}
        <div
          className="absolute inset-0"
          style={{ filter: "url(#header-pill-glass)", mixBlendMode: "overlay", opacity: 1 }}
        />
        {/* Lens volume (inner highlights/shadows) */}
        <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_1px_1px_4px_rgba(255,255,255,0.65),inset_-3px_-4px_10px_rgba(0,0,0,0.35)]" />
        {/* Shine sweep */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg,rgba(255,255,255,0.45) 0%,rgba(255,255,255,0.12) 33%,rgba(255,255,255,0) 66%)",
            opacity: 0.35,
          }}
        />
      </div>

      {/* CONTENT (icons) */}
      <div className="relative z-[2] flex items-center gap-7">
        {children}
      </div>
    </div>
  );
}

/* ======================= HEADER FILTER (refraction) ======================= */
const HeaderPillGlassFilter: React.FC = () => (
  <svg style={{ display: "none" }} aria-hidden="true">
    <defs>
      <filter id="header-pill-glass" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.009 0.015" numOctaves="2" seed="12" result="noise" />
        <feGaussianBlur in="noise" stdDeviation="1.6" result="softNoise" />
        <feDisplacementMap in="SourceGraphic" in2="softNoise" scale="48" xChannelSelector="R" yChannelSelector="G" result="distort" />
        <feGaussianBlur in="distort" stdDeviation="0.6" result="final" />
        <feComposite in="final" in2="final" operator="over" />
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
      <HeaderPillGlassFilter />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-3"
      >
        Get In Touch
      </motion.h2>

      {/* Lead */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-lg text-[var(--text-secondary)] mb-12 max-w-xl mx-auto"
      >
        I&apos;m actively exploring new opportunities and collaborations. Best way to reach me is email.
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
                     w-[min(92vw,1100px)] h-[120px] rounded-full pointer-events-none z-0"
          style={{ background: "rgba(0,0,0,0.04)", filter: "blur(22px) saturate(140%)" }}
        />

        {/* Foreground tikers (outer scene) — NO gradients, mixed tokens */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-[1] space-y-[7px] select-none">
          <div className="flex justify-center">
            <div className="relative w-[min(100%,1100px)] overflow-hidden select-none" aria-hidden>
              <div className={`ticker-rail run-anim ticker-anim speed-25s delay-0 text-[13px] sm:text-sm`}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="ticker-chunk">{chunk1}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-[min(100%,1100px)] overflow-hidden select-none" aria-hidden>
              <div className={`ticker-rail run-anim ticker-anim speed-33s delay-15 text-[13px] sm:text-sm`}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="ticker-chunk">{chunk2}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="relative w-[min(100%,1100px)] overflow-hidden select-none" aria-hidden>
              <div className={`ticker-rail run-anim ticker-anim speed-40s delay-3 text-[13px] sm:text-sm`}>
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className="ticker-chunk">{chunk3}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* LIQUID PILL — proxy backdrop inside for TRUE light-blend + refraction */}
        <LiquidPill
          proxy1={<SeamlessRow chunk={chunk1} speedClass="speed-25s" delayClass="delay-0" />}
          proxy2={<SeamlessRow chunk={chunk2} speedClass="speed-33s" delayClass="delay-15" />}
          proxy3={<SeamlessRow chunk={chunk3} speedClass="speed-40s" delayClass="delay-3" />}
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
                  className="text-[#FFF4B8] hover:text-[#FFF9D6] drop-shadow-[0_0_10px_rgba(255,249,210,0.65)] transition-all"
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
              </a>
            );
          })}
        </LiquidPill>
      </motion.div>
    </section>
  );
};

export default Contact;