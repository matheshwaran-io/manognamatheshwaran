import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audioSynth';

interface FooterProps {
  onIncrementLove: (e: React.MouseEvent) => void;
}

export const Footer: React.FC<FooterProps> = ({ onIncrementLove }) => {
  const handleHeartClick = (e: React.MouseEvent) => {
    soundFx.playPop();
    onIncrementLove(e);
    confetti({
      particleCount: 25,
      spread: 60,
      origin: { y: 0.9 },
      colors: ['#E28A95', '#D4AF37', '#FAF3F0'],
    });
  };

  return (
    <footer className="relative pt-20 pb-12 px-4 bg-gradient-to-b from-wine-deep via-obsidian to-black border-t border-gold/20 text-center overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-rose/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center">
        {/* Floating Heart Icon Button */}
        <button
          onClick={handleHeartClick}
          className="w-14 h-14 rounded-full bg-wine/80 border border-gold text-rose-deep flex items-center justify-center mb-6 shadow-glow-gold hover:scale-110 transition-transform cursor-pointer group"
          title="Send Love to Manogna"
        >
          <Heart className="w-7 h-7 fill-rose-deep group-hover:scale-125 transition-transform" />
        </button>

        <h3 className="font-script text-4xl text-rose-soft text-glow-rose mb-2 font-normal">
          Here’s to every birthday still to come.
        </h3>

        <p className="font-display text-xl text-gold font-light mb-6">
          Forever Yours, Matheshwaran ❤️
        </p>

        <div className="w-16 h-0.5 bg-gold/30 rounded-full mb-6" />

        <p className="text-[11px] uppercase tracking-widest text-rose-blush/50 font-light">
          Crafted with infinite love by Matheshwaran for Manogna • 2026
        </p>
      </div>
    </footer>
  );
};
