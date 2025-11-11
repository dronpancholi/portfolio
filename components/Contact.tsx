"use client";

import React, { useId, useState } from "react";
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

// FIX: Derive a strict type for social profile names and use a typed record for ICON_MAP to ensure type safety, resolving the 'Type 'string' is not assignable to type 'never'' error.
type SocialProfileName = typeof SOCIAL_LINKS.profiles[number]["name"];

const ICON_MAP: Partial<Record<SocialProfileName, React.ElementType>> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
  Discord: MessageSquare,
};

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const filterId = useId(); // unique per render to avoid duplicate IDs on SSR
  const liquidId = `liquidGlass-${filterId}`;

  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-16 md:py-24 text-center scroll-mt-24">
      {/* H2 */}
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
        I'm actively exploring new opportunities and collaborations. Best way to reach me is email.
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

      {/* Social pill with moving code underneath */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-16 flex justify-center"
      >
        {/* Three moving code lines (under the pill) */}
        <div
          aria-hidden
          className="absolute left-1/2 -translate-x-1/2 bottom-[-28px] sm:bottom-[-30px] w-[min(100%,900px)] pointer-events-none"
        >
          {/* Each row gets slightly different speed/offset and colors */}
          <CodeTicker
            text={`const dron = { name: "Dron Pancholi", city: "Surendranagar", empire: "New Lands", tier: "Black Core" }; `}
            duration={18}
            className="text-[13px] sm:text-sm bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-sky-400 bg-clip-text text-transparent opacity-80"
          />
          <CodeTicker
            text={`const socials = ["LinkedIn","GitHub","Instagram","Discord"]; const vision = "Build Empires."; `}
            duration={22}
            className="text-[13px] sm:text-sm mt-1 bg-gradient-to-r from-emerald-300 via-teal-300 via-cyan-300 to-lime-300 bg-clip-text text-transparent opacity-80"
          />
          <CodeTicker
            text={`function contact(d){ return { email: "${SOCIAL_LINKS.email}", responseTime: "fast", motto: "Faith • Trust • Transparency" }; } `}
            duration={26}
            className="text-[13px] sm:text-sm mt-1 bg-gradient-to-r from-amber-300 via-orange-300 via-rose-300 to-fuchsia-300 bg-clip-text text-transparent opacity-80"
          />
        </div>

        {/* Liquid glass pill */}
        <motion.div
          layout
          className={[
            // Outer wrapper guarantees a perfect pill shape and clips inner blur/shadows
            "relative z-10 flex items-center gap-6",
            "px-6 sm:px-7 py-2.5 sm:py-3",
            "rounded-[999px] overflow-hidden", // critical: keep pill perfectly shaped
            "backdrop-blur-2xl",
            "border border-white/25 bg-white/10",
            "shadow-[0_0_22px_rgba(255,255,255,0.22)]",
            "transition-all duration-500 hover:bg-white/16",
          ].join(" ")}
          style={{ filter: `url(#${liquidId})` }}
        >
          {/* Subtle inner shine and inset lines, both clipped by rounded wrapper */}
          <div className="pointer-events-none absolute inset-0 rounded-[999px]">
            <div className="absolute inset-0 rounded-[999px] opacity-70 mix-blend-screen bg-gradient-to-t from-white/10 to-white/0" />
            <div className="absolute inset-0 rounded-[999px] shadow-[inset_2px_2px_1px_rgba(255,255,255,0.45),inset_-2px_-2px_1px_rgba(255,255,255,0.2)]" />
          </div>

          {SOCIAL_LINKS.profiles.map((profile) => {
            const Icon = ICON_MAP[profile.name] || Github; // safe fallback
            return (
              <a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={profile.name}
              >
                <motion.div
                  whileHover={{ scale: 1.22 }}
                  transition={{ type: "spring", stiffness: 280, damping: 16 }}
                  className="text-white/90 hover:text-white"
                >
                  <Icon className="w-7 h-7" />
                </motion.div>
              </a>
            );
          })}
        </motion.div>

        {/* Inline SVG filter: unique id so multiple pills don't clash */}
        <svg className="hidden">
          <defs>
            <filter id={liquidId} x="0" y="0" width="100%" height="100%">
              {/* Turbulence to create glass wobble */}
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
              {/* Slight blur to smooth edges */}
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

/**
 * A single scrolling code row with infinite marquee effect.
 * Uses framer-motion for smooth, SSR-safe animation.
 */
function CodeTicker({
  text,
  duration,
  className = "",
}: {
  text: string;
  duration: number;
  className?: string;
}) {
  return (
    <div className="relative w-full h-[20px] sm:h-[22px] overflow-hidden">
      {/* Two copies to simulate seamless loop */}
      <motion.div
        aria-hidden
        className={`absolute left-0 top-0 whitespace-nowrap font-mono ${className}`}
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {text.repeat(30)}
      </motion.div>
      <motion.div
        aria-hidden
        className={`absolute left-[100%] top-0 whitespace-nowrap font-mono ${className}`}
        animate={{ x: ["0%", "-100%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
      >
        {text.repeat(30)}
      </motion.div>
    </div>
  );
}