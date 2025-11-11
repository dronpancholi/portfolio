"use client";

import React, { useState } from "react";
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

// FIX: Explicitly type the icon map to ensure that profile names from the `SOCIAL_LINKS` constant can be safely used as keys. Using `Partial<Record<...>>` allows for a fallback icon if a mapping is not present, resolving the type error.
const ICON_MAP: Partial<Record<SocialProfileName, React.ElementType>> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
  Discord: MessageSquare,
};

/** One seamless scrolling code row with its own gradient and speed. */
function CodeTicker({
  children,
  duration,
  className = "",
  height = 22,
  delay = 0,
  reduced = false,
  style,
}: {
  children: React.ReactNode;
  duration: number;
  className?: string;
  height?: number;
  delay?: number;
  reduced?: boolean;
  style?: React.CSSProperties;
}) {
  const common = {
    className:
      "absolute top-0 whitespace-nowrap font-mono will-change-transform",
  } as const;

  return (
    <div
      className="relative w-[min(100%,1100px)] overflow-hidden select-none"
      style={{ height }}
      aria-hidden
    >
      {/* Two copies for a perfect loop */}
      <motion.div
        {...common}
        style={{ left: 0, ...style }}
        animate={reduced ? undefined : { x: ["0%", "-100%"] }}
        transition={
          reduced
            ? undefined
            : { duration, repeat: Infinity, ease: "linear", delay }
        }
        className={className}
      >
        {children}
        {children}
      </motion.div>
      <motion.div
        {...common}
        style={{ left: "100%", ...style }}
        animate={reduced ? undefined : { x: ["0%", "-100%"] }}
        transition={
          reduced
            ? undefined
            : { duration, repeat: Infinity, ease: "linear", delay }
        }
        className={className}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

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

      {/* Social pill + continuous multi-line code background */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-24 flex justify-center"
      >
        {/* Subtle neutral substrate for proper refraction */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
               w-[min(92vw,1100px)] h-[120px] rounded-full pointer-events-none z-[0]"
          style={{
            background: "rgba(255,255,255,0.08)",
            filter: "blur(24px) saturate(130%)",
          }}
        />

        {/* Three continuous code streams with soft spectral blends */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-[1] space-y-[7px] select-none">
          {/* Row 1 (cool spectrum) */}
          <div className="flex justify-center">
            <CodeTicker
              reduced={!!reduceMotion}
              duration={25}
              height={22}
              className="text-[13px] sm:text-sm font-mono bg-gradient-to-r from-[#9efaff] via-[#8db9ff] to-[#c8a5ff] bg-clip-text text-transparent opacity-[0.85]"
            >
              {Array.from({ length: 70 })
                .map(
                  () =>
                    `const dron = { name:"Dron Pancholi", city:"Surendranagar", tier:"Black Core"}; `
                )
                .join("")}
            </CodeTicker>
          </div>

          {/* Row 2 (emerald → cyan → lime haze) */}
          <div className="flex justify-center">
            <CodeTicker
              reduced={!!reduceMotion}
              duration={33}
              delay={2}
              height={22}
              className="text-[13px] sm:text-sm font-mono bg-gradient-to-r from-[#afffcb] via-[#7de9ff] to-[#d7ffa3] bg-clip-text text-transparent opacity-[0.82]"
            >
              {Array.from({ length: 70 })
                .map(
                  () =>
                    `const motto="Faith • Trust • Transparency"; const empire="New Lands"; `
                )
                .join("")}
            </CodeTicker>
          </div>

          {/* Row 3 (warm subtle rose → gold) */}
          <div className="flex justify-center">
            <CodeTicker
              reduced={!!reduceMotion}
              duration={40}
              delay={4}
              height={22}
              className="text-[13px] sm:text-sm font-mono bg-gradient-to-r from-[#ffd4a8] via-[#ffc9e7] to-[#fff7b1] bg-clip-text text-transparent opacity-[0.78]"
            >
              {Array.from({ length: 70 })
                .map(
                  () =>
                    `function contact(){ return "${SOCIAL_LINKS.email}"; } `
                )
                .join("")}
            </CodeTicker>
          </div>
        </div>

        {/* TRUE LIQUID GLASS PILL */}
        <div
          className="relative z-[2] flex items-center gap-7 px-8 py-3 rounded-full overflow-hidden isolate"
          style={{
            backdropFilter: 'blur(26px) saturate(160%) url("#container-glass")',
            background: "rgba(255,255,255,0.10)",
            border: "1px solid rgba(255,255,255,0.24)",
            boxShadow:
              "0 0 6px rgba(0,0,0,0.06),0 3px 12px rgba(0,0,0,0.20),inset 2px 2px 4px rgba(255,255,255,0.55),inset -2px -2px 4px rgba(0,0,0,0.38)",
          }}
        >
          {/* Surface highlight */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0.33), rgba(255,255,255,0.04))",
              opacity: 0.75,
              mixBlendMode: "screen",
            }}
          />

          {/* Social icons */}
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
                  className="text-[#FFF9D8] hover:text-[#FFEFAF] drop-shadow-[0_0_6px_rgba(255,245,180,0.55)] transition-all"
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
              </a>
            );
          })}
        </div>

        {/* Glass distortion filter (unchanged, required for liquid) */}
        <svg className="hidden">
          <defs>
            <filter
              id="container-glass"
              x="0"
              y="0"
              width="100%"
              height="100%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.05 0.05"
                numOctaves="1"
                seed="1"
                result="noise"
              />
              <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="blurred"
                scale="65"
                xChannelSelector="R"
                yChannelSelector="G"
              />
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>
        </svg>
      </motion.div>
    </section>
  );
};

export default Contact;