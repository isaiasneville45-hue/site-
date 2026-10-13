# APAG: landing page

Site one-page da **APAG Produtos e Serviços LTDA** (prevenção e combate a incêndio, desde 1998).

**Stack:** React 19 + Vite + TypeScript · Tailwind CSS v4 (tokens em `tailwind.config.ts`) · shadcn/ui (Radix) ·
Framer Motion · React Hook Form + Zod · lucide-react.

## Comandos

```bash
npm install        # instala as dependências (Node 22.12+)
npm run dev        # servidor de desenvolvimento em http://localhost:5173
npm run build      # build de produção em dist/ (com HTML pré-renderizado)
npm run preview    # serve o build de produção em http://localhost:4173
npm run lint       # oxlint
npm run format     # prettier
```

## Onde editar

Todo o conteúdo fica em `src/config/`: nenhum dado da empresa está fixo nos componentes.

| Arquivo                  | O que tem                                                                   |
| ------------------------ | --------------------------------------------------------------------------- |
| `src/config/company.ts`  | Dados da empresa, contato, descritor da marca, domínio, textos de SEO       |
| `src/config/services.ts` | Os 6 serviços (grade de serviços, destaque do PPCI e opções do formulário)  |
| `src/config/content.ts`  | Menu (`primary` = cabeçalho), segmentos, diferenciais ("Empresa") e etapas |
| `src/config/faq.ts`      | Perguntas e respostas do FAQ                                                |
| `src/config/sections.ts` | Textos fixos: Hero (e ficha técnica), títulos, chamada final, rótulos       |
| `src/config/products/`   | Produtos: um arquivo por aba (`sinalizacao.ts`, `alarme.ts`…) e os tipos     |
| `src/config/photos.ts`   | Fotos do Hero e da seção "Empresa"                                          |
| `src/index.css`          | Paleta em variáveis CSS, fonte, escala tipográfica (`text-display`…)        |
| `tailwind.config.ts`     | Tokens do Tailwind (`apag-red`, `apag-navy-950`, `apag-ink`, raios…)        |

O `company.ts` também alimenta, no build, as meta tags, o Open Graph, o JSON-LD (`LocalBusiness`), o
`robots.txt`, o `sitemap.xml` e o `llms.txt` (veja `seo.ts`).

## TODO: o que falta preencher

**Dados (`src/config/company.ts`)**

- [x] Telefone, WhatsApp, e-mail, endereço e mapa (Rua Guilherme, 1300 – Costa e Silva, Joinville/SC)
- [x] `hours` e `openingHoursSchema`: segunda a sexta, das 8h às 17h (`Mo-Fr 08:00-17:00` no JSON-LD)
- [ ] `geo`: confirmar as coordenadas (vieram do OpenStreetMap pelo endereço; ficam no JSON-LD)
- [ ] `instagram`: URL completa (vazio = ícone não aparece)
- [ ] `siteUrl`: domínio final, sem barra no fim

**Produtos (`src/config/products/*.ts`)**

Cada produto tem `id`, `name`, `code?`, `supplier`, `group`, `system?` (só alarme), `description`, `specs?`,
`sizes?`, `materials?`, `image`, `imageAlt` e `sourceUrl?`. Os dados vieram dos sites e catálogos dos
fornecedores; o que não deu para confirmar está marcado com `// TODO confirmar` logo acima do produto
(procure por `TODO confirmar` nos arquivos).

- [ ] Revisar os `// TODO confirmar` de cada aba (medidas, materiais, specs e nomes que o fornecedor não publica).
- [ ] Sinalização: o catálogo da Scala não informa material nem espessura das placas (`materials` vazio).
- [ ] Hidrantes: as mangueiras Mocelin vieram do site `mocelin.ind.br` (o domínio citado no pedido não abre).
- [ ] Extintores: confirmar os fornecedores dos próprios extintores (hoje só os abrigos e suportes são da Metasal;
      as fotos dos extintores são de banco de imagem, com o selo "Imagem ilustrativa").
- [ ] Fotos que faltam (aparece o placeholder com o ícone da categoria): salve
      `public/produtos/{categoria}/{id}.webp` e preencha o campo `image` do produto.

**Arquivos**

- [ ] Logo: `public/logo-apag.svg` (até lá aparece o placeholder: chama + “APAG”)
- [ ] Opcional: trocar `public/og-image.jpg` (1200×630, imagem que aparece ao compartilhar o link) por uma versão
      com a logo oficial, e `public/favicon.svg` / `public/apple-touch-icon.png` pela chama oficial.

**Conteúdo para revisar**

- [ ] `src/config/faq.ts`: respostas marcadas com `// TODO confirmar` (documentos e regiões atendidas)
- [ ] `src/config/services.ts`: itens do "Saiba mais" de cada serviço

> Os "anos de mercado" são calculados a partir de 26/05/1998 na data do build. Um novo deploy atualiza o número.

## Sistema visual

Direção "industrial premium + editorial" (v5). Tokens centralizados em `src/index.css` (variáveis CSS e
utilitários) e expostos no Tailwind por `tailwind.config.ts`.

- **Cores:** azul-marinho `#10243A` (identidade: hero, cabeçalho, PPCI, chamada final), azul secundário
  `#1B3853`, azul profundo `#0B1A2B` (rodapé), vermelho `#D52B32` só em ações, indicadores e detalhes
  (`#B3232A` no hover e em textos vermelhos pequenos sobre claro; `#FF7A80` sobre escuro), branco e cinza
  `#F3F4F5` nas seções de leitura, grafite `#202831` em textos e na seção "Empresa", cinza `#66717D` em textos
  secundários. Todos os pares de texto passam no contraste AA.
- **Tipo:** Geist (interface e títulos) + Geist Mono (identificadores técnicos: índice das seções, siglas dos
  serviços, códigos de produto, rótulos da ficha). Escala: `text-display` (hero, até 84 px), `text-title`
  (h2, até 56 px), `text-heading` (h3), corpo 16 a 18 px, `text-label` (13 px) e `text-tech` (Geist Mono 12 px).
- **Espaço e forma:** múltiplos de 8 px; `section-pad` (80 px, 120 px no desktop); conteúdo até 1280 px.
  Raios: 3 px (códigos, chips), 6 px (botões, campos), 8 px (cards), 12 px (painéis e fotos). Sem sombras
  decorativas; separação por filetes de 1 px.
- **Linguagem técnica:** cada seção abre com uma faixa de prancha (`SectionHeader`: filete, índice e nome em
  Geist Mono, informação à direita, título grande e frase curta); malha de prancha (`bg-blueprint`) no
  hero, no PPCI e na chamada final; planta de prevenção esquemática (`PlanDrawing`, ilustrativa, sem
  medidas); foto do hero como prancha com marcas de corte; ficha técnica no pé do hero.
- **Imagens:** fotos com o mesmo tratamento (saturação levemente reduzida e véu marinho); serviços ilustrados
  com fotos reais de produtos do catálogo sobre fundo branco.
- **Movimento:** sequência de entrada do hero (só CSS), entradas de 12 px nas seções, transições de 160 a
  240 ms; tudo desligado com `prefers-reduced-motion`.
- **Breakpoints:** os do Tailwind (640, 768, 1024, 1280).

## Imagens

- **Produtos:** `public/produtos/{categoria}/{id}.webp` (até 800 px, WebP). O caminho vai no campo `image` do
  produto em `src/config/products/{categoria}.ts`; `image: ''` mostra um placeholder com o ícone da categoria. Para trocar uma foto, basta
  substituir o arquivo (mesmo nome).
- **Fotos:** `public/fotos/{id}-{largura}.webp` (`hero`: extintor em área industrial; `empresa`: placa de saída).
- **Créditos:** `public/produtos/CREDITOS.md` lista a origem de cada imagem (fabricante, ou autor e licença).
- **Como foram obtidas:** `scripts/assets/download.py` baixa e otimiza o que está em `scripts/assets/manifest.json`
  e gera o `CREDITOS.md` (`python3 scripts/assets/download.py photos` refaz só as fotos humanizadas);
  `scripts/assets/scala_crops.py` recorta as placas do catálogo em PDF da Scala (o PDF só tem imagens). Os sites
  de banco de imagem Unsplash e Pexels bloquearam o acesso automatizado; por isso as fotos humanizadas e as de
  extintores vieram do Wikimedia Commons e do Openverse, com licenças livres (CC0, CC BY, CC BY-SA)
  e crédito no `CREDITOS.md`.
- **Fontes:** Geist (400 a 700) e Geist Mono (400 a 600), carregadas do Google Fonts no `index.html` com
  `preconnect` e `display=swap`. No Tailwind: `font-sans` e `font-mono`.
- O build falha se alguma imagem referenciada na página não existir em `public/`.

## Deploy na Vercel

O projeto está na pasta `apag/` do repositório, então ela precisa ser a **Root Directory** na Vercel.

1. Acesse [vercel.com/new](https://vercel.com/new) e importe o repositório do GitHub.
2. Em **Root Directory**, clique em _Edit_ e escolha `apag`.
3. O framework é detectado como **Vite**. Build, instalação e saída já vêm do `vercel.json`
   (`npm run build`, `npm ci`, `dist`), não precisa mudar nada.
4. Clique em **Deploy**. Cada push na branch de produção gera um novo deploy; outras branches geram previews.
5. Domínio próprio: _Project → Settings → Domains_, adicione o domínio e configure o DNS conforme as instruções
   da Vercel. Depois, atualize `siteUrl` no `company.ts` e faça um novo deploy (o domínio entra no canonical, no
   Open Graph, no JSON-LD e no sitemap).

Pela CLI, como alternativa: `npm i -g vercel`, depois `cd apag && vercel` (preview) e `vercel --prod`.

## Como funciona

- **Pré-renderização:** `npm run build` gera o bundle do cliente, renderiza a página no Node
  (`src/entry-server.tsx` + `scripts/prerender.mjs`) e grava o HTML pronto no `dist/index.html`. O navegador mostra
  o conteúdo antes do JavaScript carregar, e o React só "hidrata" a página.
- **Formulário:** valida com Zod e abre o WhatsApp com a mensagem preenchida. Não há backend; nenhum dado é salvo.
  Ele é carregado num chunk separado logo após a página abrir.
- **Acessibilidade:** HTML semântico, link "Pular para o conteúdo", foco visível (vermelho no claro, rosado no
  escuro), menu, acordeão, abas, filtros e o modal de produto navegáveis por teclado (o foco volta ao card ao
  fechar) e `prefers-reduced-motion` respeitado.
- **Cores:** `#DF2531` sobre o marinho tem contraste 4,1:1, abaixo do AA para texto pequeno. Por isso textos
  pequenos em vermelho usam `apag-ember` (`#FF6B74`) no escuro e `apag-red-strong` (`#BE1B26`) no claro.

## Estrutura

```
apag/
├── public/                 favicon, ícone iOS, imagem de compartilhamento (+ logo, a adicionar)
│   ├── produtos/           fotos dos produtos ({categoria}/{id}.webp) e CREDITOS.md
│   └── fotos/              fotos humanizadas ({id}-800.webp e {id}-1600.webp)
├── scripts/                build.mjs (build completo) e prerender.mjs (gera o HTML estático)
│   └── assets/             scripts que baixam/otimizam as imagens (veja "Imagens" acima)
├── seo.ts                  plugin do Vite: meta tags, JSON-LD, robots.txt, sitemap.xml, llms.txt
├── src/
│   ├── components/
│   │   ├── sections/       uma seção por arquivo (Navbar, Hero, Segments, Services, Products,
│   │   │                   WhyApag, Process, Faq, FinalCta, Contact, Footer)
│   │   ├── ui/             componentes shadcn/ui (button, accordion, dialog, sheet, select, form…)
│   │   └── …               Logo, ContactForm, WhatsAppButton, SectionHeader, PlanDrawing, motion, icons
│   ├── config/             dados e textos do site (products/ = um arquivo por aba)
│   ├── context/ hooks/ lib/
│   ├── entry-server.tsx    renderização no build
│   ├── main.tsx            entrada do navegador
│   └── index.css           tema, fontes e utilitários
├── tailwind.config.ts
└── vercel.json
```
