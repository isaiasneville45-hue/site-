import { WhatsAppIcon } from '@/components/icons'
import { company } from '@/config/company'
import { whatsappUrl } from '@/lib/contact'

/** Botão flutuante de WhatsApp (canto inferior direito), com pulso suave. */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com a ${company.name} no WhatsApp`}
      className="group fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-red-sheen text-white shadow-neu transition-all duration-300 hover:-translate-y-1 hover:shadow-neu-hover sm:bottom-7 sm:right-7 sm:size-16"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 rounded-full bg-apag-red animate-pulse-ring motion-reduce:hidden"
      />
      <WhatsAppIcon className="size-7 sm:size-8" />
      <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full border border-white/10 bg-apag-noir/90 px-4 py-2 text-sm font-semibold opacity-0 shadow-neu-dark backdrop-blur transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100 md:block">
        Fale conosco
      </span>
    </a>
  )
}
