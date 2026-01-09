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
        // Warm, welcoming church color palette
        primary: {
          50: '#fef7ee',
          100: '#fdebd3',
          200: '#fad4a5',
          300: '#f7b66d',
          400: '#f38d32',
          500: '#f0700f',
          600: '#e15405',
          700: '#ba3d07',
          800: '#94300d',
          900: '#78290e',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fef3f2',
          100: '#fee4e2',
          200: '#fecdca',
          300: '#fdaaa4',
          400: '#fa7970',
          500: '#f04438',
          600: '#de3024',
          700: '#bb241a',
          800: '#9a221a',
          900: '#80231c',
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
