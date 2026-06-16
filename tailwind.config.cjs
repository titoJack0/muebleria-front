/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        accentHover: 'var(--color-accent-hover)',
        bgLight: 'var(--color-bg-light)',
        textColor: 'var(--color-text)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      borderRadius: {
        md: 'var(--radius-md)',
        sm: 'var(--radius-sm)',
      },
      transitionDuration: {
        md: 'var(--transition-md)',
      }
    },
  },
  plugins: [],
};
