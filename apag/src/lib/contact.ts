import { company } from '@/config/company'

/** Link do WhatsApp (wa.me) com mensagem opcional já preenchida. */
export function whatsappUrl(message: string = company.whatsappMessage) {
  const number = company.whatsapp.replace(/\D/g, '')
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`
}

/** Link tel: do telefone da empresa. */
export function phoneHref() {
  return company.phoneHref
}

export function mailHref(email: string = company.email) {
  return `mailto:${email}`
}

/** Máscara de telefone brasileiro: (00) 0000-0000 ou (00) 00000-0000. */
export function formatPhoneBR(value: string) {
  const d = value.replace(/\D/g, '').slice(0, 11)
  if (d.length <= 2) return d.length ? `(${d}` : ''
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`
}
