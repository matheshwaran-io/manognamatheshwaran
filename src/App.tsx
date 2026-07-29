import React, { useState, useEffect } from 'react';
import { ThemeMode } from './types';
import { AmbientCanvas } from './components/AmbientCanvas';
import { HeaderNav } from './components/HeaderNav';
import { HeroSection } from './components/HeroSection';
import { MemoryTicker } from './components/MemoryTicker';
import { PolaroidGallery } from './components/PolaroidGallery';
import { StoryTimeline } from './components/StoryTimeline';
import { VideoShowcase } from './components/VideoShowcase';
import { InteractiveLetter } from './components/InteractiveLetter';
import { CouplesQuiz } from './components/CouplesQuiz';
import { Footer } from './components/Footer';
import { ambientEngine } from './utils/ambientAudio';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<ThemeMode>('midnight');
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [audioData, setAudioData] = useState<number[]>([20, 40, 15, 60, 30, 25]);
  const [loveCount, setLoveCount] = useState(0);

  // Poll audio visualizer frequencies when playing
  useEffect(() => {
    let interval: any;
    if (isAudioPlaying) {
      interval = setInterval(() => {
        setAudioData(ambientEngine.getVisualizerData());
      }, 100);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAudioPlaying]);

  const handleToggleAudio = () => {
    const playing = ambientEngine.toggle();
    setIsAudioPlaying(playing);
  };

  const handleIncrementLove = (e: React.MouseEvent) => {
    setLoveCount((prev) => prev + 1);
  };

  const themeClass = theme === 'rose-gold' ? 'theme-rose-gold' : theme === 'obsidian' ? 'theme-obsidian' : '';

  return (
    <div className={`min-h-screen ${themeClass} bg-wine-deep text-rose-blush font-body transition-colors duration-500`}>
      {/* Interactive Floating Particle Canvas */}
      <AmbientCanvas />

      {/* Glass Navigation Bar */}
      <HeaderNav
        currentTheme={theme}
        onThemeChange={setTheme}
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={handleToggleAudio}
        audioVisualizerData={audioData}
      />

      {/* Main Sections */}
      <main className="relative z-20">
        <HeroSection loveCount={loveCount} onIncrementLove={handleIncrementLove} />
        <MemoryTicker />
        <PolaroidGallery />
        <StoryTimeline />
        <VideoShowcase />
        <InteractiveLetter onIncrementLove={handleIncrementLove} />
        <CouplesQuiz />
      </main>

      {/* Luxury Footer */}
      <Footer onIncrementLove={handleIncrementLove} />
    </div>
  );
};

export default App;
