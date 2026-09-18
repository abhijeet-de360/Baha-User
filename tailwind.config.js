/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFDF8',
        card: '#FFFFFF',
        text: {
          main: '#292936',
          muted: '#686777',
          light: '#9B99A9',
        },
        brand: {
          purple: '#6C63A8',
          'purple-light': '#F0EEF8',
          'purple-dark': '#554E87',
          blue: '#A8D8E8',
          'blue-light': '#EDF7FA',
          yellow: '#FFD66B',
          'yellow-light': '#FFF8E7',
          'yellow-dark': '#E5BD52',
          mint: '#A9D8B8',
          'mint-light': '#EEF8F1',
          coral: '#F28C82',
          'coral-light': '#FDEEEB',
          'coral-dark': '#D96F65',
        }
      },
      fontFamily: {
        heading: ['"Baloo 2"', 'cursive', 'sans-serif'],
        body: ['"Outfit"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '20px',
        '3xl': '28px',
        '4xl': '36px',
      },
      boxShadow: {
        'soft': '0 8px 30px -4px rgba(108, 99, 168, 0.08)',
        'soft-hover': '0 16px 36px -6px rgba(108, 99, 168, 0.16)',
        'card': '0 4px 20px -2px rgba(41, 41, 54, 0.05)',
        'glow-yellow': '0 0 25px rgba(255, 214, 107, 0.45)',
        'glow-purple': '0 0 25px rgba(108, 99, 168, 0.35)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.8 },
        }
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'float-delayed': 'float 4s ease-in-out 2s infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
