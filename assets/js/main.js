/* ==========================================================================
   Alba Dermatologia — interações do site
   Sem dependências. Os dados de contato usados pelo formulário ficam em CLINICA.
   ========================================================================== */
(function () {
  'use strict';

  // PENDENTE: número real de WhatsApp, apenas dígitos, com DDI 55 e DDD.
  var CLINICA = {
    whatsapp: '5511900000000'
  };

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Ano no rodapé ---------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Cabeçalho: borda ao rolar ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Menu responsivo ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('menu-principal');

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.visually-hidden').textContent = open ? 'Fechar menu' : 'Abrir menu';
    nav.classList.toggle('is-open', open);
  }

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      setMenu(toggle.getAttribute('aria-expanded') !== 'true');
    });

    nav.addEventListener('click', function (event) {
      if (event.target.closest('a')) setMenu(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        toggle.focus();
      }
    });

    document.addEventListener('click', function (event) {
      if (toggle.getAttribute('aria-expanded') === 'true' &&
          !nav.contains(event.target) && !toggle.contains(event.target)) {
        setMenu(false);
      }
    });

    window.matchMedia('(min-width: 921px)').addEventListener('change', function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------- Destaque da seção atual no menu ---------- */
  var navLinks = document.querySelectorAll('.nav-list a[href^="#"]');
  if ('IntersectionObserver' in window && navLinks.length) {
    var linkFor = {};
    navLinks.forEach(function (link) { linkFor[link.getAttribute('href').slice(1)] = link; });

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var link = linkFor[entry.target.id];
        if (!link) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.removeAttribute('aria-current'); });
          link.setAttribute('aria-current', 'true');
        } else if (link.getAttribute('aria-current')) {
          link.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });

    Object.keys(linkFor).forEach(function (id) {
      var section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
  }

  /* ---------- Filtro de tratamentos ---------- */
  var filters = document.querySelectorAll('[data-filter]');
  var treatments = document.querySelectorAll('.treatment');

  filters.forEach(function (button) {
    button.addEventListener('click', function () {
      var area = button.dataset.filter;
      filters.forEach(function (b) { b.setAttribute('aria-pressed', String(b === button)); });
      treatments.forEach(function (card) {
        card.hidden = area !== 'todos' && card.dataset.area !== area;
      });
    });
  });

  /* ---------- Atalho "Agendar este atendimento" ---------- */
  var form = document.getElementById('form-agendamento');
  var select = document.getElementById('tratamento');

  document.querySelectorAll('[data-treatment]').forEach(function (link) {
    link.addEventListener('click', function () {
      if (!select) return;
      select.value = link.dataset.treatment;
      clearError(select);
      // Leva o foco ao primeiro campo depois da rolagem suave
      window.setTimeout(function () {
        var nome = document.getElementById('nome');
        if (nome) nome.focus({ preventScroll: true });
      }, reduceMotion ? 0 : 600);
    });
  });

  /* ---------- Formulário de agendamento ---------- */
  var status = document.getElementById('form-status');

  function digits(value) { return value.replace(/\D/g, ''); }

  function formatPhone(value) {
    var d = digits(value).slice(0, 11);
    if (d.length <= 2) return d.length ? '(' + d : '';
    if (d.length <= 6) return '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length <= 10) return '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    return '(' + d.slice(0, 2) + ') ' + d.slice(2, 7) + '-' + d.slice(7);
  }

  var rules = {
    nome: function (field) {
      var v = field.value.trim();
      if (!v) return 'Informe seu nome.';
      if (v.length < 3) return 'O nome precisa ter pelo menos 3 letras.';
      return '';
    },
    telefone: function (field) {
      var d = digits(field.value);
      if (!d) return 'Informe um celular para contato.';
      if (d.length < 10 || d.length > 11) return 'Confira o número: use o DDD, por exemplo (11) 91234-5678.';
      return '';
    },
    email: function (field) {
      var v = field.value.trim();
      if (v && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return 'Confira o e-mail: ele precisa ter o formato nome@dominio.com.';
      return '';
    },
    tratamento: function (field) {
      return field.value ? '' : 'Selecione o motivo da consulta.';
    },
    consentimento: function (field) {
      return field.checked ? '' : 'Para enviar, autorize o uso dos dados para o contato.';
    }
  };

  function errorEl(field) { return document.getElementById(field.id + '-erro'); }

  function showError(field, message) {
    field.setAttribute('aria-invalid', 'true');
    var el = errorEl(field);
    if (el) el.textContent = message;
  }

  function clearError(field) {
    field.removeAttribute('aria-invalid');
    var el = errorEl(field);
    if (el) el.textContent = '';
  }

  function validate(field) {
    var rule = rules[field.name];
    if (!rule) return true;
    var message = rule(field);
    if (message) showError(field, message); else clearError(field);
    return !message;
  }

  if (form) {
    var phone = form.elements.telefone;
    phone.addEventListener('input', function () {
      phone.value = formatPhone(phone.value);
    });

    Object.keys(rules).forEach(function (name) {
      var field = form.elements[name];
      // Valida ao sair do campo e limpa o erro assim que ele é corrigido
      field.addEventListener('blur', function () {
        if (field.value || field.getAttribute('aria-invalid')) validate(field);
      });
      field.addEventListener(field.type === 'checkbox' || field.tagName === 'SELECT' ? 'change' : 'input', function () {
        if (field.getAttribute('aria-invalid')) validate(field);
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();
      status.classList.remove('is-error');
      status.textContent = '';

      var firstInvalid = null;
      Object.keys(rules).forEach(function (name) {
        var field = form.elements[name];
        if (!validate(field) && !firstInvalid) firstInvalid = field;
      });

      if (firstInvalid) {
        status.classList.add('is-error');
        status.textContent = 'Revise os campos destacados para continuar.';
        firstInvalid.focus();
        return;
      }

      var data = form.elements;
      var lines = [
        'Olá! Gostaria de agendar uma avaliação.',
        '',
        'Nome: ' + data.nome.value.trim(),
        'Celular: ' + data.telefone.value.trim()
      ];
      if (data.email.value.trim()) lines.push('E-mail: ' + data.email.value.trim());
      lines.push('Motivo: ' + data.tratamento.value);
      lines.push('Período: ' + form.querySelector('input[name="periodo"]:checked').value);
      if (data.mensagem.value.trim()) lines.push('', data.mensagem.value.trim());

      var url = 'https://wa.me/' + CLINICA.whatsapp + '?text=' + encodeURIComponent(lines.join('\n'));
      var win = window.open(url, '_blank');
      if (win) win.opener = null;

      status.innerHTML = '';
      status.append('Sua mensagem foi preparada no WhatsApp. Se a conversa não abriu, ');
      var fallback = document.createElement('a');
      fallback.href = url;
      fallback.target = '_blank';
      fallback.rel = 'noopener';
      fallback.textContent = 'toque aqui para enviar';
      status.append(fallback, '.');
    });
  }

  /* ---------- Mapa carregado somente com a ação do visitante ---------- */
  var mapButton = document.querySelector('[data-map-load]');
  if (mapButton) {
    mapButton.addEventListener('click', function () {
      var map = mapButton.closest('.map');
      var query = encodeURIComponent(map.dataset.mapQuery);
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps?q=' + query + '&output=embed';
      iframe.title = 'Mapa com a localização da clínica';
      iframe.loading = 'lazy';
      iframe.referrerPolicy = 'no-referrer-when-downgrade';
      map.innerHTML = '';
      map.appendChild(iframe);
      iframe.focus();
    });
  }

  /* ---------- Botão flutuante: some quando o agendamento está visível ---------- */
  var floatWa = document.querySelector('.float-wa');
  var booking = document.getElementById('agendamento');
  var hero = document.getElementById('inicio');
  if (floatWa && booking && 'IntersectionObserver' in window) {
    var visible = { booking: false, hero: true };
    var update = function () {
      floatWa.classList.toggle('is-hidden', visible.booking || visible.hero);
    };
    new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        visible[entry.target === booking ? 'booking' : 'hero'] = entry.isIntersecting;
      });
      update();
    }, { threshold: 0.15 }).observe(booking);
    if (hero) {
      new IntersectionObserver(function (entries) {
        visible.hero = entries[0].isIntersecting;
        update();
      }, { threshold: 0.4 }).observe(hero);
    }
    update();
  }
})();
