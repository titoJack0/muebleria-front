/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#042c33',
        secondary: '#a47c5c',
        accent: '#d18d6c',
        accentHover: '#d28e74',
        bgLight: '#d2c0a9',
        textColor: '#244444',
      },
      borderRadius: {
        md: '12px',
      },
      transitionDuration: {
        md: '300ms',
      }
    },
  },
  plugins: [],
};
