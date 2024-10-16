/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
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
