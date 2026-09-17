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
          DEFAULT: '#3758F9',
          hover: '#2945D8',
          light: '#EAEFFF',
          dark: '#1B31A8'
        },
        accent: {
          cyan: '#06B6D4',
          purple: '#8B5CF6',
          amber: '#F59E0B',
          emerald: '#10B981'
        },
        surface: {
          50: '#151F36',
          100: '#0F172A',
          200: '#0B1120',
          300: '#070C18',
        },
        brand: {
          blue: '#3758F9',
          purple: '#8B5CF6',
          violet: '#7C3AED',
          cyan: '#06B6D4',
          accent: '#EC4899',
          glow: '#3758F9'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
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
