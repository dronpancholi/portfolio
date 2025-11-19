import React, { useMemo, useState } from "react";
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

/* =================== TOKEN COLOUR MIX =================== */
const TOKENS = [
  "text-[#0ea5e9]", // sky-500
  "text-[#8b5cf6]", // violet-500
  "text-[#10b981]", // emerald-500
  "text-[#f59e0b]", // amber-500
  "text-[#ec4899]", // pink-500
  "text-[#3b82f6]", // blue-500
] as const;

function Colorize(tokens: (string | { t: string; cls?: string })[]) {
  let i = 0;
  return tokens.map((tok, idx) => {
    if (typeof tok === "string") {
      return (
        <span key={idx} className="text-black/40 dark:text-white/30">
          {tok}
        </span>
      );
    }
    const cls = tok.cls ?? TOKENS[i++ % TOKENS.length];
    return <span key={idx} className={`font-medium ${cls}`}>{tok.t}</span>;
  });
}

/* --- STATIC CONTENT GENERATION (Prevents Re-renders) --- */
const LINE_1 = Colorize([
  { t: "const" }, " ", { t: "identity" }, " ", "=", " ", "{", " ",
  { t: "name" }, ":", " ", { t: `"Dron Pancholi"` }, ", ", { t: "focus" }, ":", " ",
  "[", { t: `"AI"` }, ",", " ", { t: `"Systems"` }, ",", " ", { t: `"Design"` }, "]", " ", "};",
]);

const LINE_2 = Colorize([
  { t: "const" }, " ", { t: "values" }, " ", "=", " ", "[",
  { t: `"Precision"` }, ", ", { t: `"Clarity"` }, ", ", { t: `"Impact"` }, "]", ";",
]);

const LINE_3 = (email: string) => Colorize([
  { t: "function" }, " ", { t: "connect" }, "(", { t: "email" }, ")", " ", "{", " ",
  { t: "return" }, " ", { t: `\`mailto:${email}\``}, ";", " ", "}",
]);

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const line3Content = useMemo(() => LINE_3(SOCIAL_LINKS.email), []);

  // Helper to create the infinite ticker rows
  // We render 4 copies of the content to ensure seamless looping at any screen width
  const createTickerRow = (content: React.ReactNode, speedClass: string) => (
    <div className="flex justify-center w-full overflow-hidden">
      <div className={`ticker-rail run-anim ${speedClass} text-[12px] sm:text-[14px] font-mono tracking-wide`}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className="ticker-chunk opacity-80">
            {content}
          </span>
        ))}
      </div>
    </div>
  );

  // Construct the proxy rows for the liquid effect
  const proxyRows = [
    <div key="r1" className="w-full">{createTickerRow(LINE_1, 'speed-25s')}</div>,
    <div key="r2" className="w-full">{createTickerRow(LINE_2, 'speed-33s')}</div>,
    <div key="r3" className="w-full">{createTickerRow(line3Content, 'speed-40s')}</div>
  ];

  return (
    <section id="contact" className="py-24 text-center scroll-mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-4">
          Start a Conversation
        </h2>
        <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-xl mx-auto">
          Open to collaborations and new challenges.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-xl mx-auto mb-24"
      >
        <GlassCard>
          <div className="p-8 flex flex-col items-center">
            <Mail className="w-10 h-10 text-[var(--accent)] mb-4" />
            <h3 className="text-xl font-bold text-[var(--text-main)] mb-6">
              Email me directly
            </h3>
            <div className="w-full flex items-center justify-between bg-black/5 dark:bg-white/5 rounded-xl p-2 pl-4">
              <span className="text-sm text-[var(--text-secondary)] font-mono truncate mr-2">
                {SOCIAL_LINKS.email}
              </span>
              <button
                onClick={handleCopy}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-bold bg-[var(--accent)] text-white rounded-lg hover:brightness-110 transition-all active:scale-95"
              >
                {copied ? <Check size={16} /> : <Clipboard size={16} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* LIQUID PILL SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative w-full flex justify-center"
      >
        {/* Background Tickers (Blurred Context) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-0 opacity-30 blur-[1px] pointer-events-none select-none flex flex-col gap-2">
          {createTickerRow(LINE_1, 'speed-25s')}
          {createTickerRow(LINE_2, 'speed-33s')}
          {createTickerRow(line3Content, 'speed-40s')}
        </div>

        {/* The Liquid Pill Component */}
        <LiquidPill proxyRows={proxyRows}>
          {SOCIAL_LINKS.profiles.map((profile) => {
            const Icon = ICON_MAP[profile.name] || Github;
            return (
              <a
                key={profile.name}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative group p-2 rounded-full hover:bg-white/20 transition-colors"
                aria-label={profile.name}
              >
                <Icon className="w-6 h-6 text-[var(--text-main)] transition-transform group-hover:scale-110 group-hover:text-[var(--accent)]" />
              </a>
            );
          })}
        </LiquidPill>
      </motion.div>
    </section>
  );
};

export default Contact;