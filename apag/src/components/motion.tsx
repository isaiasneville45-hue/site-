import type { ReactNode } from 'react'
import { m, useReducedMotion } from 'framer-motion'

import { EASE_OUT } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Deslocamento vertical inicial em px. */
  y?: number
  /** Elemento renderizado (use "li" dentro de listas). */
  as?: 'div' | 'li'
}

/**
 * Entrada suave ao rolar (fade + slide). Com prefers-reduced-motion o conteúdo
 * aparece na hora, sem movimento. A marcação é a mesma no HTML pré-renderizado
 * e no cliente, para a hidratação não divergir.
 */
export function Reveal({ children, className, delay = 0, y = 28, as = 'div' }: RevealProps) {
  const reduce = useReducedMotion()
  const Motion = as === 'li' ? m.li : m.div

  return (
    <Motion
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={reduce ? { duration: 0 } : { duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </Motion>
  )
}
