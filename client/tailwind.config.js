/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07090E',
          900: '#0C101A',
          850: '#111625',
          800: '#182035',
          700: '#232E4A',
          600: '#334155',
        },
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        navy: {
          800: '#0f172a',
          850: '#0d1526',
          900: '#0b1120',
          950: '#060a12',
        },
        risk: {
          low: '#10b981',
          medium: '#f59e0b',
          high: '#ef4444',
          critical: '#dc2626',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glow-brand': '0 0 35px -5px rgba(99, 102, 241, 0.35)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.3)',
        'glow-purple': '0 0 30px -5px rgba(168, 85, 247, 0.3)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
