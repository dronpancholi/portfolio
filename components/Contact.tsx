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
  "text-[#6366f1]", // indigo-500
] as const;

function Colorize(tokens: (string | { t: string; cls?: string })[]) {
  let i = 0;
  return tokens.map((tok, idx) => {
    if (typeof tok === "string") {
      return (
        <span key={idx} className="text-black/40 dark:text-white/40">
          {tok}
        </span>
      );
    }
    const cls = tok.cls ?? TOKENS[i++ % TOKENS.length];
    return <span key={idx} className={cls}>{tok.t}</span>;
  });
}

/* --- Static Code Lines for Ticker --- */
const Line1 = () => Colorize([
  { t: "const" }, " ", { t: "identity" }, " ", "=", " ", "{", " ",
  { t: "name" }, ":", " ", { t: `"Dron Pancholi"` }, ", ", { t: "focus" }, ":", " ",
  "[", { t: `"AI"` }, ",", " ", { t: `"Systems"` }, ",", " ", { t: `"Design"` }, "]", " ", "};",
]);

const Line2 = () => Colorize([
  { t: "const" }, " ", { t: "principles" }, " ", "=", " ", "[",
  { t: `"Clarity"` }, ", ", { t: `"Depth"` }, ", ", { t: `"Intention"` }, "]", ";",
]);

const Line3 = (email: string) => Colorize([
  { t: "function" }, " ", { t: "contact" }, "(", { t: "email" }, ")", " ", "{", " ",
  { t: "return" }, " ", { t: `\`mailto:${email}\``}, ";", " ", "}",
]);

// TickerRow Component for code reuse
interface TickerRowProps {
  children: React.ReactNode;
  speed?: string;
  direction?: "normal" | "reverse";
}

const TickerRow: React.FC<TickerRowProps> = ({ children, speed = "speed-normal", direction = "normal" }) => (
  <div className="ticker-wrap">
    <div className={`ticker-move ${speed}`} style={{ animationDirection: direction }}>
      {/* Repeat 3 times for smooth looping */}
      <span className="inline-flex gap-8 pr-8">{children}</span>
      <span className="inline-flex gap-8 pr-8">{children}</span>
      <span className="inline-flex gap-8 pr-8">{children}</span>
    </div>
  </div>
);

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Memoized ticker rows passed into LiquidPill as "Proxy Rows"
  // Rendered with standard HTML/CSS animations for best performance
  const proxyRows = useMemo(() => [
    <TickerRow key="row1" speed="speed-normal">
       <div className="font-mono text-[12px] sm:text-[14px] flex gap-8 items-center">
         {Line1()}
       </div>
    </TickerRow>,
    <TickerRow key="row2" speed="speed-slow" direction="reverse">
       <div className="font-mono text-[12px] sm:text-[14px] flex gap-8 items-center">
         {Line2()}
       </div>
    </TickerRow>,
    <TickerRow key="row3" speed="speed-fast">
        <div className="font-mono text-[12px] sm:text-[14px] flex gap-8 items-center">
          {Line3(SOCIAL_LINKS.email)}
        </div>
    </TickerRow>
  ], []);

  const socialIcons = SOCIAL_LINKS.profiles.map((profile) => {
    const Icon = ICON_MAP[profile.name] || Github;
    return (
      <a
        key={profile.name}
        href={profile.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={profile.name}
        className="group relative p-2 rounded-full focus:outline-none"
      >
        <div className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--text-secondary)] group-hover:text-[var(--accent)] transition-colors relative z-10" />
      </a>
    );
  });

  return (
    <section id="contact" className="py-16 md:py-24 text-center scroll-mt-24 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-4">Start a Conversation</h2>
        <p className="text-lg text-[var(--text-secondary)] font-light max-w-xl mx-auto">
          I am open to new projects and collaborations.
        </p>
      </motion.div>

      {/* Email Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-xl mx-auto mb-20"
      >
        <GlassCard className="flex flex-col items-center p-10">
          <Mail className="w-10 h-10 text-[var(--accent)] mb-6" />
          <div className="flex items-center gap-3 bg-black/5 dark:bg-white/5 p-2 pl-4 rounded-xl w-full max-w-sm">
            <span className="flex-grow text-left font-mono text-sm text-[var(--text-secondary)] truncate">
              {SOCIAL_LINKS.email}
            </span>
            <button
              onClick={handleCopy}
              className="bg-[var(--accent)] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 min-w-[90px] justify-center"
            >
              {copied ? <><Check size={14} /> Copied</> : <><Clipboard size={14} /> Copy</>}
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* Liquid Pill Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative w-full flex justify-center"
      >
        {/* Faded background tickers for environmental depth */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[1000px] opacity-10 blur-[2px] pointer-events-none select-none flex flex-col gap-6 items-center">
            {/* Re-use the same structure for visual consistency in background */}
            <div className="w-full opacity-50">{proxyRows[0]}</div>
            <div className="w-full opacity-50">{proxyRows[1]}</div>
            <div className="w-full opacity-50">{proxyRows[2]}</div>
        </div>

        <LiquidPill proxyRows={proxyRows} children={socialIcons} />
      </motion.div>
    </section>
  );
};

export default Contact;