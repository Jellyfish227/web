/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  theme: {
    extend: {
      keyframes: {
        "thread-appear": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(-10px) scale(0.98)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0) scale(1)" 
          },
        },
        "thread-highlight": {
          "0%": { opacity: "0.6" },
          "100%": { opacity: "0" },
        }
      },
      animation: {
        "thread-appear": "thread-appear 0.5s ease-out forwards",
        "thread-highlight": "thread-highlight 1s ease-out forwards"
      },
    },
  },
  plugins: [],
} 