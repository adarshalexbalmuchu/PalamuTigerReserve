/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#000000',
          900: '#0a0a0a',
          800: '#171717',
          700: '#262626',
          600: '#404040',
          500: '#525252',
          400: '#737373',
          300: '#a3a3a3',
          200: '#d4d4d4',
          100: '#e5e5e5',
          50:  '#f5f5f5',
        },
        palash: {
          DEFAULT: '#c0392b',
          dark:    '#922b21',
          light:   '#e74c3c',
          50:      '#fef2f1',
        },
        earth: {
          900: '#171717',
          800: '#262626',
          700: '#404040',
          600: '#525252',
          500: '#737373',
          400: '#a3a3a3',
          300: '#d4d4d4',
          200: '#e5e5e5',
          100: '#f0f0f0',
          50:  '#fafafa',
        },
        cream:  '#ffffff',
        sand:   '#f0f0f0',
        gold: {
          DEFAULT: '#171717',
          dark:    '#000000',
          light:   '#404040',
        },
      },
      fontFamily: {
        serif: ['Poppins', 'system-ui', 'sans-serif'],
        sans:  ['Poppins', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'nature': '0 4px 24px rgba(0, 0, 0, 0.08)',
        'nature-lg': '0 8px 40px rgba(0, 0, 0, 0.14)',
        'gold': '0 4px 24px rgba(0, 0, 0, 0.12)',
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
