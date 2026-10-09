/**
 * Produtos revendidos/instalados pela APAG, por categoria (abas da seção Produtos).
 *
 * - Fotos dos produtos: public/produtos/{categoria}/{id}.webp (baixadas dos sites dos
 *   fornecedores e otimizadas por scripts/assets/download.py). `image: ''` mostra um
 *   placeholder com o ícone da categoria até a foto ser providenciada.
 * - Capas das categorias (fotos "humanizadas"): public/fotos/*.webp.
 * - Créditos de todas as imagens: public/produtos/CREDITOS.md.
 */

export type ProductCategoryId = 'sinalizacao' | 'alarme' | 'hidrantes' | 'iluminacao' | 'extintores'

export type Product = {
  id: string
  name: string
  /** 1 a 2 linhas, linguagem simples */
  description: string
  /** caminho local em /public/produtos/... ('' = placeholder) */
  image: string
  imageAlt: string
  /** 'cover' para fotos com fundo (preenchem o card); padrão: produto recortado sobre fundo branco */
  imageFit?: 'contain' | 'cover'
  /** fabricante, quando souber */
  brand?: string
  /** subgrupo dentro da categoria (vira um título acima dos cards) */
  group?: string
}

export type ProductCategory = {
  id: ProductCategoryId
  title: string
  /** texto curto explicando a categoria */
  intro: string
  /** foto "humanizada" da categoria ('' = só o gradiente) */
  cover: string
  coverAlt: string
  suppliers: { name: string; url: string }[]
  products: Product[]
}

export const productCategories: ProductCategory[] = [
  {
    id: 'sinalizacao',
    title: 'Sinalização de emergência',
    intro:
      'Placas e fitas que mostram o caminho até a saída e indicam onde estão os equipamentos de combate a incêndio, conforme a ABNT NBR 16820 e as Instruções Normativas do Corpo de Bombeiros de SC (IN 13).',
    cover: '',
    coverAlt: 'Corredor com placa de saída de emergência iluminada',
    suppliers: [{ name: 'Grupo Scala', url: 'https://gruposcala.com.br' }],
    products: [
      {
        id: 'saida',
        name: 'Placa de saída de emergência',
        description: 'Indica a porta de saída final da edificação. Fotoluminescente: continua visível no escuro quando falta energia.',
        image: '/produtos/sinalizacao/saida.webp',
        imageAlt: 'Placa fotoluminescente verde com a palavra SAÍDA e o símbolo de uma pessoa correndo para a porta',
        brand: 'Grupo Scala',
        group: 'Orientação e salvamento',
      },
      {
        id: 'rota-de-fuga-seta',
        name: 'Placa de rota de fuga com seta',
        description: 'Mostra a direção da saída mais próxima ao longo de corredores e salões. Há modelos com seta para todos os sentidos.',
        image: '/produtos/sinalizacao/rota-de-fuga-seta.webp',
        imageAlt: 'Placa fotoluminescente verde com uma pessoa correndo para a porta e seta apontando para a direita',
        brand: 'Grupo Scala',
        group: 'Orientação e salvamento',
      },
      {
        id: 'escada-de-emergencia',
        name: 'Placa de rota de fuga por escada',
        description: 'Orienta a saída pelas escadas, indicando se o caminho sobe ou desce.',
        image: '/produtos/sinalizacao/escada-de-emergencia.webp',
        imageAlt: 'Placa fotoluminescente verde com uma pessoa correndo e uma escada com seta para cima',
        brand: 'Grupo Scala',
        group: 'Orientação e salvamento',
      },
      {
        id: 'saida-acessivel',
        name: 'Placa de saída com rota acessível',
        description: 'Indica a saída e a rota adaptada para pessoas com deficiência, com o símbolo internacional de acesso.',
        image: '/produtos/sinalizacao/saida-acessivel.webp',
        imageAlt: 'Placa fotoluminescente verde com a palavra SAÍDA, símbolo de cadeira de rodas, pessoa correndo e seta',
        brand: 'Grupo Scala',
        group: 'Orientação e salvamento',
      },
      {
        id: 'porta-corta-fogo',
        name: 'Placa de porta corta-fogo',
        description: 'Identifica as portas corta-fogo das rotas de fuga, que devem permanecer sempre fechadas.',
        image: '/produtos/sinalizacao/porta-corta-fogo.webp',
        imageAlt: 'Placa fotoluminescente verde com o texto PORTA CORTA-FOGO',
        brand: 'Grupo Scala',
        group: 'Orientação e salvamento',
      },
      {
        id: 'ponto-de-encontro',
        name: 'Placa de ponto de encontro',
        description: 'Marca o local seguro, fora da edificação, onde as pessoas se reúnem depois de deixar o prédio.',
        image: '/produtos/sinalizacao/ponto-de-encontro.webp',
        imageAlt: 'Placa verde com setas apontando para um grupo de pessoas e o texto PONTO DE ENCONTRO EMERGÊNCIA',
        brand: 'Grupo Scala',
        group: 'Orientação e salvamento',
      },
      {
        id: 'fotoluminescente-laudo',
        name: 'Placas fotoluminescentes com laudo',
        description: 'Placas com laudo de conformidade à ABNT NBR 16820, que comprova brilho, autonomia e marcação exigidos pela norma.',
        image: '/produtos/sinalizacao/fotoluminescente-laudo.webp',
        imageAlt: 'Placa SAÍDA fotoluminescente com a marcação do fabricante e dos ensaios na borda inferior',
        brand: 'Grupo Scala',
        group: 'Orientação e salvamento',
      },
      {
        id: 'extintor',
        name: 'Placa de extintor',
        description: 'Indica onde está o extintor de incêndio. Vai acima do equipamento, para ser vista de longe.',
        image: '/produtos/sinalizacao/extintor.webp',
        imageAlt: 'Placa quadrada vermelha com o desenho de um extintor em cor clara fotoluminescente',
        brand: 'Grupo Scala',
        group: 'Equipamentos de combate e alarme',
      },
      {
        id: 'hidrante',
        name: 'Placa de hidrante',
        description: 'Indica o abrigo de mangueiras do hidrante, com a letra H fotoluminescente.',
        image: '/produtos/sinalizacao/hidrante.webp',
        imageAlt: 'Placa quadrada vermelha com a letra H em cor clara fotoluminescente',
        brand: 'Grupo Scala',
        group: 'Equipamentos de combate e alarme',
      },
      {
        id: 'mangotinho',
        name: 'Placa de mangotinho',
        description: 'Indica a localização do mangotinho, o carretel com mangueira semirrígida.',
        image: '/produtos/sinalizacao/mangotinho.webp',
        imageAlt: 'Placa quadrada vermelha com o desenho de uma mangueira enrolada em espiral',
        brand: 'Grupo Scala',
        group: 'Equipamentos de combate e alarme',
      },
      {
        id: 'acionador-alarme',
        name: 'Placa de acionador manual de alarme',
        description: 'Indica onde fica a botoeira (acionador manual) do alarme de incêndio.',
        image: '/produtos/sinalizacao/acionador-alarme.webp',
        imageAlt: 'Placa com borda vermelha, círculo vermelho e o texto BOTOEIRA DE INCÊNDIO',
        brand: 'Grupo Scala',
        group: 'Equipamentos de combate e alarme',
      },
      {
        id: 'bomba-de-incendio',
        name: 'Placa de comando da bomba de incêndio',
        description: 'Indica o acionador manual da bomba de incêndio da rede de hidrantes.',
        image: '/produtos/sinalizacao/bomba-de-incendio.webp',
        imageAlt: 'Placa com borda vermelha, círculo vermelho e o texto BOMBA DE INCÊNDIO',
        brand: 'Grupo Scala',
        group: 'Equipamentos de combate e alarme',
      },
      {
        id: 'agente-extintor',
        name: 'Placa de agente extintor',
        description: 'Informa o tipo de extintor e as classes de incêndio em que ele pode ser usado.',
        image: '/produtos/sinalizacao/agente-extintor.webp',
        imageAlt: 'Placa horizontal com o título EXTINTOR PREMIUM ABC e pictogramas das classes de incêndio',
        brand: 'Grupo Scala',
        group: 'Equipamentos de combate e alarme',
      },
      {
        id: 'extintor-hidrante-coluna',
        name: 'Sinalização de extintor e hidrante em coluna',
        description: 'Faixas com as letras E e H para pilares e colunas onde há extintor ou hidrante, conforme a IN 13 do CBMSC.',
        image: '/produtos/sinalizacao/extintor-hidrante-coluna.webp',
        imageAlt: 'Duas placas vermelhas com faixas amarelas, uma com a letra H e outra com a letra E em preto',
        brand: 'Grupo Scala',
        group: 'Equipamentos de combate e alarme',
      },
      {
        id: 'demarcacao-de-solo',
        name: 'Demarcação de piso para extintor',
        description: 'Adesivo vermelho com borda amarela que marca o piso sob o extintor e lembra de manter a área livre.',
        image: '/produtos/sinalizacao/demarcacao-de-solo.webp',
        imageAlt: 'Adesivo de piso quadrado vermelho com larga borda amarela',
        brand: 'Grupo Scala',
        group: 'Equipamentos de combate e alarme',
      },
      {
        id: 'abrigo-hidrante',
        name: 'Adesivo HIDRANTE para abrigo',
        description: 'Identifica a porta ou o visor do abrigo de mangueiras.',
        image: '/produtos/sinalizacao/abrigo-hidrante.webp',
        imageAlt: 'Adesivo amarelo com a palavra HIDRANTE em letras vermelhas',
        brand: 'Grupo Scala',
        group: 'Equipamentos de combate e alarme',
      },
      {
        id: 'hidrante-de-recalque',
        name: 'Placa de hidrante de recalque',
        description: 'Identifica o registro de recalque, por onde o Corpo de Bombeiros abastece a rede de hidrantes.',
        image: '/produtos/sinalizacao/hidrante-de-recalque.webp',
        imageAlt: 'Placa branca com borda vermelha e o texto HIDRANTE DE RECALQUE',
        brand: 'Grupo Scala',
        group: 'Equipamentos de combate e alarme',
      },
      {
        id: 'alerta-inflamavel',
        name: 'Placa de alerta: material inflamável',
        description: 'Avisa sobre o risco de incêndio em áreas com produtos inflamáveis.',
        image: '/produtos/sinalizacao/alerta-inflamavel.webp',
        imageAlt: 'Placa triangular amarela com o símbolo de uma chama',
        brand: 'Grupo Scala',
        group: 'Alerta',
      },
      {
        id: 'alerta-explosao',
        name: 'Placa de alerta: risco de explosão',
        description: 'Sinaliza locais com materiais explosivos ou risco de explosão.',
        image: '/produtos/sinalizacao/alerta-explosao.webp',
        imageAlt: 'Placa triangular amarela com o símbolo de uma explosão',
        brand: 'Grupo Scala',
        group: 'Alerta',
      },
      {
        id: 'alerta-choque-eletrico',
        name: 'Placa de alerta: risco de choque elétrico',
        description: 'Usada em quadros elétricos e áreas com risco de choque.',
        image: '/produtos/sinalizacao/alerta-choque-eletrico.webp',
        imageAlt: 'Placa triangular amarela com o símbolo de um raio',
        brand: 'Grupo Scala',
        group: 'Alerta',
      },
      {
        id: 'proibido-fumar',
        name: 'Placa Proibido fumar',
        description: 'Proíbe fumar em áreas onde isso aumenta o risco de incêndio.',
        image: '/produtos/sinalizacao/proibido-fumar.webp',
        imageAlt: 'Placa com círculo vermelho cortado sobre um cigarro e o texto PROIBIDO FUMAR',
        brand: 'Grupo Scala',
        group: 'Proibição',
      },
      {
        id: 'proibido-produzir-chama',
        name: 'Placa Proibido produzir chamas',
        description: 'Proíbe acender fósforos, isqueiros e qualquer chama no local.',
        image: '/produtos/sinalizacao/proibido-produzir-chama.webp',
        imageAlt: 'Placa com círculo vermelho cortado sobre um fósforo aceso e o texto PROIBIDO PRODUZIR CHAMAS',
        brand: 'Grupo Scala',
        group: 'Proibição',
      },
      {
        id: 'proibido-elevador',
        name: 'Placa Proibido usar o elevador em caso de incêndio',
        description: 'Instalada junto aos elevadores: em um incêndio, a saída deve ser feita pelas escadas.',
        image: '/produtos/sinalizacao/proibido-elevador.webp',
        imageAlt: 'Placa com círculo vermelho cortado sobre um elevador e o texto PROIBIDO UTILIZAR O ELEVADOR EM CASO DE INCÊNDIO',
        brand: 'Grupo Scala',
        group: 'Proibição',
      },
      {
        id: 'proibido-obstruir',
        name: 'Placa Não obstrua',
        description: 'Lembra que a frente de extintores, hidrantes e saídas deve ficar sempre livre.',
        image: '/produtos/sinalizacao/proibido-obstruir.webp',
        imageAlt: 'Placa com círculo vermelho cortado sobre caixas empilhadas e o texto NÃO OBSTRUA',
        brand: 'Grupo Scala',
        group: 'Proibição',
      },
      {
        id: 'faixas-zebradas',
        name: 'Faixas de indicação de obstáculo',
        description: 'Faixas zebradas vermelho e branco ou amarelo e preto que destacam obstáculos e desníveis nas rotas de fuga.',
        image: '/produtos/sinalizacao/faixas-zebradas.webp',
        imageAlt: 'Duas faixas zebradas, uma vermelha e branca e outra amarela e preta',
        brand: 'Grupo Scala',
        group: 'Sinalização complementar',
      },
      {
        id: 'fita-antiderrapante',
        name: 'Fita antiderrapante fotoluminescente',
        description: 'Aplicada nos degraus: evita escorregões e marca o contorno da escada no escuro.',
        image: '/produtos/sinalizacao/fita-antiderrapante.webp',
        imageAlt: 'Rolos de fita antiderrapante preta com faixa fotoluminescente e uma escada com a fita aplicada nos degraus',
        brand: 'Grupo Scala',
        group: 'Sinalização complementar',
      },
      {
        id: 'plano-de-fuga',
        name: 'Plano de fuga',
        description: 'Planta da edificação com as rotas de saída e os equipamentos de segurança, feita sob medida conforme a ABNT NBR 16820.',
        image: '/produtos/sinalizacao/plano-de-fuga.webp',
        imageAlt: 'Planta baixa de rota de fuga com corredores, salas numeradas e equipamentos marcados em cores',
        brand: 'Grupo Scala',
        group: 'Sinalização complementar',
      },
    ],
  },
  {
    id: 'alarme',
    title: 'Alarme de incêndio',
    intro:
      'Centrais, detectores, acionadores e sirenes que identificam um princípio de incêndio e avisam todo o prédio rapidamente, em versões convencionais, endereçáveis e sem fio.',
    cover: '',
    coverAlt: 'Detector de fumaça instalado no teto de um ambiente',
    suppliers: [
      { name: 'Intelbras', url: 'https://www.intelbras.com/pt-br/seguranca-eletronica/incendio' },
      { name: 'Tecnohold', url: 'https://www.tecnohold.com.br' },
      { name: 'Ilumac', url: 'https://www.ilumac.com.br' },
    ],
    products: [],
  },
  {
    id: 'hidrantes',
    title: 'Hidrantes e mangotinhos',
    intro:
      'Mangueiras, esguichos, conexões e abrigos para a rede de hidrantes do seu imóvel, além do teste hidrostático das mangueiras e da manutenção da rede.',
    cover: '',
    coverAlt: 'Mangueira de incêndio enrolada dentro do abrigo de hidrante',
    suppliers: [], // TODO: informar fornecedor
    products: [],
  },
  {
    id: 'iluminacao',
    title: 'Iluminação de emergência',
    intro:
      'Luminárias e blocos autônomos que acendem sozinhos na falta de energia e mantêm as rotas de fuga iluminadas, inclusive em áreas externas, úmidas e industriais.',
    cover: '',
    coverAlt: 'Placa de saída iluminada em um corredor escuro',
    suppliers: [{ name: 'Luxpryme', url: 'https://www.luxpryme.com.br' }],
    products: [],
  },
  {
    id: 'extintores',
    title: 'Extintores',
    intro:
      'Extintores para cada classe de incêndio, com suportes e acessórios para a instalação, além dos serviços de recarga, manutenção e teste hidrostático.',
    cover: '',
    coverAlt: 'Extintores de incêndio vermelhos instalados na parede',
    suppliers: [],
    products: [],
  },
]
