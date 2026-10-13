import type { ProductCategory } from './index'

// Gerado a partir do levantamento nos catálogos/sites dos fornecedores. Revise antes de editar à mão.
export const iluminacao: ProductCategory = {
  id: "iluminacao",
  title: "Iluminação de emergência",
  tabLabel: "Iluminação",
  intro: "Luminárias e blocos autônomos que acendem sozinhos na falta de energia e mantêm as rotas de fuga iluminadas, inclusive em áreas externas, úmidas e industriais.",
  suppliers: [{"name": "Luxpryme", "url": "https://www.luxpryme.com.br"}],
  groups: ["Luminárias autônomas", "Blocos autônomos", "Sistema centralizado", "Áreas externas e industriais (IP66/IP67)", "Placas de saída iluminadas"],
  products: [
    // TODO confirmar: A página individual do produto não foi capturada (só aparecem o nome e a miniatura nas listagens e em /download); por isso não há código, ficha técnica nem diferencial técnico confirmados
    // TODO confirmar: Código: a lista de filtros 'Modelo' do site traz LSA-30053 / LSA-30066 e LSA-55053 / LSA-55066 (o 'A' parece indicar Premium, como em BAF-2700 e MBA-750), mas nenhuma página liga esses códigos a este produto
    // TODO confirmar: O site do fabricante lista este item também na categoria 'Iluminação de emergência IP66 / IP67'; confirmar se o IP-66 é padrão ou opcional antes de citar
    // TODO confirmar: Espessura de 2,4 cm aparece só na página da Slim 12/24vcc ('Nossas luminarias SLIM possuem apenas 2,4 cm de espessura'); confirmar se vale para a versão autônoma
    {
      id: "luxpryme-slim-premium",
      name: "Luminária autônoma Slim Premium",
      supplier: "Luxpryme",
      group: "Luminárias autônomas",
      description: "Luminária de emergência autônoma Slim, da linha Premium: tem bateria própria e acende sozinha quando falta energia. Indicada para corredores, escadas e salas em que se quer uma luminária discreta, de perfil fino, sem depender de central de iluminação.",
      image: "/produtos/iluminacao/luxpryme-slim-premium.webp",
      imageAlt: "Luminária de emergência Slim branca, alongada e fina, com tampa transparente sobre duas fileiras de LEDs e a marca em uma das pontas",
      sourceUrl: "https://www.luxpryme.com.br/produto/1/iluminacao-de-emergencia/autonomas-premium",
    },
    // TODO confirmar: A página individual do produto não foi capturada (só aparecem o nome e a miniatura nas listagens e em /download); por isso não há código, ficha técnica nem diferencial técnico confirmados
    // TODO confirmar: Código: a lista de filtros traz LCB-150, LCB-300 e LCB-300 BLK (provável 'Luminária Compacta Basic'), sem ligação explícita com este produto
    // TODO confirmar: Ambientes (escritórios, halls, corredores) deduzidos de 'compacta de embutir'; a frase 'pequenos ambientes como escritorios, hall e escadarias' é da página da versão centralizada LCCE
    {
      id: "luxpryme-compacta-basic-embutir",
      name: "Luminária compacta autônoma Basic de embutir",
      supplier: "Luxpryme",
      group: "Luminárias autônomas",
      description: "Luminária de emergência compacta e autônoma, da linha Basic, para instalação embutida: tem bateria própria e acende sozinha quando falta energia. Indicada para escritórios, salas, halls e corredores em que a luminária deve ficar rente à parede ou ao forro, sem depender de central.",
      image: "/produtos/iluminacao/luxpryme-compacta-basic-embutir.webp",
      imageAlt: "Luminária de emergência compacta branca, retangular, com tampa transparente sobre seis LEDs e botões de liga/teste e desliga na parte de baixo",
      sourceUrl: "https://www.luxpryme.com.br/produto/1/iluminacao-de-emergencia/autonomas-basic",
    },
    // TODO confirmar: A página individual do produto não foi capturada (só aparecem o nome e a miniatura nas listagens e em /download); por isso não há código, ficha técnica nem diferencial técnico confirmados
    // TODO confirmar: Código: a lista de filtros traz LMC.B - 150 e LMC.B - 300 (e versões BLK), sem ligação explícita com este produto
    {
      id: "luxpryme-mini-compacta-basic",
      name: "Luminária mini compacta autônoma Basic",
      supplier: "Luxpryme",
      group: "Luminárias autônomas",
      description: "Luminária de emergência autônoma de tamanho reduzido, da linha Basic: tem bateria própria e acende sozinha quando falta energia. Serve para pontos em que a luminária precisa ser pequena e discreta, como corredores, salas e escadas, sem depender de central.",
      image: "/produtos/iluminacao/luxpryme-mini-compacta-basic.webp",
      imageAlt: "Luminária de emergência mini compacta branca, com seis LEDs na parte de cima e botões ON e OFF logo abaixo",
      sourceUrl: "https://www.luxpryme.com.br/produto/1/iluminacao-de-emergencia/autonomas-basic",
    },
    // TODO confirmar: A página individual do produto não foi capturada (só aparecem o nome e a miniatura nas listagens e em /download); por isso não há código, ficha técnica nem diferencial técnico confirmados
    // TODO confirmar: Código: a lista de filtros traz MBB-600, MBB-1200 e MBB-2200 (e versões BLK), sem ligação explícita com este produto
    // TODO confirmar: 'Dois faróis laterais' tirado da foto, não do texto
    // TODO confirmar: O site lista este item também na categoria IP66/IP67; confirmar se há versão IP-66 antes de citar
    {
      id: "luxpryme-mini-bloco-basic",
      name: "Mini bloco Basic",
      supplier: "Luxpryme",
      group: "Blocos autônomos",
      description: "Mini bloco autônomo de iluminação de emergência, da linha Basic: tem bateria própria e acende sozinho quando falta energia. Tem um farol em cada lateral, para clarear corredores, escadas e rotas de fuga.",
      image: "/produtos/iluminacao/luxpryme-mini-bloco-basic.webp",
      imageAlt: "Mini bloco de iluminação de emergência branco e horizontal, com um farol de LED em cada lateral e painel central com a marca e a palavra Basic",
      sourceUrl: "https://www.luxpryme.com.br/produto/1/iluminacao-de-emergencia/autonomas-basic",
    },
    // TODO confirmar: A página individual do produto não foi capturada (só aparecem o nome e a miniatura nas listagens e em /download); por isso não há código, ficha técnica nem diferencial técnico confirmados
    // TODO confirmar: Código: a lista de filtros traz NANO-600, NANO-1200 e NANO-2200 (e versões BLK), sem ligação explícita com este produto
    // TODO confirmar: 'Dois faróis sobre o corpo' tirado da foto, não do texto
    {
      id: "luxpryme-nano-bloco-basic",
      name: "Nano bloco Basic",
      supplier: "Luxpryme",
      group: "Blocos autônomos",
      description: "Bloco autônomo de iluminação de emergência de tamanho reduzido, da linha Basic: tem bateria própria e acende sozinho quando falta energia. Tem dois faróis sobre o corpo, para clarear corredores, escadas e saídas.",
      image: "/produtos/iluminacao/luxpryme-nano-bloco-basic.webp",
      imageAlt: "Nano bloco de iluminação de emergência branco, com dois faróis quadrados de LED sobre o corpo e indicadores luminosos na lateral",
      sourceUrl: "https://www.luxpryme.com.br/produto/1/iluminacao-de-emergencia/autonomas-basic",
    },
    // TODO confirmar: A página individual do produto não foi capturada (só aparecem o nome e a miniatura nas listagens e em /download); por isso não há código, ficha técnica nem diferencial técnico confirmados
    // TODO confirmar: Código: a lista de filtros traz BBF-3000 e BBF-3000BLK (há um 'Bloco 3000 Basic Black'), sem ligação explícita com este produto
    // TODO confirmar: O '3000' do nome provavelmente é o fluxo (a lista de filtros tem '3000 lumens'); não citado por falta de confirmação
    // TODO confirmar: 'Três faróis' tirado da foto; 'áreas maiores (galpões, garagens, salões)' é dedução
    {
      id: "luxpryme-bloco-3000-basic",
      name: "Bloco 3000 Basic",
      supplier: "Luxpryme",
      group: "Blocos autônomos",
      description: "Bloco autônomo de iluminação de emergência da linha Basic: tem bateria própria e acende sozinho quando falta energia. Tem três faróis sobre o corpo, para iluminar áreas maiores, como galpões, garagens e salões.",
      image: "/produtos/iluminacao/luxpryme-bloco-3000-basic.webp",
      imageAlt: "Bloco de iluminação de emergência branco, com três faróis redondos de LED sobre o corpo e a marca na frente",
      sourceUrl: "https://www.luxpryme.com.br/produto/1/iluminacao-de-emergencia/autonomas-basic",
    },
    // TODO confirmar: A ficha diz só 'Bateria 12V externa': confirmar se a bateria acompanha a central ou é comprada à parte (e a autonomia, que depende dela)
    {
      id: "luxpryme-csb-400",
      name: "Central de iluminação 12 Vcc 400 W",
      code: "CSB-400",
      supplier: "Luxpryme",
      group: "Sistema centralizado",
      description: "Central de iluminação de emergência CSB-400, de 12 Vcc e 400 W, que trabalha com bateria externa de 12 V. Indicada para prédios com sistema centralizado, em que as luminárias e placas de 12 V ligadas a ela continuam acesas quando falta energia. Tem alimentação bivolt automática (80 a 240 Vca) e proteção contra sobretensão, sobrecorrente e curto na saída.",
      specs: ["12 Vcc · 400 W", "Bateria externa de 12 V", "Bivolt automático 80 a 240 Vca", "IP-20"],
      materials: ["Gabinete em policarbonato antichama"],
      image: "/produtos/iluminacao/luxpryme-csb-400.webp",
      imageAlt: "Central de iluminação de emergência em gabinete plástico branco, com etiqueta de instruções na frente e indicadores na parte de cima",
      sourceUrl: "https://www.luxpryme.com.br/produto/central-de-iluminacao-12vcc-400w",
    },
    {
      id: "luxpryme-lcce-300",
      name: "Luminária compacta 12/24 V de embutir",
      code: "LCCE-300",
      supplier: "Luxpryme",
      group: "Sistema centralizado",
      description: "Luminária de emergência compacta LCCE-300, de 300 lúmens, para instalações com central de iluminação de 12 ou 24 V. O fabricante a indica para pequenos ambientes, como escritórios, halls e escadarias, com área máxima de 60 m². Pode ser embutida em caixa elétrica 4x2 e consome 3 W.",
      specs: ["300 lúmens · 3 W", "Alimentação 12/24 V (Vcc ou Vca)", "Área máxima 60 m²", "IP-40"],
      materials: ["Gabinete em policarbonato antichama", "Difusor em policarbonato cristal"],
      image: "/produtos/iluminacao/luxpryme-lcce-300.webp",
      imageAlt: "Luminária de emergência compacta branca e retangular, com tampa transparente sobre seis LEDs",
      sourceUrl: "https://www.luxpryme.com.br/produto/luminaria-compacta-1224vcc-embutir",
    },
    // TODO confirmar: A ficha diz 'Alimentação 12 (Vcc ou Vca)' e a descrição diz 'funciona somente em 12vcc'; confirmar se aceita Vca
    // TODO confirmar: Exemplos de ambiente (galpões, depósitos, garagens cobertas) deduzidos da área de 500 m² e do IP-20
    {
      id: "luxpryme-lcf-3020-blk",
      name: "Luminária triplo farol Black",
      code: "LCF-3020BLK",
      supplier: "Luxpryme",
      group: "Sistema centralizado",
      description: "Luminária de emergência triplo farol LCF-3020BLK, com gabinete preto e 3000 lúmens, para instalações com central de iluminação. Atende áreas de até 500 m², como galpões, depósitos e garagens cobertas; com IP-20, é para ambientes internos. Funciona somente em 12 V, por isso deve ser ligada a uma central de 12 V, como a CSB-400.",
      specs: ["3000 lúmens · 30 W", "Alimentação 12 V", "Área máxima 500 m²", "IP-20"],
      materials: ["Gabinete em policarbonato antichama, preto", "Difusor em policarbonato cristal"],
      image: "/produtos/iluminacao/luxpryme-lcf-3020-blk.webp",
      imageAlt: "Luminária de emergência preta com três faróis de LED sobre o corpo e a marca em dourado na frente",
      sourceUrl: "https://www.luxpryme.com.br/produto/luminaria-triplo-farol-black",
    },
    // TODO confirmar: A ficha técnica da página é só do modelo de 1600 lm; a opção de 2000 lm (códigos LCF-2053 / LCF-2066 na lista de filtros) não tem consumo, alimentação e área confirmados
    // TODO confirmar: O sufixo 53/66 parece indicar IP-53/IP-66 ('Modelo LCF-1653 / LCF-1666 ... IP-53 ou IP-66'); confirmar a correspondência no orçamento
    // TODO confirmar: Exemplos de ambiente (pátios, galpões, garagens abertas) deduzidos do IP-66
    {
      id: "luxpryme-duplo-farol-lcf",
      name: "Luminária duplo farol",
      code: "LCF-1653 / LCF-1666",
      supplier: "Luxpryme",
      group: "Áreas externas e industriais (IP66/IP67)",
      description: "Luminária de emergência de dois faróis para instalações com central de iluminação: modelo LCF-1653 / LCF-1666 com 1600 lúmens, com opção de 2000 lúmens. Cobre até 300 m² e pode ser fabricada com grau de proteção IP-66, para áreas externas, úmidas ou com poeira, como pátios, galpões e garagens abertas. A versão de 1600 lúmens aceita de 5 a 30 Vcc e tem driver de brilho constante.",
      specs: ["1600 lúmens · 16 W (opção de 2000 lúmens)", "Alimentação 5 a 30 Vcc", "Até 300 m²", "IP-53 ou IP-66"],
      materials: ["Gabinete em policarbonato antichama", "Difusor em policarbonato cristal"],
      image: "/produtos/iluminacao/luxpryme-duplo-farol-lcf.webp",
      imageAlt: "Luminária de emergência branca e horizontal, com um farol redondo de LED em cada extremidade e a marca no centro",
      sourceUrl: "https://www.luxpryme.com.br/produto/luminaria-duplo-farol-",
    },
    // TODO confirmar: Fluxo luminoso, consumo e área máxima não constam no texto da página (sem ficha técnica); a lista de filtros traz LSC-0567, LSC-0867 e LSC-1067, sem ligação explícita com esta página
    // TODO confirmar: O código 'LSC' também aparece na página 'Luminária Slim 12/24vcc com driver' (800 lm, 5~30 Vcc, botão liga/desliga); confirmar o modelo exato no orçamento
    {
      id: "luxpryme-slim-lsc-ip67",
      name: "Luminária Slim 12/24 Vcc",
      code: "LSC",
      supplier: "Luxpryme",
      group: "Áreas externas e industriais (IP66/IP67)",
      description: "Luminária de emergência Slim LSC, versão 12/24 Vcc para instalações com central de iluminação, da linha Slim Náutica do fabricante. Com grau de proteção IP-67, atende áreas úmidas e externas e também embarcações. Tem apenas 2,4 cm de espessura, o que a deixa discreta no forro ou na parede.",
      specs: ["Alimentação 12/24 Vcc", "IP-67", "Espessura 2,4 cm"],
      image: "/produtos/iluminacao/luxpryme-slim-lsc-ip67.webp",
      imageAlt: "Luminária de emergência Slim branca, alongada e fina, com tampa transparente sobre várias fileiras de LEDs",
      sourceUrl: "https://www.luxpryme.com.br/produto/luminaria-slim-1224vcc-",
    },
    // TODO confirmar: A ficha mostra só a cartela verde (PPS.P-2617 SVD); o código da vermelha (PPS.P-2617 SVM) aparece apenas na lista de filtros
    // TODO confirmar: A descrição do fabricante cita versões permanente e centralizada, face simples ou dupla e modelos autoadesivos, sem ficha própria; não citadas
    {
      id: "luxpryme-pps-p-2617",
      name: "Placa de saída 26x17 Premium",
      code: "PPS.P-2617",
      supplier: "Luxpryme",
      group: "Placas de saída iluminadas",
      description: "Placa de saída luminosa de rota de fuga em acrílico, modelo PPS.P-2617 (26x17), da linha Premium, com bateria própria e cartela verde ou vermelha. Vai sobre portas e ao longo das rotas de fuga para orientar a saída em caso de incêndio. Na falta de energia, a bateria a mantém acesa por cerca de 2,5 horas; segue as normas NBR 10898 e NBR IEC 60598-2-22.",
      specs: ["30 lúmens", "Bateria 3,7 V 800 mA · autonomia aprox. 2,5 h", "Bivolt automático 90 a 240 Vca", "IP-43"],
      sizes: ["26 x 17,5 x 3 cm"],
      materials: ["Placa em acrílico", "Gabinete em policarbonato antichama"],
      image: "/produtos/iluminacao/luxpryme-pps-p-2617.webp",
      imageAlt: "Placa de saída iluminada com cartela verde, pictograma de pessoa correndo em direção a uma porta e seta para a direita, presa a um suporte branco no alto",
      sourceUrl: "https://www.luxpryme.com.br/produto/placa-de-saida-26x17-premium",
    },
    // TODO confirmar: A ficha mostra só a cartela verde (PCS.B-2617 SVD); o código da vermelha (PCS.B-2617 SVM) aparece apenas na lista de filtros, e a foto atual é da cartela vermelha
    {
      id: "luxpryme-pcs-b-2617",
      name: "Placa de saída 26x17 12/24 Vcc",
      code: "PCS.B-2617",
      supplier: "Luxpryme",
      group: "Placas de saída iluminadas",
      description: "Placa de saída iluminada PCS.B-2617 (26x17) para instalações com central de iluminação de 12 ou 24 Vcc, com cartela verde ou vermelha. Indicada para sinalizar portas e rotas de fuga em prédios que já têm sistema centralizado; a autonomia depende da central. Consome 0,5 W, tem proteção UV e vem com kit de instalação e setas adesivas.",
      specs: ["30 lúmens · 0,5 W", "Alimentação 12/24 Vcc", "Autonomia conforme a central", "IP-43"],
      sizes: ["26 x 17 x 3 cm"],
      materials: ["Gabinete em policarbonato antichama", "Difusor em policarbonato cristal antichama"],
      image: "/produtos/iluminacao/luxpryme-pcs-b-2617.webp",
      imageAlt: "Placa de saída iluminada em acrílico transparente com a palavra SAÍDA e duas setas para a direita em vermelho, presa a um suporte branco no alto",
      sourceUrl: "https://www.luxpryme.com.br/produto/placa-de-saida-26x17-1224vcc",
    },
  ],
}
