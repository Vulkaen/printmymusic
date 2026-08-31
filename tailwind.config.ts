import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--color-canvas)',
        ink: 'var(--color-ink)',
        border: 'var(--color-border)',
        muted: 'var(--color-muted)',
        surface: 'var(--color-surface)',
        primary: 'var(--color-primary)',
        'primary-foreground': 'var(--color-primary-foreground)'
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-playfair)', 'serif'],
        grotesk: ['var(--font-grotesk)', 'sans-serif'],
        dm: ['var(--font-dmsans)', 'sans-serif']
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(17,17,16,0.04), 0 1px 1px rgba(17,17,16,0.03)',
        panel: '0 4px 24px rgba(17,17,16,0.06)',
        stage: '0 24px 60px -12px rgba(17,17,16,0.22), 0 8px 20px -8px rgba(17,17,16,0.12)'
      },
      borderRadius: {
        xl2: '1.25rem'
      },
      keyframes: {
        fadeIn: { from: { opacity: '0', transform: 'translateY(4px)' }, to: { opacity: '1', transform: 'translateY(0)' } }
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out'
      }
    }
  },
  plugins: []
};

export default config;
