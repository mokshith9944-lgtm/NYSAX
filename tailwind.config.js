/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: '#000000',
        white: '#ffffff',
        // Obsidian / Deep Black Surfaces
        obsidian: {
          950: '#000000',
          900: '#050505',
          850: '#0a0a0a',
          800: '#111111',
          700: '#17171a',
          600: '#222227',
        },
        // Silver Metallic Grey Scale
        silver: {
          100: '#f5f6f8',
          200: '#e2e4e9',
          300: '#c5c8d0',
          400: '#9da1aa',
          500: '#686d76',
          600: '#4b5058',
          700: '#2e3138',
          800: '#1f2126',
        },
        // Luxury Tactical Olive Green Scale (Exclusive signature accent)
        olive: {
          50: '#f6f8f1',
          100: '#ebf1df',
          200: '#d7e3be',
          300: '#bccf97',
          400: '#a3b86c',
          500: '#809446',
          600: '#708238',
          700: '#52602b',
          800: '#3d4928',
          900: '#28321b',
          950: '#141a0d',
          DEFAULT: '#708238',
          light: '#9bb355',
          dark: '#3d4928',
          subtle: '#141a0d',
        },
        // Nexus compatibility tokens mapped strictly to palette
        ink: {
          950: '#000000',
          900: '#050505',
          800: '#0a0a0a',
          700: '#121215',
          600: '#1b1c20',
        },
        signal: {
          DEFAULT: '#708238', // Replaced neon lime with luxury Olive Green
          dim: '#52602b',
        },
        ember: {
          DEFAULT: '#c5c8d0', // Replaced warm orange with Silver Metallic
          dim: '#8e929d',
        },
        mist: {
          900: '#8e929d',
          700: '#c5c8d0',
          500: '#e2e4e9',
          100: '#f5f6f8',
        },
      },
      fontFamily: {
        display: ['"Clash Display"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['"Cabinet Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'Space Mono', 'ui-monospace', 'monospace'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        '10xl': ['10rem', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        '9xl': ['8rem', { lineHeight: '0.9', letterSpacing: '-0.04em' }],
        '8xl': ['6rem', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee 25s linear infinite reverse',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
