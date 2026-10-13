import { useSyncExternalStore } from 'react'
import { Flame } from 'lucide-react'

import { company } from '@/config/company'
import { cn } from '@/lib/utils'

/*
 * A logo oficial vem de /public/logo-apag.svg (company.logoSrc).
 * O arquivo é testado uma única vez; enquanto ele não existir (ou não
 * carregar), mostramos o placeholder: selo vermelho com a chama + "APAG".
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
  /** 'light' = texto escuro (fundos claros); 'dark' = texto branco (fundos escuros) */
  tone?: 'light' | 'dark'
  /** mostra o descritor "Soluções contra incêndio" ao lado da marca */
  descriptor?: boolean
}

export function Logo({ className, tone = 'dark', descriptor = false }: LogoProps) {
  const current = useSyncExternalStore(
    subscribe,
    () => status,
    () => 'loading' as Status,
  )

  if (current === 'loaded') {
    return <img src={company.logoSrc} alt={company.name} className={cn('h-9 w-auto', className)} />
  }

  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span aria-hidden="true" className="grid size-8 place-items-center rounded-sm bg-apag-red text-white">
        <Flame className="size-[1.125rem]" strokeWidth={2.25} />
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            'text-[1.25rem] font-bold leading-none tracking-[-0.03em]',
            tone === 'dark' ? 'text-white' : 'text-apag-ink',
          )}
        >
          {company.name}
        </span>
        {descriptor ? (
          <span
            className={cn(
              'mt-1 text-[0.6875rem] font-medium leading-none tracking-[0.01em]',
              tone === 'dark' ? 'text-white/60' : 'text-apag-muted',
            )}
          >
            {company.descriptor}
          </span>
        ) : null}
      </span>
    </span>
  )
}
