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

// FIX: Explicitly type the icon map to ensure that profile names from constants can be safely used as keys, resolving the type error.
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
}: {
  children: React.ReactNode;
  duration: number;
  className?: string;
  height?: number;
  delay?: number;
  reduced?: boolean;
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
        style={{ left: 0 }}
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
        style={{ left: "100%" }}
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

      {/* Social pill + three code lines behind it */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-24 flex justify-center"
      >
        {/* Neutrally-lit blur base (no gradient, no color tint) */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[min(92vw,1000px)] h-[110px] rounded-full pointer-events-none z-0"
          style={{
            background: "rgba(255,255,255,0.08)",
            filter: "blur(22px) saturate(140%)",
          }}
        />

        {/* Three code tickers preserved exactly */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-[1] space-y-[6px]">
          <div className="flex justify-center">
            <CodeTicker
              reduced={!!reduceMotion}
              duration={24}
              height={22}
              className="text-[13px] sm:text-sm font-medium text-white/30"
            >
              {`const dron = { name: "Dron Pancholi", city: "Surendranagar", empire: "New Lands", tier: "Black Core" }; `}
            </CodeTicker>
          </div>

          <div className="flex justify-center">
            <CodeTicker
              reduced={!!reduceMotion}
              duration={30}
              height={22}
              delay={1.5}
              className="text-[13px] sm:text-sm font-medium text-white/26"
            >
              {`const socials = ["LinkedIn","GitHub","Instagram","Discord"]; const vision = "Build Empires"; const motto = "Faith • Trust • Transparency"; `}
            </CodeTicker>
          </div>

          <div className="flex justify-center">
            <CodeTicker
              reduced={!!reduceMotion}
              duration={36}
              height={22}
              delay={3}
              className="text-[13px] sm:text-sm font-medium text-white/22"
            >
              {`function contact(){ return { email: "${SOCIAL_LINKS.email}", responseTime: "fast" } } `}
            </CodeTicker>
          </div>
        </div>

        {/* CLEAN LIQUID GLASS PILL (no wave distortion) */}
        <div
          className="relative z-10 flex items-center gap-7
                     px-7 sm:px-8 py-3 rounded-full overflow-hidden
                     backdrop-blur-[22px] bg-white/9 border border-white/20
                     shadow-[0_0_28px_rgba(255,255,255,0.28)]
                     transition-all duration-600 hover:bg-white/14 hover:shadow-[0_0_38px_rgba(255,255,255,0.45)]
                     before:absolute before:inset-0 before:rounded-full 
                     before:shadow-[inset_2px_4px_8px_rgba(255,255,255,0.55),inset_-2px_-3px_6px_rgba(0,0,0,0.35)]
        "
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
                  transition={{ type: "spring", stiffness: 280, damping: 16 }}
                  className="text-white/90 hover:text-white"
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
              </a>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;