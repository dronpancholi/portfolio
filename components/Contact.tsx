"use client";

import React, { useState } from "react";
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

const TickerLine1 = () => (
  <>
    <span className="text-pink-300">const</span> <span className="text-purple-300">dron</span> = {"{"}
    <span className="text-blue-300"> name</span>: <span className="text-green-300">"Dron Pancholi"</span>,
    <span className="text-cyan-300"> city</span>: <span className="text-lime-300">"Surendranagar"</span>,
    <span className="text-amber-300"> empire</span>: <span className="text-rose-300">"New Lands"</span>{"}; "}
  </>
);

const TickerLine2 = () => (
  <>
    <span className="text-indigo-300">const</span> <span className="text-pink-300">vision</span> =
    <span className="text-orange-300"> "Black Core Supremacy"</span>; <span className="text-fuchsia-300">while</span>(true){"{"}
    <span className="text-blue-300"> build</span>();{"}"}{" "}
  </>
);

const TickerLine3 = () => (
  <>
    <span className="text-green-300">function</span> <span className="text-yellow-300">contact</span>(){"{"}
    <span className="text-teal-300"> return </span>
    <span className="text-cyan-300">SOCIAL_LINKS.email</span>;{"}"}{" "}
  </>
);


const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

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

      {/* SOCIAL LIQUID GLASS SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-24 flex justify-center"
      >
        {/* 3-Layer Code Background */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none space-y-1 select-none">
          
          {/* LINE 1 - Multi-shade syntax style */}
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap font-mono text-[13px] sm:text-sm"
          >
            {Array.from({ length: 25 }).map((_, i) => <TickerLine1 key={i} />)}
          </motion.div>

          {/* LINE 2 */}
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap font-mono text-[13px] sm:text-sm opacity-[0.85]"
          >
            {Array.from({ length: 25 }).map((_, i) => <TickerLine2 key={i} />)}
          </motion.div>

          {/* LINE 3 */}
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 38, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap font-mono text-[13px] sm:text-sm opacity-[0.75]"
          >
            {Array.from({ length: 25 }).map((_, i) => <TickerLine3 key={i} />)}
          </motion.div>
        </div>
        
        {/* SOFT VISIBILITY BALANCER — FIXES READABILITY WITHOUT TOUCHING GLASS */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-[115%] h-[135%] rounded-full 
          backdrop-blur-xl bg-black/12 
          opacity-70 pointer-events-none z-[5]" />

        {/* LIQUID GLASS PILL - ELITE HIGH GLOSS */}
        <div className="relative z-20 flex items-center gap-7 px-8 py-3 rounded-full overflow-hidden cursor-pointer
            backdrop-blur-3xl bg-white/8 border border-white/20
            shadow-[0_0_30px_rgba(255,255,255,0.30)]
            transition-all duration-700 hover:bg-white/14 hover:shadow-[0_0_40px_rgba(255,255,255,0.45)]
            before:absolute before:inset-0 before:rounded-full before:shadow-[inset_3px_3px_6px_rgba(255,255,255,0.55),inset_-3px_-3px_6px_rgba(0,0,0,0.25)]
            after:absolute after:-top-[60%] after:left-0 after:w-full after:h-[200%] after:bg-gradient-to-b from-white/20 to-transparent after:opacity-70 after:rotate-[8deg] after:rounded-full pointer-events-none select-none"
        >
          {SOCIAL_LINKS.profiles.map((profile) => {
            const Icon = ICON_MAP[profile.name] || Github;
            return (
              <a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={profile.name}>
                <motion.div
                  whileHover={{ scale: 1.3 }}
                  transition={{ type: "spring", stiffness: 280, damping: 15 }}
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