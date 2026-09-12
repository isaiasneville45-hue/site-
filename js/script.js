(function () {
  'use strict';

  /* ---------------------------------------------
     Header sólido ao rolar a página
  --------------------------------------------- */
  var header = document.getElementById('site-header');

  function updateHeaderState() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  updateHeaderState();
  window.addEventListener('scroll', updateHeaderState, { passive: true });

  /* ---------------------------------------------
     Menu mobile (hamburguer)
  --------------------------------------------- */
  var navToggle = document.getElementById('nav-toggle');
  var primaryNav = document.getElementById('primary-nav');

  function closeMenu() {
    if (!navToggle || !primaryNav) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
    primaryNav.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  function toggleMenu() {
    if (!navToggle || !primaryNav) return;
    var isOpen = navToggle.getAttribute('aria-expanded') === 'true';
    if (isOpen) {
      closeMenu();
    } else {
      navToggle.setAttribute('aria-expanded', 'true');
      navToggle.setAttribute('aria-label', 'Fechar menu de navegação');
      primaryNav.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', toggleMenu);
  }

  if (primaryNav) {
    primaryNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeMenu();
    }
  });

  var mobileMediaQuery = window.matchMedia('(min-width: 1024px)');
  function handleViewportChange(event) {
    if (event.matches) {
      closeMenu();
    }
  }
  if (mobileMediaQuery.addEventListener) {
    mobileMediaQuery.addEventListener('change', handleViewportChange);
  }

  /* ---------------------------------------------
     Scroll suave com offset do header fixo
  --------------------------------------------- */
  var headerHeight = header ? header.offsetHeight : 80;

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (event) {
      var targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      var targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      event.preventDefault();
      var targetPosition = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight + 1;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });

      targetEl.setAttribute('tabindex', '-1');
      targetEl.focus({ preventScroll: true });
    });
  });

  /* ---------------------------------------------
     Animação de entrada (fade/slide) via IntersectionObserver
  --------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach(function (el, index) {
      el.style.transitionDelay = (index % 4) * 70 + 'ms';
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

  /* ---------------------------------------------
     Contador animado nas estatísticas
  --------------------------------------------- */
  var statNumbers = document.querySelectorAll('.stat-number');

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10) || 0;
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1800;
    var startTime = null;

    function step(timestamp) {
      if (startTime === null) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.floor(eased * target);
      el.textContent = current.toLocaleString('pt-BR') + suffix;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('pt-BR') + suffix;
      }
    }

    window.requestAnimationFrame(step);
  }

  if ('IntersectionObserver' in window && statNumbers.length) {
    var statsObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach(function (el) {
      statsObserver.observe(el);
    });
  } else {
    statNumbers.forEach(function (el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var suffix = el.getAttribute('data-suffix') || '';
      el.textContent = target.toLocaleString('pt-BR') + suffix;
    });
  }

  /* ---------------------------------------------
     Realce do link ativo no menu conforme a seção visível
  --------------------------------------------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.nav-link');

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.getAttribute('id');
          var link = document.querySelector('.nav-link[href="#' + id + '"]');
          if (!link) return;

          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove('is-active'); });
            link.classList.add('is-active');
          }
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    sections.forEach(function (section) {
      navObserver.observe(section);
    });
  }

  /* ---------------------------------------------
     Validação client-side do formulário de contato
  --------------------------------------------- */
  var form = document.getElementById('contact-form');
  var formStatus = document.getElementById('form-status');

  var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var PHONE_REGEX = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/;

  function setFieldError(field, message) {
    var wrapper = field.closest('.form-field');
    var errorEl = document.getElementById(field.id + '-error');
    if (wrapper) wrapper.classList.toggle('has-error', Boolean(message));
    if (errorEl) errorEl.textContent = message || '';
    field.setAttribute('aria-invalid', message ? 'true' : 'false');
  }

  function validateField(field) {
    var value = field.value.trim();

    if (field.hasAttribute('required') && !value) {
      setFieldError(field, 'Este campo é obrigatório.');
      return false;
    }

    if (field.type === 'email' && value && !EMAIL_REGEX.test(value)) {
      setFieldError(field, 'Informe um e-mail válido.');
      return false;
    }

    if (field.id === 'phone' && value && !PHONE_REGEX.test(value)) {
      setFieldError(field, 'Informe um telefone válido, com DDD.');
      return false;
    }

    if (field.id === 'name' && value && value.length < 3) {
      setFieldError(field, 'Informe seu nome completo.');
      return false;
    }

    setFieldError(field, '');
    return true;
  }

  if (form) {
    var fields = form.querySelectorAll('input[required], textarea[required]');

    fields.forEach(function (field) {
      field.addEventListener('blur', function () {
        validateField(field);
      });
      field.addEventListener('input', function () {
        if (field.closest('.form-field').classList.contains('has-error')) {
          validateField(field);
        }
      });
    });

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var isFormValid = true;
      fields.forEach(function (field) {
        if (!validateField(field)) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        if (formStatus) {
          formStatus.textContent = 'Verifique os campos destacados e tente novamente.';
          formStatus.className = 'form-status error';
        }
        var firstError = form.querySelector('.has-error input, .has-error textarea');
        if (firstError) firstError.focus();
        return;
      }

      if (formStatus) {
        formStatus.textContent = 'Solicitação enviada com sucesso! Em breve entraremos em contato.';
        formStatus.className = 'form-status success';
      }
      form.reset();
    });
  }

  /* ---------------------------------------------
     Ano corrente no rodapé
  --------------------------------------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();
