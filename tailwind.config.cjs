/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF8301",
          dark: "#e06800",
          light: "#ff9933",
        },
        secondary: {
          DEFAULT: "#10192b",
          dark: "#0c1321",
          light: "#1a2540",
        },
        accent: "#57DCDA",
        lime: "#2dee59",
        purple: "#9d4edd",
        orange: "#ffaa00",
      },
      fontFamily: {
        sans: ["Vazirmatn", "sans-serif"],
        display: ["Vazirmatn", "sans-serif"],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
} 