import { ArrowRight } from 'lucide-react'

import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { WhatsAppIcon } from '@/components/icons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { faq } from '@/config/faq'
import { whatsappUrl } from '@/lib/contact'

export function Faq() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative border-t border-white/[0.06] bg-apag-noir py-24 lg:py-32"
    >
      <div className="container grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Perguntas frequentes"
            description="Tire as principais dúvidas sobre manutenção, documentação e atendimento. Não achou o que procura? Fale com a gente."
          />
          <Reveal delay={0.1} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="outline">
              <a
                href={whatsappUrl('Olá! Tenho uma dúvida sobre os serviços.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Perguntar no WhatsApp
              </a>
            </Button>
            <Button asChild variant="ghost">
              <a href="#contato">
                Ir para o contato
                <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <Accordion type="single" collapsible defaultValue="item-0" className="border-t border-white/10">
            {faq.map((item, i) => (
              <AccordionItem key={item.question} value={`item-${i}`} className="border-white/10">
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  )
}
