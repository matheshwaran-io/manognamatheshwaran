import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Heart, Star, Compass } from 'lucide-react';
import { StoryMilestone } from '../types';

const milestones: StoryMilestone[] = [
  {
    id: '1',
    date: 'The Beginning',
    title: 'When Our Stars Aligned',
    description:
      'I don’t know how you suddenly came into my life, but somehow you became my whole world. Looking back, everything before you feels like a quiet shadow.',
    tag: 'Chapter 01',
    icon: 'Sparkles',
  },
  {
    id: '2',
    date: 'The Connection',
    title: 'Finding Comfort In You',
    description:
      'Before you, I always felt like I had to prove myself. But you made me feel loved without asking me to be anyone else. You made me believe that I deserve happiness too.',
    tag: 'Chapter 02',
    icon: 'Heart',
  },
  {
    id: '3',
    date: 'The Realization',
    title: 'My Safe Place & Home',
    description:
      'When I’m with you, my heart feels peaceful. No matter how hard life gets, talking to you makes everything feel a little lighter.',
    tag: 'Chapter 03',
    icon: 'Compass',
  },
  {
    id: '4',
    date: 'The Future',
    title: 'Every Birthday Still To Come',
    description:
      'I just want a future where I get to wake up beside you, grow old with you, laugh with you, fight with you, and still choose you every single day.',
    tag: 'Chapter 04',
    icon: 'Star',
  },
];

export const StoryTimeline: React.FC = () => {
  return (
    <section id="timeline" className="py-24 px-4 relative max-w-5xl mx-auto">
      {/* Section Title */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <p className="text-xs uppercase tracking-widest text-gold font-medium mb-2">
          Milestones
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white font-light mb-4">
          Our Love Story Timeline
        </h2>
        <p className="text-sm text-rose-blush/70 font-light">
          A visual journey through the moments that brought us together.
        </p>
      </div>

      {/* Vertical Timeline */}
      <div className="relative border-l-2 border-gold/30 ml-4 md:ml-1/2 space-y-12">
        {milestones.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.15 }}
            className="relative pl-8 md:pl-0 group"
          >
            {/* Timeline Dot */}
            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-wine border-2 border-gold flex items-center justify-center text-gold shadow-glow-gold group-hover:scale-125 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>

            {/* Timeline Glass Card */}
            <div className="glass-panel p-6 rounded-2xl border border-gold/25 hover:border-gold/60 transition-all duration-300 shadow-xl group-hover:-translate-y-1">
              <div className="flex items-center justify-between gap-4 mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full bg-gold/15 text-gold border border-gold/30">
                  {item.tag}
                </span>
                <span className="text-xs text-rose-soft/70 flex items-center gap-1.5 font-light">
                  <Calendar className="w-3.5 h-3.5 text-gold" />
                  {item.date}
                </span>
              </div>

              <h3 className="font-display text-2xl text-white font-medium mb-2 group-hover:text-gold transition-colors">
                {item.title}
              </h3>

              <p className="text-xs text-rose-blush/80 leading-relaxed font-light">
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
