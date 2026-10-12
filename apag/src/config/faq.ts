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
      'Depende do tipo de extintor e das normas vigentes. Em geral, a manutenção é anual, e o extintor também deve ser recarregado sempre que for usado, mesmo que parcialmente, ou se apresentar avaria ou perda de pressão. O teste hidrostático tem uma periodicidade própria, mais longa. Na visita técnica, avaliamos cada equipamento e informamos os prazos certos para o seu caso.',
  },
  {
    question: 'Vocês emitem documentação/laudo após a manutenção?',
    // TODO confirmar: quais documentos são entregues em cada serviço
    answer:
      'Sim. Todo serviço é registrado e, ao final, você recebe a documentação do que foi executado, para apresentar em vistorias do Corpo de Bombeiros e auditorias. Os documentos variam conforme o serviço; explicamos tudo já no orçamento.',
  },
  {
    question: 'Atendem condomínios e empresas de todos os portes?',
    answer:
      'Sim. Atendemos de residências e condomínios a comércios, escolas, clínicas, galpões e indústrias, com o mesmo cuidado técnico em qualquer porte de imóvel.',
  },
  {
    question: 'Quais regiões vocês atendem?',
    // TODO confirmar: lista de cidades atendidas
    answer: `Atendemos ${company.serviceArea}. Se o seu imóvel fica em outra cidade, fale com a gente para confirmar o atendimento.`,
  },
  {
    question: 'Como solicito um orçamento?',
    answer: `Pelo WhatsApp, pelo telefone ${company.phone}, pelo e-mail ${company.email} ou pelo formulário desta página. Para agilizar, mande fotos ou a planta do local: assim já indicamos os equipamentos e o próximo passo.`,
  },
]
