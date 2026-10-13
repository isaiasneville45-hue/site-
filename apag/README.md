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
| `src/config/company.ts`  | Dados da empresa, contato, números (contadores), domínio, textos de SEO     |
| `src/config/services.ts` | Os 6 serviços (cards, "Saiba mais" e opções do formulário)                  |
| `src/config/content.ts`  | Menu, segmentos da faixa, diferenciais ("Por que a APAG") e etapas          |
| `src/config/faq.ts`      | Perguntas e respostas do FAQ                                                |
| `src/config/sections.ts` | Textos fixos: Hero, títulos das seções e rótulos da seção Produtos           |
| `src/config/products/`   | Produtos: um arquivo por aba (`sinalizacao.ts`, `alarme.ts`…) e os tipos     |
| `src/config/photos.ts`   | Fotos do Hero e da seção "Por que a APAG"                                   |
| `src/index.css`          | Paleta em variáveis CSS, pilhas de fonte, utilitários de título e texturas  |
| `tailwind.config.ts`     | Tokens do Tailwind (`apag-red`, `apag-red-65`, `bg-crimson-noir`, sombras…) |

O `company.ts` também alimenta, no build, as meta tags, o Open Graph, o JSON-LD (`LocalBusiness`), o
`robots.txt`, o `sitemap.xml` e o `llms.txt` (veja `seo.ts`).

## TODO: o que falta preencher

**Dados (`src/config/company.ts`)**

- [x] Telefone, WhatsApp, e-mail, endereço e mapa (Rua Guilherme, 1300 – Costa e Silva, Joinville/SC)
- [x] `hours` e `openingHoursSchema`: segunda a sexta, das 8h às 17h (`Mo-Fr 08:00-17:00` no JSON-LD)
- [ ] `geo`: confirmar as coordenadas (vieram do OpenStreetMap pelo endereço; ficam no JSON-LD)
- [ ] `instagram`: URL completa (vazio = ícone não aparece)
- [ ] `siteUrl`: domínio final, sem barra no fim
- [ ] `stats`: números reais dos contadores. Contador com `value: null` não aparece (se todos forem `null`,
      a faixa de números some); não invente valores

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

## Imagens

- **Produtos:** `public/produtos/{categoria}/{id}.webp` (até 800 px, WebP). O caminho vai no campo `image` do
  produto em `src/config/products/{categoria}.ts`; `image: ''` mostra um placeholder com o ícone da categoria. Para trocar uma foto, basta
  substituir o arquivo (mesmo nome).
- **Fotos humanizadas:** `public/fotos/{id}-800.webp` e `{id}-1600.webp` (Hero, "Por que a APAG" e capas das abas).
- **Créditos:** `public/produtos/CREDITOS.md` lista a origem de cada imagem (fabricante, ou autor e licença).
- **Como foram obtidas:** `scripts/assets/download.py` baixa e otimiza o que está em `scripts/assets/manifest.json`
  e gera o `CREDITOS.md` (`python3 scripts/assets/download.py photos` refaz só as fotos humanizadas);
  `scripts/assets/scala_crops.py` recorta as placas do catálogo em PDF da Scala (o PDF só tem imagens). Os sites
  de banco de imagem Unsplash e Pexels bloquearam o acesso automatizado; por isso as fotos humanizadas e as de
  hidrantes e extintores vieram do Wikimedia Commons e do Openverse, com licenças livres (CC0, CC BY, CC BY-SA)
  e crédito no `CREDITOS.md`.
- **Fontes:** Barlow Semi Condensed (600/700, títulos, números e abas) e Inter (400/500/600, textos), carregadas
  do Google Fonts no `index.html` com `preconnect` e `display=swap`. No Tailwind: `font-display` e `font-sans`.
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
- **Acessibilidade:** HTML semântico, link "Pular para o conteúdo", foco visível (anel vermelho), menu, acordeão,
  abas e diálogos navegáveis por teclado, botão para pausar a faixa animada e `prefers-reduced-motion`
  respeitado (as animações são desligadas).
- **Cores:** `#DF2531` sobre o fundo escuro tem contraste 4,3:1, abaixo do AA para texto pequeno. Por isso textos
  pequenos em vermelho usam o tom `apag-ember` (`#FF5A65`); o vermelho da marca fica para botões, ícones e títulos.

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
│   │   ├── sections/       uma seção por arquivo (Navbar, Hero, Segments, Services, Products, Stats,
│   │   │                   WhyApag, Process, Faq, FinalCta, Contact, Location, Footer)
│   │   ├── ui/             componentes shadcn/ui (button, accordion, dialog, sheet, select, form…)
│   │   └── …               Logo, ContactForm, WhatsAppButton, SectionHeading, motion, icons
│   ├── config/             dados e textos do site (products/ = um arquivo por aba)
│   ├── context/ hooks/ lib/
│   ├── entry-server.tsx    renderização no build
│   ├── main.tsx            entrada do navegador
│   └── index.css           tema, fontes e utilitários
├── tailwind.config.ts
└── vercel.json
```
