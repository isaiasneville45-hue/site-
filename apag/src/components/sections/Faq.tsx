import { Reveal } from '@/components/motion'
import { SectionHeader } from '@/components/SectionHeader'
import { WhatsAppIcon } from '@/components/icons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { company } from '@/config/company'
import { faq } from '@/config/faq'
import { headings } from '@/config/sections'
import { whatsappUrl } from '@/lib/contact'

/** Perguntas frequentes: uma resposta aberta por vez. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-pad bg-apag-paper">
      <div className="container">
        <SectionHeader
          id="faq-title"
          index={headings.faq.index}
          label={headings.faq.label}
          meta={`${faq.length} perguntas`}
          title={headings.faq.title}
          description={headings.faq.description}
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0.04} className="lg:col-span-8">
            <Accordion type="single" collapsible className="border-t border-apag-line-strong">
              {faq.map((item, i) => (
                <AccordionItem key={item.question} value={`item-${i}`} className="border-apag-line-strong">
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>

          <Reveal delay={0.08} className="lg:col-span-3 lg:col-start-10">
            <p className="text-[0.9375rem] leading-relaxed text-apag-slate">
              Atendimento pelo WhatsApp: {company.hours.charAt(0).toLowerCase() + company.hours.slice(1)}.
            </p>
            <Button asChild variant="secondary" className="mt-4">
              <a
                href={whatsappUrl('Olá! Tenho uma dúvida sobre os serviços.')}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon />
                Perguntar no WhatsApp
              </a>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
