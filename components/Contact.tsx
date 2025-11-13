"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
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
import LiquidPill from "./ui/LiquidPill";

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
const GlobalStyles = () => (
  <style>{`
    @keyframes xloop25 {
      from { transform: translateX(0%); }
      to   { transform: translateX(-25%); }
    }
    .ticker-rail { width:400%; display:flex; align-items:center; will-change: transform; backface-visibility: hidden; transform: translateZ(0); }
    .ticker-chunk { padding-left:0.75rem; padding-right:0.75rem; }
    .ticker-anim { animation-timing-function: linear; animation-iteration-count: infinite; will-change: transform; animation-play-state: running; }
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

/* =============================== CONTACT =============================== */
const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.documentElement.style.setProperty("--glass-blur", "12px");
      document.querySelectorAll(".ticker-rail").forEach((r) => {
        if (r instanceof HTMLElement) {
          r.style.animationPlayState = "paused";
        }
      });
    }
  }, []);


  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const chunk1 = useMemo(() => <>{Line1()}</>, []);
  const chunk2 = useMemo(() => <>{Line2()}</>, []);
  const chunk3 = useMemo(() => <>{Line3(SOCIAL_LINKS.email)}</>, []);

  return (
    <section id="contact" className="py-16 md:py-24 text-center scroll-mt-24">
      <GlobalStyles />
      
      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-3"
      >
        Start a Conversation
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-lg text-[var(--text-secondary)] mb-12 max-w-xl mx-auto"
      >
        I am open to new projects and collaborations. For inquiries, please reach out via email.
      </motion.p>
      
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
      
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-24 flex justify-center"
      >
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[90vw] h-[90px] sm:w-[min(92vw,1100px)] sm:h-[120px] rounded-full pointer-events-none z-0"
          style={{ background: "rgba(0,0,0,0.03)", filter: "blur(18px) saturate(120%)" }}
        />
        
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
          <LiquidPill proxyRows={[chunk1, chunk2, chunk3]}>
            {SOCIAL_LINKS.profiles.map((profile) => {
              const Icon = ICON_MAP[profile.name] || Github;
              return (
                <a
                  key={profile.name}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={profile.name}
                  className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] rounded-full"
                >
                  <motion.div
                    whileHover={{ scale: 1.14 }}
                    transition={{ type: "spring", stiffness: 220, damping: 18 }}
                  >
                    <Icon
                      className="w-6 h-6 sm:w-7 sm:h-7 text-stone-800 dark:text-white drop-shadow-[0_0_2px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.85)]"
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