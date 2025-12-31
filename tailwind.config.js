/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#1F4E5F',
          700: '#163E4D',
        },
        accent: {
          500: '#5FA8A1',
        },
        neutral: {
          100: '#FAFAFA',
          200: '#F2F6F8',
          600: '#5B6B73',
          900: '#1E2930',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      fontSize: {
        'h1': ['clamp(28px, 5vw, 40px)', { lineHeight: '130%', fontWeight: '600' }],
        'h2': ['clamp(22px, 4vw, 28px)', { lineHeight: '130%', fontWeight: '600' }],
        'h3': ['clamp(18px, 3vw, 22px)', { lineHeight: '130%', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '150%' }],
        'body': ['16px', { lineHeight: '150%' }],
        'body-sm': ['14px', { lineHeight: '150%' }],
      },
      spacing: {
        '4': '4px',
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '48': '48px',
        '64': '64px',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '2rem',
        },
      },
    },
  },
  plugins: [],
}
