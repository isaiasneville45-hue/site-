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
  /** nome curto usado na aba */
  tabLabel: string
  /** texto curto explicando a categoria */
  intro: string
  /** foto "humanizada" da categoria: o maior arquivo, '/fotos/{id}-{largura}.webp' ('' = só o gradiente) */
  cover: string
  coverAlt: string
  /** object-position da capa, para enquadrar o assunto (ex.: "70% 50%") */
  coverPosition?: string
  suppliers: { name: string; url: string }[]
  products: Product[]
}

export const productCategories: ProductCategory[] = [
  {
    id: 'sinalizacao',
    title: 'Sinalização de emergência',
    tabLabel: 'Sinalização',
    intro:
      'Placas e fitas que mostram o caminho até a saída e indicam onde estão os equipamentos de combate a incêndio, conforme a ABNT NBR 16820 e as Instruções Normativas do Corpo de Bombeiros de SC (IN 13).',
    cover: '/fotos/capa-sinalizacao-1600.webp',
    coverAlt:
      'Corredor envidraçado de um prédio de escritórios, com a placa de saída de emergência no teto indicando a rota de fuga',
    coverPosition: '55% 38%',
    suppliers: [{ name: 'Grupo Scala', url: 'https://gruposcala.com.br' }],
    products: [
      {
        id: 'saida',
        name: 'Placa de saída de emergência',
        description:
          'Indica a porta de saída final da edificação. Fotoluminescente: continua visível no escuro quando falta energia.',
        image: '/produtos/sinalizacao/saida.webp',
        imageAlt: 'Placa fotoluminescente verde com a palavra SAÍDA e o símbolo de uma pessoa correndo para a porta',
        brand: 'Grupo Scala',
        group: 'Orientação e salvamento',
      },
      {
        id: 'rota-de-fuga-seta',
        name: 'Placa de rota de fuga com seta',
        description:
          'Mostra a direção da saída mais próxima ao longo de corredores e salões. Há modelos com seta para todos os sentidos.',
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
        description:
          'Indica a saída e a rota adaptada para pessoas com deficiência, com o símbolo internacional de acesso.',
        image: '/produtos/sinalizacao/saida-acessivel.webp',
        imageAlt:
          'Placa fotoluminescente verde com a palavra SAÍDA, símbolo de cadeira de rodas, pessoa correndo e seta',
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
        description:
          'Placas com laudo de conformidade à ABNT NBR 16820, que comprova brilho, autonomia e marcação exigidos pela norma.',
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
        description:
          'Faixas com as letras E e H para pilares e colunas onde há extintor ou hidrante, conforme a IN 13 do CBMSC.',
        image: '/produtos/sinalizacao/extintor-hidrante-coluna.webp',
        imageAlt: 'Duas placas vermelhas com faixas amarelas, uma com a letra H e outra com a letra E em preto',
        brand: 'Grupo Scala',
        group: 'Equipamentos de combate e alarme',
      },
      {
        id: 'demarcacao-de-solo',
        name: 'Demarcação de piso para extintor',
        description:
          'Adesivo vermelho com borda amarela que marca o piso sob o extintor e lembra de manter a área livre.',
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
        imageAlt:
          'Placa com círculo vermelho cortado sobre um elevador e o texto PROIBIDO UTILIZAR O ELEVADOR EM CASO DE INCÊNDIO',
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
        description:
          'Faixas zebradas vermelho e branco ou amarelo e preto que destacam obstáculos e desníveis nas rotas de fuga.',
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
        imageAlt:
          'Rolos de fita antiderrapante preta com faixa fotoluminescente e uma escada com a fita aplicada nos degraus',
        brand: 'Grupo Scala',
        group: 'Sinalização complementar',
      },
      {
        id: 'plano-de-fuga',
        name: 'Plano de fuga',
        description:
          'Planta da edificação com as rotas de saída e os equipamentos de segurança, feita sob medida conforme a ABNT NBR 16820.',
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
    tabLabel: 'Alarme',
    intro:
      'Centrais, detectores, acionadores e sirenes que identificam um princípio de incêndio e avisam todo o prédio rapidamente, em versões convencionais, endereçáveis e analógicas.',
    cover: '/fotos/capa-alarme-1024.webp',
    coverAlt: 'Detector de fumaça aberto no teto durante a manutenção, pendurado pela fiação',
    coverPosition: '70% 50%',
    suppliers: [
      { name: 'Intelbras', url: 'https://www.intelbras.com/pt-br/seguranca-eletronica/incendio' },
      { name: 'Tecnohold', url: 'https://www.tecnohold.com.br' },
      { name: 'Ilumac', url: 'https://www.ilumac.com.br' },
    ],
    products: [
      {
        id: 'intelbras-cic-12l',
        name: 'Central de alarme convencional CIC 12L',
        description:
          'Central convencional para ambientes de pequeno e médio porte: recebe os sinais de detectores e acionadores e dispara o alarme.',
        image: '/produtos/alarme/intelbras-cic-12l.webp',
        imageAlt: 'Central de alarme de incêndio convencional Intelbras CIC 12L, vista frontal',
        brand: 'Intelbras',
        group: 'Centrais de alarme',
      },
      {
        id: 'intelbras-cie-1060',
        name: 'Central de alarme endereçável CIE 1060',
        description:
          'Central endereçável para até 60 dispositivos, configurada pelo aplicativo Programador CIE via Wi-Fi.',
        image: '/produtos/alarme/intelbras-cie-1060.webp',
        imageFit: 'cover',
        imageAlt: 'Central de alarme de incêndio endereçável Intelbras CIE 1060, vista frontal com LEDs',
        brand: 'Intelbras',
        group: 'Centrais de alarme',
      },
      {
        id: 'tecnohold-avalon-evolution-analogica',
        name: 'Central de alarme analógica Avalon Evolution',
        description: 'Central de alarme de incêndio analógica que monitora até 250 dispositivos do sistema.',
        image: '/produtos/alarme/tecnohold-avalon-evolution-analogica.webp',
        imageAlt: 'Central de alarme de incêndio analógica Tecnohold Avalon Evolution',
        brand: 'Tecnohold',
        group: 'Centrais de alarme',
      },
      {
        id: 'ilumac-kx-80',
        name: 'Central de alarme endereçável compacta KX-80',
        description: 'Central endereçável em tamanho compacto: identifica cada detector e acionador ligado a ela.',
        image: '/produtos/alarme/ilumac-kx-80.webp',
        imageAlt: 'Central de alarme de incêndio endereçável compacta Ilumac KX-80',
        brand: 'Ilumac',
        group: 'Centrais de alarme',
      },
      {
        id: 'intelbras-dfe-521',
        name: 'Detector de fumaça endereçável DFE 521',
        description:
          'Dispara ao perceber fumaça no ambiente; por ser endereçável, a central sabe exatamente qual detector acionou.',
        image: '/produtos/alarme/intelbras-dfe-521.webp',
        imageAlt: 'Detector de fumaça endereçável Intelbras DFE 521, vista frontal inclinada com LED aceso',
        brand: 'Intelbras',
        group: 'Detectores',
      },
      {
        id: 'intelbras-dfc-421',
        name: 'Detector de fumaça convencional DFC 421 UN',
        description: 'Dispara quando percebe fumaça e envia o sinal para a central de alarme de incêndio convencional.',
        image: '/produtos/alarme/intelbras-dfc-421.webp',
        imageAlt: 'Detector de fumaça convencional Intelbras DFC 421 UN, vista frontal',
        brand: 'Intelbras',
        group: 'Detectores',
      },
      {
        id: 'ilumac-dtw-c',
        name: 'Detector termovelocimétrico convencional DTW-C',
        description:
          'Detecta o aumento rápido de temperatura causado pelo fogo e avisa a central de alarme convencional.',
        image: '/produtos/alarme/ilumac-dtw-c.webp',
        imageAlt: 'Detector termovelocimétrico convencional Ilumac DTW-C',
        brand: 'Ilumac',
        group: 'Detectores',
      },
      {
        id: 'intelbras-dfl-3100',
        name: 'Detector linear de fumaça DFL 3100',
        description: 'Protege áreas amplas: detecta fumaça em espaços de 8 a 100 m de comprimento.',
        image: '/produtos/alarme/intelbras-dfl-3100.webp',
        imageAlt: 'Detector linear de fumaça Intelbras DFL 3100',
        brand: 'Intelbras',
        group: 'Detectores',
      },
      {
        id: 'ilumac-gaseg-ext',
        name: 'Detector de gás GLP GASEG EXT',
        description: 'Detecta vazamento de gás GLP, o gás de cozinha, e avisa sobre o perigo.',
        image: '/produtos/alarme/ilumac-gaseg-ext.webp',
        imageAlt: 'Detector de gás GLP Ilumac GASEG EXT',
        brand: 'Ilumac',
        group: 'Detectores',
      },
      {
        id: 'intelbras-idf-620',
        name: 'Detector de fumaça Smart IDF 620',
        description:
          'Detector de fumaça inteligente: ao perceber início de incêndio, toca um alarme e avisa no celular ou tablet pelo app.',
        image: '/produtos/alarme/intelbras-idf-620.webp',
        imageAlt: 'Detector de fumaça Smart Intelbras IDF 620',
        brand: 'Intelbras',
        group: 'Detectores',
      },
      {
        id: 'intelbras-amc-422',
        name: 'Acionador manual convencional com sirene AMC 422',
        description:
          'Botoeira 2 em 1: quando acionada numa emergência, avisa a central de alarme e ainda dispara a própria sirene.',
        image: '/produtos/alarme/intelbras-amc-422.webp',
        imageAlt: 'Acionador manual convencional com sirene Intelbras AMC 422, vista frontal com LED',
        brand: 'Intelbras',
        group: 'Acionadores manuais',
      },
      {
        id: 'tecnohold-acionador-enderecavel-ip20',
        name: 'Acionador manual endereçável IP20',
        description:
          'Botoeira “aperte aqui” para disparar o alarme com a mão, em sistemas de incêndio endereçáveis compatíveis.',
        image: '/produtos/alarme/tecnohold-acionador-enderecavel-ip20.webp',
        imageAlt: 'Acionador manual endereçável Tecnohold IP20, botoeira aperte aqui',
        brand: 'Tecnohold',
        group: 'Acionadores manuais',
      },
      {
        id: 'tecnohold-acionador-ip55-ip67',
        name: 'Acionador manual IP55 / IP67',
        description: 'Botoeira para disparar o alarme com a mão, na versão IP55/IP67, protegida contra poeira e água.',
        image: '/produtos/alarme/tecnohold-acionador-ip55-ip67.webp',
        imageAlt: 'Acionador manual de alarme de incêndio Tecnohold IP55/IP67',
        brand: 'Tecnohold',
        group: 'Acionadores manuais',
      },
      {
        id: 'intelbras-sav-420c',
        name: 'Sinalizador audiovisual convencional SAV 420C',
        description: 'Gera aviso sonoro e luminoso em um único aparelho, ligado à central de alarme convencional.',
        image: '/produtos/alarme/intelbras-sav-420c.webp',
        imageAlt: 'Sinalizador audiovisual convencional Intelbras SAV 420C',
        brand: 'Intelbras',
        group: 'Sirenes e sinalizadores',
      },
      {
        id: 'intelbras-sav-520e',
        name: 'Sinalizador audiovisual endereçável SAV 520E',
        description:
          'Une som e luz em um só aparelho para alertar as pessoas; funciona ligado a centrais endereçáveis.',
        image: '/produtos/alarme/intelbras-sav-520e.webp',
        imageAlt: 'Sinalizador audiovisual endereçável Intelbras SAV 520E, vista frontal',
        brand: 'Intelbras',
        group: 'Sirenes e sinalizadores',
      },
      {
        id: 'tecnohold-sirene-pneumatica-industrial',
        name: 'Sirene endereçável pneumática industrial',
        description: 'Sirene endereçável pneumática, de uso industrial, para avisar as pessoas em caso de incêndio.',
        image: '/produtos/alarme/tecnohold-sirene-pneumatica-industrial.webp',
        imageAlt: 'Sirene endereçável pneumática industrial Tecnohold',
        brand: 'Tecnohold',
        group: 'Sirenes e sinalizadores',
      },
      {
        id: 'ilumac-mic-e',
        name: 'Módulo isolador de curto-circuito MIC-E',
        description:
          'Isola o trecho da fiação que entrar em curto-circuito, para o resto do sistema de alarme continuar funcionando.',
        image: '/produtos/alarme/ilumac-mic-e.webp',
        imageAlt: 'Módulo isolador de curto-circuito Ilumac MIC-E',
        brand: 'Ilumac',
        group: 'Módulos e acessórios',
      },
      {
        id: 'tecnohold-modulo-zona-convencional',
        name: 'Módulo endereçável para 1 zona convencional',
        description: 'Permite ligar uma zona de detectores convencionais a uma central de alarme endereçável.',
        image: '/produtos/alarme/tecnohold-modulo-zona-convencional.webp',
        imageAlt: 'Módulo endereçável de detecção para uma zona convencional Tecnohold',
        brand: 'Tecnohold',
        group: 'Módulos e acessórios',
      },
      {
        id: 'tecnohold-mcr',
        name: 'Módulo de supervisão e comando remoto MCR',
        description:
          'Supervisiona sinais e aciona comandos à distância, integrado às centrais endereçáveis e analógicas da Tecnohold.',
        image: '/produtos/alarme/tecnohold-mcr.webp',
        imageAlt: 'Módulo de supervisão e comando remoto Tecnohold MCR',
        brand: 'Tecnohold',
        group: 'Módulos e acessórios',
      },
      {
        id: 'intelbras-fna-520',
        name: 'Fonte auxiliar FNA 520',
        description: 'Fonte de energia extra que aumenta a autonomia do sistema de alarme e detecção de incêndio.',
        image: '/produtos/alarme/intelbras-fna-520.webp',
        imageAlt: 'Fonte auxiliar Intelbras FNA 520 para sistema de alarme de incêndio, vista frontal',
        brand: 'Intelbras',
        group: 'Módulos e acessórios',
      },
      {
        id: 'intelbras-rp-520',
        name: 'Repetidora para central de alarme RP 520',
        description:
          'Mostra em outro ponto, como uma segunda portaria, os avisos registrados pela central; ideal para locais grandes.',
        image: '/produtos/alarme/intelbras-rp-520.webp',
        imageAlt: 'Repetidora para central de alarme de incêndio Intelbras RP 520, vista frontal',
        brand: 'Intelbras',
        group: 'Módulos e acessórios',
      },
      {
        id: 'tecnohold-protetor-surto-entrada-ac',
        name: 'Quadro protetor de surto para entrada AC',
        description:
          'Quadro completo que protege a entrada de energia (AC) do sistema de alarme contra surtos elétricos.',
        image: '/produtos/alarme/tecnohold-protetor-surto-entrada-ac.webp',
        imageAlt: 'Quadro completo protetor de surto para entrada AC Tecnohold',
        brand: 'Tecnohold',
        group: 'Módulos e acessórios',
      },
      {
        id: 'ilumac-cabo-de-instrumentacao',
        name: 'Cabo de instrumentação para alarme de incêndio',
        description: 'Cabo de comunicação para interligar os dispositivos da rede endereçável do sistema de alarme.',
        image: '/produtos/alarme/ilumac-cabo-de-instrumentacao.webp',
        imageAlt: 'Cabo de instrumentação Ilumac para sistema de alarme de incêndio',
        brand: 'Ilumac',
        group: 'Módulos e acessórios',
      },
      {
        id: 'ilumac-spray-de-teste',
        name: 'Spray de teste para detector de fumaça',
        description: 'Spray usado na manutenção para testar se os detectores de fumaça estão funcionando.',
        image: '/produtos/alarme/ilumac-spray-de-teste.webp',
        imageAlt: 'Spray de teste Ilumac para detector de fumaça',
        brand: 'Ilumac',
        group: 'Módulos e acessórios',
      },
    ],
  },
  {
    id: 'hidrantes',
    title: 'Hidrantes e mangotinhos',
    tabLabel: 'Hidrantes',
    intro:
      'Mangueiras, esguichos, conexões e abrigos para a rede de hidrantes do seu imóvel, além do teste hidrostático das mangueiras e da manutenção da rede.',
    cover: '/fotos/capa-hidrantes-1600.webp',
    coverAlt:
      'Hidrante com registro de volante e abrigo vermelho de mangueiras com visores, com as mangueiras brancas enroladas, em área externa com jardim',
    coverPosition: '60% 54%',
    suppliers: [], // TODO: informar fornecedor
    products: [
      {
        id: 'mangueira-de-incendio',
        name: 'Mangueira de incêndio',
        description:
          'Mangueiras de 1½" e 2½" com uniões Storz, nos tipos 1 a 5 da NBR 11861, escolhidos conforme o uso e a pressão de trabalho do sistema.',
        image: '/produtos/hidrantes/mangueira-de-incendio.webp',
        imageAlt:
          'Mangueira de incêndio vermelha enrolada, com uniões Storz de alumínio nas duas pontas, sobre piso bege',
        imageFit: 'cover',
      },
      {
        id: 'esguicho-regulavel',
        name: 'Esguicho regulável',
        description:
          'Alterna entre jato compacto e neblina e fecha a água no próprio esguicho. Com engate Storz, para mangueiras de 1½" e 2½".',
        image: '/produtos/hidrantes/esguicho-regulavel.webp',
        imageAlt:
          'Esguicho regulável com empunhadura tipo pistola e alavanca amarela de abertura, ligado a uma mangueira e preso em suporte metálico',
        imageFit: 'cover',
      },
      {
        id: 'esguicho-agulheta',
        name: 'Esguicho agulheta (jato sólido)',
        description:
          'Esguicho de latão que forma um jato compacto de longo alcance, com engate Storz e requinte do diâmetro definido em projeto.',
        image: '/produtos/hidrantes/esguicho-agulheta.webp',
        imageAlt:
          'Esguicho de jato sólido em latão, com entrada rosqueada, deitado sobre bancada de madeira e visto pela boca de entrada',
        imageFit: 'cover',
      },
      {
        id: 'conexoes-storz',
        name: 'Conexões e adaptadores Storz',
        description:
          'Uniões, adaptadores e reduções de engate rápido, em latão ou alumínio, que ligam a válvula do hidrante às mangueiras e ao esguicho.',
        image: '/produtos/hidrantes/conexoes-storz.webp',
        imageAlt:
          'Expositor de arame com uniões e adaptadores Storz em latão e alumínio e, ao fundo, registros com volante vermelho',
        imageFit: 'cover',
      },
      {
        id: 'tampao-storz',
        name: 'Tampão Storz com corrente',
        description:
          'Fecha a saída da válvula de hidrante ou do registro de recalque quando não há mangueira acoplada, protegendo o engate.',
        image: '/produtos/hidrantes/tampao-storz.webp',
        imageAlt:
          'Saída de hidrante em tubulação vermelha com engate Storz de alumínio fechado por tampão preso por corrente',
        imageFit: 'cover',
      },
      {
        id: 'chave-storz',
        name: 'Chave de mangueira (chave Storz)',
        description:
          'Ajuda a engatar e desengatar uniões, adaptadores e tampões Storz sem danificar os engates. Fica no abrigo, junto às mangueiras.',
        image: '',
        imageAlt: 'Chave de mangueira para engates Storz',
      },
      {
        id: 'abrigo-para-mangueira',
        name: 'Abrigo para mangueira',
        description:
          'Caixa metálica vermelha que guarda mangueiras, esguicho e chave junto ao ponto de hidrante. Modelos de sobrepor, de embutir e para área externa.',
        image: '/produtos/hidrantes/abrigo-para-mangueira.webp',
        imageAlt:
          'Abrigo de mangueira vermelho sobre pedestal, ao ar livre, com placa "Hydrant No 8" e a inscrição "Hose Box" na porta, entre folhagens',
        imageFit: 'cover',
      },
      {
        id: 'registro-globo-angular-45',
        name: 'Registro globo angular 45°',
        description:
          'Válvula do ponto de hidrante, em latão ou bronze, com saída inclinada que facilita acoplar e lançar a mangueira.',
        image: '',
        imageAlt: 'Registro globo angular de 45° para hidrante',
      },
      {
        id: 'mangotinho-carretel',
        name: 'Mangotinho (carretel axial)',
        description:
          'Carretel com mangueira semirrígida e esguicho, pronto para uso: uma só pessoa consegue operar sem desenrolar toda a mangueira.',
        image: '/produtos/hidrantes/mangotinho-carretel.webp',
        imageAlt:
          'Mangotinho em abrigo vermelho aberto: carretel vermelho com mangueira semirrígida preta ligada à válvula de alimentação',
        imageFit: 'cover',
      },
      {
        id: 'registro-de-recalque',
        name: 'Hidrante de recalque',
        description:
          'Registro no passeio ou na fachada por onde o Corpo de Bombeiros abastece a rede de hidrantes a partir da viatura.',
        image: '',
        imageAlt: 'Hidrante de recalque instalado no passeio',
      },
    ],
  },
  {
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
    products: [
      {
        id: 'luxpryme-slim-premium',
        name: 'Luminária autônoma Slim Premium',
        description:
          'Luminária de emergência fina e discreta, da linha Premium, com bateria própria: acende sozinha quando falta energia.',
        image: '/produtos/iluminacao/luxpryme-slim-premium.webp',
        imageAlt: 'Luminária de emergência autônoma Slim Premium da Luxpryme, de perfil fino',
        brand: 'Luxpryme',
        group: 'Luminárias autônomas',
      },
      {
        id: 'luxpryme-compacta-basic-embutir',
        name: 'Luminária compacta autônoma Basic de embutir',
        description:
          'Luminária compacta para embutir, com bateria própria, que acende sozinha quando a energia cai. Linha Basic.',
        image: '/produtos/iluminacao/luxpryme-compacta-basic-embutir.webp',
        imageAlt: 'Luminária de emergência compacta autônoma Basic de embutir da Luxpryme',
        brand: 'Luxpryme',
        group: 'Luminárias autônomas',
      },
      {
        id: 'luxpryme-mini-compacta-basic',
        name: 'Luminária mini compacta autônoma Basic',
        description:
          'Luminária de emergência bem pequena e discreta, com bateria própria. Acende sozinha na falta de energia.',
        image: '/produtos/iluminacao/luxpryme-mini-compacta-basic.webp',
        imageAlt: 'Luminária de emergência mini compacta autônoma Basic da Luxpryme',
        brand: 'Luxpryme',
        group: 'Luminárias autônomas',
      },
      {
        id: 'luxpryme-mini-bloco-basic',
        name: 'Mini bloco autônomo Basic',
        description:
          'Bloco de iluminação de emergência compacto, com bateria própria, para clarear rotas de fuga quando a energia acaba.',
        image: '/produtos/iluminacao/luxpryme-mini-bloco-basic.webp',
        imageAlt: 'Mini bloco autônomo de iluminação de emergência Luxpryme, linha Basic',
        brand: 'Luxpryme',
        group: 'Blocos autônomos',
      },
      {
        id: 'luxpryme-nano-bloco-basic',
        name: 'Nano bloco autônomo Basic',
        description:
          'Bloco de emergência de tamanho bem reduzido, com bateria própria, que acende sozinho quando falta energia.',
        image: '/produtos/iluminacao/luxpryme-nano-bloco-basic.webp',
        imageAlt: 'Nano bloco autônomo de iluminação de emergência Luxpryme, linha Basic',
        brand: 'Luxpryme',
        group: 'Blocos autônomos',
      },
      {
        id: 'luxpryme-bloco-3000-basic',
        name: 'Bloco autônomo 3000 Basic',
        description:
          'Bloco de iluminação de emergência da linha Basic, com bateria própria, que acende sozinho quando falta energia.',
        image: '/produtos/iluminacao/luxpryme-bloco-3000-basic.webp',
        imageAlt: 'Bloco autônomo de iluminação de emergência Luxpryme Bloco 3000, linha Basic',
        brand: 'Luxpryme',
        group: 'Blocos autônomos',
      },
      {
        id: 'luxpryme-csb-400',
        name: 'Central de iluminação 12 V 400 W CSB-400',
        description:
          'Central que mantém acesas as luminárias ligadas a ela quando falta energia, usando bateria externa de 12 V.',
        image: '/produtos/iluminacao/luxpryme-csb-400.webp',
        imageAlt: 'Central de iluminação de emergência Luxpryme CSB-400, 12 V e 400 W',
        brand: 'Luxpryme',
        group: 'Sistema centralizado',
      },
      {
        id: 'luxpryme-lcce-300',
        name: 'Luminária compacta de embutir 12/24 V LCCE-300',
        description:
          'Luminária para sistema com central, que pode ser embutida em caixa elétrica 4x2. Ideal para escritórios, halls e escadarias.',
        image: '/produtos/iluminacao/luxpryme-lcce-300.webp',
        imageAlt: 'Luminária de emergência compacta de embutir Luxpryme LCCE-300, para sistema centralizado',
        brand: 'Luxpryme',
        group: 'Sistema centralizado',
      },
      {
        id: 'luxpryme-lcf-3020-blk',
        name: 'Luminária triplo farol Black LCF-3020BLK',
        description:
          'Luminária de três faróis ligada à central de iluminação, indicada para ambientes amplos de até 500 m².',
        image: '/produtos/iluminacao/luxpryme-lcf-3020-blk.webp',
        imageAlt: 'Luminária de emergência triplo farol Luxpryme LCF-3020BLK, versão Black',
        brand: 'Luxpryme',
        group: 'Sistema centralizado',
      },
      {
        id: 'luxpryme-duplo-farol-lcf',
        name: 'Luminária duplo farol LCF (opção IP-66)',
        description:
          'Luminária de dois faróis para sistema com central, com opção de proteção IP-66 contra poeira e água. Até 300 m².',
        image: '/produtos/iluminacao/luxpryme-duplo-farol-lcf.webp',
        imageAlt: 'Luminária de emergência duplo farol Luxpryme, linha LCF',
        brand: 'Luxpryme',
        group: 'Áreas externas e industriais (IP66/IP67)',
      },
      {
        id: 'luxpryme-slim-lsc-ip67',
        name: 'Luminária Slim 12/24 V LSC (IP-67)',
        description:
          'Luminária slim de apenas 2,4 cm de espessura, com proteção IP-67 contra poeira e água, para sistema com central de iluminação.',
        image: '/produtos/iluminacao/luxpryme-slim-lsc-ip67.webp',
        imageAlt: 'Luminária de emergência Slim 12/24 V Luxpryme, linha náutica com proteção IP-67',
        brand: 'Luxpryme',
        group: 'Áreas externas e industriais (IP66/IP67)',
      },
      {
        id: 'luxpryme-pps-p-2617',
        name: 'Placa de saída 26x17 Premium PPS.P-2617',
        description: 'Placa de saída iluminada em acrílico, com bateria que mantém o brilho quando falta energia.',
        image: '/produtos/iluminacao/luxpryme-pps-p-2617.webp',
        imageAlt: 'Placa de saída de emergência iluminada Luxpryme 26x17 Premium',
        brand: 'Luxpryme',
        group: 'Placas de saída iluminadas',
      },
      {
        id: 'luxpryme-pcs-b-2617',
        name: 'Placa de saída 26x17 12/24 V PCS.B-2617',
        description:
          'Placa de saída iluminada para ligar à central de iluminação. Vem com kit de instalação e setas adesivas.',
        image: '/produtos/iluminacao/luxpryme-pcs-b-2617.webp',
        imageAlt: 'Placa de saída de emergência iluminada Luxpryme 26x17 PCS.B-2617, para sistema centralizado',
        brand: 'Luxpryme',
        group: 'Placas de saída iluminadas',
      },
    ],
  },
  {
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
    products: [
      {
        id: 'extintor-po-abc',
        name: 'Extintor de pó químico ABC',
        description:
          'O mais versátil: serve para fogos classe A (sólidos), B (líquidos inflamáveis) e C (equipamentos elétricos energizados).',
        image: '/produtos/extintores/extintor-po-abc.webp',
        imageAlt:
          'Extintor de pó químico vermelho com mangueira preta e manômetro, apoiado no chão junto a uma parede branca',
      },
      {
        id: 'extintor-po-bc',
        name: 'Extintor de pó químico BC',
        description:
          'Para fogo em líquidos e gases inflamáveis (classe B) e em equipamentos elétricos energizados (classe C). Comum em centrais de gás e garagens.',
        image: '/produtos/extintores/extintor-po-bc.webp',
        imageAlt:
          'Extintor de pó químico vermelho com gatilho preto e mangueira longa bege, apoiado no chão em frente a uma parede clara',
      },
      {
        id: 'extintor-co2',
        name: 'Extintor de CO2',
        description:
          'Apaga por abafamento sem deixar resíduos. Indicado para fogos classe B e C, como painéis elétricos, salas de TI e laboratórios.',
        image: '/produtos/extintores/extintor-co2.webp',
        imageAlt: 'Extintor de CO2 vermelho com mangueira e difusor preto, fixado na parede',
      },
      {
        id: 'extintor-agua-pressurizada',
        name: 'Extintor de água pressurizada',
        description:
          'Para fogos classe A (madeira, papel, tecidos), age por resfriamento. Não deve ser usado em equipamentos elétricos energizados.',
        image: '/produtos/extintores/extintor-agua-pressurizada.webp',
        imageAlt: 'Extintor de água pressurizada vermelho, com a palavra WATER no rótulo, pendurado na parede',
      },
      {
        id: 'extintor-espuma-mecanica',
        name: 'Extintor de espuma mecânica',
        description:
          'Forma uma camada de espuma sobre o combustível. Indicado para fogos classe A e B, em especial líquidos inflamáveis.',
        image: '/produtos/extintores/extintor-espuma-mecanica.webp',
        imageAlt:
          'Extintor de espuma mecânica vermelho com mangueira azul-escura e ponteira verde, fixado na parede branca',
      },
      {
        id: 'extintor-classe-k',
        name: 'Extintor classe K',
        description:
          'Feito para fogo em óleo e gordura de cozinha. Indicado para cozinhas industriais, restaurantes e lanchonetes.',
        image: '/produtos/extintores/extintor-classe-k.webp',
        imageAlt: 'Extintor classe K de aço inox com mangueira preta e rótulo de instruções, sobre fundo branco',
      },
      {
        id: 'extintor-sobre-rodas',
        name: 'Extintor sobre rodas (carreta)',
        description:
          'Extintor de grande capacidade em carreta com rodas, para indústrias, depósitos, pátios e postos de combustível.',
        image: '/produtos/extintores/extintor-sobre-rodas.webp',
        imageAlt: 'Dois extintores sobre rodas de pó químico, vermelhos, lado a lado em um corredor',
        imageFit: 'cover',
      },
      {
        id: 'suporte-parede-extintor',
        name: 'Suporte de parede para extintor',
        description: 'Fixa o extintor na parede na altura correta, visível e fácil de retirar numa emergência.',
        image: '',
        imageAlt: 'Suporte de parede para extintor',
      },
      {
        id: 'suporte-piso-extintor',
        name: 'Suporte de piso para extintor',
        description:
          'Base que mantém o extintor estável sem furar a parede, ideal para divisórias de vidro ou drywall. Modelos para um ou dois extintores.',
        image: '/produtos/extintores/suporte-piso-extintor.webp',
        imageAlt:
          'Suporte de piso duplo vermelho com um extintor de água e um de CO2, encostado na parede de um corredor',
        imageFit: 'cover',
      },
    ],
  },
]
