/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#070C18',
        'dark-bg': '#090E20',
        'dark-card': '#0D1527',
        'dark-border': 'rgba(255, 255, 255, 0.08)',
        primary: {
          DEFAULT: '#000000',
          hover: '#1F1F1F',
          blue: '#3758F9',
        },
        nex: {
          black: '#070707',
          card: '#0D0D0D',
          border: '#1F1F1F',
          muted: '#6B7280',
          light: '#FBFBFB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        serif: ['Newsreader', 'Instrument Serif', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['Anonymous Pro', 'Space Mono', 'ui-monospace', 'monospace'],
      },
      spacing: {
        '25': '6.25rem',
        '30': '7.5rem',
        '4.5': '1.125rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 35s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4', filter: 'blur(20px)' },
          '100%': { opacity: '0.8', filter: 'blur(32px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
