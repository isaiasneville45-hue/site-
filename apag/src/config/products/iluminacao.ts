import type { ProductCategory } from './index'

// Gerado a partir do levantamento nos catálogos/sites dos fornecedores. Revise antes de editar à mão.
export const iluminacao: ProductCategory = {
  id: 'iluminacao',
  title: 'Iluminação de emergência',
  tabLabel: 'Iluminação',
  intro:
    'Luminárias e blocos autônomos que acendem sozinhos na falta de energia e mantêm as rotas de fuga iluminadas, inclusive em áreas externas, úmidas e industriais.',
  cover: '/fotos/capa-iluminacao-1600.webp',
  coverAlt:
    'Luminária de sinalização de saída de emergência acesa, com pictograma verde de pessoa correndo e seta para a direita, fixada no alto de uma passagem em um edifício à noite',
  coverPosition: '85% 18%',
  suppliers: [{ name: 'Luxpryme', url: 'https://www.luxpryme.com.br' }],
  groups: [
    'Luminárias autônomas',
    'Blocos autônomos',
    'Sistema centralizado',
    'Áreas externas e industriais (IP66/IP67)',
    'Placas de saída iluminadas',
  ],
  products: [
    {
      id: 'luxpryme-slim-premium',
      name: 'Luminária autônoma Slim Premium',
      supplier: 'Luxpryme',
      group: 'Luminárias autônomas',
      description:
        'Luminária de emergência fina e discreta, da linha Premium, com bateria própria: acende sozinha quando falta energia.',
      image: '/produtos/iluminacao/luxpryme-slim-premium.webp',
      imageAlt: 'Luminária de emergência autônoma Slim Premium da Luxpryme, de perfil fino',
    },
    {
      id: 'luxpryme-compacta-basic-embutir',
      name: 'Luminária compacta autônoma Basic de embutir',
      supplier: 'Luxpryme',
      group: 'Luminárias autônomas',
      description:
        'Luminária compacta para embutir, com bateria própria, que acende sozinha quando a energia cai. Linha Basic.',
      image: '/produtos/iluminacao/luxpryme-compacta-basic-embutir.webp',
      imageAlt: 'Luminária de emergência compacta autônoma Basic de embutir da Luxpryme',
    },
    {
      id: 'luxpryme-mini-compacta-basic',
      name: 'Luminária mini compacta autônoma Basic',
      supplier: 'Luxpryme',
      group: 'Luminárias autônomas',
      description:
        'Luminária de emergência bem pequena e discreta, com bateria própria. Acende sozinha na falta de energia.',
      image: '/produtos/iluminacao/luxpryme-mini-compacta-basic.webp',
      imageAlt: 'Luminária de emergência mini compacta autônoma Basic da Luxpryme',
    },
    {
      id: 'luxpryme-mini-bloco-basic',
      name: 'Mini bloco autônomo Basic',
      supplier: 'Luxpryme',
      group: 'Blocos autônomos',
      description:
        'Bloco de iluminação de emergência compacto, com bateria própria, para clarear rotas de fuga quando a energia acaba.',
      image: '/produtos/iluminacao/luxpryme-mini-bloco-basic.webp',
      imageAlt: 'Mini bloco autônomo de iluminação de emergência Luxpryme, linha Basic',
    },
    {
      id: 'luxpryme-nano-bloco-basic',
      name: 'Nano bloco autônomo Basic',
      supplier: 'Luxpryme',
      group: 'Blocos autônomos',
      description:
        'Bloco de emergência de tamanho bem reduzido, com bateria própria, que acende sozinho quando falta energia.',
      image: '/produtos/iluminacao/luxpryme-nano-bloco-basic.webp',
      imageAlt: 'Nano bloco autônomo de iluminação de emergência Luxpryme, linha Basic',
    },
    {
      id: 'luxpryme-bloco-3000-basic',
      name: 'Bloco autônomo 3000 Basic',
      supplier: 'Luxpryme',
      group: 'Blocos autônomos',
      description:
        'Bloco de iluminação de emergência da linha Basic, com bateria própria, que acende sozinho quando falta energia.',
      image: '/produtos/iluminacao/luxpryme-bloco-3000-basic.webp',
      imageAlt: 'Bloco autônomo de iluminação de emergência Luxpryme Bloco 3000, linha Basic',
    },
    {
      id: 'luxpryme-csb-400',
      name: 'Central de iluminação 12 V 400 W CSB-400',
      supplier: 'Luxpryme',
      group: 'Sistema centralizado',
      description:
        'Central que mantém acesas as luminárias ligadas a ela quando falta energia, usando bateria externa de 12 V.',
      image: '/produtos/iluminacao/luxpryme-csb-400.webp',
      imageAlt: 'Central de iluminação de emergência Luxpryme CSB-400, 12 V e 400 W',
    },
    {
      id: 'luxpryme-lcce-300',
      name: 'Luminária compacta de embutir 12/24 V LCCE-300',
      supplier: 'Luxpryme',
      group: 'Sistema centralizado',
      description:
        'Luminária para sistema com central, que pode ser embutida em caixa elétrica 4x2. Ideal para escritórios, halls e escadarias.',
      image: '/produtos/iluminacao/luxpryme-lcce-300.webp',
      imageAlt: 'Luminária de emergência compacta de embutir Luxpryme LCCE-300, para sistema centralizado',
    },
    {
      id: 'luxpryme-lcf-3020-blk',
      name: 'Luminária triplo farol Black LCF-3020BLK',
      supplier: 'Luxpryme',
      group: 'Sistema centralizado',
      description:
        'Luminária de três faróis ligada à central de iluminação, indicada para ambientes amplos de até 500 m².',
      image: '/produtos/iluminacao/luxpryme-lcf-3020-blk.webp',
      imageAlt: 'Luminária de emergência triplo farol Luxpryme LCF-3020BLK, versão Black',
    },
    {
      id: 'luxpryme-duplo-farol-lcf',
      name: 'Luminária duplo farol LCF (opção IP-66)',
      supplier: 'Luxpryme',
      group: 'Áreas externas e industriais (IP66/IP67)',
      description:
        'Luminária de dois faróis para sistema com central, com opção de proteção IP-66 contra poeira e água. Até 300 m².',
      image: '/produtos/iluminacao/luxpryme-duplo-farol-lcf.webp',
      imageAlt: 'Luminária de emergência duplo farol Luxpryme, linha LCF',
    },
    {
      id: 'luxpryme-slim-lsc-ip67',
      name: 'Luminária Slim 12/24 V LSC (IP-67)',
      supplier: 'Luxpryme',
      group: 'Áreas externas e industriais (IP66/IP67)',
      description:
        'Luminária slim de apenas 2,4 cm de espessura, com proteção IP-67 contra poeira e água, para sistema com central de iluminação.',
      image: '/produtos/iluminacao/luxpryme-slim-lsc-ip67.webp',
      imageAlt: 'Luminária de emergência Slim 12/24 V Luxpryme, linha náutica com proteção IP-67',
    },
    {
      id: 'luxpryme-pps-p-2617',
      name: 'Placa de saída 26x17 Premium PPS.P-2617',
      supplier: 'Luxpryme',
      group: 'Placas de saída iluminadas',
      description: 'Placa de saída iluminada em acrílico, com bateria que mantém o brilho quando falta energia.',
      image: '/produtos/iluminacao/luxpryme-pps-p-2617.webp',
      imageAlt: 'Placa de saída de emergência iluminada Luxpryme 26x17 Premium',
    },
    {
      id: 'luxpryme-pcs-b-2617',
      name: 'Placa de saída 26x17 12/24 V PCS.B-2617',
      supplier: 'Luxpryme',
      group: 'Placas de saída iluminadas',
      description:
        'Placa de saída iluminada para ligar à central de iluminação. Vem com kit de instalação e setas adesivas.',
      image: '/produtos/iluminacao/luxpryme-pcs-b-2617.webp',
      imageAlt: 'Placa de saída de emergência iluminada Luxpryme 26x17 PCS.B-2617, para sistema centralizado',
    },
  ],
}
