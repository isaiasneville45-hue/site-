import type { ReactNode } from 'react'

import { Reveal } from '@/components/motion'
import { cn } from '@/lib/utils'

type EyebrowProps = { children: ReactNode; className?: string; tone?: 'dark' | 'light' }

/** Selo pequeno acima dos títulos (pílula com ponto vermelho). */
export function Eyebrow({ children, className, tone = 'dark' }: EyebrowProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em]',
        tone === 'dark'
          ? 'border-white/12 bg-white/[0.04] text-white/85 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]'
          : 'border-black/10 bg-black/[0.03] text-apag-black/80',
        className,
      )}
    >
      <span className="relative flex size-2" aria-hidden="true">
        <span className="absolute inline-flex size-full animate-dot-pulse rounded-full bg-apag-red" />
        <span className="relative inline-flex size-2 rounded-full bg-apag-red shadow-[0_0_10px_var(--apag-red)]" />
      </span>
      {children}
    </span>
  )
}

type SectionHeadingProps = {
  id?: string
  eyebrow: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
  className?: string
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  tone = 'dark',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto max-w-3xl text-center', className)}>
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2 id={id} className="font-display-title mt-6 text-[clamp(1.4rem,1rem+1.7vw,2.3rem)] text-balance">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-5 text-base leading-relaxed text-pretty sm:text-lg',
            tone === 'dark' ? 'text-white/70' : 'text-apag-black/70',
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
