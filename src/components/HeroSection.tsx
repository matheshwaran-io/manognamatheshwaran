import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, ChevronDown, ArrowDown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audioSynth';

interface HeroSectionProps {
  loveCount: number;
  onIncrementLove: (e: React.MouseEvent) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ loveCount, onIncrementLove }) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const handleLoveClick = (e: React.MouseEvent) => {
    soundFx.playPop();
    setButtonClicked(true);
    setTimeout(() => setButtonClicked(false), 300);

    // Burst heart confetti from click position
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;

    confetti({
      particleCount: 25,
      spread: 70,
      origin: { x, y },
      colors: ['#E28A95', '#D4AF37', '#FAF3F0', '#FF758F'],
      shapes: ['circle', 'square'],
      scalar: 1.2,
    });

    onIncrementLove(e);
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden bg-gradient-to-b from-wine-deep via-wine-dark to-wine-deep">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose/20 rounded-full blur-3xl pointer-events-none animate-pulseGlow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/15 rounded-full blur-3xl pointer-events-none animate-pulseGlow" style={{ animationDelay: '1.5s' }} />

      <div className="relative z-20 max-w-3xl mx-auto text-center flex flex-col items-center">
        {/* Special Edition Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-gold/40 text-gold-light text-xs font-medium tracking-widest uppercase shadow-glow-gold mb-6 backdrop-blur-md"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
          <span>July 27th • Special Edition</span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-ping" />
        </motion.div>

        {/* Script Name Title */}
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-script text-6xl md:text-8xl text-rose-soft text-glow-rose mb-2 font-normal"
        >
          Manogna
        </motion.h2>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="font-display text-4xl md:text-6xl text-white font-light leading-tight mb-6"
        >
          Happy Birthday,<br />
          <span className="italic font-normal text-gold text-glow-gold">My Love 🌹</span>
        </motion.h1>

        {/* Hero Narrative Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.6 }}
          className="text-base md:text-lg text-rose-blush/80 max-w-xl leading-relaxed mb-10 font-light"
        >
          Today the whole world gets to celebrate you.<br />
          I just get to do it a little louder than everyone else.
        </motion.p>

        {/* Hero Call to Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.8 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <a
            href="#story"
            onClick={() => soundFx.playPop()}
            className="group px-7 py-3.5 rounded-full bg-gradient-to-r from-gold via-gold-light to-gold text-wine-dark font-medium text-sm tracking-wider uppercase shadow-glow-gold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2"
          >
            <span>Explore Our Moments</span>
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </a>

          <button
            onClick={handleLoveClick}
            className={`px-7 py-3.5 rounded-full bg-wine-light/60 border border-rose-deep/60 text-white font-medium text-sm tracking-wider shadow-lg hover:bg-wine-light transition-all flex items-center gap-2.5 ${
              buttonClicked ? 'scale-95' : 'hover:scale-105'
            }`}
          >
            <Heart className="w-4 h-4 text-rose fill-rose animate-bounce" />
            <span><strong className="text-gold font-semibold">{loveCount}</strong> Loves Sent</span>
          </button>
        </motion.div>

        {/* Scroll Cue Indicator */}
        <motion.a
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          href="#timeline"
          className="flex flex-col items-center gap-2 text-xs uppercase tracking-widest text-gold/70 hover:text-gold transition-colors group"
        >
          <span>Our Story</span>
          <ArrowDown className="w-4 h-4 text-gold animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
};
