import type { ReactNode } from 'react'

import { Reveal } from '@/components/motion'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  /** índice da seção ("01") */
  index: string
  /** nome curto da seção ("Serviços") */
  label: string
  /** informação técnica à direita da faixa (ex.: "373 produtos") */
  meta?: ReactNode
  id?: string
  title: ReactNode
  description?: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}

/*
 * Abertura de seção no formato das pranchas técnicas: uma faixa com filete de
 * ponta a ponta, índice e nome da seção em Geist Mono (e uma informação à
 * direita), seguida do título grande e de uma frase curta alinhada à base.
 */
export function SectionHeader({
  index,
  label,
  meta,
  id,
  title,
  description,
  tone = 'light',
  className,
}: SectionHeaderProps) {
  const dark = tone === 'dark'
  return (
    <Reveal className={className}>
      <div
        className={cn(
          'relative flex items-center justify-between gap-6 border-t pt-4 text-tech',
          dark ? 'border-white/20 text-white/60' : 'border-apag-line-strong text-apag-muted',
        )}
      >
        <span aria-hidden="true" className="absolute -top-px left-0 h-0.5 w-12 bg-apag-red" />
        <span className="flex gap-4">
          <span className={dark ? 'text-apag-ember' : 'text-apag-red-strong'}>{index}</span>
          <span className={dark ? 'text-white/85' : 'text-apag-ink'}>{label}</span>
        </span>
        {meta ? <span className="text-right">{meta}</span> : null}
      </div>
      <div className="mt-10 grid gap-6 lg:mt-14 lg:grid-cols-12 lg:items-end lg:gap-8">
        <h2 id={id} className="text-title text-balance lg:col-span-7">
          {title}
        </h2>
        {description ? (
          <p
            className={cn(
              'max-w-md text-base leading-relaxed text-pretty sm:text-lg lg:col-span-4 lg:col-start-9 lg:pb-1',
              dark ? 'text-white/70' : 'text-apag-slate',
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </Reveal>
  )
}
