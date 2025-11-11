"use client";

import React, { useMemo, useState } from "react";
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

type SocialProfileName = typeof SOCIAL_LINKS.profiles[number]["name"];
// FIX: Changed React.ElementType to React.ComponentType for more specific typing of icon components.
// FIX: Explicitly type the component props to include `className`. `React.ComponentType` defaults to `React.ComponentType<{}>` (a component with no props), which caused the type error when passing `className` to the icon.
const ICON_MAP: Partial<Record<SocialProfileName, React.ComponentType<{ className: string }>>> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
  Discord: MessageSquare,
};

/* ----------------------------- TICKER CORE ----------------------------- */
/** Seamless ticker: 4 chunks in a row; animate x: 0% -> -25% for a perfect loop. */
function SeamlessTicker({
  children, // a single "chunk" of text (already coloured tokens)
  duration,
  delay = 0,
  height = 22,
  className = "",
  reduced = false,
}: {
  children: React.ReactNode;
  duration: number;
  delay?: number;
  height?: number;
  className?: string;
  reduced?: boolean;
}) {
  // Render 4 copies to ensure 400% width; translating -25% = one seamless cycle.
  const chunks = useMemo(
    () => Array.from({ length: 4 }).map((_, i) => <span key={i} className="px-2">{children}</span>),
    [children]
  );

  return (
    <div
      aria-hidden
      className="relative w-[min(100%,1100px)] overflow-hidden select-none"
      style={{ height }}
    >
      <motion.div
        className={`absolute inset-0 flex items-center ${className}`}
        animate={reduced ? undefined : { x: ["0%", "-25%"] }}
        transition={
          reduced
            ? undefined
            : { duration, repeat: Infinity, ease: "linear", delay }
        }
        style={{ width: "400%" }}
      >
        {chunks}
      </motion.div>
    </div>
  );
}

/* ------------------------- MULTI-COLOUR TOKENS ------------------------- */
/** Token -> coloured span. Cycles through palette for natural “code” mixes. */
const CODE_PALETTE = [
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
      // literal spacing / punctuation stays neutral
      return <span key={idx} className="text-white/35">{tok}</span>;
    }
    const cls = tok.cls ?? CODE_PALETTE[i++ % CODE_PALETTE.length];
    return (
      <span key={idx} className={`${cls}`}>
        {tok.t}
      </span>
    );
  });
}

/* Three “code” lines (each line is a mix of coloured tokens) */
function Line1() {
  return Colorize([
    { t: "const" }, " ",
    { t: "dron" }, " ", "=", " ", "{",
    " ", { t: "name" }, ":", " ", { t: `"Dron Pancholi"` },
    ", ", { t: "city" }, ":", " ", { t: `"Surendranagar"` },
    ", ", { t: "tier" }, ":", " ", { t: `"Black Core"` }, " ",
    "}; ",
  ]);
}
function Line2() {
  return Colorize([
    { t: "const" }, " ", { t: "vision" }, " ", "=", " ", { t: `"Build Empires"` }, "; ",
    { t: "const" }, " ", { t: "motto" }, " ", "=", " ",
    { t: `"Faith • Trust • Transparency"` }, "; ",
    { t: "const" }, " ", { t: "socials" }, "=", "[",
    { t: `"LinkedIn"` }, ", ", { t: `"GitHub"` }, ", ", { t: `"Instagram"` }, ", ", { t: `"Discord"` },
    "]", "; ",
  ]);
}
function Line3(email: string) {
  return Colorize([
    { t: "function" }, " ", { t: "contact" }, "()", " ", "{",
    " ", { t: "return" }, " ", "{",
    " ", { t: "email" }, ":", " ", { t: `"${email}"` },
    ", ", { t: "responseTime" }, ":", " ", { t: `"fast"` }, " ",
    "}", " ", "}", " ",
  ]);
}

/* ------------------------------ COMPONENT ------------------------------ */
const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-16 md:py-24 text-center scroll-mt-24">
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

            <div className="w-full max-w-md flex items-center justify-between bg-black/5 rounded-xl p-3">
              <span className="text-sm sm:text-base text-[var(--text-secondary)] font-mono truncate">
                {SOCIAL_LINKS.email}
              </span>

              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-1 w-24 h-9 text-sm font-semibold bg-[var(--accent)] text-[var(--text-main)] rounded-lg hover:brightness-110 transition-all"
                aria-label="Copy email address"
              >
                {copied ? (
                  <motion.span
                    key="copied-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-1"
                  >
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

      {/* Social pill + mixed-colour continuous code background */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-24 flex justify-center"
      >
        {/* Substrate band (neutral) to feed blur/refractive look */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[min(92vw,1100px)] h-[120px] rounded-full pointer-events-none z-0"
          style={{ background: "rgba(255,255,255,0.08)", filter: "blur(22px) saturate(140%)" }}
        />

        {/* Three lines, each internally multi-coloured (token-based), running seamlessly */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-[1] space-y-[7px] select-none">
          <div className="flex justify-center">
            <SeamlessTicker
              reduced={!!reduceMotion}
              duration={25}
              height={22}
              className="text-[13px] sm:text-sm"
            >
              <Line1 />
            </SeamlessTicker>
          </div>

          <div className="flex justify-center">
            <SeamlessTicker
              reduced={!!reduceMotion}
              duration={33}
              delay={1.5}
              height={22}
              className="text-[13px] sm:text-sm"
            >
              <Line2 />
            </SeamlessTicker>
          </div>

          <div className="flex justify-center">
            <SeamlessTicker
              reduced={!!reduceMotion}
              duration={40}
              delay={3}
              height={22}
              className="text-[13px] sm:text-sm"
            >
              {Line3(SOCIAL_LINKS.email)}
            </SeamlessTicker>
          </div>
        </div>

        {/* LIQUID GLASS PILL — EXACT SAME STRUCTURE AS HEADER PILL */}
        <div
          className="
            relative z-[3] flex items-center gap-7 px-8 py-3 
            rounded-full cursor-pointer select-none overflow-hidden isolate
            backdrop-blur-2xl bg-white/14 border border-white/25 
            shadow-[0_4px_20px_rgba(0,0,0,0.22)]
          "
        >
          {/* Distortion Liquid Layer */}
          <div
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
            style={{ filter: "url(#header-pill-glass)" }}
          />

          {/* Depth Highlight */}
          <div className="absolute inset-0 rounded-full pointer-events-none shadow-[inset_1px_1px_4px_rgba(255,255,255,0.55),inset_-2px_-2px_6px_rgba(0,0,0,0.35)]" />

          {/* Shine Sweep */}
          <div
            className="
              absolute inset-0 rounded-full pointer-events-none 
              bg-[linear-gradient(115deg,rgba(255,255,255,0.45)_0%,rgba(255,255,255,0.1)_33%,rgba(255,255,255,0)_66%)]
              opacity-35
            "
          />

          {/* ICONS */}
          <div className="relative z-[2] flex items-center gap-7">
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
                    className="text-[#FFEFAF] hover:text-[#FFF7C4] drop-shadow-[0_0_8px_rgba(255,249,200,0.65)] transition-all"
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;