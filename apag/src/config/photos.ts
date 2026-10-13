/**
 * Fotos de ambiente (hero, "Por que a APAG", contato) e dos serviços. Os arquivos
 * ficam em public/fotos/{id}-{largura}.webp. Fotos de ambiente recebem o
 * tratamento monocromático no CSS (photo-mono); fotos dos serviços mantêm as
 * cores reais dos equipamentos. Créditos em public/produtos/CREDITOS.md.
 *
 * `null` = foto indisponível (a seção fica só com o fundo preto).
 */
export type PhotoAsset = {
  id: string
  alt: string
  /** Larguras geradas (viram o srcset). */
  widths: number[]
  /** object-position da foto, para enquadrar o assunto (ex.: "50% 30%"). */
  position?: string
}

export const photos: { hero: PhotoAsset | null; why: PhotoAsset | null; contact: PhotoAsset | null } = {
  hero: {
    id: 'hero',
    alt: 'Interior de um grande galpão industrial com estrutura metálica treliçada no teto e janelas altas nas laterais',
    widths: [800, 1600, 2400],
    position: '50% 45%',
  },
  why: {
    id: 'por-que',
    alt: 'Detalhe da estrutura metálica de uma cobertura industrial, com treliças, colunas e telhas onduladas',
    widths: [800, 1600],
    position: '50% 40%',
  },
  contact: {
    id: 'contato',
    alt: 'Vigas e estrutura metálica sob o telhado de um armazém',
    widths: [800, 1600],
    position: '50% 50%',
  },
}
