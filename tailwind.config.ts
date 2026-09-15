import type { Config } from "tailwindcss";
import typography from '@tailwindcss/typography';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Sola Bible Church brand colors - Navy Blue & Gold
        primary: {
          50: '#eef1f8',
          100: '#d5dcee',
          200: '#adb9de',
          300: '#7e91ca',
          400: '#546db5',
          500: '#324d9a',
          600: '#1e3580',
          700: '#162242',
          800: '#101933',
          900: '#0b1126',
        },
        secondary: {
          50: '#faf7ed',
          100: '#f5efd8',
          200: '#ebdcad',
          300: '#dec27a',
          400: '#d3aa4d',
          500: '#C9A535',
          600: '#a88428',
          700: '#85691f',
          800: '#634f17',
          900: '#4a3b11',
        },
        accent: {
          50: '#faf7ed',
          100: '#f5efd8',
          200: '#ebdcad',
          300: '#dec27a',
          400: '#d3aa4d',
          500: '#C9A535',
          600: '#a88428',
          700: '#85691f',
          800: '#634f17',
          900: '#4a3b11',
        },
        neutral: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          300: '#d6d3d1',
          400: '#a8a29e',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-merriweather)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [typography],
};
export default config;
