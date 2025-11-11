"use client";

import React, { useId, useState } from "react";
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

// FIX: To resolve an indexing error, explicitly type ICON_MAP using a strict type derived from SOCIAL_LINKS. This ensures type safety when mapping profile names to icons.
type SocialProfileName = typeof SOCIAL_LINKS.profiles[number]["name"];

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
  // Use two copies for a perfect loop
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

  // Unique filter id (SSR-safe) for any future pill filter usage
  const filterId = useId();
  const liquidId = `liquidGlass-${filterId}`;

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
        I&apos;m actively exploring new opportunities and collaborations. Best
        way to reach me is email.
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
        {/* Three independent tickers, vertically staggered so the pill sits centered among them */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-0 space-y-[6px]">
          {/* Row 1: pink → violet → sky */}
          <div className="flex justify-center">
            <CodeTicker
              reduced={!!reduceMotion}
              duration={22}
              height={22}
              delay={0}
              className="text-[13px] sm:text-sm font-medium bg-gradient-to-r from-pink-300 via-fuchsia-300 via-violet-300 via-indigo-300 to-sky-300 bg-clip-text text-transparent opacity-[0.9]"
            >
              {`const dron = { name: "Dron Pancholi", city: "Surendranagar", empire: "New Lands", tier: "Black Core" }; `}
            </CodeTicker>
          </div>

          {/* Row 2: emerald → cyan → lime (slower, slight parallax) */}
          <div className="flex justify-center">
            <CodeTicker
              reduced={!!reduceMotion}
              duration={28}
              height={22}
              delay={2}
              className="text-[13px] sm:text-sm font-medium bg-gradient-to-r from-emerald-300 via-teal-300 via-cyan-300 to-lime-300 bg-clip-text text-transparent opacity-[0.85]"
            >
              {`const socials = ["LinkedIn","GitHub","Instagram","Discord"]; const vision = "Build Empires"; const motto = "Faith • Trust • Transparency"; `}
            </CodeTicker>
          </div>

          {/* Row 3: amber → orange → rose → fuchsia (slowest) */}
          <div className="flex justify-center">
            <CodeTicker
              reduced={!!reduceMotion}
              duration={34}
              height={22}
              delay={4}
              className="text-[13px] sm:text-sm font-medium bg-gradient-to-r from-amber-300 via-orange-300 via-rose-300 to-fuchsia-300 bg-clip-text text-transparent opacity-[0.85]"
            >
              {`function contact(){ return { email: "${SOCIAL_LINKS.email}", responseTime: "fast" } } `}
            </CodeTicker>
          </div>
        </div>

        {/* Your liquid glass pill (unchanged core look, just wrapped and layered correctly) */}
        <div
          className={[
            "relative z-10 flex items-center gap-7",
            "px-7 sm:px-8 py-3",
            "rounded-full overflow-hidden",
            // Glass look (kept): heavy blur + thin border + subtle transparency
            "backdrop-blur-3xl bg-white/10 border border-white/25",
            // Glow
            "shadow-[0_0_30px_rgba(255,255,255,0.30)]",
            // Hover polish, no functional changes
            "transition-all duration-700 hover:bg-white/14 hover:shadow-[0_0_40px_rgba(255,255,255,0.45)]",
            // Inner highlights, fully clipped to the pill
            "before:absolute before:inset-0 before:rounded-full before:shadow-[inset_3px_3px_6px_rgba(255,255,255,0.55),inset_-3px_-3px_6px_rgba(0,0,0,0.25)]",
            "after:pointer-events-none after:absolute after:-top-[65%] after:left-0 after:w-full after:h-[210%] after:rounded-full",
            "after:bg-gradient-to-b after:from-white/22 after:to-transparent after:opacity-70 after:rotate-[8deg]",
          ].join(" ")}
          style={{ filter: `url(#${liquidId})` }}
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

        {/* Optional: keep a unique SVG filter ready if you want extra liquid wobble later */}
        <svg className="hidden">
          <defs>
            <filter id={liquidId} x="0" y="0" width="100%" height="100%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.008 0.02"
                numOctaves="1"
                seed="7"
                result="noise"
              />
              <feGaussianBlur in="noise" stdDeviation="1.2" result="soft" />
              <feDisplacementMap
                in="SourceGraphic"
                in2="soft"
                scale="18"
                xChannelSelector="R"
                yChannelSelector="G"
                result="displaced"
              />
              <feGaussianBlur in="displaced" stdDeviation="0.5" result="final" />
              <feComposite in="final" in2="final" operator="over" />
            </filter>
          </defs>
        </svg>
      </motion.div>
    </section>
  );
};

export default Contact;
