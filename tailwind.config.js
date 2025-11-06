/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-bg': '#FFF9F0',
        'warm-light': '#FFFBF5',
        'cat-orange': '#FF9F66',
        'tomato-red': '#FF6B6B',
        'tomato-light': '#FFB3B3',
        'success-green': '#51CF66',
        'success-light': '#A3E8B3',
        'rest-blue': '#74C0FC',
        'rest-light': '#B3D9FF',
        'happy-yellow': '#FFD93D',
        'happy-pink': '#FF9ECD',
        'celebrate-purple': '#BC78FF',
      },
      fontFamily: {
        'sans': ['Noto Sans SC', 'system-ui', 'sans-serif'],
        'mono': ['SF Mono', 'Roboto Mono', 'monospace'],
      },
      boxShadow: {
        'happy': '0 4px 20px rgba(255, 159, 102, 0.25)',
        'glow': '0 0 20px rgba(255, 217, 61, 0.4)',
      },
    },
  },
  plugins: [],
}
