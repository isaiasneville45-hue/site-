import { company } from './company'

export type FaqItem = {
  question: string
  answer: string
}

export const faq: FaqItem[] = [
  {
    question: 'De quanto em quanto tempo o extintor precisa de recarga?',
    // TODO revisar: confirmar prazos com a equipe técnica
    answer:
      'Depende do tipo de extintor e das normas. Em geral a manutenção é anual, e o extintor deve ser recarregado sempre que for usado ou perder pressão. O teste hidrostático tem prazo próprio, mais longo. Na visita técnica informamos os prazos do seu caso.',
  },
  {
    question: 'Vocês emitem documentação após a manutenção?',
    // TODO confirmar: quais documentos são entregues em cada serviço
    answer:
      'Sim. Ao final do serviço você recebe a documentação do que foi executado, para vistorias do Corpo de Bombeiros e auditorias. Os documentos variam conforme o serviço e são informados no orçamento.',
  },
  {
    question: 'Atendem condomínios e empresas de todos os portes?',
    answer: 'Sim. De residências e condomínios a comércios, escolas, clínicas, galpões e indústrias.',
  },
  {
    question: 'Quais regiões vocês atendem?',
    // TODO confirmar: lista de cidades atendidas
    answer: `Atendemos ${company.serviceArea}. Se o imóvel fica em outra cidade, fale com a gente para confirmar.`,
  },
  {
    question: 'Como solicito um orçamento?',
    answer: `Pelo WhatsApp, pelo telefone ${company.phone}, pelo e-mail ${company.email} ou pelo formulário desta página. Fotos ou a planta do local ajudam a indicar os equipamentos certos.`,
  },
]
