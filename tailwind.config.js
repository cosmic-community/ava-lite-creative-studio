/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ffffff', // Changed: White background
          foreground: '#000000', // Changed: Black text
        },
        secondary: {
          DEFAULT: '#f9fafb', // Changed: Very light gray for alternating sections
          foreground: '#000000', // Changed: Black text
        },
        accent: {
          DEFAULT: '#ff6b35', // Changed: Vibrant orange accent
          foreground: '#ffffff', // Changed: White text on orange
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
}