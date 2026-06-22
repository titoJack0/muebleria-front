/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // TUS COLORES ANTIGUOS (Para que no se rompa el panel admin)
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        accentHover: 'var(--color-accent-hover)',
        bgLight: 'var(--color-bg-light)',
        textColor: 'var(--color-text)',
        wood: {
          DEFAULT: '#8B5A2B',
          dark: '#5C3A21',
        },
        earth: '#6B705C',
        gold: {
          DEFAULT: '#D4AF37',
          dark: '#AA8C2C',
        },
        offWhite: '#FDFBF7',

        // LOS NUEVOS COLORES PREMIUM (Para la nueva vista de Maderas Nativas)
        premium: {
          primary: '#042c33',
          secondary: '#a47c5c',
          accent: '#d18d6c',
          light: '#d2c0a9',
          text: '#244444',
          hover: '#d28e74',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft': '0 10px 40px -10px rgba(4, 44, 51, 0.08)',
        'premium': '0 20px 40px -15px rgba(4, 44, 51, 0.15)',
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