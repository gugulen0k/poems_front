/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    screens: {
      tablet: '640px', // => @media (min-width: 640px) { ... }

      laptop: '1024px', // => @media (min-width: 1024px) { ... }

      desktop: '1280px', // => @media (min-width: 1280px) { ... }
    },
    extend: {
      keyframes: {
        'rotate-flip': {
          '0%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(180deg)' },
        },
      },
      animation: {
        'rotate-flip': 'rotate-flip 1s ease-in-out',
      },
    },
  },
  plugins: [require('tailwindcss-primeui')],
}
