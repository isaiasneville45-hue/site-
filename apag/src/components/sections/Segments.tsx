import { useState } from 'react'
import { Pause, Play } from 'lucide-react'

import { segments } from '@/config/content'
import { cn } from '@/lib/utils'

/** Faixa infinita com os segmentos atendidos. */
export function Segments() {
  const [paused, setPaused] = useState(false)

  const list = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className={cn('flex shrink-0 items-center gap-4 pr-4', hidden && 'motion-reduce:hidden')}
    >
      {segments.map(({ icon: Icon, label }) => (
        <li
          key={label}
          className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] py-2.5 pl-2.5 pr-5 shadow-[inset_0_1px_0_rgb(255_255_255/0.06)]"
        >
          <span className="grid size-9 place-items-center rounded-full bg-apag-red-45 ring-1 ring-apag-red-65">
            <Icon className="size-4 text-white" aria-hidden="true" />
          </span>
          <span className="font-display text-xs uppercase tracking-[0.08em] text-white/85 sm:text-sm">{label}</span>
        </li>
      ))}
    </ul>
  )

  return (
    <section aria-labelledby="segmentos-title" className="relative border-y border-white/[0.06] bg-apag-black py-10">
      <div className="container mb-7 flex items-center justify-between gap-4">
        <h2 id="segmentos-title" className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
          Segmentos que atendemos
        </h2>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="grid size-8 place-items-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/25 hover:text-white motion-reduce:hidden"
        >
          {paused ? <Play className="size-3.5" aria-hidden="true" /> : <Pause className="size-3.5" aria-hidden="true" />}
          <span className="sr-only">{paused ? 'Retomar animação dos segmentos' : 'Pausar animação dos segmentos'}</span>
        </button>
      </div>

      <div className="group mask-fade-x overflow-hidden motion-reduce:[mask-image:none]">
        <div
          className={cn(
            'flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none motion-reduce:justify-center motion-reduce:[&>ul]:flex-wrap motion-reduce:[&>ul]:justify-center motion-reduce:[&>ul]:px-4',
            paused && '[animation-play-state:paused]',
          )}
          style={{ ['--marquee-duration' as string]: '45s' }}
        >
          {list(false)}
          {list(true)}
        </div>
      </div>
    </section>
  )
}
