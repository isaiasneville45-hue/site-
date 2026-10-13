/**
 * Isaias Studio · Web Design — configuração do site
 * ---------------------------------------------------------------
 * Edite SOMENTE este arquivo para trocar contatos, redes sociais
 * e depoimentos. Tudo é aplicado automaticamente na página.
 *
 * Valores entre MAIÚSCULAS são marcadores: substitua pelos reais.
 */
window.SITE_CONFIG = {
  brand: "Isaias Studio",

  whatsapp: {
    // Apenas números: código do país + DDD + número. Ex.: 5511912345678
    number: "5500000000000",
    // Mensagem padrão ao clicar nos botões de WhatsApp
    defaultMessage:
      "Olá! Vim pelo site da Isaias Studio e quero conversar sobre uma landing page.",
  },

  email: "contato@SEUDOMINIO.com.br",

  // Deixe "" para ocultar uma rede social.
  social: {
    instagram: "https://www.instagram.com/SEU_USUARIO",
    linkedin: "https://www.linkedin.com/in/SEU_USUARIO",
    behance: "",
  },

  // Cidade/região de atendimento. Deixe "" para ocultar.
  location: "",

  /**
   * Depoimentos REAIS de clientes. Enquanto a lista estiver vazia,
   * a seção mostra espaços reservados (nada é inventado).
   * Formato:
   * { name: "Nome do cliente", role: "Empresa ou segmento", text: "Depoimento..." }
   */
  testimonials: [],
};
