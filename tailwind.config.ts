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
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-manrope)', 'Manrope', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(2.5rem, 8vw, 5rem)', { lineHeight: '1.05' }],
        'section': ['clamp(1.75rem, 4vw, 3rem)', { lineHeight: '1.15' }],
        'body-desktop': ['1.125rem', { lineHeight: '1.6' }],
        'body-mobile': ['1.0625rem', { lineHeight: '1.6' }],
        'label': ['0.75rem', { letterSpacing: '0.12em', lineHeight: '1.5' }],
      },
    },
  },
  plugins: [],
};

export default config;
