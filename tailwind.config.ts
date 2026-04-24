import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1B2B3A',
          light: '#243447',
          lighter: '#2D3E50',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#D4B96A',
          dark: '#A8893A',
        },
        cream: '#F5F0E8',
      },
      fontFamily: {
        morabba: ['var(--font-morabba)', 'sans-serif'],
        vazirmatn: ['var(--font-vazirmatn)', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
