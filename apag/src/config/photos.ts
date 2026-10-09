/**
 * Fotos "humanizadas" (pessoas, técnicos, ambientes) usadas no Hero e na seção
 * "Por que a APAG". Os arquivos ficam em public/fotos/{id}-{largura}.webp e são
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
  hero: null,
  why: null,
}
