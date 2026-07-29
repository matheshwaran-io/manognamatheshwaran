import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Maximize2, X, Sparkles, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { PhotoItem } from '../types';
import { soundFx } from '../utils/audioSynth';

const initialPhotos: PhotoItem[] = [
  {
    id: '1',
    src: 'assets/photos/photo-1.jpg',
    caption: 'Straight out of a fairy tale',
    alt: 'Manogna by floral wall',
    category: 'favorites',
    rotation: '-3deg',
    loves: 42,
  },
  {
    id: '2',
    src: 'assets/photos/photo-2.jpg',
    caption: 'Lighting up my universe ✨',
    alt: 'Manogna with sparklers at night',
    category: 'smiles',
    rotation: '3deg',
    loves: 56,
  },
  {
    id: '3',
    src: 'assets/photos/photo-3.jpg',
    caption: 'My favourite view in the world ❤️',
    alt: 'Manogna at cozy cafe date',
    category: 'dates',
    rotation: '-2deg',
    loves: 88,
  },
  {
    id: '4',
    src: 'assets/photos/photo-4.jpg',
    caption: 'The day everything changed',
    alt: 'Manogna under night lights',
    category: 'dates',
    rotation: '4deg',
    loves: 39,
  },
  {
    id: '5',
    src: 'assets/photos/photo-5.jpg',
    caption: 'My ray of sunshine ☀️',
    alt: 'Manogna in golden yellow outfit',
    category: 'smiles',
    rotation: '-4deg',
    loves: 64,
  },
  {
    id: '6',
    src: 'assets/photos/photo-6.jpg',
    caption: 'Simply gorgeous in blue 💙',
    alt: 'Manogna in sky blue outfit',
    category: 'favorites',
    rotation: '2deg',
    loves: 71,
  },
];

export const PolaroidGallery: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoItem[]>(initialPhotos);
  const [activeFilter, setActiveFilter] = useState<'all' | 'favorites' | 'smiles' | 'dates'>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const filteredPhotos = activeFilter === 'all'
    ? photos
    : photos.filter((p) => p.category === activeFilter);

  const handleIncrementLove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundFx.playPop();
    setPhotos((prev) =>
      prev.map((photo) =>
        photo.id === id ? { ...photo, loves: photo.loves + 1 } : photo
      )
    );
  };

  const openLightbox = (index: number) => {
    soundFx.playPop();
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (activeLightboxIndex === null) return;
    soundFx.playPop();
    setActiveLightboxIndex((activeLightboxIndex + 1) % filteredPhotos.length);
  };

  const prevLightbox = () => {
    if (activeLightboxIndex === null) return;
    soundFx.playPop();
    setActiveLightboxIndex(
      (activeLightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  };

  return (
    <section id="story" className="py-24 px-4 relative max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <p className="text-xs uppercase tracking-widest text-gold font-medium mb-2">Chapter One</p>
        <h2 className="font-display text-4xl md:text-5xl text-white font-light mb-4">
          Every Frame Has You In It
        </h2>
        <p className="text-sm text-rose-blush/70 font-light">
          A curated luxury gallery of my favourite moments with you — tap any polaroid to view in full detail.
        </p>

        {/* Filter Category Tabs */}
        <div className="flex items-center justify-center gap-2 mt-8 flex-wrap">
          {(['all', 'favorites', 'smiles', 'dates'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => {
                soundFx.playPop();
                setActiveFilter(filter);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium uppercase tracking-wider transition-all ${
                activeFilter === filter
                  ? 'bg-gold text-wine-dark shadow-glow-gold font-semibold'
                  : 'bg-white/5 border border-white/15 text-rose-soft/80 hover:bg-white/10'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Polaroid Grid with 3D Tilt */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.04, rotate: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => openLightbox(index)}
              className="group cursor-pointer bg-cream p-4 rounded-xl shadow-2xl transition-all duration-300 relative border border-gold/30 hover:shadow-glow-gold"
              style={{ transform: `rotate(${photo.rotation})` }}
            >
              {/* Polaroid Pin Header */}
              <div className="w-3 h-3 rounded-full bg-gold mx-auto mb-3 shadow-md border border-wine-dark" />

              {/* Photo Image Frame */}
              <div className="relative aspect-[4/5] rounded-lg overflow-hidden bg-wine-dark mb-4 group">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    // Fallback placeholder if missing
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />

                {/* Hover overlay hint */}
                <div className="absolute inset-0 bg-wine-deep/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 rounded-full bg-gold/90 text-wine-dark shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* Polaroid Caption & Reactions */}
              <div className="flex items-center justify-between px-1">
                <p className="font-script text-xl text-wine-dark font-medium truncate pr-2">
                  {photo.caption}
                </p>

                <button
                  onClick={(e) => handleIncrementLove(photo.id, e)}
                  className="flex items-center gap-1.5 text-xs text-rose-deep font-semibold bg-rose-blush/80 px-2.5 py-1 rounded-full border border-rose/30 hover:bg-rose-soft transition-colors"
                >
                  <Heart className="w-3.5 h-3.5 fill-rose-deep" />
                  <span>{photo.loves}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-wine-deep/95 backdrop-blur-xl"
            onClick={closeLightbox}
          >
            {/* Modal Controls */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Close Lightbox"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Lightbox Content Container */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-3xl w-full glass-panel rounded-2xl overflow-hidden border border-gold/40 p-4"
            >
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-black">
                <img
                  src={filteredPhotos[activeLightboxIndex].src}
                  alt={filteredPhotos[activeLightboxIndex].alt}
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="flex items-center justify-between px-4 py-2">
                <div>
                  <h3 className="font-script text-3xl text-gold font-normal">
                    {filteredPhotos[activeLightboxIndex].caption}
                  </h3>
                  <p className="text-xs text-rose-blush/60">
                    Photo {activeLightboxIndex + 1} of {filteredPhotos.length}
                  </p>
                </div>

                <button
                  onClick={(e) =>
                    handleIncrementLove(
                      filteredPhotos[activeLightboxIndex].id,
                      e
                    )
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-deep to-wine text-white text-xs font-semibold shadow-glow-rose hover:scale-105 transition-transform"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>
                    {filteredPhotos[activeLightboxIndex].loves} Loves
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
