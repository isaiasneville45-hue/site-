import type { Config } from 'tailwindcss'

/**
 * Tokens de design da APAG.
 * Os valores ficam em variáveis CSS (src/index.css) e são expostos aqui
 * como classes do Tailwind: bg-apag-red, text-apag-red-65, bg-crimson-noir…
 * Carregado pelo Tailwind v4 via `@config` no src/index.css.
 */
export default {
  theme: {
    extend: {
      colors: {
        apag: {
          red: 'var(--apag-red)', // #DF2531
          'red-65': 'var(--apag-red-65)', // #DF2531 a 65%
          'red-45': 'var(--apag-red-45)', // #DF2531 a 45%
          crimson: 'var(--apag-crimson)', // #C50337
          noir: 'var(--apag-noir)', // #02060E
          black: 'var(--apag-black)', // #000000
          white: 'var(--apag-white)', // #FFFFFF
          // Tom mais claro do vermelho, só para textos pequenos sobre fundo escuro
          // (#DF2531 sobre #02060E tem contraste 4,3:1, abaixo do AA para texto pequeno).
          ember: 'var(--apag-ember)', // #FF5A65
        },
        // Tokens semânticos do shadcn/ui
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: { DEFAULT: 'var(--card)', foreground: 'var(--card-foreground)' },
        popover: { DEFAULT: 'var(--popover)', foreground: 'var(--popover-foreground)' },
        primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' },
        secondary: { DEFAULT: 'var(--secondary)', foreground: 'var(--secondary-foreground)' },
        muted: { DEFAULT: 'var(--muted)', foreground: 'var(--muted-foreground)' },
        accent: { DEFAULT: 'var(--accent)', foreground: 'var(--accent-foreground)' },
        destructive: { DEFAULT: 'var(--destructive)', foreground: 'var(--destructive-foreground)' },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      fontFamily: {
        // Pilhas definidas em src/index.css (Mokoto → Michroma; Open Sans)
        display: 'var(--font-stack-display)',
        sans: 'var(--font-stack-sans)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      backgroundImage: {
        'crimson-noir': 'var(--gradient-crimson-noir)',
        'noir-crimson': 'var(--gradient-noir-crimson)',
        'red-sheen': 'linear-gradient(180deg, #ED3F4A 0%, var(--apag-red) 45%, #C81E2A 100%)',
      },
      boxShadow: {
        // Botão pílula neumórfico: brilho interno no topo, sombra interna na base e glow vermelho
        neu: [
          'inset 0 1px 0 0 rgb(255 255 255 / 0.35)',
          'inset 0 -3px 6px 0 rgb(0 0 0 / 0.22)',
          'inset 0 0 0 1px rgb(255 255 255 / 0.08)',
          '0 1px 2px 0 rgb(0 0 0 / 0.5)',
          '0 10px 28px -8px rgb(223 37 49 / 0.65)',
        ].join(', '),
        'neu-hover': [
          'inset 0 1px 0 0 rgb(255 255 255 / 0.45)',
          'inset 0 -3px 6px 0 rgb(0 0 0 / 0.18)',
          'inset 0 0 0 1px rgb(255 255 255 / 0.12)',
          '0 2px 4px 0 rgb(0 0 0 / 0.5)',
          '0 16px 40px -8px rgb(223 37 49 / 0.8)',
        ].join(', '),
        'neu-dark': [
          'inset 0 1px 0 0 rgb(255 255 255 / 0.12)',
          'inset 0 -2px 5px 0 rgb(0 0 0 / 0.45)',
          '0 1px 2px 0 rgb(0 0 0 / 0.6)',
          '0 10px 24px -12px rgb(0 0 0 / 0.9)',
        ].join(', '),
        glow: '0 0 40px -6px var(--apag-red-45)',
        'glow-lg': '0 0 90px -12px var(--apag-red-45)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'rise-in': {
          from: { opacity: '0', transform: 'translateY(60px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '80%, 100%': { transform: 'scale(1.75)', opacity: '0' },
        },
        'dot-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'rise-in': 'rise-in 1s cubic-bezier(0.22, 1, 0.36, 1) both',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee var(--marquee-duration, 40s) linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.2, 0.6, 0.4, 1) infinite',
        'dot-pulse': 'dot-pulse 2s ease-in-out infinite',
      },
    },
  },
} satisfies Config
