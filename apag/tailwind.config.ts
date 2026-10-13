import type { Config } from 'tailwindcss'

/**
 * Tokens de design da APAG.
 * Os valores ficam em variáveis CSS (src/index.css) e são expostos aqui
 * como classes do Tailwind: bg-apag-red, text-apag-ink, bg-apag-black…
 * Carregado pelo Tailwind v4 via `@config` no src/index.css.
 */
export default {
  theme: {
    extend: {
      colors: {
        apag: {
          red: 'var(--apag-red)', // #D71920, vermelho institucional
          'red-strong': 'var(--apag-red-strong)', // hover e textos vermelhos pequenos sobre claro
          'red-soft': 'var(--apag-red-soft)',
          ember: 'var(--apag-ember)', // vermelho para textos pequenos sobre o preto
          black: {
            DEFAULT: 'var(--apag-black)', // #111111
            950: 'var(--apag-black-950)',
            800: 'var(--apag-black-800)',
            700: 'var(--apag-black-700)',
          },
          ink: 'var(--apag-ink)',
          slate: 'var(--apag-slate)',
          muted: 'var(--apag-muted)',
          line: 'var(--apag-line)',
          'line-strong': 'var(--apag-line-strong)',
          paper: 'var(--apag-paper)',
          white: 'var(--apag-white)',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'muted-foreground': 'var(--muted-foreground)',
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        sans: 'var(--font-stack-sans)',
      },
      borderRadius: {
        sm: '2px', // selos
        md: '3px', // botões, campos
        lg: '3px', // cards
        xl: '6px', // painéis
        '2xl': '6px',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'line-in': {
          from: { transform: 'scaleX(0)' },
          to: { transform: 'scaleX(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 1.2s ease-out both',
        'line-in': 'line-in 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
} satisfies Config
