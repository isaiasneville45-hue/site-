import type { ProductCategory } from './index'

// Gerado a partir do levantamento nos catálogos/sites dos fornecedores. Revise antes de editar à mão.
export const hidrantes: ProductCategory = {
  id: 'hidrantes',
  title: 'Hidrantes e mangotinhos',
  tabLabel: 'Hidrantes',
  intro:
    'Mangueiras, esguichos, conexões e abrigos para a rede de hidrantes do seu imóvel, além do teste hidrostático das mangueiras e da manutenção da rede.',
  cover: '/fotos/capa-hidrantes-1600.webp',
  coverAlt:
    'Hidrante com registro de volante e abrigo vermelho de mangueiras com visores, com as mangueiras brancas enroladas, em área externa com jardim',
  coverPosition: '60% 54%',
  suppliers: [],
  groups: ['Mangueiras', 'Esguichos', 'Conexões e acessórios', 'Abrigos', 'Válvulas', 'Mangotinhos'],
  products: [
    {
      id: 'mangueira-de-incendio',
      name: 'Mangueira de incêndio',
      supplier: '',
      group: 'Mangueiras',
      description:
        'Mangueiras de 1½" e 2½" com uniões Storz, nos tipos 1 a 5 da NBR 11861, escolhidos conforme o uso e a pressão de trabalho do sistema.',
      image: '/produtos/hidrantes/mangueira-de-incendio.webp',
      imageAlt:
        'Mangueira de incêndio vermelha enrolada, com uniões Storz de alumínio nas duas pontas, sobre piso bege',
      imageFit: 'cover',
      illustrative: true,
    },
    {
      id: 'esguicho-regulavel',
      name: 'Esguicho regulável',
      supplier: '',
      group: 'Esguichos',
      description:
        'Alterna entre jato compacto e neblina e fecha a água no próprio esguicho. Com engate Storz, para mangueiras de 1½" e 2½".',
      image: '/produtos/hidrantes/esguicho-regulavel.webp',
      imageAlt:
        'Esguicho regulável com empunhadura tipo pistola e alavanca amarela de abertura, ligado a uma mangueira e preso em suporte metálico',
      imageFit: 'cover',
      illustrative: true,
    },
    {
      id: 'esguicho-agulheta',
      name: 'Esguicho agulheta (jato sólido)',
      supplier: '',
      group: 'Esguichos',
      description:
        'Esguicho de latão que forma um jato compacto de longo alcance, com engate Storz e requinte do diâmetro definido em projeto.',
      image: '/produtos/hidrantes/esguicho-agulheta.webp',
      imageAlt:
        'Esguicho de jato sólido em latão, com entrada rosqueada, deitado sobre bancada de madeira e visto pela boca de entrada',
      imageFit: 'cover',
      illustrative: true,
    },
    {
      id: 'conexoes-storz',
      name: 'Conexões e adaptadores Storz',
      supplier: '',
      group: 'Conexões e acessórios',
      description:
        'Uniões, adaptadores e reduções de engate rápido, em latão ou alumínio, que ligam a válvula do hidrante às mangueiras e ao esguicho.',
      image: '/produtos/hidrantes/conexoes-storz.webp',
      imageAlt:
        'Expositor de arame com uniões e adaptadores Storz em latão e alumínio e, ao fundo, registros com volante vermelho',
      imageFit: 'cover',
      illustrative: true,
    },
    {
      id: 'tampao-storz',
      name: 'Tampão Storz com corrente',
      supplier: '',
      group: 'Conexões e acessórios',
      description:
        'Fecha a saída da válvula de hidrante ou do registro de recalque quando não há mangueira acoplada, protegendo o engate.',
      image: '/produtos/hidrantes/tampao-storz.webp',
      imageAlt:
        'Saída de hidrante em tubulação vermelha com engate Storz de alumínio fechado por tampão preso por corrente',
      imageFit: 'cover',
      illustrative: true,
    },
    {
      id: 'chave-storz',
      name: 'Chave de mangueira (chave Storz)',
      supplier: '',
      group: 'Conexões e acessórios',
      description:
        'Ajuda a engatar e desengatar uniões, adaptadores e tampões Storz sem danificar os engates. Fica no abrigo, junto às mangueiras.',
      image: '',
      imageAlt: 'Chave de mangueira para engates Storz',
    },
    {
      id: 'abrigo-para-mangueira',
      name: 'Abrigo para mangueira',
      supplier: '',
      group: 'Abrigos',
      description:
        'Caixa metálica vermelha que guarda mangueiras, esguicho e chave junto ao ponto de hidrante. Modelos de sobrepor, de embutir e para área externa.',
      image: '/produtos/hidrantes/abrigo-para-mangueira.webp',
      imageAlt:
        'Abrigo de mangueira vermelho sobre pedestal, ao ar livre, com placa "Hydrant No 8" e a inscrição "Hose Box" na porta, entre folhagens',
      imageFit: 'cover',
      illustrative: true,
    },
    {
      id: 'registro-globo-angular-45',
      name: 'Registro globo angular 45°',
      supplier: '',
      group: 'Válvulas',
      description:
        'Válvula do ponto de hidrante, em latão ou bronze, com saída inclinada que facilita acoplar e lançar a mangueira.',
      image: '',
      imageAlt: 'Registro globo angular de 45° para hidrante',
    },
    {
      id: 'mangotinho-carretel',
      name: 'Mangotinho (carretel axial)',
      supplier: '',
      group: 'Mangotinhos',
      description:
        'Carretel com mangueira semirrígida e esguicho, pronto para uso: uma só pessoa consegue operar sem desenrolar toda a mangueira.',
      image: '/produtos/hidrantes/mangotinho-carretel.webp',
      imageAlt:
        'Mangotinho em abrigo vermelho aberto: carretel vermelho com mangueira semirrígida preta ligada à válvula de alimentação',
      imageFit: 'cover',
      illustrative: true,
    },
    {
      id: 'registro-de-recalque',
      name: 'Hidrante de recalque',
      supplier: '',
      group: 'Válvulas',
      description:
        'Registro no passeio ou na fachada por onde o Corpo de Bombeiros abastece a rede de hidrantes a partir da viatura.',
      image: '',
      imageAlt: 'Hidrante de recalque instalado no passeio',
    },
  ],
}
