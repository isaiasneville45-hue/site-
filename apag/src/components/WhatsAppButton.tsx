import { WhatsAppIcon } from '@/components/icons'
import { company } from '@/config/company'
import { whatsappUrl } from '@/lib/contact'

/** Atalho fixo para o WhatsApp (canto inferior direito). */
export function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Falar com a ${company.name} no WhatsApp`}
      className="fixed bottom-4 right-4 z-40 grid size-13 place-items-center rounded-full bg-apag-red text-white shadow-[0_12px_32px_-12px_rgb(5_12_25/0.6)] transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-apag-red-strong sm:bottom-6 sm:right-6 sm:size-14"
    >
      <WhatsAppIcon className="size-6 sm:size-7" />
    </a>
  )
}
