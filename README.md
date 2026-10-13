# Isaias Studio · Web Design

Site de apresentação (HTML, CSS e JavaScript puros, sem build).

## Estrutura

```
index.html            página completa (8 seções)
assets/css/style.css  identidade visual, animações e responsivo
assets/js/config.js   ← dados editáveis (WhatsApp, e-mail, redes)
assets/js/main.js     interações e animações
assets/img/           favicon, og-image.png e fotos do portfólio (assets/img/portfolio)
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

No `index.html`, quando tiver domínio próprio, descomente a tag `canonical`
e troque `og:image` por uma URL absoluta (ex.: `https://seudominio.com.br/assets/img/og-image.png`).

## Rodar localmente

```
npx serve .
```

## Notas

- Os 6 projetos do portfólio são **conceituais** e estão identificados como tal.
  Substitua por trabalhos reais quando existirem.
- Fotos do portfólio: Unsplash (licença gratuita para uso comercial), salvas localmente
  em WebP (800/1600px) com JPG de reserva. Para trocar uma foto, mantenha o mesmo nome
  de arquivo e a proporção 16:10.
- Animações respeitam `prefers-reduced-motion`.
