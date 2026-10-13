import { productCategories, type ProductCategoryId } from '@/config/products'
import { scrollToHash } from '@/lib/scroll'

/*
 * Aba ativa da seção Produtos, compartilhada com outras seções (ex.: o "Saiba
 * mais" dos Serviços abre a aba certa). A URL usa ?aba=<categoria>#produtos,
 * que também funciona sem JavaScript (a página abre na seção Produtos).
 */
type Listener = () => void

let current: ProductCategoryId | null = null
let readUrl = false
const listeners = new Set<Listener>()

export const isProductCategoryId = (value: string | null): value is ProductCategoryId =>
  productCategories.some((category) => category.id === value)

export function subscribeProductTab(listener: Listener) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

/** Aba escolhida (null = a primeira). Na primeira leitura considera o ?aba= da URL. */
export function getProductTab() {
  if (!readUrl && typeof window !== 'undefined') {
    readUrl = true
    const fromUrl = new URLSearchParams(window.location.search).get('aba')
    if (isProductCategoryId(fromUrl)) current = fromUrl
  }
  return current
}

export function setProductTab(id: ProductCategoryId) {
  current = id
  listeners.forEach((listener) => listener())
}

export function productTabHref(id: ProductCategoryId) {
  return `?aba=${id}#produtos`
}

/** Seleciona a aba e rola suavemente até a seção Produtos. */
export function openProductTab(id: ProductCategoryId) {
  setProductTab(id)
  window.history.replaceState(null, '', productTabHref(id))
  scrollToHash('#produtos')
}
