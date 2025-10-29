/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ← important for dark mode toggling via class
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}', // if you have pages directory
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#3b82f6',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
        },
      },
    },
  },
  plugins: [],
};
