import { Reveal } from '@/components/motion'
import { SectionHeader } from '@/components/SectionHeader'
import { WhatsAppIcon } from '@/components/icons'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { faq } from '@/config/faq'
import { headings } from '@/config/sections'
import { whatsappUrl } from '@/lib/contact'

/** Perguntas frequentes: uma resposta aberta por vez, coluna central. */
export function Faq() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="section-pad bg-apag-paper">
      <div className="container">
        <SectionHeader id="faq-title" title={headings.faq.title} description={headings.faq.description} />

        <Reveal delay={0.04} className="mx-auto mt-12 max-w-3xl lg:mt-14">
          <Accordion
            type="single"
            collapsible
            className="rounded-md border border-apag-line bg-white px-5 sm:px-8 [&>[data-slot=accordion-item]:last-child]:border-b-0"
          >
            {faq.map((item, i) => (
              <AccordionItem key={item.question} value={`item-${i}`} className="border-apag-line">
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-8 flex justify-center">
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
          </div>
        </Reveal>
      </div>
    </section>
  )
}
