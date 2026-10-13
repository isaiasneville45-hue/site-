import type { ReactNode } from 'react'

import { Reveal } from '@/components/motion'
import { cn } from '@/lib/utils'

type SectionHeadingProps = {
  id?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  /** 'dark' para seções de fundo marinho/grafite */
  tone?: 'light' | 'dark'
  className?: string
}

/**
 * Título de seção: o filete vermelho marca o início de cada seção (o mesmo
 * gesto do hero e do rodapé), seguido do título e de uma frase curta.
 */
export function SectionHeading({
  id,
  title,
  description,
  align = 'left',
  tone = 'light',
  className,
}: SectionHeadingProps) {
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      <span aria-hidden="true" className={cn('block h-[3px] w-8 bg-apag-red', align === 'center' && 'mx-auto')} />
      <h2 id={id} className="text-title mt-6 text-balance">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            'mt-4 text-base leading-relaxed text-pretty sm:text-lg',
            tone === 'dark' ? 'text-white/72' : 'text-apag-slate',
            align === 'center' && 'mx-auto max-w-xl',
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
