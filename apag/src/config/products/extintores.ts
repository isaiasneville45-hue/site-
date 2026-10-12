import type { ProductCategory } from './index'

// Gerado a partir do levantamento nos catálogos/sites dos fornecedores. Revise antes de editar à mão.
export const extintores: ProductCategory = {
  id: 'extintores',
  title: 'Extintores',
  tabLabel: 'Extintores',
  intro:
    'Extintores para cada classe de incêndio, com suportes e acessórios para a instalação, além dos serviços de recarga, manutenção e teste hidrostático.',
  cover: '/fotos/capa-extintores-1024.webp',
  coverAlt:
    'Trabalhador de capacete e colete refletivo usa um extintor para apagar o fogo em uma bandeja durante um treinamento',
  coverPosition: '55% 35%',
  suppliers: [],
  groups: ['Extintores portáteis', 'Extintores sobre rodas', 'Suportes'],
  products: [
    {
      id: 'extintor-po-abc',
      name: 'Extintor de pó químico ABC',
      supplier: '',
      group: 'Extintores portáteis',
      description:
        'O mais versátil: serve para fogos classe A (sólidos), B (líquidos inflamáveis) e C (equipamentos elétricos energizados).',
      image: '/produtos/extintores/extintor-po-abc.webp',
      imageAlt:
        'Extintor de pó químico vermelho com mangueira preta e manômetro, apoiado no chão junto a uma parede branca',
      illustrative: true,
    },
    {
      id: 'extintor-po-bc',
      name: 'Extintor de pó químico BC',
      supplier: '',
      group: 'Extintores portáteis',
      description:
        'Para fogo em líquidos e gases inflamáveis (classe B) e em equipamentos elétricos energizados (classe C). Comum em centrais de gás e garagens.',
      image: '/produtos/extintores/extintor-po-bc.webp',
      imageAlt:
        'Extintor de pó químico vermelho com gatilho preto e mangueira longa bege, apoiado no chão em frente a uma parede clara',
      illustrative: true,
    },
    {
      id: 'extintor-co2',
      name: 'Extintor de CO2',
      supplier: '',
      group: 'Extintores portáteis',
      description:
        'Apaga por abafamento sem deixar resíduos. Indicado para fogos classe B e C, como painéis elétricos, salas de TI e laboratórios.',
      image: '/produtos/extintores/extintor-co2.webp',
      imageAlt: 'Extintor de CO2 vermelho com mangueira e difusor preto, fixado na parede',
      illustrative: true,
    },
    {
      id: 'extintor-agua-pressurizada',
      name: 'Extintor de água pressurizada',
      supplier: '',
      group: 'Extintores portáteis',
      description:
        'Para fogos classe A (madeira, papel, tecidos), age por resfriamento. Não deve ser usado em equipamentos elétricos energizados.',
      image: '/produtos/extintores/extintor-agua-pressurizada.webp',
      imageAlt: 'Extintor de água pressurizada vermelho, com a palavra WATER no rótulo, pendurado na parede',
      illustrative: true,
    },
    {
      id: 'extintor-espuma-mecanica',
      name: 'Extintor de espuma mecânica',
      supplier: '',
      group: 'Extintores portáteis',
      description:
        'Forma uma camada de espuma sobre o combustível. Indicado para fogos classe A e B, em especial líquidos inflamáveis.',
      image: '/produtos/extintores/extintor-espuma-mecanica.webp',
      imageAlt:
        'Extintor de espuma mecânica vermelho com mangueira azul-escura e ponteira verde, fixado na parede branca',
      illustrative: true,
    },
    {
      id: 'extintor-classe-k',
      name: 'Extintor classe K',
      supplier: '',
      group: 'Extintores portáteis',
      description:
        'Feito para fogo em óleo e gordura de cozinha. Indicado para cozinhas industriais, restaurantes e lanchonetes.',
      image: '/produtos/extintores/extintor-classe-k.webp',
      imageAlt: 'Extintor classe K de aço inox com mangueira preta e rótulo de instruções, sobre fundo branco',
      illustrative: true,
    },
    {
      id: 'extintor-sobre-rodas',
      name: 'Extintor sobre rodas (carreta)',
      supplier: '',
      group: 'Extintores sobre rodas',
      description:
        'Extintor de grande capacidade em carreta com rodas, para indústrias, depósitos, pátios e postos de combustível.',
      image: '/produtos/extintores/extintor-sobre-rodas.webp',
      imageAlt: 'Dois extintores sobre rodas de pó químico, vermelhos, lado a lado em um corredor',
      imageFit: 'cover',
      illustrative: true,
    },
    {
      id: 'suporte-parede-extintor',
      name: 'Suporte de parede para extintor',
      supplier: '',
      group: 'Suportes',
      description: 'Fixa o extintor na parede na altura correta, visível e fácil de retirar numa emergência.',
      image: '',
      imageAlt: 'Suporte de parede para extintor',
    },
    {
      id: 'suporte-piso-extintor',
      name: 'Suporte de piso para extintor',
      supplier: '',
      group: 'Suportes',
      description:
        'Base que mantém o extintor estável sem furar a parede, ideal para divisórias de vidro ou drywall. Modelos para um ou dois extintores.',
      image: '/produtos/extintores/suporte-piso-extintor.webp',
      imageAlt:
        'Suporte de piso duplo vermelho com um extintor de água e um de CO2, encostado na parede de um corredor',
      imageFit: 'cover',
      illustrative: true,
    },
  ],
}
