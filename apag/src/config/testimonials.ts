export type Testimonial = {
  quote: string
  author: string
}

/**
 * Depoimentos exibidos no carrossel.
 * TODO: troque pelos depoimentos reais dos clientes (com autorização).
 * Se a lista ficar vazia, a seção de depoimentos some automaticamente.
 */
export const testimonials: Testimonial[] = [
  { quote: '[Depoimento real do cliente]', author: '[Nome — Empresa]' },
  { quote: '[Depoimento real do cliente]', author: '[Nome — Empresa]' },
  { quote: '[Depoimento real do cliente]', author: '[Nome — Empresa]' },
]
