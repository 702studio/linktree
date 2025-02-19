/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#2d2d2d',
        accent: '#ffd600',
      },
      keyframes: {
        slideDown: {
          'from': { maxHeight: '0', opacity: '0' },
          'to': { maxHeight: '500px', opacity: '1' }
        }
      },
      animation: {
        'slideDown': 'slideDown 0.3s ease-out'
      }
    },
  },
  plugins: [],
} 