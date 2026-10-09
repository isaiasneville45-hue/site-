import type { PhotoAsset } from '@/config/photos'
import { cn } from '@/lib/utils'

type PhotoProps = {
  photo: PhotoAsset
  /** Atributo `sizes` do <img> (quanto da tela a foto ocupa). */
  sizes: string
  className?: string
  /** Foto acima da dobra (Hero): carrega já, com prioridade alta. */
  priority?: boolean
}

/** Foto responsiva em WebP (srcset com as larguras geradas pelo script de imagens). */
export function Photo({ photo, sizes, className, priority = false }: PhotoProps) {
  const url = (width: number) => `/fotos/${photo.id}-${width}.webp`
  const widths = [...photo.widths].sort((a, b) => a - b)
  return (
    <img
      src={url(widths[widths.length - 1])}
      srcSet={widths.map((w) => `${url(w)} ${w}w`).join(', ')}
      sizes={sizes}
      alt={photo.alt}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={cn('object-cover', className)}
      style={photo.position ? { objectPosition: photo.position } : undefined}
    />
  )
}
