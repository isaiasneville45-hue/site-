import { useSyncExternalStore } from 'react'
import { Flame } from 'lucide-react'

import { company } from '@/config/company'
import { cn } from '@/lib/utils'

/*
 * A logo oficial vem de /public/logo-apag.svg (company.logoSrc).
 * O arquivo é testado uma única vez; enquanto ele não existir (ou não
 * carregar), mostramos o placeholder: chama do lucide + "APAG" em Mokoto.
 */
type Status = 'loading' | 'loaded' | 'error'
let status: Status = 'loading'
const listeners = new Set<() => void>()

if (typeof window !== 'undefined') {
  const probe = new Image()
  probe.onload = () => setStatus('loaded')
  probe.onerror = () => setStatus('error')
  probe.src = company.logoSrc
}

function setStatus(next: Status) {
  status = next
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

type LogoProps = {
  className?: string
  /** Altura da logo; o placeholder acompanha. */
  size?: 'sm' | 'md' | 'lg'
}

const heights = { sm: 'h-7', md: 'h-9', lg: 'h-11' }
const textSizes = { sm: 'text-base', md: 'text-lg', lg: 'text-2xl' }
const iconSizes = { sm: 'size-5', md: 'size-6', lg: 'size-8' }

export function Logo({ className, size = 'md' }: LogoProps) {
  const current = useSyncExternalStore(
    subscribe,
    () => status,
    () => 'loading' as Status,
  )

  if (current === 'loaded') {
    return <img src={company.logoSrc} alt={company.name} className={cn('w-auto', heights[size], className)} />
  }

  return (
    // #E5303C: o mesmo vermelho, um tom acima, para o texto passar no contraste AA
    // sobre os fundos escuros. Some quando a logo oficial (SVG) for adicionada.
    <span className={cn('inline-flex items-center gap-2 text-[#E5303C]', heights[size], className)}>
      <span className="relative grid place-items-center">
        <span aria-hidden="true" className="absolute inset-0 rounded-full bg-apag-red/40 blur-md" />
        <Flame className={cn('relative fill-apag-red/25', iconSizes[size])} strokeWidth={2.25} aria-hidden="true" />
      </span>
      <span className={cn('font-display leading-none tracking-[0.06em]', textSizes[size])}>{company.name}</span>
    </span>
  )
}
