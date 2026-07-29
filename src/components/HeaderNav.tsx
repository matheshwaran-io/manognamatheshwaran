import React, { useState, useEffect } from 'react';
import { Sparkles, Music, Palette, Heart, Menu, X } from 'lucide-react';
import { ThemeMode } from '../types';
import { soundFx } from '../utils/audioSynth';

interface HeaderNavProps {
  currentTheme: ThemeMode;
  onThemeChange: (theme: ThemeMode) => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  audioVisualizerData: number[];
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  currentTheme,
  onThemeChange,
  isAudioPlaying,
  onToggleAudio,
  audioVisualizerData,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
      setScrolled(scrollTop > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Gallery', href: '#story' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Videos', href: '#motion' },
    { label: 'Love Letter', href: '#letter' },
    { label: 'Trivia', href: '#quiz' },
  ];

  return (
    <>
      {/* Top Scroll Progress Line */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-wine-light via-gold to-rose-deep z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Floating Glass Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'py-3 glass-nav shadow-glass'
            : 'py-5 bg-gradient-to-b from-wine-deep/90 to-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#hero"
            onClick={() => soundFx.playPop()}
            className="flex items-center gap-2 font-script text-2xl md:text-3xl text-white hover:text-gold transition-colors group"
          >
            <Sparkles className="w-5 h-5 text-gold animate-pulse group-hover:rotate-12 transition-transform" />
            <span className="tracking-wide">Manogna</span>
            <Sparkles className="w-5 h-5 text-gold animate-pulse group-hover:-rotate-12 transition-transform" />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => soundFx.playPop()}
                className="text-xs uppercase tracking-widest text-white/90 hover:text-gold transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gold hover:after:w-full after:transition-all after:duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Controls */}
          <div className="flex items-center gap-3">
            {/* Music Ambiance Button */}
            <button
              onClick={() => {
                soundFx.playPop();
                onToggleAudio();
              }}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isAudioPlaying
                  ? 'bg-wine border-gold text-gold shadow-glow-gold'
                  : 'bg-gold/15 border-gold/40 text-gold-light hover:bg-gold/30'
              }`}
              title="Toggle Romantic Ambiance Music"
            >
              <Music className={`w-3.5 h-3.5 ${isAudioPlaying ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">
                {isAudioPlaying ? 'Playing ♪' : 'Ambiance'}
              </span>

              {/* Animated Waveform Visualizer Bars */}
              {isAudioPlaying && (
                <div className="flex items-end gap-0.5 h-3 ml-1">
                  {audioVisualizerData.slice(0, 4).map((val, idx) => (
                    <div
                      key={idx}
                      className="w-0.5 bg-gold rounded-full transition-all duration-150"
                      style={{ height: `${Math.max(20, val)}%` }}
                    />
                  ))}
                </div>
              )}
            </button>

            {/* Theme Selector Button */}
            <div className="relative">
              <button
                onClick={() => {
                  soundFx.playPop();
                  setShowThemeDropdown(!showThemeDropdown);
                }}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-rose-blush transition-colors"
                aria-label="Change Theme"
              >
                <Palette className="w-4 h-4 text-gold" />
              </button>

              {showThemeDropdown && (
                <div className="absolute right-0 mt-2 w-44 glass-panel rounded-xl p-2 shadow-2xl z-50 flex flex-col gap-1 border border-gold/30">
                  <p className="text-[10px] uppercase tracking-wider text-white/50 px-2 py-1">Select Aesthetics</p>
                  <button
                    onClick={() => {
                      onThemeChange('midnight');
                      setShowThemeDropdown(false);
                      soundFx.playPop();
                    }}
                    className={`text-left text-xs px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      currentTheme === 'midnight' ? 'bg-wine text-gold font-medium' : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span>Midnight Velvet</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-wine-light border border-gold" />
                  </button>

                  <button
                    onClick={() => {
                      onThemeChange('rose-gold');
                      setShowThemeDropdown(false);
                      soundFx.playPop();
                    }}
                    className={`text-left text-xs px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      currentTheme === 'rose-gold' ? 'bg-wine text-gold font-medium' : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span>Rose Gold Luxe</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-deep border border-gold" />
                  </button>

                  <button
                    onClick={() => {
                      onThemeChange('obsidian');
                      setShowThemeDropdown(false);
                      soundFx.playPop();
                    }}
                    className={`text-left text-xs px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                      currentTheme === 'obsidian' ? 'bg-wine text-gold font-medium' : 'text-white/80 hover:bg-white/10'
                    }`}
                  >
                    <span>Obsidian Crimson</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-obsidian border border-rose" />
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-white hover:text-gold"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav */}
        {isMenuOpen && (
          <div className="md:hidden glass-panel border-t border-gold/20 px-6 py-4 mt-3 flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => {
                  setIsMenuOpen(false);
                  soundFx.playPop();
                }}
                className="text-sm uppercase tracking-widest text-white/90 hover:text-gold py-1"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>
    </>
  );
};
