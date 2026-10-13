import { Reveal } from '@/components/motion'
import { SectionHeading } from '@/components/SectionHeading'
import { WhatsAppIcon } from '@/components/icons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { faq } from '@/config/faq'
import { headings } from '@/config/sections'
import { whatsappUrl } from '@/lib/contact'

/** Perguntas frequentes: uma resposta aberta por vez. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-apag-paper py-20 lg:py-28">
      <div className="container grid gap-10 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionHeading id="faq-title" title={headings.faq.title} description={headings.faq.description} />
          <Reveal delay={0.06} className="mt-6">
            <Button asChild variant="secondary">
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

        <Reveal delay={0.04} className="lg:col-span-7 lg:col-start-6">
          <Accordion type="single" collapsible className="border-t border-apag-line-strong">
            {faq.map((item, i) => (
              <AccordionItem key={item.question} value={`item-${i}`} className="border-apag-line-strong">
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
