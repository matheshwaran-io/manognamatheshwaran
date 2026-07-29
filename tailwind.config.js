/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        wine: {
          light: '#7A1F2E',
          DEFAULT: '#5A1621',
          dark: '#3B0D15',
          deep: '#27070D',
        },
        rose: {
          blush: '#FAF3F0',
          soft: '#F9DCDD',
          DEFAULT: '#E28A95',
          deep: '#C96371',
        },
        gold: {
          glow: 'rgba(212, 175, 55, 0.4)',
          light: '#F4E4BC',
          DEFAULT: '#D4AF37',
          dark: '#AA820A',
        },
        obsidian: {
          DEFAULT: '#120A0E',
          card: 'rgba(28, 15, 22, 0.75)',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        script: ['Parisienne', 'cursive'],
        body: ['Jost', 'sans-serif'],
      },
      boxShadow: {
        'glow-gold': '0 0 25px rgba(212, 175, 55, 0.35)',
        'glow-rose': '0 0 25px rgba(226, 138, 149, 0.35)',
        'glass': '0 20px 50px rgba(0, 0, 0, 0.4)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        shimmer: 'shimmer 2.5s infinite linear',
      },
    },
  },
  plugins: [],
};
