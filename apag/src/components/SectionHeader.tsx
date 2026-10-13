import type { ReactNode } from 'react'

import { Reveal } from '@/components/motion'
import { cn } from '@/lib/utils'

type SectionHeaderProps = {
  id?: string
  title: ReactNode
  /** trecho final do título em vermelho (usar com moderação; título grande: AA também sobre o preto) */
  accent?: ReactNode
  description?: ReactNode
  tone?: 'light' | 'dark'
  align?: 'center' | 'left'
  className?: string
}

/*
 * Título de seção no padrão da referência: caixa alta, peso 800, centralizado
 * entre dois filetes, com uma frase curta embaixo. No alinhamento à esquerda,
 * o filete fica só à direita.
 */
export function SectionHeader({
  id,
  title,
  accent,
  description,
  tone = 'light',
  align = 'center',
  className,
}: SectionHeaderProps) {
  const dark = tone === 'dark'
  const rule = cn('hidden h-px flex-1 sm:block', dark ? 'bg-white/25' : 'bg-apag-line-strong')
  return (
    <Reveal className={cn(align === 'center' ? 'text-center' : 'text-left', className)}>
      <div className={cn('flex items-center gap-6', align === 'center' ? 'justify-center' : '')}>
        {align === 'center' ? <span aria-hidden="true" className={cn(rule, 'max-w-40')} /> : null}
        <h2 id={id} className="text-title max-w-4xl text-balance">
          {title}
          {accent ? (
            <>
              {' '}
              <span className="text-apag-red">{accent}</span>
            </>
          ) : null}
        </h2>
        <span aria-hidden="true" className={cn(rule, align === 'center' ? 'max-w-40' : '')} />
      </div>
      {description ? (
        <p
          className={cn(
            'mt-4 max-w-2xl text-base leading-relaxed text-pretty sm:text-lg',
            align === 'center' && 'mx-auto',
            dark ? 'text-white/72' : 'text-apag-slate',
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
