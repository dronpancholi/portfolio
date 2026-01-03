import React, { useMemo, useState, memo } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram, MessageSquare, Clipboard, Check } from "lucide-react";
import { SOCIAL_LINKS } from "../constants";
import GlassCard from "./ui/GlassCard";
import LiquidGlass from "./ui/LiquidGlass";

const ICON_MAP: Record<string, any> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
  Discord: MessageSquare,
};

const TickerRow = memo(({ text, speed, delay }: { text: string; speed: string; delay: string }) => (
  <div className="relative overflow-hidden w-full whitespace-nowrap opacity-20 pointer-events-none mb-4">
    <div className="ticker-rail" style={{ animationDuration: speed, animationDelay: delay }}>
      {Array.from({ length: 12 }).map((_, i) => (
        <span key={i} className="px-8 text-sm font-mono tracking-tighter text-[var(--text-main)]">
          {text}
        </span>
      ))}
    </div>
  </div>
));

const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(SOCIAL_LINKS.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialIcons = SOCIAL_LINKS.profiles.map(p => {
    const Icon = ICON_MAP[p.name] || Github;
    return (
      <a key={p.name} href={p.url} target="_blank" rel="noopener" className="p-3 text-[var(--text-main)] hover:text-green-500 transition-colors">
        <Icon size={24} />
      </a>
    );
  });

  return (
    <section id="contact" className="py-32 scroll-mt-24">
      <div className="max-w-4xl mx-auto text-center px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-6 heading-glow"
        >
          Let's Build the Future.
        </motion.h2>
        
        <p className="text-lg text-[var(--text-secondary)] mb-12 max-w-xl mx-auto">
          I'm currently available for partnerships and high-impact AI research initiatives.
        </p>

        <div className="mb-24">
          <GlassCard className="max-w-md mx-auto overflow-hidden">
            <div className="p-8 md:p-12">
              <Mail className="mx-auto mb-6 text-green-500" size={40} />
              <h3 className="text-xl font-bold mb-6">Direct Inquiry</h3>
              <div className="flex items-center justify-between bg-black/5 dark:bg-white/5 rounded-2xl p-4 gap-4">
                <code className="text-sm font-mono opacity-70 truncate">{SOCIAL_LINKS.email}</code>
                <button onClick={handleCopy} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                  {copied ? <Check size={18} className="text-green-500" /> : <Clipboard size={18} />}
                </button>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* PRO Ticker Section */}
        <div className="relative mt-20">
          <div className="absolute inset-0 z-0">
             <TickerRow text="0101_AI_MODELS_0101" speed="20s" delay="0s" />
             <TickerRow text="ENGINEER_INNOVATE_OPTIMIZE" speed="25s" delay="-5s" />
             <TickerRow text="SYSTEMS_DESIGN_ARCH_REDACTED" speed="22s" delay="-2s" />
          </div>

          <div className="relative z-10 flex justify-center">
            <LiquidGlass 
              displacementScale={25}
              className="max-w-xs sm:max-w-sm"
              proxy={<div className="flex gap-4 p-8 opacity-0">spacer</div>}
            >
              <div className="flex items-center gap-6 py-1">
                {socialIcons}
              </div>
            </LiquidGlass>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;