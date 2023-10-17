/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/constants/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        ['inter']: ['Inter'],
      },
      boxShadow: {
        'token-inset': `inset 0px 1px 2px rgba(255, 255, 255, .2)`,
        'glass-card': '0px 8px 40px rgba(0, 0, 0, 0.2)',
        'light-border': '0px 0px 0px 1px rgba(255, 255, 255, 0.08)',
        'light-border-inset': 'inset 0px 0px 0px 1px rgba(255, 255, 255, 0.08)',
        'inset-green': 'inset 0px 0px 0px 1px #9FFFBA',
        'dark-border': '0px 0px 0px 1px rgba(255, 255, 255, 0.15)',
        'bright-border': '0px 0px 0px 1px rgba(255, 255, 255, 1)',
        'success-border': '0px 0px 0px 1px rgba(187, 247, 208, 1)',
        'inset-white': 'inset 0px 0px 0px 1px #fff',
        'inset-blue': 'inset 0px 0px 0px 1px #5379FF',
        'inset-purple': 'inset 0px 0px 0px 1px #7E43FA',
      },
      colors: {
        card: 'var(--card)',
        foreground: 'var(--foreground)',
        backdrop: 'var(--background)',
        'primary-text': 'rgb(var(--primary-text) / <alpha-value>)',
        'secondary-text': 'rgb(var(--primary-text) / .72)',
        'tertiary-text': 'rgb(var(--primary-text) / .30)',
        'primary-stroke': 'rgb(var(--primary-stroke) / <alpha-value>)',
        'secondary-highlight': 'rgb(var(--secondary-highlight) / <alpha-value>)',
        'brand-primary': process.env.THEME_BRAND_PRIMARY || "#1f1f1f",
        'badge-primary': 'hsl(var(--badge-primary))',
        app: {
          bg: '#05010B',
          orange: '#EDA059',
          red: '#ED5959',
          purple: '#7B6CC3',
        },
        pill: {
          'light-bg': 'rgba(0, 0, 0, .05)',
          'dark-bg': 'rgba(15, 5, 20, 0.15)',
          light: '#918DB5',
          dark: 'rgba(255, 255, 255, 0.5)',
        },
        white: '#FFFFFF',
        base: {
          100: '#0A0D0C',
          200: '#1F2022',
          300: '#3A413F',
          400: '#4D5654',
          500: '#606C69',
          600: '#889692',
          700: '#B3BCBA',
          800: '#C9CFCE',
          900: '#F4F5F5',
        },
        primary: '#8DFBC9',
        secondary: {
          100: '#A061FF',
          200: '#8E94A4', // gray text for dropdown/new designs
          500: '#6C31C6',
          900: '#4F268E',
        },
        
        error: {
          DEFAULT: '#f53f3f',
          100: '#f53f3f',
          900: '#9A4134',
        },
        success: '#27AD44',
        background: {
          card: '#272E2B',
        },
        toast: {
          background: 'rgba(255, 255, 255, 0.06)',
          border: 'rgba(255, 255, 255, 0.12)',
        },
        progress: {
          DEFAULT: 'hsl(var(--progress))',
          muted: 'hsl(var(--progress-muted))',
          warning: 'hsl(var(--progress-warning))',
          danger: 'hsl(var(--progress-danger))',
        },
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ],
};
