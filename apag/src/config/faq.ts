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
    // TODO revisar: confirmar quais documentos são entregues em cada serviço
    answer:
      'Sim. Ao final do serviço, você recebe a documentação referente ao que foi executado, que pode ser apresentada em vistorias e fiscalizações. Os documentos variam conforme o serviço contratado; nossa equipe explica tudo no orçamento.',
  },
  {
    question: 'Atendem condomínios e empresas de todos os portes?',
    // TODO revisar
    answer:
      'Sim. Atendemos condomínios residenciais e comerciais, indústrias, comércios, escolas, galpões, clínicas, restaurantes e escritórios, de pequenos imóveis a grandes estruturas.',
  },
  {
    question: 'Quais regiões vocês atendem?',
    // TODO revisar: preencher `serviceArea` no company.ts
    answer: `Atendemos ${company.serviceArea}. Se o seu imóvel fica em outra cidade, fale com a gente para confirmar a disponibilidade de atendimento.`,
  },
  {
    question: 'Como solicito um orçamento?',
    // TODO revisar
    answer: `É só preencher o formulário desta página, chamar no WhatsApp ou ligar para ${company.phone}. Depois do primeiro contato, agendamos uma visita técnica, se necessário, e enviamos a proposta.`,
  },
]
