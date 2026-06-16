/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#0b1205',
          900: '#19270d',
          800: '#2c3f11',
          700: '#3e5618',
          600: '#5a7820',
          500: '#78a02a',
          400: '#97c23b',
          300: '#b4d466',
          200: '#d0e49e',
          100: '#e8f2cc',
          50:  '#f4f9e8',
        },
        palash: {
          DEFAULT: '#c0392b',
          dark:    '#922b21',
          light:   '#e74c3c',
          50:      '#fef2f1',
        },
        earth: {
          900: '#3d2810',
          800: '#5c3d1e',
          700: '#7c5030',
          600: '#a06840',
          500: '#bf7d3a',
          400: '#cc975a',
          300: '#ddb98a',
          200: '#ebd5b5',
          100: '#f5ead8',
          50:  '#fbf6f0',
        },
        cream:  '#fafaf8',
        sand:   '#e8ddd0',
        gold: {
          DEFAULT: '#d4a853',
          dark:    '#b8912f',
          light:   '#e8c47a',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'nature': '0 4px 24px rgba(13, 42, 28, 0.12)',
        'nature-lg': '0 8px 40px rgba(13, 42, 28, 0.18)',
        'gold': '0 4px 24px rgba(212, 168, 83, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'count-up': 'countUp 1s ease-out forwards',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
