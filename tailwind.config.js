/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        lagoon: {
          50: '#ecfeff',
          100: '#cffafe',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
        sunset: {
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
        },
      },
      boxShadow: {
        glow: '0 20px 80px rgba(14, 165, 233, 0.24)',
        soft: '0 20px 60px rgba(15, 23, 42, 0.10)',
      },
      backgroundImage: {
        'hero-mesh': 'radial-gradient(circle at 20% 20%, rgba(6, 182, 212, .28), transparent 28%), radial-gradient(circle at 80% 0%, rgba(244, 63, 94, .22), transparent 30%), radial-gradient(circle at 50% 90%, rgba(99, 102, 241, .2), transparent 35%)',
      },
    },
  },
  plugins: [],
};
