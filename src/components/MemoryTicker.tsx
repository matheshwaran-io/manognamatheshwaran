import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Heart, Sparkles, Smile, Flame } from 'lucide-react';

export const MemoryTicker: React.FC = () => {
  // Compute time elapsed since July 27, 2025 (or special baseline)
  const [timeElapsed, setTimeElapsed] = useState({
    days: 365,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    // Start date baseline (July 27)
    const startDate = new Date('2025-07-27T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = Math.max(0, now.getTime() - startDate.getTime());

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeElapsed({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    {
      icon: Smile,
      number: `${timeElapsed.days}+`,
      label: 'Days of Pure Smiles',
      desc: 'Every moment brightened by you',
    },
    {
      icon: Heart,
      number: '∞',
      label: 'Unconditional Love',
      desc: 'Boundless and growing every day',
    },
    {
      icon: Flame,
      number: '1',
      label: 'Forever Soulmate',
      desc: 'My safe place and my home',
    },
  ];

  return (
    <section className="relative py-16 px-4 bg-wine-dark/80 border-y border-gold/20 backdrop-blur-lg">
      <div className="max-w-5xl mx-auto">
        {/* Live Relationship Counter Banner */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-gold mb-3">
            <Clock className="w-4 h-4 animate-spin" />
            <span>Time Spent Loving You</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            <div className="glass-panel p-4 rounded-2xl text-center border border-gold/30">
              <span className="block font-display text-3xl md:text-4xl font-bold text-gold">{timeElapsed.days}</span>
              <span className="text-[11px] uppercase tracking-wider text-rose-blush/70">Days</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl text-center border border-gold/30">
              <span className="block font-display text-3xl md:text-4xl font-bold text-gold">{timeElapsed.hours}</span>
              <span className="text-[11px] uppercase tracking-wider text-rose-blush/70">Hours</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl text-center border border-gold/30">
              <span className="block font-display text-3xl md:text-4xl font-bold text-gold">{timeElapsed.minutes}</span>
              <span className="text-[11px] uppercase tracking-wider text-rose-blush/70">Minutes</span>
            </div>

            <div className="glass-panel p-4 rounded-2xl text-center border border-gold/30">
              <span className="block font-display text-3xl md:text-4xl font-bold text-rose-deep">{timeElapsed.seconds}</span>
              <span className="text-[11px] uppercase tracking-wider text-rose-blush/70">Seconds</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="glass-panel p-6 rounded-2xl border border-gold/20 hover:border-gold/50 transition-all duration-300 group hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="p-3 rounded-xl bg-gold/15 text-gold group-hover:bg-gold group-hover:text-wine transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="font-display text-3xl font-bold text-white group-hover:text-gold transition-colors">
                      {stat.number}
                    </span>
                    <h3 className="text-xs uppercase tracking-wider text-rose-soft/80 font-medium">
                      {stat.label}
                    </h3>
                  </div>
                </div>
                <p className="text-xs text-rose-blush/60 font-light pl-1">
                  {stat.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
