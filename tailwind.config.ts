import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#E8D8B5',
          light: '#EFE2C4',
          dark: '#D9C49B',
          deeper: '#C9B384',
        },
        flax: {
          DEFAULT: '#E3CF7D',
          light: '#E9D99F',
          dark: '#C7B563',
        },
        'deep-cerulean': {
          DEFAULT: '#0A699D',
          light: '#1B7FBF',
          dark: '#08567D',
        },
        'astronaut-blue': {
          DEFAULT: '#044465',
          light: '#06688D',
          dark: '#03334A',
        },
        ink: '#1A1B1E',
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
        script: ['var(--font-marck)', '"Marck Script"', '"Caveat"', 'cursive'],
      },
      fontSize: {
        wordmark: ['clamp(4rem, 14vw, 11rem)', { lineHeight: '0.9' }],
        hero: ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '1.05' }],
        section: ['clamp(2rem, 5vw, 3.5rem)', { lineHeight: '1.1' }],
        eyebrow: ['0.7rem', { letterSpacing: '0.32em', lineHeight: '1.5' }],
        'body-desktop': ['1.125rem', { lineHeight: '1.65' }],
        'body-mobile': ['1.0625rem', { lineHeight: '1.65' }],
        label: ['0.75rem', { letterSpacing: '0.18em', lineHeight: '1.5' }],
      },
      letterSpacing: {
        wider: '.08em',
        widest: '.32em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
