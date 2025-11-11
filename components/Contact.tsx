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

/** Map social names -> icons (typed) */
type SocialProfileName = typeof SOCIAL_LINKS.profiles[number]["name"];
const ICON_MAP: Partial<
  Record<SocialProfileName, React.ComponentType<{ className: string }>>
> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
  Discord: MessageSquare,
};

/* ======================= Marquee core (seamless) ======================= */
/** 4 chunks, translate -25% for a perfect infinite loop; no gaps ever. */
function SeamlessTicker({
  chunk,
  duration,
  delay = 0,
  height = 22,
  className = "",
  reduced = false,
}: {
  chunk: React.ReactNode; // one coloured “code line” chunk
  duration: number;
  delay?: number;
  height?: number;
  className?: string;
  reduced?: boolean;
}) {
  const chunks = useMemo(
    () =>
      Array.from({ length: 4 }).map((_, i) => (
        <span key={i} className="px-3">
          {chunk}
        </span>
      )),
    [chunk]
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

/* =================== Token colouring (no gradients) ==================== */
const TOKENS = {
  aqua: "text-[#AEEBFF]",
  lav: "text-[#C9B7FF]",
  mint: "text-[#A0FFC9]",
  gold: "text-[#FFE6A3]",
  rose: "text-[#FFBBD4]",
  sky: "text-[#9ED0FF]",
} as const;
const PALETTE = [TOKENS.aqua, TOKENS.lav, TOKENS.mint, TOKENS.gold, TOKENS.rose, TOKENS.sky];

function Colorize(tokens: (string | { t: string; cls?: string })[]) {
  let i = 0;
  return tokens.map((tok, idx) => {
    if (typeof tok === "string") {
      return (
        <span key={idx} className="text-white/35">
          {tok}
        </span>
      );
    }
    const cls = tok.cls ?? PALETTE[i++ % PALETTE.length];
    return (
      <span key={idx} className={cls}>
        {tok.t}
      </span>
    );
  });
}

/* ======================== Mixed-colour code lines ====================== */
function Line1() {
  return Colorize([
    { t: "const" },
    " ",
    { t: "dron" },
    " ",
    "=",
    " ",
    "{",
    " ",
    { t: "name" },
    ":",
    " ",
    { t: `"Dron Pancholi"` },
    ", ",
    { t: "city" },
    ":",
    " ",
    { t: `"Surendranagar"` },
    ", ",
    { t: "tier" },
    ":",
    " ",
    { t: `"Black Core"` },
    " ",
    "}; ",
  ]);
}
function Line2() {
  return Colorize([
    { t: "const" },
    " ",
    { t: "vision" },
    " ",
    "=",
    " ",
    { t: `"Build Empires"` },
    "; ",
    { t: "const" },
    " ",
    { t: "motto" },
    " ",
    "=",
    " ",
    { t: `"Faith • Trust • Transparency"` },
    "; ",
    { t: "const" },
    " ",
    { t: "socials" },
    "=",
    "[",
    { t: `"LinkedIn"` },
    ", ",
    { t: `"GitHub"` },
    ", ",
    { t: `"Instagram"` },
    ", ",
    { t: `"Discord"` },
    "]",
    "; ",
  ]);
}
function Line3(email: string) {
  return Colorize([
    { t: "function" },
    " ",
    { t: "contact" },
    "()",
    " ",
    "{",
    " ",
    { t: "return" },
    " ",
    "{",
    " ",
    { t: "email" },
    ":",
    " ",
    { t: `"${email}"` },
    ", ",
    { t: "responseTime" },
    ":",
    " ",
    { t: `"fast"` },
    " ",
    "}",
    " ",
    "}",
    " ",
  ]);
}

/* =================== Refraction layer (the key piece) ================== */
/**
 * Renders a clipped, auto-aligned clone of the moving background **inside** the pill,
 * then displaces it with an SVG filter. This yields true “liquid” refraction/bleed.
 */
function RefractionLayer({
  sceneRef,
  buildChunk1,
  buildChunk2,
  buildChunk3,
  reduced,
}: {
  sceneRef: React.RefObject<HTMLDivElement>;
  buildChunk1: () => React.ReactNode;
  buildChunk2: () => React.ReactNode;
  buildChunk3: () => React.ReactNode;
  reduced: boolean;
}) {
  const holderRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0, w: 0, h: 0 });

  useEffect(() => {
    function update() {
      if (!holderRef.current || !sceneRef.current) return;
      const pill = holderRef.current.getBoundingClientRect();
      const scene = sceneRef.current.getBoundingClientRect();
      setOffset({
        x: scene.left - pill.left,
        y: scene.top - pill.top,
        w: scene.width,
        h: scene.height,
      });
    }
    update();
    const ro = new ResizeObserver(update);
    ro.observe(document.documentElement);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sceneRef]);

  return (
    <div
      ref={holderRef}
      aria-hidden
      className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
      style={{ contain: "strict" }}
    >
      {/* Frosted lens base (keeps your current opacity behaviour) */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(26px) saturate(170%)",
          WebkitBackdropFilter: "blur(26px) saturate(170%)",
        }}
      />

      {/* Cloned moving background, aligned to the scene, then displaced */}
      <div
        className="absolute rounded-[inherit] overflow-hidden"
        style={{
          left: offset.x,
          top: offset.y,
          width: offset.w,
          height: offset.h,
          filter: "url(#liquid-displace)", // wobble/refraction
          mixBlendMode: "overlay",
          opacity: 0.9,
        }}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="pointer-events-none space-y-[7px] select-none">
            <div className="flex justify-center">
              <SeamlessTicker
                reduced={reduced}
                duration={25}
                height={22}
                className="text-[13px] sm:text-sm"
                chunk={buildChunk1()}
              />
            </div>
            <div className="flex justify-center">
              <SeamlessTicker
                reduced={reduced}
                duration={33}
                delay={1.5}
                height={22}
                className="text-[13px] sm:text-sm"
                chunk={buildChunk2()}
              />
            </div>
            <div className="flex justify-center">
              <SeamlessTicker
                reduced={reduced}
                duration={40}
                delay={3}
                height={22}
                className="text-[13px] sm:text-sm"
                chunk={buildChunk3()}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Glass depth + micro-edges */}
      <div className="absolute inset-0 rounded-[inherit] shadow-[inset_1px_1px_4px_rgba(255,255,255,0.58),inset_-3px_-3px_8px_rgba(0,0,0,0.38)]" />
      {/* Subtle shine */}
      <div className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(115deg,rgba(255,255,255,0.42)_0%,rgba(255,255,255,0.12)_33%,rgba(255,255,255,0)_66%)] opacity-35" />
    </div>
  );
}

/* ============================== Component ============================== */
const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);

  const handleCopy = () => {
    if (copied) return;
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Prebuild chunk nodes so both foreground and refraction reuse identical content
  const chunk1 = useMemo(() => <>{Line1()}</>, []);
  const chunk2 = useMemo(() => <>{Line2()}</>, []);
  const chunk3 = useMemo(() => <>{Line3(SOCIAL_LINKS.email)}</>, []);

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

      {/* ======= Social pill + continuous multi-line code background ======= */}
      <motion.div
        ref={sceneRef}
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-24 flex justify-center"
      >
        {/* Neutral substrate so the lens always has data to sample */}
        <div
          aria-hidden
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                     w-[min(92vw,1100px)] h-[120px] rounded-full pointer-events-none z-0"
          style={{ background: "rgba(255,255,255,0.08)", filter: "blur(22px) saturate(140%)" }}
        />

        {/* Foreground moving code (coloured by tokens; no gradients; no gaps) */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none z-[1] space-y-[7px] select-none">
          <div className="flex justify-center">
            <SeamlessTicker reduced={!!reduced} duration={25} height={22} className="text-[13px] sm:text-sm" chunk={chunk1} />
          </div>
          <div className="flex justify-center">
            <SeamlessTicker reduced={!!reduced} duration={33} delay={1.5} height={22} className="text-[13px] sm:text-sm" chunk={chunk2} />
          </div>
          <div className="flex justify-center">
            <SeamlessTicker reduced={!!reduced} duration={40} delay={3} height={22} className="text-[13px] sm:text-sm" chunk={chunk3} />
          </div>
        </div>

        {/* ===== Liquid Glass Pill (refracts live background) ===== */}
        <div
          className="
            relative z-[2] flex items-center gap-7 px-8 py-3 rounded-full overflow-hidden isolate
            bg-white/10 border border-white/25 shadow-[0_4px_22px_rgba(0,0,0,0.22)]
          "
        >
          {/* Refraction & depth */}
          <RefractionLayer
            sceneRef={sceneRef}
            buildChunk1={() => chunk1}
            buildChunk2={() => chunk2}
            buildChunk3={() => chunk3}
            reduced={!!reduced}
          />

          {/* Icons (bright yellow) */}
          <div className="relative z-[3] flex items-center gap-7">
            {SOCIAL_LINKS.profiles.map((p) => {
              const Icon = ICON_MAP[p.name] || Github;
              return (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" aria-label={p.name}>
                  <motion.div
                    whileHover={{ scale: 1.28 }}
                    transition={{ type: "spring", stiffness: 260, damping: 14 }}
                    className="text-[#FFF2A6] hover:text-[#FFF8C9] drop-shadow-[0_0_10px_rgba(255,248,205,0.6)] transition-all"
                  >
                    <Icon className="w-7 h-7" />
                  </motion.div>
                </a>
              );
            })}
          </div>
        </div>

        {/* Displacement filter for refraction wobble */}
        <svg className="hidden" aria-hidden="true">
          <defs>
            <filter id="liquid-displace" x="0" y="0" width="100%" height="100%" colorInterpolationFilters="sRGB">
              <feTurbulence type="fractalNoise" baseFrequency="0.012 0.024" numOctaves="2" seed="7" result="noise" />
              <feGaussianBlur in="noise" stdDeviation="1.15" result="soft" />
              <feDisplacementMap in="SourceGraphic" in2="soft" scale="20" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      </motion.div>
    </section>
  );
};

export default Contact;
