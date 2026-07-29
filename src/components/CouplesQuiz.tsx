import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, Award, CheckCircle2, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../types';
import { soundFx } from '../utils/audioSynth';

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'What makes talking to you feel like home?',
    options: [
      'Your warm smile and peaceful heart ❤️',
      'Endless funny jokes',
      'Long silent pauses',
      'Unsolved riddles',
    ],
    correctIndex: 0,
    explanation: 'Whenever life gets hard, talking to you makes everything feel peaceful and lighter.',
  },
  {
    id: 2,
    question: 'Which photo outfit looked simply gorgeous on you in Chapter One?',
    options: [
      'Charcoal Grey Suit',
      'Sky Blue Outfit 💙',
      'Neon Green Hoodie',
      'Midnight Velvet Gown',
    ],
    correctIndex: 1,
    explanation: 'Simply gorgeous in blue — one of Matheshwaran’s absolute favorite photos of you!',
  },
  {
    id: 3,
    question: 'What is Matheshwaran’s favorite view in the whole world?',
    options: [
      'Looking at your beautiful face across a cozy cafe table ❤️',
      'The Eiffel Tower',
      'A football stadium',
      'The ocean horizon',
    ],
    correctIndex: 0,
    explanation: 'No landmark or ocean view compares to looking into your eyes.',
  },
  {
    id: 4,
    question: 'What promise is written in your birthday letter?',
    options: [
      'Never let go of your hand no matter what life brings ❤️',
      'To build a rocket ship',
      'To buy a island',
      'To win a marathon',
    ],
    correctIndex: 0,
    explanation: '“If life ever becomes difficult, please don’t let go of my hand. I promise I’ll never let go of yours.”',
  },
  {
    id: 5,
    question: 'How long will Matheshwaran love you?',
    options: [
      'Forever and beyond infinity ❤️',
      'Until next summer',
      'Just for 100 days',
      'Only on special occasions',
    ],
    correctIndex: 0,
    explanation: 'Choosing you every single day for the rest of my life!',
  },
];

export const CouplesQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    soundFx.playPop();
    setSelectedOption(idx);
    setIsAnswered(true);

    if (idx === quizQuestions[currentStep].correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    soundFx.playPop();
    if (currentStep + 1 < quizQuestions.length) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
      soundFx.playChime();
      confetti({
        particleCount: 70,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#E28A95', '#FAF3F0'],
      });
    }
  };

  const handleRestart = () => {
    soundFx.playPop();
    setCurrentStep(0);
    setSelectedOption(null);
    setScore(0);
    setIsAnswered(false);
    setIsCompleted(false);
  };

  return (
    <section id="quiz" className="py-24 px-4 relative max-w-3xl mx-auto">
      {/* Section Head */}
      <div className="text-center max-w-xl mx-auto mb-12">
        <p className="text-xs uppercase tracking-widest text-gold font-medium mb-2">
          Sweet Memory Trivia
        </p>
        <h2 className="font-display text-4xl md:text-5xl text-white font-light mb-4">
          How Well Do You Know Us?
        </h2>
        <p className="text-sm text-rose-blush/70 font-light">
          A fun 5-question birthday quiz created just for Manogna.
        </p>
      </div>

      {/* Quiz Card */}
      <div className="glass-panel p-8 rounded-3xl border border-gold/40 shadow-2xl relative overflow-hidden">
        {!isCompleted ? (
          <div>
            {/* Progress Header */}
            <div className="flex items-center justify-between text-xs text-rose-soft/80 mb-6">
              <span>Question {currentStep + 1} of {quizQuestions.length}</span>
              <span className="text-gold font-semibold">Score: {score}</span>
            </div>

            {/* Question Title */}
            <h3 className="font-display text-2xl md:text-3xl text-white font-medium mb-6">
              {quizQuestions[currentStep].question}
            </h3>

            {/* Options List */}
            <div className="space-y-3 mb-6">
              {quizQuestions[currentStep].options.map((option, idx) => {
                const isCorrect = idx === quizQuestions[currentStep].correctIndex;
                const isSelected = selectedOption === idx;

                let optionStyle = 'bg-white/5 border-white/15 text-white/90 hover:bg-white/10';
                if (isAnswered) {
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-rose-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-gold/10 border border-gold/30 text-xs text-gold-light mb-6"
              >
                <span className="font-semibold block mb-1">❤️ Memory Note:</span>
                {quizQuestions[currentStep].explanation}
              </motion.div>
            )}

            {/* Next Button */}
            {isAnswered && (
              <button
                onClick={handleNextQuestion}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-gold via-gold-light to-gold text-wine-dark font-semibold text-sm uppercase tracking-wider shadow-glow-gold hover:scale-[1.02] transition-transform"
              >
                {currentStep + 1 === quizQuestions.length ? 'Finish Quiz ✨' : 'Next Question →'}
              </button>
            )}
          </div>
        ) : (
          /* Completion Screen */
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto mb-4 border border-gold shadow-glow-gold">
              <Award className="w-10 h-10" />
            </div>

            <h3 className="font-display text-3xl text-white font-bold mb-2">
              Quiz Completed! 🎉
            </h3>
            <p className="text-sm text-rose-blush/80 mb-6">
              You scored <strong className="text-gold text-lg">{score}</strong> out of {quizQuestions.length}! You know our love story inside out!
            </p>

            <button
              onClick={handleRestart}
              className="px-8 py-3 rounded-full bg-wine border border-gold text-gold font-semibold text-xs uppercase tracking-widest flex items-center gap-2 mx-auto hover:bg-wine-light transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
