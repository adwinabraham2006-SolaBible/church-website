import type { Config } from "tailwindcss";

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
          50: '#f0f5f9',
          100: '#dce7f1',
          200: '#bdd1e5',
          300: '#92b3d4',
          400: '#608dbf',
          500: '#416fa9',
          600: '#32568d',
          700: '#2a4572',
          800: '#263c5f',
          900: '#1a3a52', // Main navy blue from logo
        },
        secondary: {
          50: '#fefbf3',
          100: '#fdf6e3',
          200: '#fbecc4',
          300: '#f8dd9b',
          400: '#f5c968',
          500: '#f4c430', // Main gold from logo
          600: '#e6a916',
          700: '#c08710',
          800: '#9a6914',
          900: '#7d5714',
        },
        accent: {
          50: '#fefbf3',
          100: '#fdf6e3',
          200: '#fbecc4',
          300: '#f8dd9b',
          400: '#f5c968',
          500: '#f4c430', // Gold accent (matching secondary)
          600: '#e6a916',
          700: '#c08710',
          800: '#9a6914',
          900: '#7d5714',
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
  plugins: [],
};
export default config;
