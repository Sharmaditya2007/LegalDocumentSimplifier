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
          950: '#030508',
          900: '#070A10',
          850: '#0D121D',
          800: '#141C2E',
          700: '#1F293D',
          600: '#334155',
        },
        amberAccent: {
          300: '#FDE68A',
          400: '#F59E0B',
          500: '#EBB87E',
          600: '#E5A862',
          700: '#D97706',
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
        cosmic: {
          cyan: '#00D2FF',
          magenta: '#9B51E0',
          blue: '#4A00E0',
          gold: '#EBB87E',
          void: '#030508',
        },
        navy: {
          800: '#0f172a',
          850: '#0d1526',
          900: '#0b1120',
          950: '#030508',
        },
        risk: {
          low: '#10b981',
          medium: '#f59e0b',
          high: '#ef4444',
          critical: '#dc2626',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Inter', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.45)',
        'glow-brand': '0 0 35px -5px rgba(99, 102, 241, 0.35)',
        'glow-amber': '0 0 30px -4px rgba(235, 184, 126, 0.35)',
        'glow-cyan': '0 0 30px -4px rgba(0, 210, 255, 0.3)',
        'glow-emerald': '0 0 30px -5px rgba(16, 185, 129, 0.3)',
        'glow-purple': '0 0 30px -5px rgba(168, 85, 247, 0.3)',
        'hud-lens': '0 0 50px -10px rgba(0, 210, 255, 0.25), inset 0 0 30px rgba(0, 210, 255, 0.08)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
