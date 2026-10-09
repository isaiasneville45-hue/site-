import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'

/**
 * Liga os cards de serviço ao formulário de contato: ao clicar em
 * "Solicitar orçamento" num serviço, o select do formulário já vem preenchido.
 */
type ServiceRequest = { serviceId: string; nonce: number }

type ServiceIntentValue = {
  request: ServiceRequest | null
  requestService: (serviceId: string) => void
}

const ServiceIntentContext = createContext<ServiceIntentValue | null>(null)

export function ServiceIntentProvider({ children }: { children: ReactNode }) {
  const [request, setRequest] = useState<ServiceRequest | null>(null)

  const requestService = useCallback((serviceId: string) => {
    setRequest((prev) => ({ serviceId, nonce: (prev?.nonce ?? 0) + 1 }))
  }, [])

  const value = useMemo(() => ({ request, requestService }), [request, requestService])

  return <ServiceIntentContext.Provider value={value}>{children}</ServiceIntentContext.Provider>
}

// oxlint-disable-next-line react/only-export-components
export function useServiceIntent() {
  const ctx = useContext(ServiceIntentContext)
  if (!ctx) throw new Error('useServiceIntent deve ser usado dentro de <ServiceIntentProvider>')
  return ctx
}
