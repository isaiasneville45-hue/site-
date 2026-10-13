/**
 * Fotos "humanizadas" (pessoas, técnicos, ambientes) usadas no Hero e na seção
 * "Empresa". Os arquivos ficam em public/fotos/{id}-{largura}.webp e são
 * gerados por scripts/assets/download.py. Créditos em public/produtos/CREDITOS.md.
 *
 * `null` = foto ainda não disponível (o layout usa só o gradiente).
 */
export type PhotoAsset = {
  id: string
  alt: string
  /** Larguras geradas (viram o srcset). */
  widths: number[]
  /** object-position da foto, para enquadrar o assunto (ex.: "50% 30%"). */
  position?: string
}

export const photos: { hero: PhotoAsset | null; why: PhotoAsset | null } = {
  hero: {
    id: 'hero',
    alt: 'Extintor de incêndio vermelho em suporte de piso amarelo com placa de identificação, instalado em uma área industrial com tubulações e andaimes',
    widths: [800, 1200],
    position: '42% 50%',
  },
  why: {
    id: 'empresa',
    alt: 'Placa de saída de emergência iluminada, com pictograma de pessoa correndo e seta, no teto de um corredor de prédio comercial',
    widths: [800, 1600],
    position: '55% 40%',
  },
}
