import { segments } from '@/config/content'
import { segmentsUi } from '@/config/sections'

/** Faixa compacta com os segmentos atendidos: ícone de linha + nome, sem cards. */
export function Segments() {
  return (
    <section aria-labelledby="segmentos-title" className="border-b border-apag-line bg-white">
      <div className="container flex flex-col gap-5 py-8 lg:flex-row lg:items-center lg:gap-8 lg:py-7">
        <h2 id="segmentos-title" className="shrink-0 text-label text-apag-slate">
          {segmentsUi.title}
        </h2>
        <ul className="grid flex-1 grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4 lg:grid-cols-8 lg:gap-0">
          {segments.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-2.5 lg:justify-center lg:border-l lg:border-apag-line lg:px-2 lg:first:border-l-0 lg:first:justify-start lg:first:pl-0"
            >
              <Icon className="size-5 shrink-0 text-apag-navy-700" strokeWidth={1.5} aria-hidden="true" />
              <span className="text-sm font-medium tracking-[-0.01em] text-apag-ink xl:text-[0.9375rem]">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
