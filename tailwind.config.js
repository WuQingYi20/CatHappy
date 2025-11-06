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
        'cat-orange': '#FF9F66',
        'tomato-red': '#FF6B6B',
        'success-green': '#51CF66',
        'rest-blue': '#74C0FC',
      },
      fontFamily: {
        'sans': ['Noto Sans SC', 'system-ui', 'sans-serif'],
        'mono': ['SF Mono', 'Roboto Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
