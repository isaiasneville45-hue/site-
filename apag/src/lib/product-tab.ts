import type { ProductCategoryId } from '@/config/products'
import { scrollToHash } from '@/lib/scroll'

/*
 * Aba ativa da seção Produtos, compartilhada com outras seções (ex.: o "Saiba
 * mais" dos Serviços abre a aba certa). A URL usa ?aba=<categoria>#produtos,
 * que também funciona sem JavaScript (a página abre na seção Produtos).
 */
type Listener = () => void

let requested: ProductCategoryId | null = null
const listeners = new Set<Listener>()

export function subscribeProductTab(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function getRequestedProductTab() {
  return requested
}

export function productTabHref(id: ProductCategoryId) {
  return `?aba=${id}#produtos`
}

/** Seleciona a aba e rola suavemente até a seção Produtos. */
export function openProductTab(id: ProductCategoryId) {
  requested = id
  listeners.forEach((listener) => listener())
  window.history.replaceState(null, '', productTabHref(id))
  scrollToHash('#produtos')
}
