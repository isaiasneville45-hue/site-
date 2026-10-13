import type { ProductCategory } from './index'

// Gerado a partir do levantamento nos catálogos/sites dos fornecedores. Revise antes de editar à mão.
export const hidrantes: ProductCategory = {
  id: "hidrantes",
  title: "Hidrantes e mangotinhos",
  tabLabel: "Hidrantes",
  intro: "Mangueiras, esguichos, conexões e abrigos para a rede de hidrantes do seu imóvel, além do teste hidrostático das mangueiras e da manutenção da rede.",
  suppliers: [{"name": "Segurimax", "url": "https://www.segurimax.com.br/hidrante-de-incendio/mangueira-de-incendio"}, {"name": "Mocelin", "url": "https://mocelin.ind.br"}, {"name": "Metasal", "url": "https://metasal.com.br/incendio/"}],
  groups: ["Mangueiras", "Abrigos", "Esguichos", "Conexões e acessórios", "Válvulas", "Mangotinhos"],
  products: [
    // TODO confirmar: A página só vende diâmetro 1½" (sem 2½"); a base do cliente previa 1½" e 2½".
    // TODO confirmar: Existe também lance de 30 m (não estava na base do cliente).
    // TODO confirmar: A foto principal (arquivo 35946-mangueira-incendio-industrial-ul) é a mesma usada nas páginas Tipo 2 e Tipo 3: imagem genérica da linha.
    {
      id: "segurimax-mangueira-tipo-1",
      name: "Mangueira de Incêndio Predial TIPO 1",
      code: "MAN-TP1",
      supplier: "Segurimax",
      group: "Mangueiras",
      description: "Mangueira de incêndio tipo 1 (predial), com pressão de trabalho de 10 kgf/cm² (980 kPa), tubo interno de borracha sintética, revestimento 100% poliéster e uniões Storz de latão. É o tipo indicado pelo fabricante para edifícios de ocupação residencial, ligada ao sistema de hidrantes do prédio. Tem a menor pressão de trabalho dos três tipos e certificação INMETRO/UL.",
      specs: ["Pressão de trabalho 10 kgf/cm² (980 kPa)", "Pressão de prova 21 kgf/cm² · ruptura > 35 kgf/cm²", "Aplicação: edifícios de ocupação residencial", "NBR 11861 · NBR 14349 · INMETRO/UL"],
      sizes: ["1½″ × 15 m", "1½″ × 20 m", "1½″ × 30 m"],
      materials: ["Revestimento têxtil 100% poliéster", "Tubo interno em borracha sintética", "Uniões Storz em liga de latão"],
      image: "/produtos/hidrantes/segurimax-mangueira-tipo-1.webp",
      imageAlt: "Mangueira de incêndio enrolada com uniões Storz de latão nas pontas",
      sourceUrl: "https://www.segurimax.com.br/hidrante-de-incendio/mangueira-de-incendio-predial-tipo-1",
    },
    // TODO confirmar: Há marcação 'Indisponível' junto da opção 1½" × 30 m (SKU 1600017_0006) — confirmar estoque.
    // TODO confirmar: Lances de 30 m existem além dos 15 m e 20 m da base do cliente.
    // TODO confirmar: Página: 'O produto é comercializado em paletes fechados'.
    // TODO confirmar: Foto principal genérica (mesma das páginas Tipo 1 e Tipo 3).
    {
      id: "segurimax-mangueira-tipo-2",
      name: "Mangueira de Incêndio Industrial TIPO 2",
      code: "MAN-TP2",
      supplier: "Segurimax",
      group: "Mangueiras",
      description: "Mangueira de incêndio tipo 2, com pressão de trabalho de 14 kgf/cm² (1370 kPa), tubo interno de borracha sintética, revestimento 100% poliéster e uniões Storz de latão. É indicada para edifícios de ocupação comercial e industrial e para uso do Corpo de Bombeiros. Segundo o fabricante, a diferença para o tipo 1 é a pressão maior (14 contra 10 kgf/cm²) e uma construção mais robusta.",
      specs: ["Pressão de trabalho 14 kgf/cm² (1370 kPa)", "Pressão de prova 28 kgf/cm² · ruptura > 42 kgf/cm²", "Aplicação: comercial, industrial e Corpo de Bombeiros", "NBR 11861 · NBR 14349 · INMETRO/UL"],
      sizes: ["1½″ × 15 m", "1½″ × 20 m", "1½″ × 30 m", "2½″ × 15 m", "2½″ × 20 m", "2½″ × 30 m"],
      materials: ["Revestimento têxtil 100% poliéster", "Tubo interno em borracha sintética", "Uniões Storz em liga de latão"],
      image: "/produtos/hidrantes/segurimax-mangueira-tipo-2.webp",
      imageAlt: "Mangueira de incêndio enrolada com uniões Storz de latão nas pontas",
      sourceUrl: "https://www.segurimax.com.br/hidrante-de-incendio/mangueira-de-incendio-industrial-tipo-2",
    },
    // TODO confirmar: Há marcação 'Indisponível' junto da opção 1½" × 20 m (SKU 1600008_0006) — confirmar estoque.
    // TODO confirmar: Página: 'Produto comercializado em paletes fechados'; todas as mangueiras passam por teste de estanqueidade antes da venda.
    // TODO confirmar: Foto principal genérica (mesma das páginas Tipo 1 e Tipo 2); há uma foto 'tipo-3-a' na galeria, usada como 1º fallback.
    {
      id: "segurimax-mangueira-tipo-3",
      name: "Mangueira de Incêndio Industrial TIPO 3",
      code: "MAN-TP3",
      supplier: "Segurimax",
      group: "Mangueiras",
      description: "Mangueira de incêndio tipo 3, com pressão de trabalho de 15 kgf/cm² (1470 kPa), revestimento 100% poliéster de camada dupla, tubo interno de borracha sintética e uniões Storz de latão. É indicada para área naval, indústrias e Corpo de Bombeiros, para uso externo e áreas de risco elevado em que a rede de incêndio trabalha com pressão maior. A camada dupla do revestimento dá mais resistência à abrasão e ao desgaste.",
      specs: ["Pressão de trabalho 15 kgf/cm² (1470 kPa)", "Pressão de prova 30 kgf/cm² · ruptura > 50 kgf/cm²", "Revestimento de camada dupla", "NBR 11861 · NBR 14349 · INMETRO/UL"],
      sizes: ["1½″ × 15 m", "1½″ × 20 m", "2½″ × 15 m", "2½″ × 20 m"],
      materials: ["Revestimento têxtil 100% poliéster de camada dupla", "Tubo interno em borracha sintética", "Uniões Storz em liga de latão"],
      image: "/produtos/hidrantes/segurimax-mangueira-tipo-3.webp",
      imageAlt: "Mangueira de incêndio enrolada com uniões Storz de latão nas pontas",
      sourceUrl: "https://www.segurimax.com.br/hidrante-de-incendio/mangueira-de-incendio-industrial-tipo-3",
    },
    // TODO confirmar: Foto não conferida visualmente (ambiente sem internet): a URL está literalmente no card do produto na página de categoria; confirmar se a imagem mostra este tipo/diâmetro, se tem fundo limpo e se tem >= 500 px.
    // TODO confirmar: imageAlt escrito a partir do manual (cor branca, uniões Storz); ajustar ao que a foto realmente mostra.
    // TODO confirmar: A página do produto (sourceUrl) não foi baixada; só as páginas antigas de variação (-255…-265, sem imagem) e a página de categoria.
    // TODO confirmar: Site descreve o produto como '1.1/2" - 38MM'; o manual fala em conexões de diâmetro nominal 40 mm. Usei DN 40 (manual).
    // TODO confirmar: Nome do site diz 'certificada'; número do registro/selo Inmetro não aparece nos dados.
    {
      id: "mocelin-mangueira-tipo-1-40mm",
      name: "Mangueira de incêndio Tipo 1 (predial) 1½″",
      supplier: "Mocelin",
      group: "Mangueiras",
      description: "Mangueira de incêndio Tipo 1 de 1½″ (DN 40), com reforço têxtil de poliéster, tubo interno de borracha sintética e uniões de engate rápido Storz. Indicada pelo fabricante para áreas prediais: edifícios e condomínios residenciais. Pressão de trabalho de 10 kgf/cm² e ruptura acima de 35 kgf/cm², conforme a ABNT NBR 11861.",
      specs: ["Trabalho 10 kgf/cm² (980 kPa) · ruptura > 35 kgf/cm² (3430 kPa)", "Prova 21 kgf/cm² (2060 kPa) · ensaio de manutenção 12 kgf/cm²", "Uniões Storz · DN 40 (1½″)", "ABNT NBR 11861:1998 · Portaria Inmetro 547/2022"],
      sizes: ["15 m", "20 m", "25 m", "30 m"],
      materials: ["Reforço têxtil 100% em fio de poliéster de alta tenacidade, tecimento diagonal (sarja), na cor branca", "Tubo interno de borracha sintética"],
      image: "/produtos/hidrantes/mocelin-mangueira-tipo-1-40mm.webp",
      imageAlt: "Mangueira de incêndio branca Tipo 1 de 1½ polegada da Mocelin, com uniões de engate rápido Storz",
      sourceUrl: "https://mocelin.ind.br/pt/mangueiras-e-mangotinho/mangueiras-de-incendio/mangueira-de-incendio-tipo-1-predial-1.12--certificada",
    },
    // TODO confirmar: Foto não conferida visualmente (ambiente sem internet): a URL está literalmente no card do produto na página de categoria; confirmar se a imagem mostra este tipo/diâmetro, se tem fundo limpo e se tem >= 500 px.
    // TODO confirmar: imageAlt escrito a partir do manual (cor branca, uniões Storz); ajustar ao que a foto realmente mostra.
    // TODO confirmar: A página do produto (sourceUrl) não foi baixada; só as páginas antigas de variação (-255…-265, sem imagem) e a página de categoria.
    // TODO confirmar: Site descreve o produto como '1.1/2" - 38MM'; o manual fala em conexões de diâmetro nominal 40 mm. Usei DN 40 (manual).
    // TODO confirmar: Nome do site diz 'certificada'; número do registro/selo Inmetro não aparece nos dados.
    {
      id: "mocelin-mangueira-tipo-2-40mm",
      name: "Mangueira de incêndio Tipo 2 (industrial) 1½″",
      supplier: "Mocelin",
      group: "Mangueiras",
      description: "Mangueira de incêndio Tipo 2 de 1½″ (DN 40), com reforço têxtil de poliéster, tubo interno de borracha sintética e uniões de engate rápido Storz. Indicada pelo fabricante para áreas comerciais e industriais e para uso do Corpo de Bombeiros. Trabalha a 14 kgf/cm², com ruptura acima de 42 kgf/cm², conforme a ABNT NBR 11861.",
      specs: ["Trabalho 14 kgf/cm² (1370 kPa) · ruptura > 42 kgf/cm² (4120 kPa)", "Prova 28 kgf/cm² (2745 kPa) · ensaio de manutenção 17 kgf/cm²", "Uniões Storz · DN 40 (1½″)", "ABNT NBR 11861:1998 · Portaria Inmetro 547/2022"],
      sizes: ["15 m", "20 m", "25 m", "30 m"],
      materials: ["Reforço têxtil 100% em fio de poliéster de alta tenacidade, tecimento diagonal (sarja), na cor branca", "Tubo interno de borracha sintética"],
      image: "/produtos/hidrantes/mocelin-mangueira-tipo-2-40mm.webp",
      imageAlt: "Mangueira de incêndio branca Tipo 2 de 1½ polegada da Mocelin, com uniões de engate rápido Storz",
      sourceUrl: "https://mocelin.ind.br/pt/mangueiras-e-mangotinho/mangueiras-de-incendio/mangueira-de-incendio-tipo-2-industrial-1.12--certificada",
    },
    // TODO confirmar: Foto não conferida visualmente (ambiente sem internet): a URL está literalmente no card do produto na página de categoria; confirmar se a imagem mostra este tipo/diâmetro, se tem fundo limpo e se tem >= 500 px.
    // TODO confirmar: imageAlt escrito a partir do manual (cor branca, uniões Storz); ajustar ao que a foto realmente mostra.
    // TODO confirmar: A página do produto (sourceUrl) não foi baixada; só as páginas antigas de variação (-255…-265, sem imagem) e a página de categoria.
    // TODO confirmar: Título do site diz 'com 15 metros', mas a mesma página lista variações de 15, 20, 25 e 30 m (e o manual também); confirmar se todos os comprimentos estão em linha.
    // TODO confirmar: Site descreve o produto como '2.1/2" - 63MM'; o manual fala em diâmetro nominal 65 mm. Usei DN 65 (manual).
    // TODO confirmar: Nome do site diz 'certificada'; número do registro/selo Inmetro não aparece nos dados.
    {
      id: "mocelin-mangueira-tipo-2-65mm",
      name: "Mangueira de incêndio Tipo 2 (industrial) 2½″",
      supplier: "Mocelin",
      group: "Mangueiras",
      description: "Mangueira de incêndio Tipo 2 de 2½″ (DN 65), com reforço têxtil de poliéster, tubo interno de borracha sintética e uniões de engate rápido Storz. Indicada pelo fabricante para áreas comerciais e industriais e para uso do Corpo de Bombeiros, nas redes de hidrantes projetadas para 2½″. Trabalha a 14 kgf/cm², com ruptura acima de 42 kgf/cm², conforme a ABNT NBR 11861.",
      specs: ["Trabalho 14 kgf/cm² (1370 kPa) · ruptura > 42 kgf/cm² (4120 kPa)", "Prova 28 kgf/cm² (2745 kPa) · ensaio de manutenção 17 kgf/cm²", "Uniões Storz · DN 65 (2½″)", "ABNT NBR 11861:1998 · Portaria Inmetro 547/2022"],
      sizes: ["15 m", "20 m", "25 m", "30 m"],
      materials: ["Reforço têxtil 100% em fio de poliéster de alta tenacidade, tecimento diagonal (sarja), na cor branca", "Tubo interno de borracha sintética"],
      image: "/produtos/hidrantes/mocelin-mangueira-tipo-2-65mm.webp",
      imageAlt: "Mangueira de incêndio branca Tipo 2 de 2½ polegadas da Mocelin, com uniões de engate rápido Storz",
      sourceUrl: "https://mocelin.ind.br/pt/mangueiras-e-mangotinho/mangueiras-de-incendio/mangueira-de-incendio-tipo-2-industrial-2.12--certificada",
    },
    {
      id: "metasal-abrigo-mangueira-sobrepor",
      name: "Abrigo para mangueira de incêndio tipo sobrepor",
      code: "137 · 140 · 738 · 1004 · 130 · 190",
      supplier: "Metasal",
      group: "Abrigos",
      description: "Abrigo de sobrepor em chapa de aço para mangueiras de incêndio, fixado na face da parede. Indicado para pontos de hidrante em paredes onde não é possível embutir a caixa. Fabricado em seis medidas, de 75 × 45 × 17 cm (2 mangueiras prediais de 1½″ × 15 m) a 90 × 80 × 30 cm (2 mangueiras industriais de 2½″ × 30 m).",
      specs: ["Instalação de sobrepor · chapa de aço", "Capacidade: 2 ou 4 mangueiras de 1½″ ou 2½″ (15 ou 30 m), conforme a medida", "6 medidas de catálogo"],
      sizes: ["75 × 45 × 17 cm · cód. 137 (2 mang. prediais 1½″ × 15 m)", "90 × 60 × 17 cm · cód. 140 (2 mang. ind. 1½″ × 15 m)", "90 × 60 × 23 cm · cód. 738 (2 mang. ind. 1½″ × 15 m)", "90 × 60 × 30 cm · cód. 1004 (4 mang. ind. 1½″ × 15 m)", "90 × 80 × 17 cm · cód. 130 (2 mang. ind. 1½″ × 30 m)", "90 × 80 × 30 cm · cód. 190 (2 mang. ind. 2½″ × 30 m)"],
      materials: ["Chapa de aço"],
      image: "/produtos/hidrantes/metasal-abrigo-mangueira-sobrepor.webp",
      imageAlt: "Abrigo vermelho de sobrepor para mangueira de incêndio, com porta de visor redondo e venezianas de ventilação",
      sourceUrl: "https://metasal.com.br/produto/abrigo-para-mangueira-de-incendio-tipo-sobrepor/",
    },
    // TODO confirmar: Cesto basculante: catálogo cita cód. 178 (45×45×24), 215 (45×45×12), 'xxx' (35×35×24) e 685 (35×35×12) — não incluídos como produto
    {
      id: "metasal-abrigo-mangueira-embutir",
      name: "Abrigo para mangueira de incêndio – embutir em chapa de aço",
      code: "38 · 43 · 523 · 226 · 95 · 515",
      supplier: "Metasal",
      group: "Abrigos",
      description: "Abrigo de embutir em chapa de aço para mangueiras de incêndio, instalado dentro da alvenaria. Indicado para corredores e áreas de circulação onde a caixa não deve ficar saliente na parede. Segundo o catálogo, é fabricado com cesto meia-lua fixo, e o cesto basculante com presilha é opcional sob encomenda.",
      specs: ["Instalação de embutir · chapa de aço", "Cesto meia-lua fixo (basculante com presilha sob encomenda)", "Capacidade: 2 ou 4 mangueiras de 1½″ ou 2½″ (15 ou 30 m), conforme a medida"],
      sizes: ["75 × 45 × 17 cm · cód. 38 (2 mang. prediais 1½″ × 15 m)", "90 × 60 × 17 cm · cód. 43 (2 mang. ind. 1½″ × 15 m)", "90 × 60 × 23 cm · cód. 523 (2 mang. ind. 1½″ × 15 m)", "90 × 60 × 30 cm · cód. 226 (4 mang. ind. 1½″ × 15 m)", "90 × 80 × 17 cm · cód. 95 (2 mang. ind. 1½″ × 30 m)", "90 × 80 × 30 cm · cód. 515 (2 mang. ind. 2½″ × 30 m)"],
      materials: ["Chapa de aço"],
      image: "/produtos/hidrantes/metasal-abrigo-mangueira-embutir.webp",
      imageAlt: "Abrigo vermelho de embutir para mangueira de incêndio em chapa de aço, com porta de visor redondo",
      sourceUrl: "https://metasal.com.br/produto/abrigo-mangueira-de-incendio-embutir-em-chapa-de-aco/",
    },
    // TODO confirmar: Site lista '02 mang. ind. de 2 1/2" de 15 mts.' duas vezes; catálogo indica 4 mangueiras na profundidade 300 mm — usado o catálogo
    {
      id: "metasal-abrigo-mangueira-2-portas",
      name: "Abrigo para mangueira de incêndio – em chapa de aço | 2 portas",
      code: "1157 · 1158 · 44 · 82",
      supplier: "Metasal",
      group: "Abrigos",
      description: "Abrigo de duas portas em chapa de aço, com pé e pingadeira, para mangueiras industriais de 2½″. Indicado para hidrantes que pedem duas ou quatro mangueiras no mesmo ponto, como galpões e indústrias. Versões de sobrepor e de embutir com 120 cm de largura, fabricadas sob encomenda.",
      specs: ["2 portas · com pé e pingadeira", "Sobrepor ou embutir · sob encomenda", "Capacidade: 2 ou 4 mangueiras ind. de 2½″ × 15 m"],
      sizes: ["90 × 120 × 17 cm · sobrepor cód. 1157 / embutir cód. 44 (2 mang. ind. 2½″ × 15 m)", "90 × 120 × 30 cm · sobrepor cód. 1158 / embutir cód. 82 (4 mang. ind. 2½″ × 15 m)"],
      materials: ["Chapa de aço"],
      image: "/produtos/hidrantes/metasal-abrigo-mangueira-2-portas.webp",
      imageAlt: "Abrigo vermelho de duas portas para mangueiras de incêndio, com visores redondos nas portas",
      sourceUrl: "https://metasal.com.br/produto/abrigo-para-mangueira-de-incendio-em-chapa-de-aco-2-portas/",
    },
    // TODO confirmar: Códigos de vidro temperado liso (catálogo p. 13): 137/6, 137/7, 557/3, 123/4, 242, 187/7, 189, 141/7, 141 — 'xxx' para embutir 75x45x17; conferir antes de publicar
    // TODO confirmar: Foto principal escolhida pelo nome do arquivo (não foi possível abrir as imagens offline)
    {
      id: "metasal-abrigo-mangueira-porta-de-vidro",
      name: "Abrigo para mangueira de incêndio tipo embutir ou sobrepor com porta de vidro",
      code: "Temp. jateado: 38/3 · 38/14 · 38/8 · 160/1 · 137/3 · 557/2 · 123 · 187/4 · 489/3 · 189/2 · 141/2 · 141/5",
      supplier: "Metasal",
      group: "Abrigos",
      description: "Abrigo para mangueira de incêndio com porta de vidro temperado (liso ou jateado), para embutir ou sobrepor. Indicado para halls, áreas comuns e fachadas internas em que o equipamento precisa ficar visível. Disponível em aço vermelho e em aço inox 304 ou 430, em duas medidas, com capacidade para 2 mangueiras de 15 a 20 m.",
      specs: ["Porta de vidro temperado liso ou jateado", "Embutir ou sobrepor · aço vermelho, inox 304 ou 430", "Capacidade: 2 mangueiras de 15 a 20 m"],
      sizes: ["75 × 45 × 17 cm", "90 × 60 × 17 cm"],
      materials: ["Chapa de aço carbono (vermelho)", "Aço inox 304", "Aço inox 430", "Vidro temperado liso ou jateado"],
      image: "/produtos/hidrantes/metasal-abrigo-mangueira-porta-de-vidro.webp",
      imageAlt: "Abrigo para mangueira de incêndio com porta de vidro e inscrição incêndio",
      sourceUrl: "https://metasal.com.br/produto/abrigo-para-mangueira-de-incendio-tipo-embutir-ou-sobrepor-com-porta-de-vidro/",
    },
    // TODO confirmar: A página do site também lista 'Medida SOBR/EMB 900×1200×170 e ×300' (medidas do modelo de 2 portas/porta de vidro em inox) — não incluídas aqui; confirmar com o fornecedor
    // TODO confirmar: Catálogo traz 'xxx' (sem código) para porta inox 430 sobrepor 75x45x17 e para as versões em aço vermelho
    {
      id: "metasal-abrigo-mangueira-inox-1-porta",
      name: "Abrigo para mangueira de incêndio sobrepor e embutir em aço inox – 1 porta",
      code: "38/2 · 557 · 137/4 · 745 · 187/2 · 109/3 · 109/2",
      supplier: "Metasal",
      group: "Abrigos",
      description: "Abrigo para mangueira de incêndio de uma porta em aço inox 304 ou 430, para sobrepor ou embutir. Indicado para ambientes com acabamento em inox ou expostos à umidade, como cozinhas industriais e áreas de higienização. Fabricado sob encomenda nas medidas 75 × 45 × 17 cm e 90 × 60 × 17 cm, com outras medidas a combinar.",
      specs: ["Porta inox · sobrepor ou embutir", "Aço inox 304 ou 430 sob encomenda (opcional em aço vermelho)", "Outras medidas a combinar"],
      sizes: ["75 × 45 × 17 cm · inox 304 embutir 38/2 · inox 430 embutir 557 · inox 304 sobrepor 137/4", "90 × 60 × 17 cm · inox 304 embutir 745 · inox 430 embutir 187/2 · inox 304 sobrepor 109/3 · inox 430 sobrepor 109/2"],
      materials: ["Aço inox 304", "Aço inox 430", "Chapa de aço carbono (opcional, vermelho)"],
      image: "/produtos/hidrantes/metasal-abrigo-mangueira-inox-1-porta.webp",
      imageAlt: "Abrigo em aço inox para mangueira de incêndio, de uma porta, para embutir ou sobrepor",
      sourceUrl: "https://metasal.com.br/produto/abrigo-para-mangueira-de-incendio-sobrepor-e-embutir-em-aco-inox-1-porta/",
    },
    // TODO confirmar: Sem código no catálogo para estas medidas
    // TODO confirmar: Item não estava na lista-base; incluído por ser página própria do site — remover se for duplicado do abrigo com porta de vidro
    {
      id: "metasal-abrigo-mangueira-inox-porta-de-vidro",
      name: "Abrigo para mangueira de incêndio tipo embutir ou sobrepor em aço inox com porta de vidro",
      supplier: "Metasal",
      group: "Abrigos",
      description: "Abrigo de maior largura em aço inox ou chapa de aço carbono com porta de vidro, para embutir ou sobrepor, para mangueiras industriais de 2½″. Indicado para pontos de hidrante com 2 ou 4 mangueiras em áreas onde se quer acabamento em inox. Fabricado sob encomenda em 90 × 120 cm, com 17 ou 30 cm de profundidade.",
      specs: ["Embutir ou sobrepor · porta de vidro", "Chapa de aço carbono ou inox 304/430 (sob encomenda)", "Capacidade: 2 ou 4 mangueiras ind. de 2½″ × 15 m"],
      sizes: ["90 × 120 × 17 cm (2 mang. ind. 2½″ × 15 m)", "90 × 120 × 30 cm (4 mang. ind. 2½″ × 15 m)"],
      materials: ["Chapa de aço carbono", "Aço inox 304", "Aço inox 430"],
      image: "/produtos/hidrantes/metasal-abrigo-mangueira-inox-porta-de-vidro.webp",
      imageAlt: "Abrigo em aço inox para mangueira de incêndio com porta de vidro",
      sourceUrl: "https://metasal.com.br/produto/abrigo-para-mangueira-de-incendio-tipo-embutir-ou-sobrepor-em-aco-inox-com-porta-de-vidro/",
    },
    // TODO confirmar: Os códigos 742, 519, 248/2 e 248/1 são idênticos aos do abrigo para extintor sobre rodas (p. 10) — provável erro de diagramação do catálogo; confirmar com a Metasal
    {
      id: "metasal-abrigo-mangueira-padrao-rio",
      name: "Abrigo para mangueira de incêndio – Padrão Rio",
      code: "742 · 519 · 248/2 · 248/1",
      supplier: "Metasal",
      group: "Abrigos",
      description: "Abrigo em chapa de aço no padrão Rio, para 2 mangueiras prediais de 1½″ × 15 m. Indicado para edificações residenciais e comerciais, em versão de sobrepor ou embutir, com visor redondo (V.R) ou porta padrão Rio (P.R). Vidros e PVC não acompanham o abrigo.",
      specs: ["Sobrepor ou embutir · visor redondo (V.R) ou padrão Rio (P.R)", "Capacidade: 2 mangueiras prediais de 1½″ × 15 m", "Vidros e PVC não acompanham"],
      sizes: ["70 × 50 × 25 cm"],
      materials: ["Chapa de aço"],
      image: "/produtos/hidrantes/metasal-abrigo-mangueira-padrao-rio.webp",
      imageAlt: "Abrigo vermelho para mangueira de incêndio padrão Rio, com moldura frontal para vidro",
      sourceUrl: "https://metasal.com.br/produto/abrigo-para-mangueira-de-incendio-padrao-rio/",
    },
    {
      id: "metasal-abrigo-hidrante-recalque",
      name: "Abrigo hidrante recalque – Sobrepor e Embutir",
      code: "2987 · 3015 · 153 · 254",
      supplier: "Metasal",
      group: "Abrigos",
      description: "Abrigo para hidrante de recalque, em versões de sobrepor e de embutir. Indicado para proteger o registro de recalque usado pelo Corpo de Bombeiros na fachada ou no muro da edificação. Fabricado sob encomenda em 40 × 40 × 20 cm e 60 × 40 × 20 cm.",
      specs: ["Sobrepor ou embutir", "Fabricado sob encomenda"],
      sizes: ["40 × 40 × 20 cm · embutir cód. 2987 / sobrepor cód. 3015", "60 × 40 × 20 cm · embutir cód. 153 / sobrepor cód. 254"],
      image: "/produtos/hidrantes/metasal-abrigo-hidrante-recalque.webp",
      imageAlt: "Abrigo vermelho para hidrante de recalque, com porta e venezianas",
      sourceUrl: "https://metasal.com.br/produto/abrigo-hidrante-recalque-sobrepor-e-embutir/",
    },
    // TODO confirmar: Uso como reposição/frente de abrigo é dedução pela foto do catálogo (quadro sem caixa); confirmar
    {
      id: "metasal-quadro-abrigo-frente-vazada",
      name: "Quadro de abrigo para mangueira de incêndio (frente vazada)",
      code: "48 · 46 · 47",
      supplier: "Metasal",
      group: "Abrigos",
      description: "Quadro frontal (porta/moldura) para abrigo de mangueira de incêndio, com visor redondo ou frente vazada padrão Rio. Indicado para reposição ou montagem da frente de abrigos já instalados na parede. Medidas de 70 × 50 cm e 40 × 50 cm.",
      specs: ["Visor redondo (cód. 48) ou padrão Rio (cód. 46 e 47)"],
      sizes: ["70 × 50 cm · visor redondo, cód. 48", "70 × 50 cm · padrão Rio, cód. 46", "40 × 50 cm · padrão Rio, cód. 47"],
      image: "/produtos/hidrantes/metasal-quadro-abrigo-frente-vazada.webp",
      imageAlt: "Quadros vermelhos para abrigo de mangueira de incêndio, um com visor redondo e outro com frente vazada",
      sourceUrl: "https://metasal.com.br/produto/quadro-de-abrigo-para-mangueira-de-incendio-frente-vazada/",
    },
    // TODO confirmar: Catálogo e site escrevem '1/2" - 19mm' para o 2½" (nome da página diz 2 1/2) e '13mm 2' no 1½" — sufixo '2' sem explicação
    // TODO confirmar: Alcance/vazão não informados
    {
      id: "metasal-esguicho-jato-solido",
      name: "Esguicho jato sólido requinte alumínio",
      code: "23403 · 25102",
      supplier: "Metasal",
      group: "Esguichos",
      description: "Esguicho de jato sólido tipo requinte, em alumínio, para linhas de mangueira de hidrante. Indicado para combate a incêndio com jato compacto e de longo alcance em hidrantes prediais e industriais. Disponível em 1½″ com requinte de 13 mm e 2½″ com requinte de 19 mm.",
      specs: ["Jato sólido · requinte", "1½″ × 13 mm (cód. 23403) · 2½″ × 19 mm (cód. 25102)", "Alumínio"],
      sizes: ["1½″ · requinte 13 mm", "2½″ · requinte 19 mm"],
      materials: ["Alumínio"],
      image: "/produtos/hidrantes/metasal-esguicho-jato-solido.webp",
      imageAlt: "Esguicho de jato sólido em alumínio, cônico, com base de engate",
      sourceUrl: "https://metasal.com.br/produto/esguicho-jato-solido-aluminio-1-1-2-13mm-2/",
    },
    // TODO confirmar: Uso para resfriamento/proteção do operador é dedução do tipo neblina, não está na fonte
    {
      id: "metasal-esguicho-regulavel-storz-neblina",
      name: "Esguicho regulável Storz neblina alumínio injetado",
      code: "4611 · 4911",
      supplier: "Metasal",
      group: "Esguichos",
      description: "Esguicho regulável de neblina em alumínio injetado, com engate rápido Storz. Indicado para hidrantes em que se precisa alternar o jato e formar neblina, por exemplo para resfriamento e proteção do operador. Disponível em 1½″ e 2½″.",
      specs: ["Regulável · neblina", "Engate Storz", "Alumínio injetado"],
      sizes: ["1½″ (cód. 4611)", "2½″ (cód. 4911)"],
      materials: ["Alumínio injetado"],
      image: "/produtos/hidrantes/metasal-esguicho-regulavel-storz-neblina.webp",
      imageAlt: "Esguicho regulável de neblina em alumínio, com engate Storz na base",
      sourceUrl: "https://metasal.com.br/produto/esguicho-regulavel-storz-neblina-aluminio-injetado-1-1-2/",
    },
    // TODO confirmar: 'Alumínio injetado' vem da nota geral da p. 15, o título diz apenas 'alumínio'
    // TODO confirmar: Lado roscado 2½" deduzido de 'storz p/ 2 1/2' — confirmar
    {
      id: "metasal-adaptador-rosca-5fpp-storz",
      name: "Adaptador alumínio rosca globo 5FPP × Storz",
      code: "22619 · 25101",
      supplier: "Metasal",
      group: "Conexões e acessórios",
      description: "Adaptador em alumínio injetado com rosca globo 5 fios por polegada (5FPP) de um lado e engate Storz do outro. Usado para ligar mangueiras e esguichos Storz à saída roscada da válvula de hidrante. Versões Storz 1½″ para rosca 2½″ e Storz 2½″ para rosca 2½″.",
      specs: ["Rosca globo 5FPP × engate Storz", "Alumínio injetado"],
      sizes: ["1½″ Storz × 2½″ rosca (cód. 22619)", "2½″ Storz × 2½″ rosca (cód. 25101)"],
      materials: ["Alumínio injetado"],
      image: "/produtos/hidrantes/metasal-adaptador-rosca-5fpp-storz.webp",
      imageAlt: "Adaptador de alumínio para hidrante com rosca e engate Storz",
      sourceUrl: "https://metasal.com.br/produto/adaptador-aluminio-rosca-globo-5fpp-1-1-2-storz-para-2-1-2/",
    },
    {
      id: "metasal-chave-storz-dupla",
      name: "Chave Storz dupla em alumínio injetado 2½″",
      code: "4561",
      supplier: "Metasal",
      group: "Conexões e acessórios",
      description: "Chave dupla para engates Storz, em alumínio injetado, de 2½″. Usada para apertar e soltar conexões Storz de mangueiras, esguichos e adaptadores no abrigo de hidrante.",
      specs: ["Engate Storz 2½″", "Alumínio injetado"],
      sizes: ["2½″"],
      materials: ["Alumínio injetado"],
      image: "/produtos/hidrantes/metasal-chave-storz-dupla.webp",
      imageAlt: "Chave Storz dupla em alumínio, em formato de gancho",
      sourceUrl: "https://metasal.com.br/produto/chave-storz-dupla-em-aluminio-injetado-2-1-2/",
    },
    {
      id: "metasal-tampao-cego-storz-corrente",
      name: "Tampão cego com corrente Storz alumínio injetado",
      code: "22617 · 25273",
      supplier: "Metasal",
      group: "Conexões e acessórios",
      description: "Tampão cego Storz em alumínio injetado, preso por corrente. Usado para fechar a saída da válvula de hidrante ou de recalque quando não há mangueira conectada, protegendo a rosca/engate. Disponível em 1½″ e 2½″.",
      specs: ["Engate Storz · com corrente", "Alumínio injetado"],
      sizes: ["1½″ (cód. 22617)", "2½″ (cód. 25273)"],
      materials: ["Alumínio injetado"],
      image: "/produtos/hidrantes/metasal-tampao-cego-storz-corrente.webp",
      imageAlt: "Tampão cego Storz em alumínio com corrente e gancho",
      sourceUrl: "https://metasal.com.br/produto/tampao-cego-com-corrente-storz-aluminio-injetado-1-1-2/",
    },
    // TODO confirmar: 'Nodular' interpretado como ferro fundido nodular (não escrito por extenso na fonte)
    {
      id: "metasal-valvula-angular-globo-pn16",
      name: "Válvula angular hidrante (registro globo nodular) PN16",
      code: "28556",
      supplier: "Metasal",
      group: "Válvulas",
      description: "Válvula angular de hidrante (registro globo) em ferro nodular, 2½″ × 45°, classe PN 16. Usada como registro do ponto de hidrante, ligando a rede de incêndio à mangueira dentro do abrigo.",
      specs: ["2½″ × 45° · PN 16", "Registro globo · ferro nodular"],
      sizes: ["2½″"],
      image: "/produtos/hidrantes/metasal-valvula-angular-globo-pn16.webp",
      imageAlt: "Válvula angular vermelha para hidrante com volante e saída a 45 graus",
      sourceUrl: "https://metasal.com.br/produto/valvula-angular-hidrante-registro-globo-nodular-pn16/",
    },
    // TODO confirmar: Diâmetro e classe de pressão não informados
    // TODO confirmar: Catálogo chama de 'registro globo', site de 'registro castelo' — usado o nome do site
    {
      id: "metasal-valvula-angular-recalque",
      name: "Válvula angular hidrante (registro castelo nodular) recalque",
      code: "26400",
      supplier: "Metasal",
      group: "Válvulas",
      description: "Válvula angular nodular para hidrante de recalque. Instalada no ponto de recalque (passeio ou fachada), por onde o Corpo de Bombeiros injeta água na rede de hidrantes da edificação.",
      specs: ["Recalque · nodular"],
      image: "/produtos/hidrantes/metasal-valvula-angular-recalque.webp",
      imageAlt: "Válvula angular vermelha para hidrante de recalque com haste de manobra",
      sourceUrl: "https://metasal.com.br/produto/valvula-angular-hidrante-registro-castelo-nodular-recalque/",
    },
  ],
}
