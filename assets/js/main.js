/* ==========================================================================
   Isaias Studio · Web Design — interações
   ========================================================================== */
(() => {
  "use strict";

  const CFG = window.SITE_CONFIG || {};
  const root = document.documentElement;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const motionOK = () => !reducedMotion.matches;

  /* ---------- Configuração (contatos, redes, WhatsApp) ---------- */
  const digits = (v) => String(v || "").replace(/\D/g, "");

  function waLink(message) {
    const number = digits(CFG.whatsapp && CFG.whatsapp.number);
    const text = message || (CFG.whatsapp && CFG.whatsapp.defaultMessage) || "";
    return `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
  }

  function applyConfig() {
    $$("[data-wa]").forEach((a) => {
      a.href = waLink(a.dataset.waMsg);
      a.target = "_blank";
      a.rel = "noopener";
    });

    $$('[data-config="email"]').forEach((el) => {
      if (!CFG.email) { (el.closest(".cta-alt") || el).remove(); return; }
      el.href = `mailto:${CFG.email}`;
      el.append(document.createTextNode(CFG.email));
    });

    $$('[data-config="location"]').forEach((el) => {
      if (!CFG.location) { el.remove(); return; }
      el.append(document.createTextNode(CFG.location));
    });

    $$("[data-social]").forEach((a) => {
      const url = CFG.social && CFG.social[a.dataset.social];
      if (!url) { a.remove(); return; }
      a.href = url;
    });

    $$("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

    // Aviso para quem estiver editando: marcadores ainda não substituídos
    const pending = [];
    if (/^0+$|^550+$/.test(digits(CFG.whatsapp && CFG.whatsapp.number))) pending.push("whatsapp.number");
    if (/SEUDOMINIO/i.test(CFG.email || "")) pending.push("email");
    Object.entries(CFG.social || {}).forEach(([k, v]) => /SEU_USUARIO/.test(v) && pending.push(`social.${k}`));
    if (pending.length) console.info("[Isaias Studio] Configure em assets/js/config.js:", pending.join(", "));
  }

  const escapeHTML = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- Título do hero: divide em palavras ---------- */
  function splitWords(el) {
    let index = 0;
    const walk = (node, target) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(document.createTextNode(" ")); return; }
            const w = document.createElement("span");
            w.className = "split-w";
            const inner = document.createElement("span");
            inner.className = "split-in";
            inner.style.setProperty("--w", index++);
            inner.textContent = part;
            w.append(inner);
            frag.append(w);
          });
          target.replaceChild(frag, child);
        } else if (child.nodeType === Node.ELEMENT_NODE) {
          walk(child, child);
        }
      });
    };
    el.setAttribute("aria-label", el.textContent.replace(/\s+/g, " ").trim());
    walk(el, el);
    $$(".split-w", el).forEach((w) => w.setAttribute("aria-hidden", "true"));
  }

  /* ---------- Navbar ---------- */
  function initNav() {
    const nav = $(".nav");
    const progress = $(".nav-progress");
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      nav.classList.toggle("is-scrolled", y > 24);
      // esconde ao descer, mostra ao subir
      const menuOpen = document.body.classList.contains("menu-open");
      if (!menuOpen) nav.classList.toggle("is-hidden", y > 480 && y > lastY + 4);
      if (y < lastY - 4 || y < 480) nav.classList.remove("is-hidden");
      lastY = y;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.setProperty("--progress", max > 0 ? (y / max).toFixed(4) : 0);
    };
    onScrollFns.push(onScroll);

    // pílula que acompanha o hover
    const links = $(".nav-links");
    const pill = $(".nav-pill");
    if (links && pill) {
      $$("a", links).forEach((a) => {
        a.addEventListener("mouseenter", () => {
          pill.style.width = `${a.offsetWidth}px`;
          pill.style.transform = `translateX(${a.offsetLeft}px)`;
          pill.style.opacity = "1";
        });
      });
      links.addEventListener("mouseleave", () => (pill.style.opacity = "0"));
    }

    // link ativo conforme a seção
    const sections = $$("main section[id]");
    const navLinks = $$(".nav-links a");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        navLinks.forEach((a) => {
          const on = a.getAttribute("href") === `#${e.target.id}`;
          a.classList.toggle("is-current", on);
          on ? a.setAttribute("aria-current", "true") : a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => io.observe(s));
  }

  /* ---------- Menu mobile ---------- */
  function initMobileMenu() {
    const btn = $(".burger");
    const menu = $("#menu-mobile");
    if (!btn || !menu) return;
    let closeTimer;

    const open = () => {
      clearTimeout(closeTimer);
      menu.hidden = false;
      requestAnimationFrame(() => menu.classList.add("is-open"));
      btn.setAttribute("aria-expanded", "true");
      btn.setAttribute("aria-label", "Fechar menu");
      document.body.classList.add("menu-open");
      $(".nav").classList.remove("is-hidden");
      setTimeout(() => { const first = $("a", menu); first && first.focus({ preventScroll: true }); }, 50);
    };
    const close = (focusBtn = true) => {
      menu.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      btn.setAttribute("aria-label", "Abrir menu");
      document.body.classList.remove("menu-open");
      closeTimer = setTimeout(() => (menu.hidden = true), motionOK() ? 450 : 0);
      if (focusBtn) btn.focus({ preventScroll: true });
    };

    btn.addEventListener("click", () => (btn.getAttribute("aria-expanded") === "true" ? close() : open()));
    $$("a", menu).forEach((a) => a.addEventListener("click", () => close(false)));
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") close();
      // mantém o foco dentro do menu
      if (e.key === "Tab" && btn.getAttribute("aria-expanded") === "true") {
        const items = [btn, ...$$("a", menu)];
        const i = items.indexOf(document.activeElement);
        if (e.shiftKey && i <= 0) { e.preventDefault(); items[items.length - 1].focus(); }
        else if (!e.shiftKey && i === items.length - 1) { e.preventDefault(); items[0].focus(); }
      }
    });
    window.matchMedia("(min-width: 961px)").addEventListener("change", (e) => {
      if (e.matches && btn.getAttribute("aria-expanded") === "true") close(false);
    });
  }

  /* ---------- Revelação ao rolar ---------- */
  function initReveal() {
    // atraso escalonado para filhos de [data-stagger]
    $$("[data-stagger]").forEach((group) => {
      $$(":scope > [data-reveal]", group).forEach((el, i) => el.style.setProperty("--i", i));
    });
    $$(".works > .work").forEach((el, i) => el.style.setProperty("--i", i % 2));
    $$(".steps > .step").forEach((el) => el.style.setProperty("--i", 0));

    const targets = $$("[data-reveal]");
    if (!("IntersectionObserver" in window) || !motionOK()) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -10% 0px", threshold: 0.12 });
    targets.forEach((el) => io.observe(el));
  }

  /* ---------- Spotlight nos cards ---------- */
  function initSpotlight() {
    document.addEventListener("pointermove", (e) => {
      const card = e.target.closest && e.target.closest(".spot");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, { passive: true });
  }

  /* ---------- Tilt 3D ---------- */
  function initTilt() {
    if (!finePointer.matches || !motionOK()) return;
    $$("[data-tilt]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
        el.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
      });
      el.addEventListener("pointerleave", () => {
        el.style.setProperty("--ry", "0deg");
        el.style.setProperty("--rx", "0deg");
      });
    });
  }

  /* ---------- Botões magnéticos ---------- */
  function initMagnetic() {
    if (!finePointer.matches || !motionOK()) return;
    $$(".magnetic").forEach((btn) => {
      btn.addEventListener("pointermove", (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        btn.style.setProperty("--bx", `${(x * 0.18).toFixed(1)}px`);
        btn.style.setProperty("--by", `${(y * 0.28).toFixed(1)}px`);
      });
      btn.addEventListener("pointerleave", () => {
        btn.style.setProperty("--bx", "0px");
        btn.style.setProperty("--by", "0px");
      });
    });
  }

  /* ---------- Parallax do hero ---------- */
  function initHeroParallax() {
    const hero = $(".hero");
    const visual = $(".hero-visual");
    if (!hero || !visual) return;
    $$("[data-depth]", visual).forEach((el) => el.style.setProperty("--d", el.dataset.depth));
    if (!finePointer.matches || !motionOK()) return;
    hero.addEventListener("pointermove", (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      visual.style.setProperty("--px", x.toFixed(2));
      visual.style.setProperty("--py", y.toFixed(2));
    });
    hero.addEventListener("pointerleave", () => {
      visual.style.setProperty("--px", 0);
      visual.style.setProperty("--py", 0);
    });
  }

  /* ---------- Linha do tempo do processo ---------- */
  function initSteps() {
    const list = $(".steps");
    if (!list) return;
    const fill = $(".steps-fill", list);
    const steps = $$(".step", list);
    onScrollFns.push(() => {
      const r = list.getBoundingClientRect();
      const anchor = window.innerHeight * 0.6;
      const p = Math.min(1, Math.max(0, (anchor - r.top) / r.height));
      fill.style.setProperty("--fill", p.toFixed(4));
      steps.forEach((s) => {
        const num = $(".step-num", s).getBoundingClientRect();
        s.classList.toggle("is-active", num.top + num.height / 2 < anchor);
      });
    });
  }

  /* ---------- Texto que acende ao rolar (Sobre) ---------- */
  function initLitText() {
    const el = $("[data-lit]");
    if (!el) return;
    const words = el.textContent.trim().split(/\s+/);
    const accentFrom = words.findIndex((w) => w.startsWith("transformar"));
    el.setAttribute("aria-label", words.join(" "));
    el.innerHTML = words
      .map((w, i) => `<span class="lit-w${accentFrom >= 0 && i >= accentFrom ? " accent" : ""}" aria-hidden="true">${escapeHTML(w)}</span>`)
      .join(" ");
    const spans = $$(".lit-w", el);
    if (!motionOK()) { spans.forEach((s) => s.classList.add("on")); return; }
    onScrollFns.push(() => {
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      const lit = Math.round(p * spans.length);
      spans.forEach((s, i) => s.classList.toggle("on", i < lit));
    });
  }

  /* ---------- Formulário → WhatsApp ---------- */
  function initForm() {
    const form = $("#form-orcamento");
    if (!form) return;
    const required = $$("input[required]", form);

    const validate = (input) => {
      const ok = input.value.trim().length > 1;
      const field = input.closest(".field");
      field.classList.toggle("is-invalid", !ok);
      input.setAttribute("aria-invalid", String(!ok));
      const err = $(".field-error", field);
      if (err) input.setAttribute("aria-describedby", err.id);
      return ok;
    };
    required.forEach((input) => input.addEventListener("input", () => input.closest(".field").classList.contains("is-invalid") && validate(input)));

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const invalid = required.filter((i) => !validate(i));
      if (invalid.length) { invalid[0].focus(); return; }
      const data = new FormData(form);
      const lines = [
        "Olá! Vim pelo site da Isaias Studio e gostaria de solicitar um orçamento de landing page.",
        "",
        `*Nome:* ${data.get("nome").trim()}`,
        `*Negócio:* ${data.get("negocio").trim()}`,
        `*Objetivo:* ${data.get("objetivo")}`,
      ];
      const msg = String(data.get("mensagem") || "").trim();
      if (msg) lines.push(`*Detalhes:* ${msg}`);
      const url = waLink(lines.join("\n"));
      window.open(url, "_blank", "noopener");
      // link de reserva, caso o navegador bloqueie a nova aba
      const note = $(".form-note", form);
      if (note) {
        const a = document.createElement("a");
        a.href = url; a.target = "_blank"; a.rel = "noopener";
        a.textContent = "Abrir conversa no WhatsApp";
        note.replaceChildren(document.createTextNode("Mensagem pronta. Se o WhatsApp não abriu, "), a, document.createTextNode("."));
      }
    });
  }

  /* ---------- Botão flutuante ---------- */
  function initFab() {
    const fab = $(".fab");
    const hero = $(".hero");
    const cta = $("#contato");
    if (!fab || !hero) return;
    let pastHero = false;
    let atCta = false;
    const update = () => fab.classList.toggle("is-visible", pastHero && !atCta);
    new IntersectionObserver(([e]) => { pastHero = !e.isIntersecting; update(); }).observe(hero);
    if (cta) new IntersectionObserver(([e]) => { atCta = e.isIntersecting; update(); }, { threshold: 0.3 }).observe(cta);
  }

  /* ---------- Loop de rolagem (um único rAF) ---------- */
  const onScrollFns = [];
  let ticking = false;
  const runScroll = () => { onScrollFns.forEach((fn) => fn()); ticking = false; };
  const requestScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(runScroll); } };

  /* ---------- Init ---------- */
  applyConfig();
  const title = $("[data-split]");
  if (title && motionOK()) splitWords(title);

  initNav();
  initMobileMenu();
  initReveal();
  initSpotlight();
  initTilt();
  initMagnetic();
  initHeroParallax();
  initSteps();
  initLitText();
  initForm();
  initFab();

  window.addEventListener("scroll", requestScroll, { passive: true });
  window.addEventListener("resize", requestScroll, { passive: true });
  runScroll();

  // dispara a sequência de entrada quando as fontes estiverem prontas
  const ready = () => root.classList.add("is-loaded");
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1200))]).then(() => requestAnimationFrame(ready));
})();
