/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#101828',
        muted: '#667085',
        cambodia: {
          red: '#D71920',
          blue: '#032EA1',
          gold: '#F4B400',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 20px 70px rgba(16, 24, 40, 0.10)',
        glow: '0 18px 45px rgba(215, 25, 32, 0.25)',
      },
      backgroundImage: {
        'khmer-grid':
          'linear-gradient(rgba(3,46,161,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(215,25,32,0.07) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};
