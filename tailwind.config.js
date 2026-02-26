/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F0FDFA',
          100: '#CCFBF1',
          200: '#99F6E4',
          300: '#5EEAD4',
          400: '#2DD4BF',
          500: '#14B8A6',
          600: '#0D9488',
          700: '#0F766E',
          800: '#115E59',
          900: '#134E4A',
        },
        accent: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
          800: '#78350F',
          900: '#451A03',
        },
        neutral: {
          50: '#FAFAF9',
          100: '#F5F5F4',
          200: '#E7E5E4',
          300: '#D6D3D1',
          400: '#A8A29E',
          500: '#78716C',
          600: '#57534E',
          700: '#44403C',
          800: '#292524',
          900: '#1C1917',
        },
        success: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          500: '#059669',
          600: '#047857',
          700: '#065F46',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        heading: ['Fraunces', 'Georgia', 'serif'],
        body: ['DM Sans', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      borderRadius: {
        'theme': '10px',
        'theme-lg': '14px',
      },
      boxShadow: {
        'real-estate': '0 1px 3px 0 rgba(28, 25, 23, 0.08), 0 1px 2px -1px rgba(28, 25, 23, 0.06)',
        'real-estate-lg': '0 10px 15px -3px rgba(28, 25, 23, 0.06), 0 4px 6px -4px rgba(28, 25, 23, 0.04)',
        'premium': '0 20px 25px -5px rgba(28, 25, 23, 0.06), 0 10px 10px -5px rgba(28, 25, 23, 0.04)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0F766E 0%, #0D9488 100%)',
        'gradient-primary-light': 'linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)',
        'gradient-accent': 'linear-gradient(135deg, #D97706 0%, #B45309 100%)',
      },
    },
  },
  plugins: [],
}
