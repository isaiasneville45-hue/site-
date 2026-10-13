import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'framer-motion'

import { EASE_OUT } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Elemento renderizado (use "li" dentro de listas). */
  as?: 'div' | 'li'
}

/**
 * Entrada discreta ao rolar (opacidade + 12 px). Com prefers-reduced-motion o
 * conteúdo aparece na hora. A marcação é a mesma no HTML pré-renderizado e no
 * cliente, para a hidratação não divergir.
 */
export function Reveal({ children, className, delay = 0, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const Motion = as === 'li' ? m.li : m.div

  return (
    <Motion
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -6% 0px' }}
      transition={reduce ? { duration: 0 } : { duration: 0.6, ease: EASE_OUT, delay }}
    >
      {children}
    </Motion>
  )
}
