# Site institucional — Alba Dermatologia (nome provisório)

Site estático em HTML, CSS e JavaScript, sem etapa de build nem dependências. Pode ser publicado
como está no GitHub Pages, na Vercel, na Netlify ou em qualquer hospedagem estática.

## Estrutura

```
index.html                    Página principal (todas as seções)
politica-de-privacidade.html  Política de privacidade (LGPD)
404.html                      Página de erro
favicon.svg
robots.txt / sitemap.xml
assets/css/styles.css         Estilos. Paleta, fontes e medidas no bloco :root
assets/js/main.js             Menu, filtro de tratamentos, formulário, mapa
assets/img/                   Ilustrações temporárias (*.svg) e imagem de compartilhamento
```

Para testar localmente: `npx http-server .` e abra `http://localhost:8080`.

## Identidade visual

Todas as cores estão centralizadas como variáveis em `assets/css/styles.css`:

| Token | Cor | Uso |
| --- | --- | --- |
| `--c-branco` / `--c-off-white` | #FFFFFF / #F8F6F3 | Fundos principais e seções alternadas |
| `--c-bege` | #DDD2C6 | Seção "Primeira consulta", botões secundários |
| `--c-bege-cinza` | #C5B3A2 | Bordas e divisores |
| `--c-taupe` | #ACA195 | Elementos decorativos e texto secundário no rodapé |
| `--c-marrom` | #675D50 | Botões principais, ícones, texto de apoio |
| `--c-marrom-profundo` | #3D3630 | Títulos, textos e rodapé |

Tipografia: Newsreader (títulos) e Hanken Grotesk (textos, navegação e botões), via Google Fonts.

Contraste verificado: textos de apoio em #675D50 têm 6,4:1 sobre branco. Sobre o bege #DDD2C6,
o texto usa sempre #3D3630 (7,9:1), porque #675D50 ficaria abaixo de 4,5:1.

## Como funciona o formulário

O site não tem servidor e **não armazena dados**. Ao enviar o formulário, os campos são
validados no navegador e o WhatsApp da clínica abre com a mensagem pronta; o envio só acontece
quando o paciente confirma no aplicativo. Para trocar por e-mail ou por um sistema de agenda
(Doctoralia, Feegow, iClinic etc.), altere o trecho "Formulário de agendamento" em `main.js`.

O mapa do Google só é carregado quando o visitante clica em "Exibir mapa", o que evita cookies
de terceiros antes do consentimento e deixa a página mais leve.

## Dados e recursos que a clínica precisa fornecer

Os pontos a substituir estão marcados com `PENDENTE` ou `IMAGEM PENDENTE` em comentários no
código. Para localizar todos: `grep -rn "PENDENTE" --include=*.html --include=*.js --include=*.txt --include=*.xml .`

**Identidade**
- [ ] Nome oficial da clínica (hoje "Alba Dermatologia", provisório) e logotipo em SVG
- [ ] Confirmar a especialidade: o conteúdo foi escrito para dermatologia clínica e estética
- [ ] Domínio definitivo: ativar `<link rel="canonical">`, usar URL absoluta em `og:image` e atualizar `robots.txt` e `sitemap.xml`

**Contato e localização** (substituir em todos os arquivos `.html` e em `main.js`)
- [ ] WhatsApp: hoje `5511900000000` / `(11) 90000-0000`
- [ ] Telefone: hoje `+551130000000` / `(11) 3000-0000`
- [ ] E-mail: hoje `contato@seudominio.com.br`
- [ ] Endereço completo e CEP (também em `data-map-query`, no link "Abrir rota" e nos dados estruturados JSON-LD)
- [ ] Horários de atendimento reais
- [ ] Perfil do Instagram (link comentado no rodapé, pronto para ativar)

**Conteúdo**
- [ ] Lista real de tratamentos, com descrições revisadas pela equipe médica (cartões e opções do formulário)
- [ ] Texto institucional da seção "A clínica"
- [ ] Confirmar os diferenciais e compromissos citados (biossegurança, retornos programados etc.)

**Corpo clínico e dados legais** (exigidos na publicidade médica)
- [ ] Nome, foto, especialidade, CRM e RQE de cada profissional
- [ ] Responsável técnico com CRM e RQE (rodapé)
- [ ] Razão social e CNPJ (rodapé e política de privacidade)
- [ ] Encarregado de dados (DPO) e revisão jurídica da política de privacidade

**Imagens** (fotografias reais e autorizadas; hoje há ilustrações marcadas como "Imagem ilustrativa")
- [ ] Hero: foto da clínica ou da médica responsável, vertical 4:5, ~1200×1500 px
- [ ] A clínica: foto do consultório ou da equipe, vertical 4:5
- [ ] Galeria: recepção e detalhe (verticais) e consultório e sala de procedimentos (horizontais, ~1200×900 px)
- [ ] Fotos dos profissionais, 4:5

Ao trocar uma imagem, exporte em WebP ou AVIF, mantenha `width`/`height` no `<img>`, escreva um
`alt` que descreva a foto e remova o selo `.placeholder-tag` ou a `figcaption` correspondente.

**Depoimentos**
- [ ] A seção de depoimentos existe em `index.html`, mas está oculta (`hidden`). Publique somente
  relatos reais com autorização por escrito, observando as normas do CFM sobre publicidade médica.
  Pelo mesmo motivo, não foi criada galeria de "antes e depois".
