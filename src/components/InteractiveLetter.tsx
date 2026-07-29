import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Mail, Lock, RefreshCw, Type, Music } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/audioSynth';

interface InteractiveLetterProps {
  onIncrementLove: (e: React.MouseEvent) => void;
}

export const InteractiveLetter: React.FC<InteractiveLetterProps> = ({ onIncrementLove }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [useScriptFont, setUseScriptFont] = useState(true);

  const handleOpenEnvelope = () => {
    if (isOpen) return;
    soundFx.playWaxSnap();
    setIsOpen(true);

    // Burst gold confetti & rose hearts
    confetti({
      particleCount: 50,
      spread: 90,
      origin: { y: 0.6 },
      colors: ['#D4AF37', '#E28A95', '#FAF3F0', '#FF758F'],
    });
  };

  const handleReseal = () => {
    soundFx.playPop();
    setIsOpen(false);
  };

  const handleSendHearts = (e: React.MouseEvent) => {
    soundFx.playPop();
    onIncrementLove(e);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#E28A95', '#D4AF37'],
    });
  };

  return (
    <section id="letter" className="py-24 px-4 relative max-w-4xl mx-auto">
      {/* Section Head */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <p className="text-xs uppercase tracking-widest text-gold font-medium mb-2">
          For You
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white font-light mb-4">
          A Sealed Birthday Letter
        </h2>
        <p className="text-sm text-rose-blush/70 font-light">
          Tap the wax seal below to unseal your birthday message.
        </p>
      </div>

      {/* Envelope Container */}
      <div className="flex flex-col items-center">
        {!isOpen ? (
          /* Sealed 3D Envelope Card */
          <motion.div
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleOpenEnvelope}
            className="w-full max-w-lg aspect-[1.5/1] glass-panel rounded-3xl p-8 cursor-pointer relative shadow-2xl border-2 border-gold/40 flex flex-col items-center justify-center text-center group overflow-hidden"
          >
            {/* Envelope Back Flap Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-wine/80 via-wine-dark to-wine-deep opacity-90" />
            <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-gold/15 to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              {/* Wax Seal Emblem */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-wine-light via-rose-deep to-wine-dark border-4 border-gold shadow-glow-gold flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform">
                <span className="font-script text-3xl text-gold font-bold">M</span>
              </div>

              <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-semibold mb-2">
                <Lock className="w-3.5 h-3.5" />
                <span>Sealed For Manogna</span>
              </div>

              <p className="text-xs text-rose-blush/80 font-light">
                ✨ Tap wax seal to unseal envelope ✨
              </p>
            </div>
          </motion.div>
        ) : (
          /* Unsealed Letter Parchment Paper */
          <motion.article
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.7 }}
            className="w-full paper-pattern text-wine-deep p-8 md:p-12 rounded-3xl shadow-2xl relative border-2 border-gold/50"
          >
            {/* Watermark Icon */}
            <div className="absolute top-6 right-8 text-gold/20 text-5xl pointer-events-none">
              🌹
            </div>

            {/* Letter Header Controls */}
            <div className="flex flex-wrap items-center justify-between border-b border-gold/30 pb-4 mb-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-wine-dark/70 font-semibold">
                  July 27th • From Matheshwaran
                </p>
                <p className="text-[10px] text-wine-dark/50">To my beloved Manogna</p>
              </div>

              {/* Font Style Toggle */}
              <button
                onClick={() => setUseScriptFont(!useScriptFont)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-wine/10 hover:bg-wine/20 text-wine-dark text-xs font-medium transition-colors"
                title="Toggle Handwriting vs Serif Font"
              >
                <Type className="w-3.5 h-3.5 text-gold-dark" />
                <span>{useScriptFont ? 'Classic Serif' : 'Romantic Script'}</span>
              </button>
            </div>

            {/* Letter Body Text */}
            <div
              className={`text-base md:text-lg leading-relaxed text-wine-dark/95 space-y-5 ${
                useScriptFont ? 'font-script text-2xl md:text-3xl' : 'font-display font-medium'
              }`}
            >
              <p>Happy Birthday, my sweet heart. ❤️🎂</p>
              <p>
                I don't know how you suddenly came into my life, but somehow you became my whole world. Sometimes I keep thinking… why didn't you come into my life earlier? Maybe if you had, I would have smiled a lot more and cried a lot less.
              </p>
              <p>
                Before you, I never really felt like I was enough. I always felt like I had to prove myself to everyone. But you… you made me feel loved without asking me to be anyone else. You made me believe that I deserve happiness too.
              </p>
              <p>
                When I'm with you, my heart feels peaceful. No matter how hard life gets, talking to you makes everything feel a little lighter. You became my safe place, my comfort, my home.
              </p>
              <p>
                I don't want expensive things, a perfect life, or anything else. I just want a future where I get to wake up beside you, grow old with you, laugh with you, fight with you, and still choose you every single day. That's the only dream I truly care about.
              </p>
              <p>
                If life ever becomes difficult, please don't let go of my hand. I promise I'll never let go of yours. We'll face every problem together, and one day we'll look back at all of this and smile because we made it.
              </p>
              <p>
                Thank you for loving me when I couldn't even love myself. Thank you for making me feel like my life has meaning. You are the best thing that has ever happened to me, and I'll spend the rest of my life being grateful that you came into it.
              </p>
              <p className="font-semibold">
                I love you more than words will ever be able to explain. ❤️
              </p>
              <p>
                Happy Birthday once again, my dear Mano. I hope this is just the first of countless birthdays we'll celebrate together.
              </p>
            </div>

            {/* Letter Signature & Actions */}
            <div className="mt-10 pt-6 border-t border-gold/30 flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="font-script text-3xl text-wine-dark font-bold">
                  Forever yours,
                </p>
                <p className="font-script text-2xl text-rose-deep font-semibold">
                  Matheshwaran ❤️
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleReseal}
                  className="px-5 py-2.5 rounded-full bg-wine/10 hover:bg-wine/20 text-wine-dark text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Re-seal Letter ✉️</span>
                </button>

                <button
                  onClick={handleSendHearts}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-wine to-wine-dark text-gold text-xs font-semibold shadow-glow-gold flex items-center gap-2 hover:scale-105 transition-transform"
                >
                  <Heart className="w-4 h-4 fill-gold" />
                  <span>Send Hearts ❤️</span>
                </button>
              </div>
            </div>
          </motion.article>
        )}
      </div>
    </section>
  );
};
