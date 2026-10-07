import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle2 } from 'lucide-react'

import { WhatsAppIcon } from '@/components/icons'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { company } from '@/config/company'
import { serviceOptions } from '@/config/services'
import { useServiceIntent } from '@/context/service-intent'
import { formatPhoneBR, whatsappUrl } from '@/lib/contact'

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Informe seu nome.').max(80, 'O nome deve ter no máximo 80 caracteres.'),
  company: z.string().trim().max(80, 'O nome da empresa deve ter no máximo 80 caracteres.'),
  phone: z
    .string()
    .trim()
    .min(1, 'Informe seu telefone.')
    .refine((value) => {
      const digits = value.replace(/\D/g, '').length
      return digits === 10 || digits === 11
    }, 'Informe um telefone válido com DDD.'),
  email: z.string().trim().min(1, 'Informe seu e-mail.').pipe(z.email('Informe um e-mail válido.')),
  service: z.string().min(1, 'Selecione o tipo de serviço.'),
  message: z.string().trim().max(1000, 'A mensagem deve ter no máximo 1000 caracteres.'),
})

type ContactValues = z.infer<typeof contactSchema>

const defaultValues: ContactValues = { name: '', company: '', phone: '', email: '', service: '', message: '' }

function buildMessage(values: ContactValues) {
  const service = serviceOptions.find((option) => option.value === values.service)?.label ?? values.service
  const lines = [
    `Olá, ${company.name}! Gostaria de solicitar um orçamento.`,
    '',
    `*Nome:* ${values.name}`,
    values.company ? `*Empresa:* ${values.company}` : null,
    `*Telefone:* ${values.phone}`,
    `*E-mail:* ${values.email}`,
    `*Serviço:* ${service}`,
    values.message ? `\n*Mensagem:*\n${values.message}` : null,
  ]
  return lines.filter((line) => line !== null).join('\n')
}

/** Formulário de orçamento: valida com Zod e envia pelo WhatsApp. */
export default function ContactForm() {
  const { request } = useServiceIntent()
  const [sentUrl, setSentUrl] = useState<string | null>(null)
  const nameInput = useRef<HTMLInputElement | null>(null)

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues,
    // valida no envio e, depois disso, a cada alteração (validar no blur desloca o
    // layout e pode "engolir" o clique no botão de enviar)
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  })

  // Serviço escolhido num card ("Saiba mais" → "Solicitar orçamento")
  useEffect(() => {
    if (!request) return
    form.setValue('service', request.serviceId, { shouldValidate: true, shouldDirty: true })
    // foco no primeiro campo sem interromper a rolagem suave até o formulário
    const timer = window.setTimeout(() => nameInput.current?.focus({ preventScroll: true }), 600)
    return () => window.clearTimeout(timer)
  }, [request, form])

  const onSubmit = (values: ContactValues) => {
    const url = whatsappUrl(buildMessage(values))
    // (sem "noopener" nos features: com ele o window.open sempre retorna null)
    const opened = window.open(url, '_blank')
    if (opened) opened.opener = null
    // Se o navegador bloquear a nova aba, abrimos na mesma.
    else window.location.href = url
    setSentUrl(url)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Nome <Required />
              </FormLabel>
              <FormControl>
                <Input
                      autoComplete="name"
                      placeholder="Seu nome"
                      {...field}
                      ref={(element) => {
                        field.ref(element)
                        nameInput.current = element
                      }}
                    />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Empresa <span className="font-normal text-white/50">(opcional)</span>
              </FormLabel>
              <FormControl>
                <Input autoComplete="organization" placeholder="Empresa ou condomínio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Telefone <Required />
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="(00) 00000-0000"
                  {...field}
                  onChange={(event) => field.onChange(formatPhoneBR(event.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                E-mail <Required />
              </FormLabel>
              <FormControl>
                <Input type="email" inputMode="email" autoComplete="email" placeholder="voce@empresa.com.br" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="service"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>
                Tipo de serviço <Required />
              </FormLabel>
              <Select
                value={field.value}
                onValueChange={(value) => {
                  field.onChange(value)
                  field.onBlur()
                }}
              >
                <FormControl>
                  <SelectTrigger ref={field.ref} onBlur={field.onBlur}>
                    <SelectValue placeholder="Selecione um serviço" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>
                Mensagem <span className="font-normal text-white/50">(opcional)</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="Conte um pouco sobre o imóvel e o que você precisa." rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-white/55 sm:max-w-xs">
            Ao enviar, abrimos o WhatsApp com a sua mensagem pronta. Nenhum dado fica salvo neste site.
          </p>
          <Button type="submit" size="lg" className="shrink-0">
            <WhatsAppIcon />
            Enviar pelo WhatsApp
          </Button>
        </div>

        <div aria-live="polite" className="sm:col-span-2">
          {sentUrl ? (
            <p className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/85">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-apag-ember" aria-hidden="true" />
              <span>
                Abrimos o WhatsApp com a sua mensagem. Se nada aconteceu,{' '}
                <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="font-semibold text-apag-ember underline underline-offset-4">
                  clique aqui para enviar
                </a>
                .
              </span>
            </p>
          ) : null}
        </div>
      </form>
    </Form>
  )
}

function Required() {
  return (
    <>
      <span aria-hidden="true" className="text-apag-ember">
        *
      </span>
      <span className="sr-only">(obrigatório)</span>
    </>
  )
}
