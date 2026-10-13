# Isaias Studio · Web Design

Site de apresentação (HTML, CSS e JavaScript puros, sem build).

## Estrutura

```
index.html            página completa (8 seções)
assets/css/style.css  identidade visual, animações e responsivo
assets/js/config.js   ← dados editáveis (WhatsApp, e-mail, redes, depoimentos)
assets/js/main.js     interações e animações
assets/img/           favicon e imagem de compartilhamento (og-image.png)
```

## O que configurar antes de publicar

Edite apenas `assets/js/config.js`:

| Campo | O que colocar |
| --- | --- |
| `whatsapp.number` | Só números: país + DDD + número (ex.: `5511912345678`) |
| `whatsapp.defaultMessage` | Mensagem que abre pronta no WhatsApp |
| `email` | Seu e-mail de contato |
| `social.instagram` / `linkedin` / `behance` | URLs dos perfis (deixe `""` para ocultar) |
| `location` | Cidade/região de atendimento (deixe `""` para ocultar) |
| `testimonials` | Depoimentos **reais**. Vazio = seção mostra espaços reservados |

No `index.html`, quando tiver domínio próprio, descomente a tag `canonical`
e troque `og:image` por uma URL absoluta (ex.: `https://seudominio.com.br/assets/img/og-image.png`).

## Rodar localmente

```
npx serve .
```

## Notas

- Os 6 projetos do portfólio são **conceituais** e estão identificados como tal.
  Substitua por trabalhos reais quando existirem.
- Animações respeitam `prefers-reduced-motion`.
