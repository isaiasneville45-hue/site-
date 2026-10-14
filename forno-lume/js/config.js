/*
  Forno Lume — dados do negócio
  ------------------------------------------------------------------
  Edite somente este arquivo para colocar as informações reais.

  Enquanto `demo` for true, o site marca endereço, contatos, horários e
  preços como demonstrativos, não cria links de telefone, WhatsApp ou
  e-mail e não calcula se a casa está aberta.

  Campos vazios ("" ou null) somem da página em vez de exibir um valor
  inventado.
*/
window.FORNO_LUME = {
  demo: true,

  endereco: {
    linhas: ["Rua Exemplo, 248", "Centro, Sua Cidade – UF", "CEP 00000-000"],
    // Link do Google Maps ou similar. Vazio: o botão "Abrir no mapa" não aparece.
    mapaUrl: "",
  },

  contato: {
    telefone: "(00) 0000-0000",     // exibido como texto
    whatsapp: "",                   // só dígitos com DDI e DDD, ex.: "5511999999999"
    whatsappExibicao: "(00) 00000-0000",
    email: "contato@exemplo.com.br",
    instagram: "",                  // ex.: "fornolume" (sem @). Vazio: o ícone não aparece.
  },

  // Horários por dia da semana (0 = domingo). Use [] para fechado.
  // Para fechar à meia-noite, use "24:00".
  horarios: {
    1: [],
    2: [["18:00", "23:00"]],
    3: [["18:00", "23:00"]],
    4: [["18:00", "23:00"]],
    5: [["18:00", "24:00"]],
    6: [["18:00", "24:00"]],
    0: [["12:00", "16:00"], ["18:00", "22:30"]],
  },

  // Taxa de entrega em reais. null: o pedido informa "a combinar".
  taxaEntrega: null,

  // Tempo total de fermentação da massa, em horas. null: o site não cita um número.
  fermentacaoHoras: null,
};
