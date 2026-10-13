import type { ProductCategory } from './index'

// Gerado a partir do levantamento nos catálogos/sites dos fornecedores. Revise antes de editar à mão.
export const sinalizacao: ProductCategory = {
  id: "sinalizacao",
  title: "Sinalização de emergência",
  tabLabel: "Sinalização",
  intro: "Placas e fitas que mostram o caminho até a saída e indicam onde estão os equipamentos de combate a incêndio, conforme a ABNT NBR 16820 e as Instruções Normativas do Corpo de Bombeiros de SC (IN 13).",
  cover: "/fotos/capa-sinalizacao-1600.webp",
  coverAlt: "Corredor envidraçado de um prédio de escritórios, com a placa de saída de emergência no teto indicando a rota de fuga",
  coverPosition: "55% 38%",
  suppliers: [{"name": "Grupo Scala", "url": "https://gruposcala.com.br"}],
  groups: ["Sinalização de rota de fuga", "Sinalização de equipamentos", "Alerta", "Proibição", "Sinalização complementar"],
  guide: {"kind": "sizes", "title": "Qual tamanho de placa eu preciso?", "paragraphs": ["O tamanho mínimo de cada placa depende da distância de onde ela precisa ser lida: quanto mais longe a pessoa estiver, maior a placa. A ABNT NBR 16820 relaciona o tamanho da placa com essa distância de visualização.", "Por isso, a mesma placa pode ser vendida em várias medidas: em um corredor curto, uma placa pequena basta; em um galpão ou estacionamento, é preciso uma maior."], "cta": "Não sabe a medida? Mande a planta ou fotos do local no WhatsApp que a gente indica.", "ctaMessage": "Olá! Vim pelo site e gostaria de ajuda para escolher o tamanho das placas de sinalização. Vou enviar a planta ou fotos do local."},
  products: [
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0544",
      name: "Placa de saída (SAÍDA)",
      code: "PP 0544",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de saída com a palavra SAÍDA (código Scala PP 0544, símbolo S12 da ABNT NBR 16820). Instalada sobre portas e passagens que levam à saída de emergência. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S12", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/fotoluminescente-laudo.webp",
      imageAlt: "Placa retangular verde com a palavra SAÍDA em letras fotoluminescentes",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: O catálogo não mostra código NBR 16820 (selo) para o PP 0535
    {
      id: "scala-pp-0535",
      name: "Placa de saída com pictograma (SAÍDA + figura)",
      code: "PP 0535",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente com a palavra SAÍDA e a figura de pessoa correndo para a porta (código Scala PP 0535). Usada sobre a porta de saída de emergência, combinando texto e pictograma. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/saida.webp",
      imageAlt: "Placa verde com a palavra SAÍDA e figura de pessoa correndo em direção a uma porta",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0557",
      name: "Placa de rota de fuga – seta à direita",
      code: "PP 0557",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga com pessoa saindo pela porta e seta para a direita (código Scala PP 0557, símbolo S1 da ABNT NBR 16820). Indica nos corredores e circulações que a saída fica à direita. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S1", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/rota-de-fuga-seta.webp",
      imageAlt: "Placa verde de rota de fuga com figura saindo pela porta e seta apontando para a direita",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0558",
      name: "Placa de rota de fuga – seta à esquerda",
      code: "PP 0558",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga com seta para a esquerda e pessoa saindo pela porta (código Scala PP 0558, símbolo S2 da ABNT NBR 16820). Indica nos corredores e circulações que a saída fica à esquerda. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S2", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0558.webp",
      imageAlt: "Placa verde de rota de fuga com seta apontando para a esquerda e figura saindo pela porta",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0539",
      name: "Placa de rota de fuga – seta em frente",
      code: "PP 0539",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga com pessoa saindo pela porta e seta para cima (seguir em frente) (código Scala PP 0539, símbolo S3 da ABNT NBR 16820). Indica que a saída fica adiante, no mesmo sentido de deslocamento. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S3", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0539.webp",
      imageAlt: "Placa verde de rota de fuga com figura saindo pela porta e seta apontando para cima",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0540",
      name: "Placa de rota de fuga – seta diagonal superior direita",
      code: "PP 0540",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga com pessoa saindo pela porta e seta diagonal para cima e à direita (código Scala PP 0540, símbolo S4 da ABNT NBR 16820). Indica mudança de direção para a direita adiante no trajeto até a saída. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S4", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0540.webp",
      imageAlt: "Placa verde de rota de fuga com figura saindo pela porta e seta diagonal para cima à direita",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0541",
      name: "Placa de rota de fuga – seta diagonal superior esquerda",
      code: "PP 0541",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga com seta diagonal para cima e à esquerda e pessoa saindo pela porta (código Scala PP 0541, símbolo S5 da ABNT NBR 16820). Indica mudança de direção para a esquerda adiante no trajeto até a saída. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S5", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0541.webp",
      imageAlt: "Placa verde de rota de fuga com seta diagonal para cima à esquerda e figura saindo pela porta",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0543",
      name: "Placa de rota de fuga – seta diagonal inferior direita",
      code: "PP 0543",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga com pessoa saindo pela porta e seta diagonal para baixo e à direita (código Scala PP 0543, símbolo S6 da ABNT NBR 16820). Indica no trajeto de fuga que o caminho segue para baixo e à direita. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S6", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0543.webp",
      imageAlt: "Placa verde de rota de fuga com figura saindo pela porta e seta diagonal para baixo à direita",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0542",
      name: "Placa de rota de fuga – seta diagonal inferior esquerda",
      code: "PP 0542",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga com seta diagonal para baixo e à esquerda e pessoa saindo pela porta (código Scala PP 0542, símbolo S7 da ABNT NBR 16820). Indica no trajeto de fuga que o caminho segue para baixo e à esquerda. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S7", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0542.webp",
      imageAlt: "Placa verde de rota de fuga com seta diagonal para baixo à esquerda e figura saindo pela porta",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0551",
      name: "Placa de escada de emergência – descida à direita",
      code: "PP 0551",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga com pessoa saindo pela porta e escada descendo para a direita (código Scala PP 0551, símbolo S8 da ABNT NBR 16820). Usada em escadas de emergência e patamares para indicar que a fuga segue descendo pela direita. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S8", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0551.webp",
      imageAlt: "Placa verde com figura saindo pela porta e escada com seta descendo para a direita",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0552",
      name: "Placa de escada de emergência – descida à esquerda",
      code: "PP 0552",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga com escada descendo para a esquerda e pessoa saindo pela porta (código Scala PP 0552, símbolo S9 da ABNT NBR 16820). Usada em escadas de emergência e patamares para indicar que a fuga segue descendo pela esquerda. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S9", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0552.webp",
      imageAlt: "Placa verde com escada e seta descendo para a esquerda e figura saindo pela porta",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0548",
      name: "Placa de escada de emergência – subida à esquerda",
      code: "PP 0548",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga com escada subindo para a esquerda e pessoa saindo pela porta (código Scala PP 0548, símbolo S10 da ABNT NBR 16820). Usada em escadas de emergência (por exemplo, subsolos) para indicar que a fuga segue subindo pela esquerda. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S10", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0548.webp",
      imageAlt: "Placa verde com escada e seta subindo para a esquerda e figura saindo pela porta",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0549",
      name: "Placa de escada de emergência – subida à direita",
      code: "PP 0549",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga com pessoa saindo pela porta e escada subindo para a direita (código Scala PP 0549, símbolo S11 da ABNT NBR 16820). Usada em escadas de emergência (por exemplo, subsolos) para indicar que a fuga segue subindo pela direita. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S11", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/escada-de-emergencia.webp",
      imageAlt: "Placa verde com figura saindo pela porta e escada com seta subindo para a direita",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0810",
      name: "Placa de saída acessível – seta à direita",
      code: "PP 0810",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga acessível, com símbolo de cadeira de rodas e seta para a direita (código Scala PP 0810, símbolo S15D da ABNT NBR 16820). Indica a rota de saída acessível a pessoas com deficiência ou mobilidade reduzida, para a direita. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S15D", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0810.webp",
      imageAlt: "Placa verde com símbolo de cadeira de rodas na porta e seta apontando para a direita",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0811",
      name: "Placa de saída acessível – seta à esquerda",
      code: "PP 0811",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de rota de fuga acessível, com seta para a esquerda e símbolo de cadeira de rodas (código Scala PP 0811, símbolo S15E da ABNT NBR 16820). Indica a rota de saída acessível a pessoas com deficiência ou mobilidade reduzida, para a esquerda. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S15E", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0811.webp",
      imageAlt: "Placa verde com seta apontando para a esquerda e símbolo de cadeira de rodas na porta",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Medidas não listadas: o catálogo diz que S13, S14 e S16 têm medida especial a confirmar para fabricação
    {
      id: "scala-pp-0406",
      name: "Placa SAÍDA com seta à direita (formato longo)",
      code: "PP 0406",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente longa com a palavra SAÍDA, pessoa saindo pela porta e seta para a direita (código Scala PP 0406, símbolo S13D da ABNT NBR 16820). Para corredores e halls onde a indicação de saída precisa ser lida de longe, apontando para a direita. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S13D", "Placa fotoluminescente · ABNT NBR 16820", "Medida especial, sob consulta", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      image: "/produtos/sinalizacao/scala-pp-0406.webp",
      imageAlt: "Placa verde longa com a palavra SAÍDA, figura saindo pela porta e seta para a direita",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Medidas não listadas: o catálogo diz que S13, S14 e S16 têm medida especial a confirmar para fabricação
    {
      id: "scala-pp-0407",
      name: "Placa SAÍDA com seta à esquerda (formato longo)",
      code: "PP 0407",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente longa com seta para a esquerda, pessoa saindo pela porta e a palavra SAÍDA (código Scala PP 0407, símbolo S13E da ABNT NBR 16820). Para corredores e halls onde a indicação de saída precisa ser lida de longe, apontando para a esquerda. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S13E", "Placa fotoluminescente · ABNT NBR 16820", "Medida especial, sob consulta", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      image: "/produtos/sinalizacao/scala-pp-0407.webp",
      imageAlt: "Placa verde longa com seta para a esquerda, figura saindo pela porta e a palavra SAÍDA",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Medidas não listadas: o catálogo diz que S13, S14 e S16 têm medida especial a confirmar para fabricação
    // TODO confirmar: No catálogo o código aparece como "PP 0408" sem o prefixo "Cod:"
    {
      id: "scala-pp-0408",
      name: "Placa SAÍDA com pictograma (formato longo)",
      code: "PP 0408",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente longa com a palavra SAÍDA e pessoa saindo pela porta (código Scala PP 0408, símbolo S14 da ABNT NBR 16820). Instalada sobre a porta de saída quando se quer texto e pictograma em formato alongado. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S14", "Placa fotoluminescente · ABNT NBR 16820", "Medida especial, sob consulta", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      image: "/produtos/sinalizacao/scala-pp-0408.webp",
      imageAlt: "Placa verde longa com a palavra SAÍDA e figura saindo pela porta",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Medidas não listadas: o catálogo diz que S13, S14 e S16 têm medida especial a confirmar para fabricação
    {
      id: "scala-pp-0409",
      name: "Placa SAÍDA acessível com seta à direita (formato longo)",
      code: "PP 0409",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente longa com a palavra SAÍDA, símbolo de cadeira de rodas e seta para a direita (código Scala PP 0409, símbolo S16D da ABNT NBR 16820). Indica de longe a saída acessível a pessoas com deficiência, para a direita. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S16D", "Placa fotoluminescente · ABNT NBR 16820", "Medida especial, sob consulta", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      image: "/produtos/sinalizacao/scala-pp-0409.webp",
      imageAlt: "Placa verde longa com a palavra SAÍDA, símbolo de cadeira de rodas e seta para a direita",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Medidas não listadas: o catálogo diz que S13, S14 e S16 têm medida especial a confirmar para fabricação
    {
      id: "scala-pp-0410",
      name: "Placa SAÍDA acessível com seta à esquerda (formato longo)",
      code: "PP 0410",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente longa com seta para a esquerda, símbolo de cadeira de rodas e a palavra SAÍDA (código Scala PP 0410, símbolo S16E da ABNT NBR 16820). Indica de longe a saída acessível a pessoas com deficiência, para a esquerda. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S16E", "Placa fotoluminescente · ABNT NBR 16820", "Medida especial, sob consulta", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      image: "/produtos/sinalizacao/scala-pp-0410.webp",
      imageAlt: "Placa verde longa com seta para a esquerda, símbolo de cadeira de rodas e a palavra SAÍDA",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Sem selo NBR no catálogo
    // TODO confirmar: Medida não listada: formato longo como S13/S16, mas o catálogo não diz se também é medida especial — confirmar
    {
      id: "scala-pp-0411",
      name: "Placa SAÍDA acessível e comum com seta à direita",
      code: "PP 0411",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente longa com a palavra SAÍDA, símbolo de cadeira de rodas, pessoa saindo pela porta e seta para a direita (código Scala PP 0411). Indica, numa só placa, a saída comum e a acessível quando ambas seguem para a direita. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Placa fotoluminescente · ABNT NBR 16820", "Medida especial, sob consulta", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      image: "/produtos/sinalizacao/saida-acessivel.webp",
      imageAlt: "Placa verde longa com a palavra SAÍDA, símbolo de cadeira de rodas, figura saindo pela porta e seta para a direita",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Sem selo NBR no catálogo
    // TODO confirmar: Medida não listada: formato longo como S13/S16, mas o catálogo não diz se também é medida especial — confirmar
    {
      id: "scala-pp-0412",
      name: "Placa SAÍDA acessível e comum com seta à esquerda",
      code: "PP 0412",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente longa com seta para a esquerda, pessoa saindo pela porta, símbolo de cadeira de rodas e a palavra SAÍDA (código Scala PP 0412). Indica, numa só placa, a saída comum e a acessível quando ambas seguem para a esquerda. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Placa fotoluminescente · ABNT NBR 16820", "Medida especial, sob consulta", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      image: "/produtos/sinalizacao/scala-pp-0412.webp",
      imageAlt: "Placa verde longa com seta para a esquerda, figura saindo pela porta, símbolo de cadeira de rodas e a palavra SAÍDA",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: foto: o recorte do catálogo ficou danificado pelo selo; falta foto do fornecedor
    {
      id: "scala-pp-0556",
      name: "Placa porta corta-fogo – é obrigatório manter fechado",
      code: "PP 0556",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente com o texto PORTA CORTA-FOGO / É OBRIGATÓRIO MANTER FECHADO (código Scala PP 0556, símbolo S19 da ABNT NBR 16820). Fixada na própria porta corta-fogo de escadas e compartimentos, lembrando que ela deve ficar fechada. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S19", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "",
      imageAlt: "Placa verde com o texto porta corta-fogo é obrigatório manter fechado",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0553",
      name: "Placa porta corta-fogo",
      code: "PP 0553",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente com o texto PORTA CORTA-FOGO (código Scala PP 0553, símbolo S20 da ABNT NBR 16820). Identifica a porta corta-fogo nas escadas e compartimentos da rota de fuga. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S20", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/porta-corta-fogo.webp",
      imageAlt: "Placa verde com o texto porta corta-fogo",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0590",
      name: "Placa aperte/empurre (barra antipânico)",
      code: "PP 0590",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente com pessoa acionando a barra da porta e o texto APERTE EMPURRE (código Scala PP 0590, símbolo S18 da ABNT NBR 16820). Fixada em portas de saída com barra antipânico, mostrando como abri-las. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S18", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min", "Fixação: face única, dupla face, dupla face com dobra lateral ou superior"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0590.webp",
      imageAlt: "Placa verde com figura empurrando a barra da porta e o texto aperte empurre",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Medidas não informadas para a seção "Sinalização de orientação" (p. 4) — confirmar
    // TODO confirmar: Nome deduzido do pictograma; o catálogo não dá nome a cada placa desta seção — conferir na ABNT NBR 16820
    {
      id: "scala-pp-0571",
      name: "Placa de orientação – quebrar para acessar",
      code: "PP 0571",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de orientação com mão quebrando um vidro (código Scala PP 0571, símbolo S21 da ABNT NBR 16820). Usada junto a dispositivos de saída ou caixas protegidas por vidro que precisam ser quebrados em emergência. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S21", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      image: "/produtos/sinalizacao/scala-pp-0571.webp",
      imageAlt: "Placa verde quadrada com pictograma de mão quebrando um vidro",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Medidas não informadas para a seção "Sinalização de orientação" (p. 4) — confirmar
    // TODO confirmar: Nome deduzido do pictograma; o catálogo não dá nome a cada placa desta seção — conferir na ABNT NBR 16820
    {
      id: "scala-pp-0572",
      name: "Placa de orientação – girar a maçaneta (alavanca)",
      code: "PP 0572",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de orientação com maçaneta de alavanca e seta curva indicando o giro (código Scala PP 0572, símbolo S22 da ABNT NBR 16820). Fixada em portas da rota de fuga para mostrar o sentido de abertura da maçaneta. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S22", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      image: "/produtos/sinalizacao/scala-pp-0572.webp",
      imageAlt: "Placa verde quadrada com maçaneta de alavanca e seta curva para baixo",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Medidas não informadas para a seção "Sinalização de orientação" (p. 4) — confirmar
    // TODO confirmar: Nome deduzido do pictograma; o catálogo não dá nome a cada placa desta seção — conferir na ABNT NBR 16820
    {
      id: "scala-pp-0573",
      name: "Placa de orientação – girar o puxador (redondo)",
      code: "PP 0573",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de orientação com puxador redondo e seta circular indicando o giro (código Scala PP 0573, símbolo S22 da ABNT NBR 16820). Fixada em portas ou dispositivos da rota de fuga com puxador giratório, para mostrar o sentido de abertura. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S22", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      image: "/produtos/sinalizacao/scala-pp-0573.webp",
      imageAlt: "Placa verde quadrada com puxador redondo e seta circular no sentido horário",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Medidas não informadas para a seção "Sinalização de orientação" (p. 4) — confirmar
    // TODO confirmar: Nome deduzido do pictograma; o catálogo não dá nome a cada placa desta seção — conferir na ABNT NBR 16820
    {
      id: "scala-pp-0574",
      name: "Placa de orientação – empurrar a porta (barra)",
      code: "PP 0574",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de orientação com pessoa correndo e empurrando a barra da porta (código Scala PP 0574, símbolo S18 da ABNT NBR 16820). Fixada em portas de saída com barra antipânico, sem texto. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S18", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      image: "/produtos/sinalizacao/scala-pp-0574.webp",
      imageAlt: "Placa verde quadrada com figura correndo e empurrando a barra de uma porta",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Medidas não informadas para a seção "Sinalização de orientação" (p. 4) — confirmar
    // TODO confirmar: Nome deduzido do pictograma; o catálogo não dá nome a cada placa desta seção — conferir na ABNT NBR 16820
    {
      id: "scala-pp-0575",
      name: "Placa de orientação – pressionar a barra da porta",
      code: "PP 0575",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de orientação com pessoa correndo e setas indicando pressionar a barra da porta (código Scala PP 0575, símbolo S18 da ABNT NBR 16820). Fixada em portas de saída com barra antipânico, sem texto. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S18", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      image: "/produtos/sinalizacao/scala-pp-0575.webp",
      imageAlt: "Placa verde quadrada com figura correndo e setas apontando para a barra de uma porta",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: O catálogo não imprime código Scala (PP) para as placas de pavimento
    // TODO confirmar: Recorte mostra a placa "2º Andar" (inteira); a placa "SUBSOLO I" fica parcialmente atrás dela e uma lasca dela e a borda do selo S17 aparecem nas margens do recorte
    {
      id: "scala-sinalizacao-de-pavimento",
      name: "Placa de sinalização de pavimento (andar)",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa fotoluminescente de identificação de pavimento, símbolo S17 da ABNT NBR 16820, com o nome do andar (ex.: 2º Andar, Subsolo I). Instalada em escadas e halls para que as pessoas saibam em que andar estão durante a fuga. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: S17", "Placa fotoluminescente conforme ABNT", "Texto do andar sob pedido (QR code com mais modelos)", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["12 x 24 cm"],
      image: "/produtos/sinalizacao/scala-sinalizacao-de-pavimento.webp",
      imageAlt: "Placa verde retangular com o texto 2º Andar em letras fotoluminescentes",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista as medidas para a seção inteira (lotação, sistemas e ponto de encontro) e pede para conferir a medida conforme o modelo; confirmar quais medidas valem para este modelo
    // TODO confirmar: Material e espessura não informados no catálogo; a seção não diz se a placa é fotoluminescente
    {
      id: "scala-pp-0799",
      name: "Placa ponto de encontro emergência",
      code: "PP 0799",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa verde de ponto de encontro com pictograma de pessoas reunidas, setas convergentes e o texto PONTO DE ENCONTRO EMERGÊNCIA (código Scala PP 0799). Marca a área externa onde as pessoas se reúnem depois de abandonar a edificação. Faz parte da linha de sinalização de lotação e sistemas contra incêndio da Scala, de acordo com a ABNT NBR 16820.",
      specs: ["De acordo com a ABNT NBR 16820"],
      sizes: ["78 x 45 cm", "30 x 40 cm", "20 x 20 cm", "70 x 40 cm", "75 x 48 cm"],
      image: "/produtos/sinalizacao/ponto-de-encontro.webp",
      imageAlt: "Placa verde de ponto de encontro com pessoas reunidas, setas convergindo e o texto ponto de encontro emergência",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista as medidas para a seção inteira (lotação, sistemas e ponto de encontro) e pede para conferir a medida conforme o modelo; confirmar quais medidas valem para este modelo
    // TODO confirmar: Material e espessura não informados no catálogo; a seção não diz se a placa é fotoluminescente
    {
      id: "scala-pp-0899",
      name: "Placa ponto de encontro da brigada de emergência",
      code: "PP 0899",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa vermelha com pictograma de pessoas reunidas, setas convergentes e o texto PONTO DE ENCONTRO DA BRIGADA DE EMERGÊNCIA (código Scala PP 0899). Marca a área externa onde as pessoas se reúnem depois de abandonar a edificação. Faz parte da linha de sinalização de lotação e sistemas contra incêndio da Scala, de acordo com a ABNT NBR 16820.",
      specs: ["De acordo com a ABNT NBR 16820"],
      sizes: ["78 x 45 cm", "30 x 40 cm", "20 x 20 cm", "70 x 40 cm", "75 x 48 cm"],
      image: "/produtos/sinalizacao/scala-pp-0899.webp",
      imageAlt: "Placa vermelha com pessoas reunidas, setas convergindo e o texto ponto de encontro da brigada de emergência",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista as medidas para a seção inteira (lotação, sistemas e ponto de encontro) e pede para conferir a medida conforme o modelo; confirmar quais medidas valem para este modelo
    // TODO confirmar: Material e espessura não informados no catálogo; a seção não diz se a placa é fotoluminescente
    {
      id: "scala-pp-0999",
      name: "Placa ponto de encontro (S24)",
      code: "PP 0999",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa verde de ponto de encontro com pictograma de pessoas reunidas, setas convergentes e o texto PONTO DE ENCONTRO (código Scala PP 0999, símbolo S24 da ABNT NBR 16820). Marca a área externa onde as pessoas se reúnem depois de abandonar a edificação. Faz parte da linha de sinalização de lotação e sistemas contra incêndio da Scala, de acordo com a ABNT NBR 16820.",
      specs: ["Código NBR 16820: S24", "De acordo com a ABNT NBR 16820"],
      sizes: ["78 x 45 cm", "30 x 40 cm", "20 x 20 cm", "70 x 40 cm", "75 x 48 cm"],
      image: "/produtos/sinalizacao/scala-pp-0999.webp",
      imageAlt: "Placa verde com borda clara, pessoas reunidas, setas convergindo e o texto ponto de encontro",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista as medidas para a seção inteira (lotação, sistemas e ponto de encontro) e pede para conferir a medida conforme o modelo; confirmar quais medidas valem para este modelo
    // TODO confirmar: Material e espessura não informados no catálogo; a seção não diz se a placa é fotoluminescente
    {
      id: "scala-pp-0909",
      name: "Placa ponto de encontro sem texto (S24)",
      code: "PP 0909",
      supplier: "Grupo Scala",
      group: "Sinalização de rota de fuga",
      description: "Placa verde quadrada de ponto de encontro só com o pictograma de pessoas reunidas e setas convergentes (código Scala PP 0909, símbolo S24 da ABNT NBR 16820). Marca a área externa onde as pessoas se reúnem depois de abandonar a edificação. Faz parte da linha de sinalização de lotação e sistemas contra incêndio da Scala, de acordo com a ABNT NBR 16820.",
      specs: ["Código NBR 16820: S24", "De acordo com a ABNT NBR 16820"],
      sizes: ["78 x 45 cm", "30 x 40 cm", "20 x 20 cm", "70 x 40 cm", "75 x 48 cm"],
      image: "/produtos/sinalizacao/scala-pp-0909.webp",
      imageAlt: "Placa verde quadrada com pessoas reunidas e quatro setas convergindo para o centro",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-ex-0503",
      name: "Placa de extintor de incêndio",
      code: "EX 0503",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de extintor (código Scala EX 0503, símbolo E5 da ABNT NBR 16820). Instalada acima do extintor para indicar sua posição. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E5", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0503.webp",
      imageAlt: "Placa vermelha quadrada com pictograma de extintor em fotoluminescente",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Sem selo NBR impresso; variante do E5 por agente
    {
      id: "scala-ex-0503-abc",
      name: "Placa de extintor pó ABC",
      code: "EX 0503-ABC",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de extintor identificado PÓ ABC (código Scala EX 0503-ABC). Instalada acima do extintor para indicar sua posição e o agente extintor. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/extintor.webp",
      imageAlt: "Placa vermelha quadrada com extintor fotoluminescente identificado pó ABC",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Sem selo NBR impresso; variante do E5 por agente
    {
      id: "scala-ex-0503-bc",
      name: "Placa de extintor pó BC",
      code: "EX 0503-BC",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de extintor identificado PÓ BC (código Scala EX 0503-BC). Instalada acima do extintor para indicar sua posição e o agente extintor. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0503-bc.webp",
      imageAlt: "Placa vermelha quadrada com extintor fotoluminescente identificado pó BC",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Sem selo NBR impresso; variante do E5 por agente
    {
      id: "scala-ex-0503-co2",
      name: "Placa de extintor CO₂",
      code: "EX 0503-CO2",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de extintor identificado CO₂ (código Scala EX 0503-CO2). Instalada acima do extintor para indicar sua posição e o agente extintor. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0503-co2.webp",
      imageAlt: "Placa vermelha quadrada com extintor fotoluminescente identificado CO2",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Sem selo NBR impresso; variante do E5 por agente
    // TODO confirmar: O sufixo AGP sugere água pressurizada, mas a placa traz só "ÁGUA" — confirmar nome comercial
    {
      id: "scala-ex-0503-agp",
      name: "Placa de extintor de água",
      code: "EX 0503-AGP",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de extintor identificado ÁGUA (código Scala EX 0503-AGP). Instalada acima do extintor para indicar sua posição e o agente extintor. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0503-agp.webp",
      imageAlt: "Placa vermelha quadrada com extintor fotoluminescente identificado água",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Sem selo NBR impresso; variante do E5 por agente
    // TODO confirmar: A placa traz só a sigla "EM"; leitura como espuma mecânica é dedução (o guia de cores da p. 13 cita "espuma mecânica") — confirmar
    {
      id: "scala-ex-0503-em",
      name: "Placa de extintor de espuma mecânica (EM)",
      code: "EX 0503-EM",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de extintor identificado EM (código Scala EX 0503-EM). Instalada acima do extintor para indicar sua posição e o agente extintor. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0503-em.webp",
      imageAlt: "Placa vermelha quadrada com extintor fotoluminescente identificado EM",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Sem selo NBR impresso; variante do E5 por agente
    // TODO confirmar: Texto da etiqueta do extintor ilegível na imagem além da letra K — confirmar
    // TODO confirmar: Uso em cozinhas é dedução do tipo classe K
    {
      id: "scala-ex-0503-k",
      name: "Placa de extintor classe K",
      code: "EX 0503-K",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de extintor identificado com a letra K (código Scala EX 0503-K). Instalada acima do extintor classe K, usado em cozinhas com óleos e gorduras. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0503-k.webp",
      imageAlt: "Placa vermelha quadrada com extintor fotoluminescente identificado classe K",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Sem selo NBR impresso; variante do E5 por agente
    // TODO confirmar: Uso em metais combustíveis é dedução da classe D
    {
      id: "scala-ex-0503-d",
      name: "Placa de extintor pó classe D",
      code: "EX 0503-D",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de extintor identificado PÓ D (código Scala EX 0503-D). Instalada acima do extintor de pó para classe D, usado em áreas com metais combustíveis. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0503-d.webp",
      imageAlt: "Placa vermelha quadrada com extintor fotoluminescente identificado pó D",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Locais de uso deduzidos do tipo de extintor
    {
      id: "scala-ex-0507",
      name: "Placa de extintor sobre rodas (carreta)",
      code: "EX 0507",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de extintor sobre rodas (código Scala EX 0507, símbolo E11 da ABNT NBR 16820). Indica a posição de extintores sobre rodas, comuns em indústrias, depósitos e postos. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E11", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0507.webp",
      imageAlt: "Placa vermelha quadrada com pictograma de extintor sobre rodas",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-ex-0502",
      name: "Placa de hidrante",
      code: "EX 0502",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com a letra H (código Scala EX 0502, símbolo E8 da ABNT NBR 16820). Indica a posição do hidrante de parede ou do abrigo com hidrante. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E8", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/hidrante.webp",
      imageAlt: "Placa vermelha quadrada com a letra H em fotoluminescente",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Nome deduzido do pictograma; o catálogo não escreve o nome do equipamento — conferir na tabela da ABNT NBR 16820
    {
      id: "scala-ex-0504",
      name: "Placa de mangotinho",
      code: "EX 0504",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de mangueira enrolada (código Scala EX 0504, símbolo E7 da ABNT NBR 16820). Indica a posição do mangotinho ou da mangueira de combate a incêndio. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E7", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/mangotinho.webp",
      imageAlt: "Placa vermelha quadrada com pictograma de mangueira enrolada",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Nome deduzido do pictograma; o catálogo não escreve o nome do equipamento — conferir na tabela da ABNT NBR 16820
    {
      id: "scala-ex-0508",
      name: "Placa de abrigo de mangueira",
      code: "EX 0508",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de mangueira aduchada em suporte e registro (código Scala EX 0508, símbolo E6 da ABNT NBR 16820). Indica a posição do abrigo de mangueira do sistema de hidrantes. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E6", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0508.webp",
      imageAlt: "Placa vermelha quadrada com pictograma de mangueira em suporte ao lado de um registro",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Nome deduzido do pictograma; o catálogo não escreve o nome do equipamento — conferir na tabela da ABNT NBR 16820
    {
      id: "scala-ex-0509",
      name: "Placa de alarme sonoro",
      code: "EX 0509",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de sirene (corneta) (código Scala EX 0509, símbolo E1 da ABNT NBR 16820). Indica a posição do dispositivo de alarme sonoro do sistema de alarme de incêndio. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E1", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0509.webp",
      imageAlt: "Placa vermelha quadrada com pictograma de sirene em forma de corneta",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Nome deduzido do pictograma; o catálogo não escreve o nome do equipamento — conferir na tabela da ABNT NBR 16820
    {
      id: "scala-ex-0506",
      name: "Placa de telefone de emergência",
      code: "EX 0506",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com pictograma de telefone (código Scala EX 0506, símbolo E4 da ABNT NBR 16820). Indica a posição de telefone ou interfone de emergência. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E4", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0506.webp",
      imageAlt: "Placa vermelha quadrada com pictograma de fone de telefone",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: O catálogo não diz qual equipamento o símbolo E9 representa — conferir na ABNT NBR 16820 antes de publicar o nome
    {
      id: "scala-ex-0505",
      name: "Placa de equipamento E9 (pictograma semicircular)",
      code: "EX 0505",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha de equipamento com pictograma semicircular (código Scala EX 0505, símbolo E9 da ABNT NBR 16820). Indica a posição do equipamento de combate a incêndio correspondente ao símbolo E9 da norma. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E9", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0505.webp",
      imageAlt: "Placa vermelha quadrada com pictograma de semicírculo fotoluminescente",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: O catálogo não diz qual equipamento o símbolo E10 representa (parece chuveiro automático/sprinkler) — conferir na ABNT NBR 16820
    {
      id: "scala-ex-0510",
      name: "Placa de equipamento E10 (pictograma de chuveiro)",
      code: "EX 0510",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha de equipamento com pictograma de cabeça de chuveiro e jato (código Scala EX 0510, símbolo E10 da ABNT NBR 16820). Indica a posição do equipamento de combate a incêndio correspondente ao símbolo E10 da norma. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E10", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0510.webp",
      imageAlt: "Placa vermelha quadrada com pictograma de cabeça de chuveiro lançando jato",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: O catálogo não diz qual equipamento o símbolo E12 representa (parece manta/cobertor corta-fogo) — conferir na ABNT NBR 16820
    {
      id: "scala-ex-0511",
      name: "Placa de equipamento E12 (pictograma de manta)",
      code: "EX 0511",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha de equipamento com pictograma de pessoa segurando uma manta diante de chamas (código Scala EX 0511, símbolo E12 da ABNT NBR 16820). Indica a posição do equipamento correspondente ao símbolo E12 da norma. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E12", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0511.webp",
      imageAlt: "Placa vermelha quadrada com pictograma de pessoa abrindo uma manta diante de chamas",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Catálogo mostra só a seta para a direita; não diz se a mesma placa serve girada para a esquerda
    {
      id: "scala-ex-0513",
      name: "Placa de seta para equipamento (horizontal)",
      code: "EX 0513",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com seta horizontal (código Scala EX 0513, símbolo E13/14 da ABNT NBR 16820). Usada junto à placa do equipamento para indicar a direção em que ele está. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E13/14", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0513.webp",
      imageAlt: "Placa vermelha quadrada com seta fotoluminescente apontando para a direita",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Catálogo mostra só a seta diagonal para baixo à esquerda; não diz se serve girada para outras diagonais
    {
      id: "scala-ex-0514",
      name: "Placa de seta para equipamento (diagonal)",
      code: "EX 0514",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente vermelha com seta diagonal (código Scala EX 0514, símbolo E15/16 da ABNT NBR 16820). Usada junto à placa do equipamento para indicar a direção em que ele está. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E15/16", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 15 cm", "20 x 20 cm", "30 x 30 cm"],
      image: "/produtos/sinalizacao/scala-ex-0514.webp",
      imageAlt: "Placa vermelha quadrada com seta fotoluminescente diagonal apontando para baixo à esquerda",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material e espessura não informados; a seção não diz se a placa de agente é fotoluminescente
    // TODO confirmar: Posição de instalação (abaixo da placa do extintor) é dedução — confirmar
    {
      id: "scala-ex-0530",
      name: "Placa de agente – extintor de água",
      code: "EX 0530",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa de identificação do agente extintor com o título EXTINTOR DE ÁGUA, pictogramas das classes de fogo e campo para o número do equipamento (código Scala EX 0530, símbolo N1 da ABNT NBR 16820). Fixada junto ao extintor, logo abaixo da placa de localização, para mostrar o agente e as classes de fogo em que ele pode ser usado. Feita de acordo com a ABNT NBR 16820, já com o espaço ″Nº do equipamento″ para o controle do extintor.",
      specs: ["Código NBR 16820: N1", "De acordo com a ABNT NBR 16820", "Campo ″Nº do equipamento″"],
      sizes: ["15 x 5 cm", "20 x 7 cm"],
      image: "/produtos/sinalizacao/scala-ex-0530.webp",
      imageAlt: "Etiqueta retangular com faixa verde escrita extintor de água, pictogramas de classes de fogo e campo de número",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material e espessura não informados; a seção não diz se a placa de agente é fotoluminescente
    // TODO confirmar: Posição de instalação (abaixo da placa do extintor) é dedução — confirmar
    {
      id: "scala-ex-0532",
      name: "Placa de agente – extintor de ABC",
      code: "EX 0532",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa de identificação do agente extintor com o título EXTINTOR DE ABC, pictogramas das classes de fogo e campo para o número do equipamento (código Scala EX 0532, símbolo N2 da ABNT NBR 16820). Fixada junto ao extintor, logo abaixo da placa de localização, para mostrar o agente e as classes de fogo em que ele pode ser usado. Feita de acordo com a ABNT NBR 16820, já com o espaço ″Nº do equipamento″ para o controle do extintor.",
      specs: ["Código NBR 16820: N2", "De acordo com a ABNT NBR 16820", "Campo ″Nº do equipamento″"],
      sizes: ["15 x 5 cm", "20 x 7 cm"],
      image: "/produtos/sinalizacao/scala-ex-0532.webp",
      imageAlt: "Etiqueta retangular com faixa preta escrita extintor de ABC, pictogramas de classes de fogo e campo de número",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material e espessura não informados; a seção não diz se a placa de agente é fotoluminescente
    // TODO confirmar: Posição de instalação (abaixo da placa do extintor) é dedução — confirmar
    {
      id: "scala-ex-0531",
      name: "Placa de agente – extintor de gás carbônico (CO₂)",
      code: "EX 0531",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa de identificação do agente extintor com o título EXTINTOR DE GÁS CARBÔNICO (CO₂), pictogramas das classes de fogo e campo para o número do equipamento (código Scala EX 0531, símbolo N3 da ABNT NBR 16820). Fixada junto ao extintor, logo abaixo da placa de localização, para mostrar o agente e as classes de fogo em que ele pode ser usado. Feita de acordo com a ABNT NBR 16820, já com o espaço ″Nº do equipamento″ para o controle do extintor.",
      specs: ["Código NBR 16820: N3", "De acordo com a ABNT NBR 16820", "Campo ″Nº do equipamento″"],
      sizes: ["15 x 5 cm", "20 x 7 cm"],
      image: "/produtos/sinalizacao/scala-ex-0531.webp",
      imageAlt: "Etiqueta retangular com faixa azul escrita extintor de gás carbônico, pictogramas de classes de fogo e campo de número",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material e espessura não informados; a seção não diz se a placa de agente é fotoluminescente
    // TODO confirmar: Posição de instalação (abaixo da placa do extintor) é dedução — confirmar
    {
      id: "scala-ex-0534",
      name: "Placa de agente – extintor de espuma",
      code: "EX 0534",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa de identificação do agente extintor com o título EXTINTOR DE ESPUMA, pictogramas das classes de fogo e campo para o número do equipamento (código Scala EX 0534, símbolo N4 da ABNT NBR 16820). Fixada junto ao extintor, logo abaixo da placa de localização, para mostrar o agente e as classes de fogo em que ele pode ser usado. Feita de acordo com a ABNT NBR 16820, já com o espaço ″Nº do equipamento″ para o controle do extintor.",
      specs: ["Código NBR 16820: N4", "De acordo com a ABNT NBR 16820", "Campo ″Nº do equipamento″"],
      sizes: ["15 x 5 cm", "20 x 7 cm"],
      image: "/produtos/sinalizacao/scala-ex-0534.webp",
      imageAlt: "Etiqueta retangular com faixa amarela escrita extintor de espuma, pictogramas de classes de fogo e campo de número",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material e espessura não informados; a seção não diz se a placa de agente é fotoluminescente
    // TODO confirmar: Posição de instalação (abaixo da placa do extintor) é dedução — confirmar
    // TODO confirmar: foto: o recorte do catálogo ficou danificado pelo selo; falta foto do fornecedor
    {
      id: "scala-ex-0533",
      name: "Placa de agente – extintor de pó BC",
      code: "EX 0533",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa de identificação do agente extintor com o título EXTINTOR DE PÓ BC, pictogramas das classes de fogo e campo para o número do equipamento (código Scala EX 0533, símbolo N5 da ABNT NBR 16820). Fixada junto ao extintor, logo abaixo da placa de localização, para mostrar o agente e as classes de fogo em que ele pode ser usado. Feita de acordo com a ABNT NBR 16820, já com o espaço ″Nº do equipamento″ para o controle do extintor.",
      specs: ["Código NBR 16820: N5", "De acordo com a ABNT NBR 16820", "Campo ″Nº do equipamento″"],
      sizes: ["15 x 5 cm", "20 x 7 cm"],
      image: "",
      imageAlt: "Etiqueta retangular com faixa preta escrita extintor de pó BC, pictogramas de classes de fogo e campo de número",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material e espessura não informados; a seção não diz se a placa de agente é fotoluminescente
    // TODO confirmar: Posição de instalação (abaixo da placa do extintor) é dedução — confirmar
    // TODO confirmar: Sem selo NBR (N) impresso para este modelo
    {
      id: "scala-ex-0535",
      name: "Placa de agente – extintor premium ABC",
      code: "EX 0535",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa de identificação do agente extintor com o título EXTINTOR PREMIUM ABC, pictogramas das classes de fogo e campo para o número do equipamento (código Scala EX 0535). Fixada junto ao extintor, logo abaixo da placa de localização, para mostrar o agente e as classes de fogo em que ele pode ser usado. Feita de acordo com a ABNT NBR 16820, já com o espaço ″Nº do equipamento″ para o controle do extintor.",
      specs: ["De acordo com a ABNT NBR 16820", "Campo ″Nº do equipamento″"],
      sizes: ["15 x 5 cm", "20 x 7 cm"],
      image: "/produtos/sinalizacao/agente-extintor.webp",
      imageAlt: "Etiqueta retangular com faixa preta escrita extintor premium ABC, pictogramas de classes de fogo e campo de número",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-ex-0524",
      name: "Placa de comando – alarme de incêndio",
      code: "EX 0524",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente de comando com pictograma de botão e o texto ALARME DE INCÊNDIO (código Scala EX 0524, símbolo E2 da ABNT NBR 16820). Instalada junto ao acionador manual do sistema de alarme de incêndio. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E2", "Placa fotoluminescente", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["10 x 15 cm"],
      image: "/produtos/sinalizacao/scala-ex-0524.webp",
      imageAlt: "Placa vermelha vertical com pictograma de botão e o texto alarme de incêndio",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-ex-0525",
      name: "Placa de comando – bomba de incêndio",
      code: "EX 0525",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente de comando com pictograma de botão e o texto BOMBA DE INCÊNDIO (código Scala EX 0525, símbolo E3 da ABNT NBR 16820). Instalada junto ao botão de acionamento da bomba de incêndio. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: E3", "Placa fotoluminescente", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["10 x 15 cm"],
      image: "/produtos/sinalizacao/bomba-de-incendio.webp",
      imageAlt: "Placa vermelha vertical com pictograma de botão e o texto bomba de incêndio",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Sem selo NBR impresso para este modelo
    {
      id: "scala-ex-0526",
      name: "Placa de comando – botoeira de incêndio",
      code: "EX 0526",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa fotoluminescente de comando com pictograma de botão e o texto BOTOEIRA DE INCÊNDIO (código Scala EX 0526). Instalada junto à botoeira (acionador manual) do sistema de incêndio. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Placa fotoluminescente", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["10 x 15 cm"],
      image: "/produtos/sinalizacao/acionador-alarme.webp",
      imageAlt: "Placa vermelha vertical com pictograma de botão e o texto botoeira de incêndio",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Texto da IN 13 do CBMSC não disponível nesta pesquisa — não citar exigências (altura, faixas) até conferir
    // TODO confirmar: Material e espessura não informados no catálogo
    // TODO confirmar: Locais de uso (pilares de galpões, garagens) deduzidos do nome "em coluna"
    {
      id: "scala-ex-1022",
      name: "Placa de hidrante em coluna – letra H (vertical)",
      code: "EX 1022",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa de sinalização de hidrante em coluna, com a letra H preta sobre fundo vermelho e faixas amarelas, em formato vertical (código Scala EX 1022). Fixada em pilares e colunas de galpões, garagens e depósitos para indicar de longe a posição do hidrante. A Scala informa que o modelo segue a IN 13 do Corpo de Bombeiros Militar de Santa Catarina.",
      specs: ["Conforme IN 13 do CBMSC (segundo o catálogo)", "Letra H · fundo vermelho com faixas amarelas"],
      sizes: ["30 x 40 cm"],
      image: "/produtos/sinalizacao/scala-ex-1022.webp",
      imageAlt: "Placa vertical vermelha com a letra H preta e faixas amarelas em cima e embaixo",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Texto da IN 13 do CBMSC não disponível nesta pesquisa — não citar exigências (altura, faixas) até conferir
    // TODO confirmar: Material e espessura não informados no catálogo
    // TODO confirmar: Locais de uso (pilares de galpões, garagens) deduzidos do nome "em coluna"
    {
      id: "scala-ex-1023",
      name: "Placa de extintor em coluna – letra E (vertical)",
      code: "EX 1023",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa de sinalização de extintor em coluna, com a letra E preta sobre fundo vermelho e faixas amarelas, em formato vertical (código Scala EX 1023). Fixada em pilares e colunas de galpões, garagens e depósitos para indicar de longe a posição do extintor. A Scala informa que o modelo segue a IN 13 do Corpo de Bombeiros Militar de Santa Catarina.",
      specs: ["Conforme IN 13 do CBMSC (segundo o catálogo)", "Letra E · fundo vermelho com faixas amarelas"],
      sizes: ["30 x 40 cm"],
      image: "/produtos/sinalizacao/scala-ex-1023.webp",
      imageAlt: "Placa vertical vermelha com a letra E preta e faixas amarelas em cima e embaixo",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Texto da IN 13 do CBMSC não disponível nesta pesquisa — não citar exigências (altura, faixas) até conferir
    // TODO confirmar: Material e espessura não informados no catálogo
    // TODO confirmar: Locais de uso (pilares de galpões, garagens) deduzidos do nome "em coluna"
    // TODO confirmar: O catálogo dá só 30x40cm para a seção; este modelo aparece mais largo que alto — confirmar se é 40 x 30 cm
    {
      id: "scala-ex-1024",
      name: "Placa de hidrante em coluna – letra H (horizontal)",
      code: "EX 1024",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa de sinalização de hidrante em coluna, com a letra H preta sobre fundo vermelho e faixas amarelas, em formato horizontal (código Scala EX 1024). Fixada em pilares e colunas de galpões, garagens e depósitos para indicar de longe a posição do hidrante. A Scala informa que o modelo segue a IN 13 do Corpo de Bombeiros Militar de Santa Catarina.",
      specs: ["Conforme IN 13 do CBMSC (segundo o catálogo)", "Letra H · fundo vermelho com faixas amarelas"],
      sizes: ["30 x 40 cm"],
      image: "/produtos/sinalizacao/scala-ex-1024.webp",
      imageAlt: "Placa horizontal vermelha com a letra H preta e faixas amarelas em cima e embaixo",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Texto da IN 13 do CBMSC não disponível nesta pesquisa — não citar exigências (altura, faixas) até conferir
    // TODO confirmar: Material e espessura não informados no catálogo
    // TODO confirmar: Locais de uso (pilares de galpões, garagens) deduzidos do nome "em coluna"
    // TODO confirmar: O catálogo dá só 30x40cm para a seção; este modelo aparece mais largo que alto — confirmar se é 40 x 30 cm
    // TODO confirmar: Na página a placa encosta na margem direita; conferir se o recorte não cortou a borda
    {
      id: "scala-ex-1025",
      name: "Placa de extintor em coluna – letra E (horizontal)",
      code: "EX 1025",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa de sinalização de extintor em coluna, com a letra E preta sobre fundo vermelho e faixas amarelas, em formato horizontal (código Scala EX 1025). Fixada em pilares e colunas de galpões, garagens e depósitos para indicar de longe a posição do extintor. A Scala informa que o modelo segue a IN 13 do Corpo de Bombeiros Militar de Santa Catarina.",
      specs: ["Conforme IN 13 do CBMSC (segundo o catálogo)", "Letra E · fundo vermelho com faixas amarelas"],
      sizes: ["30 x 40 cm"],
      image: "/produtos/sinalizacao/scala-ex-1025.webp",
      imageAlt: "Placa horizontal vermelha com a letra E preta e faixas amarelas em cima e embaixo",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material e espessura não informados; a placa não é descrita como fotoluminescente nem como NBR 16820
    // TODO confirmar: Uso pelo Corpo de Bombeiros é dedução da função do hidrante de recalque
    {
      id: "scala-pg-2741",
      name: "Placa hidrante de recalque",
      code: "PG 2741",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Placa com o texto HIDRANTE DE RECALQUE em vermelho sobre fundo branco, código Scala PG 2741. Identifica o registro de recalque (hidrante de recalque) na fachada ou no passeio, usado pelo Corpo de Bombeiros para abastecer o sistema. Faz parte da linha de sinalização predial e industrial da Scala, vendida na medida 40x30cm.",
      specs: ["Texto: HIDRANTE DE RECALQUE", "Linha predial e industrial"],
      sizes: ["40 x 30 cm"],
      image: "/produtos/sinalizacao/hidrante-de-recalque.webp",
      imageAlt: "Placa branca com borda vermelha e o texto hidrante de recalque em vermelho",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Espessura do acrílico não informada
    // TODO confirmar: No catálogo a primeira medida aparece como "20x20" sem unidade; usado cm como nas demais
    // TODO confirmar: "Deixa ver o equipamento" é dedução do material transparente
    {
      id: "scala-pg-2733",
      name: "Visor para caixa – Hidrante",
      code: "PG 2733",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Visor em acrílico transparente com a inscrição HIDRANTE em vermelho sobre faixa amarela, código Scala PG 2733. Aplicado na porta de caixas de incêndio e abrigos de mangueira para identificar o conteúdo. O acrílico transparente deixa ver o equipamento guardado dentro da caixa.",
      specs: ["Acrílico transparente", "Inscrição HIDRANTE"],
      sizes: ["20 x 20 cm", "24 x 24 cm", "30 x 30 cm"],
      materials: ["Acrílico transparente"],
      image: "/produtos/sinalizacao/scala-pg-2733.webp",
      imageAlt: "Visor quadrado transparente com a inscrição hidrante em vermelho sobre faixa amarela",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Espessura do acrílico não informada
    // TODO confirmar: No catálogo a primeira medida aparece como "20x20" sem unidade; usado cm como nas demais
    // TODO confirmar: "Deixa ver o equipamento" é dedução do material transparente
    {
      id: "scala-pg-2735",
      name: "Visor para caixa – Incêndio",
      code: "PG 2735",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Visor em acrílico transparente com a inscrição INCÊNDIO em vermelho sobre faixa amarela, código Scala PG 2735. Aplicado na porta de caixas de incêndio e abrigos de mangueira para identificar o conteúdo. O acrílico transparente deixa ver o equipamento guardado dentro da caixa.",
      specs: ["Acrílico transparente", "Inscrição INCÊNDIO"],
      sizes: ["20 x 20 cm", "24 x 24 cm", "30 x 30 cm"],
      materials: ["Acrílico transparente"],
      image: "/produtos/sinalizacao/scala-pg-2735.webp",
      imageAlt: "Visor quadrado transparente com a inscrição incêndio em vermelho sobre faixa amarela",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista 19x5cm e 20x30cm para a seção sem dizer qual medida é de qual modelo — confirmar
    {
      id: "scala-pg-2723",
      name: "Adesivo para caixa – Hidrante",
      code: "PG 2723",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Adesivo para caixa de incêndio com o texto HIDRANTE, código Scala PG 2723. Colado por dentro do vidro da caixa de hidrante ou abrigo de mangueira. Segundo a Scala, os adesivos resistem à água e não desbotam ao sol.",
      specs: ["Para colar dentro do vidro", "Resistente à água · não desbota ao sol (catálogo)"],
      sizes: ["19 x 5 cm", "20 x 30 cm"],
      materials: ["Adesivo"],
      image: "/produtos/sinalizacao/abrigo-hidrante.webp",
      imageAlt: "Adesivo retangular amarelo com borda vermelha e o texto hidrante em vermelho",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista 19x5cm e 20x30cm para a seção sem dizer qual medida é de qual modelo — confirmar
    {
      id: "scala-pg-2725",
      name: "Adesivo para caixa – Incêndio",
      code: "PG 2725",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Adesivo para caixa de incêndio com o texto INCÊNDIO, código Scala PG 2725. Colado por dentro do vidro de caixas de equipamentos de incêndio. Segundo a Scala, os adesivos resistem à água e não desbotam ao sol.",
      specs: ["Para colar dentro do vidro", "Resistente à água · não desbota ao sol (catálogo)"],
      sizes: ["19 x 5 cm", "20 x 30 cm"],
      materials: ["Adesivo"],
      image: "/produtos/sinalizacao/scala-pg-2725.webp",
      imageAlt: "Adesivo retangular amarelo com borda vermelha e o texto incêndio em vermelho",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista 19x5cm e 20x30cm para a seção sem dizer qual medida é de qual modelo — confirmar
    // TODO confirmar: Situação de uso deduzida do texto do adesivo
    {
      id: "scala-pg-2727",
      name: "Adesivo para caixa – Não use em eletricidade",
      code: "PG 2727",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Adesivo para caixa de incêndio com o texto NÃO USE EM ELETRICIDADE, código Scala PG 2727. Colado por dentro do vidro de caixas cujo equipamento não deve ser usado em instalações elétricas energizadas. Segundo a Scala, os adesivos resistem à água e não desbotam ao sol.",
      specs: ["Para colar dentro do vidro", "Resistente à água · não desbota ao sol (catálogo)"],
      sizes: ["19 x 5 cm", "20 x 30 cm"],
      materials: ["Adesivo"],
      image: "/produtos/sinalizacao/scala-pg-2727.webp",
      imageAlt: "Adesivo retangular amarelo com borda preta e o texto não use em eletricidade",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista 19x5cm e 20x30cm para a seção sem dizer qual medida é de qual modelo — confirmar
    // TODO confirmar: Situação de uso deduzida do texto do adesivo
    {
      id: "scala-pg-2720",
      name: "Adesivo para caixa – Em caso de incêndio quebre o vidro e feche o registro",
      code: "PG 2720",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Adesivo para caixa de incêndio com o texto EM CASO DE INCÊNDIO QUEBRE O VIDRO E FECHE O REGISTRO / CUIDADO! VIDRO ESTILHAÇANTE, código Scala PG 2720. Colado por dentro do vidro de caixas que guardam registro ou chave a ser acionada em incêndio. Segundo a Scala, os adesivos resistem à água e não desbotam ao sol.",
      specs: ["Para colar dentro do vidro", "Resistente à água · não desbota ao sol (catálogo)"],
      sizes: ["19 x 5 cm", "20 x 30 cm"],
      materials: ["Adesivo"],
      image: "/produtos/sinalizacao/scala-pg-2720.webp",
      imageAlt: "Adesivo vertical branco com borda amarela e o texto em caso de incêndio quebre o vidro e feche o registro, cuidado vidro estilhaçante",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista 19x5cm e 20x30cm para a seção sem dizer qual medida é de qual modelo — confirmar
    {
      id: "scala-pg-2721",
      name: "Adesivo para caixa – Em caso de incêndio quebre o vidro",
      code: "PG 2721",
      supplier: "Grupo Scala",
      group: "Sinalização de equipamentos",
      description: "Adesivo para caixa de incêndio com o texto EM CASO DE INCÊNDIO QUEBRE O VIDRO / CUIDADO! VIDRO ESTILHAÇANTE, código Scala PG 2721. Colado por dentro do vidro de caixas de incêndio que devem ser abertas quebrando o vidro. Segundo a Scala, os adesivos resistem à água e não desbotam ao sol.",
      specs: ["Para colar dentro do vidro", "Resistente à água · não desbota ao sol (catálogo)"],
      sizes: ["19 x 5 cm", "20 x 30 cm"],
      materials: ["Adesivo"],
      image: "/produtos/sinalizacao/scala-pg-2721.webp",
      imageAlt: "Adesivo vertical branco com borda amarela e o texto em caso de incêndio quebre o vidro, cuidado vidro estilhaçante",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Nome do risco deduzido do pictograma; o catálogo não escreve o nome — conferir na tabela da ABNT NBR 16820
    {
      id: "scala-ad-0553",
      name: "Placa de alerta – cuidado, risco geral",
      code: "AD 0553",
      supplier: "Grupo Scala",
      group: "Alerta",
      description: "Placa fotoluminescente de alerta, triangular com borda preta, com pictograma de ponto de exclamação (código Scala AD 0553, símbolo A1 da ABNT NBR 16820). Usada para chamar atenção a um perigo que não tem pictograma próprio. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: A1", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["20 x 20 cm"],
      image: "/produtos/sinalizacao/scala-ad-0553.webp",
      imageAlt: "Placa quadrada com triângulo de alerta e ponto de exclamação preto sobre fundo fotoluminescente",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Nome do risco deduzido do pictograma; o catálogo não escreve o nome — conferir na tabela da ABNT NBR 16820
    {
      id: "scala-ad-0557",
      name: "Placa de alerta – risco de incêndio (inflamável)",
      code: "AD 0557",
      supplier: "Grupo Scala",
      group: "Alerta",
      description: "Placa fotoluminescente de alerta, triangular com borda preta, com pictograma de chama (código Scala AD 0557, símbolo A2 da ABNT NBR 16820). Instalada em depósitos, áreas de tancagem e locais com materiais inflamáveis. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: A2", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["20 x 20 cm"],
      image: "/produtos/sinalizacao/alerta-inflamavel.webp",
      imageAlt: "Placa quadrada com triângulo de alerta e pictograma de chama sobre fundo fotoluminescente",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Nome do risco deduzido do pictograma; o catálogo não escreve o nome — conferir na tabela da ABNT NBR 16820
    {
      id: "scala-ad-0554",
      name: "Placa de alerta – risco de explosão",
      code: "AD 0554",
      supplier: "Grupo Scala",
      group: "Alerta",
      description: "Placa fotoluminescente de alerta, triangular com borda preta, com pictograma de explosão (código Scala AD 0554, símbolo A3 da ABNT NBR 16820). Instalada em locais com materiais ou atmosferas explosivas. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: A3", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["20 x 20 cm"],
      image: "/produtos/sinalizacao/alerta-explosao.webp",
      imageAlt: "Placa quadrada com triângulo de alerta e pictograma de explosão sobre fundo fotoluminescente",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Nome do risco deduzido do pictograma; o catálogo não escreve o nome — conferir na tabela da ABNT NBR 16820
    {
      id: "scala-ad-0559",
      name: "Placa de alerta – risco de corrosão",
      code: "AD 0559",
      supplier: "Grupo Scala",
      group: "Alerta",
      description: "Placa fotoluminescente de alerta, triangular com borda preta, com pictograma de líquido corrosivo atingindo uma mão e uma superfície (código Scala AD 0559, símbolo A4 da ABNT NBR 16820). Instalada em locais de armazenamento ou manuseio de produtos corrosivos. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: A4", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["20 x 20 cm"],
      image: "/produtos/sinalizacao/scala-ad-0559.webp",
      imageAlt: "Placa quadrada com triângulo de alerta e pictograma de líquido corrosivo pingando sobre mão e superfície",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Nome do risco deduzido do pictograma; o catálogo não escreve o nome — conferir na tabela da ABNT NBR 16820
    {
      id: "scala-ad-0551",
      name: "Placa de alerta – risco de choque elétrico",
      code: "AD 0551",
      supplier: "Grupo Scala",
      group: "Alerta",
      description: "Placa fotoluminescente de alerta, triangular com borda preta, com pictograma de raio (código Scala AD 0551, símbolo A5 da ABNT NBR 16820). Instalada em painéis, quadros elétricos, subestações e casas de máquinas. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: A5", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["20 x 20 cm"],
      image: "/produtos/sinalizacao/alerta-choque-eletrico.webp",
      imageAlt: "Placa quadrada com triângulo de alerta e pictograma de raio sobre fundo fotoluminescente",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Nome do risco deduzido do pictograma; o catálogo não escreve o nome — conferir na tabela da ABNT NBR 16820
    {
      id: "scala-ad-0552",
      name: "Placa de alerta – risco de radiação",
      code: "AD 0552",
      supplier: "Grupo Scala",
      group: "Alerta",
      description: "Placa fotoluminescente de alerta, triangular com borda preta, com pictograma de símbolo de radiação (trifólio) (código Scala AD 0552, símbolo A6 da ABNT NBR 16820). Instalada em salas e áreas com fontes de radiação ionizante. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: A6", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["20 x 20 cm"],
      image: "/produtos/sinalizacao/scala-ad-0552.webp",
      imageAlt: "Placa quadrada com triângulo de alerta e símbolo de radiação sobre fundo fotoluminescente",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Nome do risco deduzido do pictograma; o catálogo não escreve o nome — conferir na tabela da ABNT NBR 16820
    {
      id: "scala-ad-0558",
      name: "Placa de alerta – substância tóxica",
      code: "AD 0558",
      supplier: "Grupo Scala",
      group: "Alerta",
      description: "Placa fotoluminescente de alerta, triangular com borda preta, com pictograma de caveira com ossos cruzados (código Scala AD 0558, símbolo A7 da ABNT NBR 16820). Instalada em locais com armazenamento de substâncias tóxicas ou venenosas. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: A7", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["20 x 20 cm"],
      image: "/produtos/sinalizacao/scala-ad-0558.webp",
      imageAlt: "Placa quadrada com triângulo de alerta e pictograma de caveira sobre fundo fotoluminescente",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0353",
      name: "Placa proibido fumar",
      code: "PP 0353",
      supplier: "Grupo Scala",
      group: "Proibição",
      description: "Placa fotoluminescente de proibição com círculo vermelho cortado sobre cigarro aceso e o texto PROIBIDO FUMAR (código Scala PP 0353, símbolo P1 da ABNT NBR 16820). Usada em áreas internas, depósitos e locais com risco de incêndio. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: P1", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 20 cm"],
      image: "/produtos/sinalizacao/proibido-fumar.webp",
      imageAlt: "Placa vertical com símbolo de proibido sobre cigarro aceso e o texto proibido fumar",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0354",
      name: "Placa proibido produzir chamas",
      code: "PP 0354",
      supplier: "Grupo Scala",
      group: "Proibição",
      description: "Placa fotoluminescente de proibição com círculo vermelho cortado sobre fósforo aceso e o texto PROIBIDO PRODUZIR CHAMAS (código Scala PP 0354, símbolo P2 da ABNT NBR 16820). Usada em locais com materiais inflamáveis, onde fósforos, isqueiros e chama aberta não podem ser usados. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: P2", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 20 cm"],
      image: "/produtos/sinalizacao/proibido-produzir-chama.webp",
      imageAlt: "Placa vertical com símbolo de proibido sobre fósforo aceso e o texto proibido produzir chamas",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Exemplo de local (equipamentos elétricos) é dedução
    {
      id: "scala-pp-0355",
      name: "Placa não jogue água",
      code: "PP 0355",
      supplier: "Grupo Scala",
      group: "Proibição",
      description: "Placa fotoluminescente de proibição com círculo vermelho cortado sobre água sendo jogada sobre o fogo e o texto NÃO JOGUE ÁGUA (código Scala PP 0355, símbolo P3 da ABNT NBR 16820). Usada onde a água não pode ser usada para apagar o fogo, como junto a equipamentos elétricos. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: P3", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 20 cm"],
      image: "/produtos/sinalizacao/scala-pp-0355.webp",
      imageAlt: "Placa vertical com símbolo de proibido sobre balde jogando água no fogo e o texto não jogue água",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0357",
      name: "Placa proibido utilizar o elevador em caso de incêndio",
      code: "PP 0357",
      supplier: "Grupo Scala",
      group: "Proibição",
      description: "Placa fotoluminescente de proibição com círculo vermelho cortado sobre elevador com chamas e o texto PROIBIDO UTILIZAR O ELEVADOR EM CASO DE INCÊNDIO (código Scala PP 0357, símbolo P4 da ABNT NBR 16820). Fixada junto às portas dos elevadores, em todos os pavimentos. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: P4", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 20 cm"],
      image: "/produtos/sinalizacao/proibido-elevador.webp",
      imageAlt: "Placa vertical com símbolo de proibido sobre elevador com chamas e faixa vermelha com o texto proibido utilizar o elevador em caso de incêndio",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    {
      id: "scala-pp-0359",
      name: "Placa não obstrua",
      code: "PP 0359",
      supplier: "Grupo Scala",
      group: "Proibição",
      description: "Placa fotoluminescente de proibição com círculo vermelho cortado sobre caixas empilhadas e o texto NÃO OBSTRUA (código Scala PP 0359, símbolo P5 da ABNT NBR 16820). Usada em frente a equipamentos de combate a incêndio, portas e rotas de fuga que devem ficar livres. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: P5", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["15 x 20 cm"],
      image: "/produtos/sinalizacao/proibido-obstruir.webp",
      imageAlt: "Placa vertical com símbolo de proibido sobre caixas empilhadas e o texto não obstrua",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base (substrato) e espessura da placa não informados no catálogo — só diz "placa fotoluminescente"; confirmar com a Scala
    // TODO confirmar: Medidas: o catálogo lista as medidas da página de rota de fuga, mas o formato do C1 é bem mais alongado — confirmar quais medidas existem para o C1
    // TODO confirmar: "Entre as placas principais" é dedução da foto de ambiente
    {
      id: "scala-pp-0589",
      name: "Placa de sinalização complementar – seta de rota de fuga (C1)",
      code: "PP 0589",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Placa fotoluminescente longa só com seta para a direita, código Scala PP 0589, símbolo C1 da ABNT NBR 16820. Usada ao longo de corredores e paredes, entre as placas principais, para reforçar a direção da rota de fuga. Como todas as placas fotoluminescentes Scala, tem laudo de conformidade com a ABNT NBR 16820: 233 mcd/m² após 10 min e 27 mcd/m² após 60 min no laudo, contra mínimos de 140 e 20 mcd/m² da norma.",
      specs: ["Código NBR 16820: C1", "Placa fotoluminescente · ABNT NBR 16820", "Laudo Scala: 233 mcd/m² (10 min) · 27 mcd/m² (60 min) · atenuação 1.800 min"],
      sizes: ["12 x 24 cm", "15 x 30 cm", "20 x 40 cm", "30 x 60 cm", "100 x 50 cm"],
      image: "/produtos/sinalizacao/scala-pp-0589.webp",
      imageAlt: "Placa verde estreita e longa com seta fotoluminescente apontando para a direita",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material da fita não informado
    // TODO confirmar: Não está claro se o FT 0458 da foto é a versão fotoluminescente
    // TODO confirmar: Usos (bordas, degraus, contornos) deduzidos — o catálogo só diz "indicação de obstáculo"
    {
      id: "scala-ft-0458",
      name: "Fita de indicação de obstáculo lisa (45 m)",
      code: "FT 0458",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Fita de sinalização complementar lisa, em rolo de 45 m x 5 cm, código Scala FT 0458. Usada para marcar bordas, degraus, obstáculos e contornos ao longo da rota de fuga. A Scala oferece a linha com ou sem fotoluminescência e com ou sem listras.",
      specs: ["Rolo 45 m x 5 cm", "Opção com ou sem fotoluminescência"],
      sizes: ["45 m x 5 cm"],
      image: "/produtos/sinalizacao/scala-ft-0458.webp",
      imageAlt: "Faixa lisa amarelo-clara de fita de sinalização",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material não informado
    // TODO confirmar: Selo impresso como "BI/B2" (lido como B1/B2)
    // TODO confirmar: Usos deduzidos — o catálogo só diz "indicação de obstáculo"
    {
      id: "scala-ft-0459",
      name: "Faixa zebrada de obstáculo vermelha e branca (B1/B2)",
      code: "FT 0459",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Faixa de indicação de obstáculo com listras diagonais vermelhas e claras, código Scala FT 0459, símbolos B1/B2 da ABNT NBR 16820. Aplicada em obstáculos, pilares e elementos que podem ser atingidos durante a circulação e a fuga. A Scala oferece a linha com ou sem fotoluminescência.",
      specs: ["Código NBR 16820: B1/B2", "Medida 1 m x 10 cm", "Opção com ou sem fotoluminescência"],
      sizes: ["1 m x 10 cm"],
      image: "/produtos/sinalizacao/scala-ft-0459.webp",
      imageAlt: "Faixa com listras diagonais vermelhas e amarelo-claras",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material não informado
    // TODO confirmar: Selo impresso como "DI/D2" (lido como D1/D2)
    // TODO confirmar: Usos deduzidos — o catálogo só diz "indicação de obstáculo"
    {
      id: "scala-ft-0460",
      name: "Faixa zebrada de obstáculo preta e amarela (D1/D2)",
      code: "FT 0460",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Faixa de indicação de obstáculo com listras diagonais pretas e amarelas, código Scala FT 0460, símbolos D1/D2 da ABNT NBR 16820. Aplicada em obstáculos, desníveis e bordas que exigem atenção na circulação. A Scala oferece a linha com ou sem fotoluminescência.",
      specs: ["Código NBR 16820: D1/D2", "Medida 1 m x 10 cm", "Opção com ou sem fotoluminescência"],
      sizes: ["1 m x 10 cm"],
      image: "/produtos/sinalizacao/scala-ft-0460.webp",
      imageAlt: "Faixa com listras diagonais pretas e amarelas",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base antiderrapante não informado
    // TODO confirmar: Recorte inclui ao fundo parte da foto da escada (os rolos estão sobrepostos à foto)
    {
      id: "scala-ft-0102",
      name: "Fita antiderrapante com o meio fotoluminescente",
      code: "FT 0102",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Fita antiderrapante preta com faixa central fotoluminescente, código Scala FT 0102. Aplicada nos degraus e patamares de escadas para evitar escorregões e marcar o piso no escuro. Vendida em rolos de 4,8 cm de altura, com 10 ou 30 m conforme estoque.",
      specs: ["Faixa central fotoluminescente", "Rolo 4,8 cm · 10 ou 30 m"],
      sizes: ["4,8 cm x 10 m", "4,8 cm x 30 m"],
      materials: ["Material com fotoluminescência"],
      image: "/produtos/sinalizacao/scala-ft-0102.webp",
      imageAlt: "Dois rolos de fita antiderrapante preta com faixa central fotoluminescente esverdeada",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Material de base antiderrapante não informado
    // TODO confirmar: Recorte inclui à esquerda parte da foto da escada
    {
      id: "scala-ft-0101",
      name: "Fita antiderrapante toda fotoluminescente",
      code: "FT 0101",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Fita antiderrapante inteiramente fotoluminescente, código Scala FT 0101. Aplicada nos degraus e patamares de escadas para evitar escorregões e marcar o piso no escuro. Vendida em rolos de 4,8 cm de altura, com 10 ou 30 m conforme estoque.",
      specs: ["Toda fotoluminescente", "Rolo 4,8 cm · 10 ou 30 m"],
      sizes: ["4,8 cm x 10 m", "4,8 cm x 30 m"],
      materials: ["Material com fotoluminescência"],
      image: "/produtos/sinalizacao/scala-ft-0101.webp",
      imageAlt: "Dois rolos de fita antiderrapante fotoluminescente verde-amarelada",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Espessura/tipo do adesivo não informados
    // TODO confirmar: O catálogo só fala em extintor; não há modelo de demarcação para hidrante
    // TODO confirmar: "Manter a área livre" é dedução da função da demarcação
    // TODO confirmar: A linha "Faixa 15cm" da página cruza o recorte
    {
      id: "scala-ex-1070",
      name: "Adesivo de demarcação de solo para extintor (E17)",
      code: "EX 1070",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Adesivo de demarcação de piso para extintor, quadrado vermelho com faixa amarela de 15 cm, código Scala EX 1070, símbolo E17 da ABNT NBR 16820. Aplicado no piso sob o extintor para manter a área livre, ideal para piso liso. Vendido em 1x1 m e, sob encomenda, em outras medidas.",
      specs: ["Código NBR 16820: E17", "Faixa amarela de 15 cm", "Conforme ABNT NBR 16820", "Para piso liso"],
      sizes: ["1 x 1 m"],
      materials: ["Adesivo"],
      image: "/produtos/sinalizacao/demarcacao-de-solo.webp",
      imageAlt: "Quadrado vermelho com borda amarela larga, adesivo de demarcação de piso para extintor",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: Sem código Scala impresso
    // TODO confirmar: Material não informado
    // TODO confirmar: Medidas sob medida — não há lista de tamanhos vendidos
    // TODO confirmar: O exemplo do recorte é de um cliente (CETET); o exemplo com "ESTAMOS AQUI" está à esquerda na mesma página
    {
      id: "scala-plano-de-fuga",
      name: "Placa de plano de fuga (rota de fuga)",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Placa de plano de fuga com a planta do pavimento, rotas, equipamentos de incêndio e legenda, produzida sob medida pela Scala. Fixada em halls, corredores e acessos para mostrar o caminho até as saídas a partir do ponto em que a pessoa está. Segundo o catálogo, a ABNT NBR 16820 pede medida mínima de 21x29cm e textos legíveis à distância atribuída ao plano.",
      specs: ["Produzido conforme a necessidade", "Tamanhos conforme ABNT NBR 16820", "Medida mínima 21x29cm (segundo o catálogo)"],
      image: "/produtos/sinalizacao/plano-de-fuga.webp",
      imageAlt: "Placa branca de plano de fuga com planta do pavimento, ícones de extintor e hidrante e tabelas de ocupação",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista as medidas para a seção inteira (lotação, sistemas e ponto de encontro) e pede para conferir a medida conforme o modelo; confirmar quais medidas valem para este modelo
    // TODO confirmar: Material e espessura não informados
    // TODO confirmar: Lista de sistemas parece editável conforme a edificação — confirmar
    {
      id: "scala-pp-0797",
      name: "Placa de sistemas de segurança contra incêndio da edificação",
      code: "PP 0797",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Placa verde com o texto ″Esta edificação está dotada dos seguintes Sistemas de Segurança Contra Incêndio″, lista de sistemas (extintores, iluminação, sinalização e saídas de emergência, controle de material de acabamento, brigada, edificação em concreto armado e alvenaria) e os telefones 193 e 190 (código Scala PP 0797, símbolo M1 da ABNT NBR 16820). Fixada na entrada ou em local visível da edificação para informar o público. Faz parte da linha de sinalização de lotação e sistema contra incêndio, de acordo com a ABNT NBR 16820.",
      specs: ["Código NBR 16820: M1", "De acordo com a ABNT NBR 16820", "Textos personalizados (XX/XXXX no modelo)"],
      sizes: ["78 x 45 cm", "30 x 40 cm", "20 x 20 cm", "70 x 40 cm", "75 x 48 cm"],
      image: "/produtos/sinalizacao/scala-pp-0797.webp",
      imageAlt: "Placa verde retangular com lista dos sistemas de segurança contra incêndio da edificação e telefones de emergência",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista as medidas para a seção inteira (lotação, sistemas e ponto de encontro) e pede para conferir a medida conforme o modelo; confirmar quais medidas valem para este modelo
    // TODO confirmar: Material e espessura não informados
    {
      id: "scala-pp-0798",
      name: "Placa capacidade de público",
      code: "PP 0798",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Placa verde com campos de nome, endereço, cidade e UF, o texto CAPACIDADE DE PÚBLICO XXXX PESSOAS e os telefones 193 e 190 (código Scala PP 0798). Fixada na entrada ou em local visível da edificação para informar o público. Faz parte da linha de sinalização de lotação e sistema contra incêndio, de acordo com a ABNT NBR 16820.",
      specs: ["De acordo com a ABNT NBR 16820", "Textos personalizados (XX/XXXX no modelo)"],
      sizes: ["78 x 45 cm", "30 x 40 cm", "20 x 20 cm", "70 x 40 cm", "75 x 48 cm"],
      image: "/produtos/sinalizacao/scala-pp-0798.webp",
      imageAlt: "Placa verde retangular com campos de nome e endereço e o texto capacidade de público xxxx pessoas",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista as medidas para a seção inteira (lotação, sistemas e ponto de encontro) e pede para conferir a medida conforme o modelo; confirmar quais medidas valem para este modelo
    // TODO confirmar: Material e espessura não informados
    {
      id: "scala-pp-0896",
      name: "Placa lotação máxima – pessoas sentadas e em pé (M2)",
      code: "PP 0896",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Placa verde com o texto LOTAÇÃO MÁXIMA XX PESSOAS SENTADAS XX PESSOAS EM PÉ (código Scala PP 0896, símbolo M2 da ABNT NBR 16820). Fixada na entrada ou em local visível da edificação para informar o público. Faz parte da linha de sinalização de lotação e sistema contra incêndio, de acordo com a ABNT NBR 16820.",
      specs: ["Código NBR 16820: M2", "De acordo com a ABNT NBR 16820", "Textos personalizados (XX/XXXX no modelo)"],
      sizes: ["78 x 45 cm", "30 x 40 cm", "20 x 20 cm", "70 x 40 cm", "75 x 48 cm"],
      image: "/produtos/sinalizacao/scala-pp-0896.webp",
      imageAlt: "Placa verde horizontal com o texto lotação máxima xx pessoas sentadas xx pessoas em pé",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista as medidas para a seção inteira (lotação, sistemas e ponto de encontro) e pede para conferir a medida conforme o modelo; confirmar quais medidas valem para este modelo
    // TODO confirmar: Material e espessura não informados
    {
      id: "scala-pp-0795",
      name: "Placa lotação máxima",
      code: "PP 0795",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Placa verde com o texto LOTAÇÃO MÁXIMA XXX PESSOAS (código Scala PP 0795). Fixada na entrada ou em local visível da edificação para informar o público. Faz parte da linha de sinalização de lotação e sistema contra incêndio, de acordo com a ABNT NBR 16820.",
      specs: ["De acordo com a ABNT NBR 16820", "Textos personalizados (XX/XXXX no modelo)"],
      sizes: ["78 x 45 cm", "30 x 40 cm", "20 x 20 cm", "70 x 40 cm", "75 x 48 cm"],
      image: "/produtos/sinalizacao/scala-pp-0795.webp",
      imageAlt: "Placa verde com o texto lotação máxima xxx pessoas em letras brancas",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista as medidas para a seção inteira (lotação, sistemas e ponto de encontro) e pede para conferir a medida conforme o modelo; confirmar quais medidas valem para este modelo
    // TODO confirmar: Material e espessura não informados
    {
      id: "scala-pp-0796",
      name: "Placa lotação máxima – sentadas e em pé",
      code: "PP 0796",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Placa verde com o texto LOTAÇÃO MÁXIMA XXX PESSOAS SENTADAS XX PESSOAS EM PÉ (código Scala PP 0796). Fixada na entrada ou em local visível da edificação para informar o público. Faz parte da linha de sinalização de lotação e sistema contra incêndio, de acordo com a ABNT NBR 16820.",
      specs: ["De acordo com a ABNT NBR 16820", "Textos personalizados (XX/XXXX no modelo)"],
      sizes: ["78 x 45 cm", "30 x 40 cm", "20 x 20 cm", "70 x 40 cm", "75 x 48 cm"],
      image: "/produtos/sinalizacao/scala-pp-0796.webp",
      imageAlt: "Placa verde com o texto lotação máxima xxx pessoas sentadas xx pessoas em pé",
      sourceUrl: "https://www.gruposcala.com.br",
    },
    // TODO confirmar: O catálogo lista as medidas para a seção inteira (lotação, sistemas e ponto de encontro) e pede para conferir a medida conforme o modelo; confirmar quais medidas valem para este modelo
    // TODO confirmar: Material e espessura não informados
    // TODO confirmar: Referências legais impressas na placa do catálogo (Lei Estadual 16157/2013, Decreto 1957/2013, Portaria MJ 3083 de 25/09/2013) não foram conferidas
    {
      id: "scala-pp-0897",
      name: "Placa lotação máxima com dados do alvará",
      code: "PP 0897",
      supplier: "Grupo Scala",
      group: "Sinalização complementar",
      description: "Placa verde com LOTAÇÃO MÁXIMA: XX PESSOAS, campos de validade do alvará de funcionamento e do alvará de prevenção a incêndio, telefones de emergência e referência à Lei Estadual 16157/2013 e ao Decreto 1957/2013 (código Scala PP 0897). Fixada na entrada ou em local visível da edificação para informar o público. Faz parte da linha de sinalização de lotação e sistema contra incêndio, de acordo com a ABNT NBR 16820.",
      specs: ["De acordo com a ABNT NBR 16820", "Textos personalizados (XX/XXXX no modelo)"],
      sizes: ["78 x 45 cm", "30 x 40 cm", "20 x 20 cm", "70 x 40 cm", "75 x 48 cm"],
      image: "/produtos/sinalizacao/scala-pp-0897.webp",
      imageAlt: "Placa verde com lotação máxima, campos de validade de alvarás e telefones de emergência",
      sourceUrl: "https://www.gruposcala.com.br",
    },
  ],
}
