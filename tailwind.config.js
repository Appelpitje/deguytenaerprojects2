/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      colors: {
        // Warm, luxe kleurenpalet
        bone: {
          50: '#fdfbf7',
          100: '#faf7f2',
          200: '#f3ede3',
          300: '#e8dfce'
        },
        stonewarm: {
          50: '#f7f5f1',
          100: '#ebe7df',
          200: '#d6cfc1',
          300: '#b9af9c',
          400: '#9c917d',
          500: '#7e7460',
          600: '#5d5446'
        },
        ink: {
          50: '#f5f5f4',
          100: '#e7e5e4',
          200: '#d6d3d1',
          300: '#a8a29e',
          400: '#78716c',
          500: '#57534e',
          600: '#44403c',
          700: '#292524',
          800: '#1c1917',
          900: '#0c0a09'
        },
        accent: {
          50: '#fbf6ef',
          100: '#f3e6d2',
          200: '#e3c79a',
          300: '#cda468',
          400: '#b08968',
          500: '#9a7350',
          600: '#7c5a3d',
          700: '#5e4329'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif']
      },
      letterSpacing: {
        tightest: '-0.04em'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(28, 25, 23, 0.06)',
        glow: '0 20px 60px -20px rgba(28, 25, 23, 0.25)'
      },
      backdropBlur: {
        xs: '2px'
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'slow-zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' }
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'fade-up': 'fade-up 0.8s ease-out forwards',
        'slow-zoom': 'slow-zoom 12s ease-out infinite alternate',
        marquee: 'marquee 40s linear infinite'
      }
    }
  },
  plugins: []
}
