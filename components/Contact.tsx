import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, Instagram, MessageSquare, Clipboard, Check } from "lucide-react";
import { SOCIAL_LINKS } from "../constants";
import GlassCard from "./ui/GlassCard";

// FIX: Derive a strict type for icon names from the constants and use a Record to ensure type safety. This resolves the 'Type 'string' is not assignable to type 'never'' error.
type SocialProfileName = typeof SOCIAL_LINKS.profiles[number]['name'];

const iconMap: Record<SocialProfileName, React.ElementType> = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Instagram: Instagram,
  Discord: MessageSquare,
};

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

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-[var(--text-main)] mb-3"
      >
        Get In Touch
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-lg text-[var(--text-secondary)] mb-12 max-w-xl mx-auto"
      >
        I'm actively exploring new opportunities and collaborations. Best way to reach me is email.
      </motion.p>

      {/* EMAIL */}
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
            <h3 className="text-xl md:text-2xl font-bold text-[var(--text-main)] mb-6">Email me directly at</h3>

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
                    <motion.span key="copied-text" initial={{opacity: 0}} animate={{opacity: 1}} className="flex items-center gap-1"><Check size={16}/>Copied</motion.span>
                ) : (
                    <span className="flex items-center gap-1"><Clipboard size={16}/>Copy</span>
                )}
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* SOCIAL LIQUID GLASS PILL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mt-16 flex justify-center"
      >

        {/* Moving multi-color code background */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            animate={{ x: ["0%", "-100%"] }}
            transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
            className="whitespace-nowrap text-sm font-mono font-medium bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 via-green-300 to-yellow-300 bg-clip-text text-transparent opacity-[0.8]"
          >
            {`const dron = { name: "Dron Pancholi", city: "Surendranagar", empire: "New Lands", rating: "Black Core" }; `.repeat(50)}
          </motion.div>
        </div>

        {/* Liquid pill */}
        <motion.div
          layout
          className="relative z-10 flex items-center gap-6 px-7 py-3 rounded-full backdrop-blur-2xl
            border border-white/25 bg-white/10 shadow-[0_0_22px_rgba(255,255,255,0.22)]
            transition-all duration-500 hover:bg-white/16"
          style={{ filter: "url(#liquidGlassEffect)" }}
        >
          {SOCIAL_LINKS.profiles.map((profile) => {
            const Icon = iconMap[profile.name] || Github;
            return (
              <a key={profile.name} href={profile.url} target="_blank" rel="noopener noreferrer" aria-label={profile.name}>
                <motion.div whileHover={{ scale: 1.25 }} transition={{type: "spring", stiffness: 300, damping: 15}} className="text-white/90 hover:text-white">
                  <Icon className="w-7 h-7" />
                </motion.div>
              </a>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;