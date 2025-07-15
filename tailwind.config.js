/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './index.html', './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        'pop': 'pop 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.8s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'pulse-border': 'pulseBorder 1.5s infinite ease-in-out',
        'fade-in': 'fadeIn 0.3s ease-out forwards', 
        'zoom-in': 'zoomIn 0.3s ease-out forwards',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
          '70%': { transform: 'scale(1.2) rotate(10deg)', opacity: '1' },
          '100%': { transform: 'scale(1) rotate(0deg)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseBorder: {
          '0%, 100%': { 'border-color': 'rgba(163, 230, 53, 1)', 'box-shadow': '0 0 0 0 rgba(163, 230, 53, 0.5)' },
          '50%': { 'border-color': 'rgba(163, 230, 53, 0.5)', 'box-shadow': '0 0 0 8px rgba(163, 230, 53, 0)' },
        },
        fadeIn: { 
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        zoomIn: { 
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}