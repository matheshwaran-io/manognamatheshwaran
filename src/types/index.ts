export interface PhotoItem {
  id: string;
  src: string;
  caption: string;
  alt: string;
  category: 'all' | 'favorites' | 'smiles' | 'dates';
  rotation: string;
  loves: number;
}

export interface VideoItem {
  id: string;
  src: string;
  title: string;
  caption: string;
}

export interface StoryMilestone {
  id: string;
  date: string;
  title: string;
  description: string;
  tag: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export type ThemeMode = 'midnight' | 'rose-gold' | 'obsidian';
