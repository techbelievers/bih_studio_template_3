/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Real Estate Theme Colors
        primary: {
          50: '#E8F2FC',
          100: '#D1E5F9',
          200: '#A3CBF3',
          300: '#75B1ED',
          400: '#5B9BD5', // Base sky blue
          500: '#4A90E2', // Primary sky blue
          600: '#3A7BC8',
          700: '#2E7CD6', // Deep sky blue
          800: '#1F5AA0',
          900: '#0F3D70',
        },
        accent: {
          50: '#FAF6E8',
          100: '#F5EDD1',
          200: '#EBDBA3',
          300: '#E1C975',
          400: '#D4AF37', // Warm gold
          500: '#C19D2F',
          600: '#AE8B27',
          700: '#9B791F',
          800: '#886717',
          900: '#75550F',
        },
        neutral: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          200: '#DEE2E6',
          300: '#CED4DA',
          400: '#ADB5BD',
          500: '#6C757D',
          600: '#495057',
          700: '#343A40',
          800: '#2C3E50', // Charcoal gray
          900: '#1A2332', // Navy
        },
        success: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          500: '#28A745', // Fresh green
          600: '#218838',
          700: '#1E7E34',
        },
      },
      fontFamily: {
        // Serif for headings - elegant and luxurious
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        // Sans-serif for body - clean and modern
        sans: ['Inter', 'Open Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        heading: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
        body: ['Inter', 'Open Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'real-estate': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'real-estate-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'premium': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      backgroundImage: {
        'gradient-sky': 'linear-gradient(135deg, #4A90E2 0%, #2E7CD6 100%)',
        'gradient-sky-light': 'linear-gradient(135deg, #5B9BD5 0%, #4A90E2 100%)',
      },
    },
  },
  plugins: [],
}
