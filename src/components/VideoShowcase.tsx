import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Film, Sparkles } from 'lucide-react';
import { VideoItem } from '../types';
import { soundFx } from '../utils/audioSynth';

const videoList: VideoItem[] = [
  {
    id: 'video-1',
    src: 'assets/videos/video-1.mp4',
    title: 'Motion Memories 🎬',
    caption: 'Some moments move too fast for simple photos.',
  },
  {
    id: 'video-2',
    src: 'assets/videos/video-2.mp4',
    title: 'Cinematic Magic ✨',
    caption: 'Caught in motion, preserved forever in our hearts.',
  },
];

export const VideoShowcase: React.FC = () => {
  const [playingState, setPlayingState] = useState<{ [key: string]: boolean }>({});
  const [mutedState, setMutedState] = useState<{ [key: string]: boolean }>({});
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const togglePlay = (id: string) => {
    soundFx.playPop();
    const vid = videoRefs.current[id];
    if (!vid) return;

    if (vid.paused) {
      vid.play();
      setPlayingState((prev) => ({ ...prev, [id]: true }));
    } else {
      vid.pause();
      setPlayingState((prev) => ({ ...prev, [id]: false }));
    }
  };

  const toggleMute = (id: string) => {
    soundFx.playPop();
    const vid = videoRefs.current[id];
    if (!vid) return;

    vid.muted = !vid.muted;
    setMutedState((prev) => ({ ...prev, [id]: vid.muted }));
  };

  return (
    <section id="motion" className="py-24 px-4 relative max-w-6xl mx-auto">
      {/* Section Head */}
      <div className="text-center max-w-xl mx-auto mb-16">
        <p className="text-xs uppercase tracking-widest text-gold font-medium mb-2">
          Chapter Two
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white font-light mb-4">
          Cinematic Memories In Motion
        </h2>
        <p className="text-sm text-rose-blush/70 font-light">
          Watch our special moments recorded live.
        </p>
      </div>

      {/* Video Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {videoList.map((video, idx) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="glass-panel rounded-2xl overflow-hidden border border-gold/30 p-4 shadow-2xl group"
          >
            {/* Video Wrapper */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-4">
              <video
                ref={(el) => (videoRefs.current[video.id] = el)}
                src={video.src}
                playsInline
                preload="metadata"
                onEnded={() => setPlayingState((prev) => ({ ...prev, [video.id]: false }))}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // If video file fails or missing, display placeholder video card
                  const target = e.target as HTMLVideoElement;
                  if (target.parentElement) {
                    target.parentElement.classList.add('flex', 'items-center', 'justify-center');
                  }
                }}
              />

              {/* Center Play Overlay Trigger */}
              {!playingState[video.id] && (
                <button
                  onClick={() => togglePlay(video.id)}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 hover:bg-black/20 transition-colors group/play cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/90 text-wine-dark flex items-center justify-center shadow-glow-gold group-hover/play:scale-110 transition-transform">
                    <Play className="w-7 h-7 fill-wine-dark ml-1" />
                  </div>
                  <span className="mt-3 text-xs uppercase tracking-widest text-white/90 font-medium">
                    Play Video
                  </span>
                </button>
              )}
            </div>

            {/* Video Info Footer & Controls */}
            <div className="flex items-center justify-between px-2">
              <div>
                <h3 className="font-display text-xl text-white font-medium flex items-center gap-2">
                  <Film className="w-4 h-4 text-gold" />
                  <span>{video.title}</span>
                </h3>
                <p className="text-xs text-rose-blush/60 font-light">
                  {video.caption}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => togglePlay(video.id)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-gold transition-colors"
                  title={playingState[video.id] ? 'Pause' : 'Play'}
                >
                  {playingState[video.id] ? (
                    <Pause className="w-4 h-4" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                </button>

                <button
                  onClick={() => toggleMute(video.id)}
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-rose-soft transition-colors"
                  title={mutedState[video.id] ? 'Unmute' : 'Mute'}
                >
                  {mutedState[video.id] ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
