/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        omori: ['"Courier New"', 'monospace'], // Fallback for Omori style
      },
      colors: {
        omoriDark: '#0a0a0a',
        omoriLight: '#f5f5f5',
        omoriRed: '#ff2a2a',
      },
      animation: {
        wobble: 'wobble 0.5s ease-in-out infinite',
      },
      keyframes: {
        wobble: {
          '0%, 100%': { transform: 'rotate(-1deg) scale(1.02)' },
          '50%': { transform: 'rotate(1deg) scale(0.98)' },
        }
      }
    },
  },
  plugins: [],
}
