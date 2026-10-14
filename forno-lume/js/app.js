/* Forno Lume — interações da landing page (sem dependências) */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const icon = (id) => `<svg class="ico" aria-hidden="true"><use href="#${id}"/></svg>`;

  /* ---------- Toast ---------- */
  const toastEl = $("[data-toast]");
  let toastTimer;
  function toast(message) {
    toastEl.innerHTML = `${icon("i-check")}<span></span>`;
    toastEl.querySelector("span").textContent = message;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("is-on"), 2600);
  }

  /* ---------- Navbar ---------- */
  const nav = $("[data-nav]");
  const hero = $(".hero");
  let lastY = window.scrollY;
  function onScrollNav() {
    const y = window.scrollY;
    const pastHero = y > hero.offsetHeight - nav.offsetHeight - 10;
    nav.classList.toggle("is-solid", pastHero);
    const goingDown = y > lastY + 4;
    const goingUp = y < lastY - 4;
    if (goingDown && y > 600) nav.classList.add("is-hidden");
    else if (goingUp || y < 600) nav.classList.remove("is-hidden");
    lastY = y;
  }

  const navLinks = $$(".nav__links a");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navLinks.forEach((a) => { const s = $(a.getAttribute("href")); if (s) sectionObserver.observe(s); });
  $(".hero") && new IntersectionObserver(([e]) => {
    if (e.isIntersecting) navLinks.forEach((a) => a.classList.remove("is-current"));
  }, { rootMargin: "-45% 0px -50% 0px" }).observe(hero);

  /* ---------- Menu móvel ---------- */
  const menu = $("[data-menu]");
  $("[data-open-menu]").addEventListener("click", () => menu.showModal());
  $$("[data-close-menu]").forEach((b) => b.addEventListener("click", () => menu.close()));
  $$(".mobile-menu__links a").forEach((a) => a.addEventListener("click", () => menu.close()));
  window.matchMedia("(min-width: 1021px)").addEventListener("change", (e) => { if (e.matches && menu.open) menu.close(); });

  /* ---------- Horário: aberto ou fechado (horário de Brasília) ---------- */
  // minutos desde 0h; 24*60 = meia-noite do dia seguinte
  const SCHEDULE = {
    0: [[12 * 60, 16 * 60], [18 * 60, 22 * 60 + 30]],
    1: [],
    2: [[18 * 60, 23 * 60]],
    3: [[18 * 60, 23 * 60]],
    4: [[18 * 60, 23 * 60]],
    5: [[18 * 60, 24 * 60]],
    6: [[18 * 60, 24 * 60]],
  };
  const DAY_NAMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  const fmtTime = (m) => {
    const h = Math.floor(m / 60) % 24, min = m % 60;
    return min ? `${h}h${String(min).padStart(2, "0")}` : `${h}h`;
  };
  function nowInSaoPaulo() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
    return { day, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
  }
  function openStatus() {
    const { day, minutes } = nowInSaoPaulo();
    const today = SCHEDULE[day];
    const current = today.find(([a, b]) => minutes >= a && minutes < b);
    if (current) {
      const closesSoon = current[1] - minutes <= 45;
      return { open: true, day, text: closesSoon ? `Aberto, fecha em ${current[1] - minutes} min` : `Aberto agora, até ${fmtTime(current[1])}` };
    }
    const laterToday = today.find(([a]) => a > minutes);
    if (laterToday) return { open: false, day, text: `Fechado agora. Abrimos hoje às ${fmtTime(laterToday[0])}` };
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      if (SCHEDULE[d].length) {
        const when = i === 1 ? "amanhã" : DAY_NAMES[d];
        return { open: false, day, text: `Fechado agora. Abrimos ${when} às ${fmtTime(SCHEDULE[d][0][0])}` };
      }
    }
    return { open: false, day, text: "Fechado" };
  }
  function renderStatus() {
    const s = openStatus();
    $$("[data-status]").forEach((el) => {
      el.classList.toggle("is-open", s.open);
      el.querySelector("[data-status-text]").textContent = s.text;
    });
    $$(".hours__table tr").forEach((tr) => tr.classList.toggle("is-today", Number(tr.dataset.day) === s.day));
  }
  renderStatus();
  setInterval(renderStatus, 60 * 1000);

  /* ---------- Pedido (carrinho) ---------- */
  const CATALOG = {};
  $$("[data-dish]").forEach((el) => {
    CATALOG[el.dataset.dish] = { name: el.dataset.name, price: Number(el.dataset.price) };
  });
  const STORE_KEY = "fornolume:pedido";
  const FEE = { entrega: 8, retirada: 0 };
  const WHATSAPP = "5511900000000"; // número fictício

  let cart = {};
  let mode = "entrega";
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    if (saved.items) Object.entries(saved.items).forEach(([id, q]) => { if (CATALOG[id] && q > 0) cart[id] = Math.min(q, 20); });
    if (saved.mode in FEE) mode = saved.mode;
  } catch (_) { /* armazenamento indisponível: segue sem persistir */ }

  const cartDialog = $("[data-cart]");
  const notesField = $(".cart__notes textarea");
  const persist = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify({ items: cart, mode })); } catch (_) {} };
  const count = () => Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = () => Object.entries(cart).reduce((sum, [id, q]) => sum + CATALOG[id].price * q, 0);

  function setQty(id, qty, { announce = true } = {}) {
    const prev = cart[id] || 0;
    qty = Math.max(0, Math.min(20, qty));
    if (qty === 0) delete cart[id]; else cart[id] = qty;
    persist();
    render();
    if (announce && qty > prev) {
      toast(`${CATALOG[id].name} adicionada ao pedido`);
      const badge = $("[data-cart-count]");
      badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump");
    } else if (announce && qty === 0 && prev > 0) {
      toast(`${CATALOG[id].name} removida do pedido`);
    }
  }

  function stepperHTML(id, qty) {
    const name = CATALOG[id].name;
    return `<div class="stepper" role="group" aria-label="Quantidade de ${name}">
      <button type="button" data-dec="${id}" aria-label="Remover uma ${name}">${icon(qty === 1 ? "i-close" : "i-minus")}</button>
      <output aria-live="polite">${qty}</output>
      <button type="button" data-inc="${id}" aria-label="Adicionar mais uma ${name}">${icon("i-plus")}</button>
    </div>`;
  }

  function renderSlots() {
    $$("[data-qty-slot]").forEach((slot) => {
      const id = slot.dataset.qtySlot;
      const qty = cart[id] || 0;
      const state = String(qty);
      if (slot.dataset.state === state) return;
      const hadFocus = slot.contains(document.activeElement);
      const focusedInc = hadFocus && document.activeElement.hasAttribute("data-inc");
      slot.dataset.state = state;
      slot.innerHTML = qty
        ? stepperHTML(id, qty)
        : `<button class="add-btn" type="button" data-inc="${id}" aria-label="Adicionar ${CATALOG[id].name} ao pedido">${icon("i-plus")}Adicionar</button>`;
      if (hadFocus) (slot.querySelector(focusedInc ? "[data-inc]" : "[data-dec]") || slot.querySelector("button")).focus();
    });
  }

  function whatsappMessage() {
    const lines = [`Olá, Forno Lume! Quero fazer um pedido para ${mode === "entrega" ? "entrega" : "retirada no balcão"}:`, ""];
    Object.entries(cart).forEach(([id, q]) => lines.push(`${q}x ${CATALOG[id].name}: ${brl.format(CATALOG[id].price * q)}`));
    lines.push("", `Subtotal: ${brl.format(subtotal())}`);
    if (mode === "entrega") lines.push(`Entrega: ${brl.format(FEE.entrega)}`);
    lines.push(`Total: ${brl.format(subtotal() + FEE[mode])}`);
    const notes = notesField.value.trim();
    if (notes) lines.push("", `Observações: ${notes}`);
    return lines.join("\n");
  }

  function renderCart() {
    const ids = Object.keys(cart);
    cartDialog.classList.toggle("is-empty", ids.length === 0);
    const list = $("[data-cart-items]");
    const existing = new Map($$("li", list).map((li) => [li.dataset.id, li]));
    existing.forEach((li, id) => { if (!cart[id]) li.remove(); });
    ids.forEach((id) => {
      const { name, price } = CATALOG[id];
      let li = existing.get(id);
      if (!li) {
        li = document.createElement("li");
        li.dataset.id = id;
        li.innerHTML = `<span class="cart__name"></span><div class="qty-slot" data-qty-slot="${id}"></div><span class="cart__unit"></span>`;
        li.querySelector(".cart__name").textContent = name;
        list.append(li);
      }
      li.querySelector(".cart__unit").innerHTML = `<span>${brl.format(price)} cada</span><strong class="cart__line">${brl.format(price * cart[id])}</strong>`;
    });
    const sub = subtotal();
    $("[data-sum-sub]").textContent = brl.format(sub);
    $("[data-sum-fee]").textContent = mode === "entrega" ? brl.format(FEE.entrega) : "Grátis";
    $("[data-sum-total]").textContent = brl.format(sub + FEE[mode]);
    $("[data-checkout]").href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(whatsappMessage())}`;
  }

  function renderBadge() {
    const n = count();
    const badge = $("[data-cart-count]");
    badge.hidden = n === 0;
    badge.textContent = n;
    $(".btn--order").setAttribute("aria-label", n ? `Abrir pedido, ${n} ${n === 1 ? "item" : "itens"}` : "Abrir pedido");
  }

  const cartBar = $("[data-cart-bar]");
  function renderBar() {
    const n = count();
    const on = n > 0 && window.scrollY > hero.offsetHeight * 0.8 && !cartDialog.open;
    cartBar.classList.toggle("is-on", on);
    document.body.classList.toggle("has-bar", on);
    cartBar.tabIndex = on ? 0 : -1;
    cartBar.setAttribute("aria-hidden", String(!on));
    $("[data-bar-count]").textContent = `${n} ${n === 1 ? "item" : "itens"}`;
    $("[data-bar-total]").textContent = brl.format(subtotal() + FEE[mode]);
  }

  function render() { renderCart(); renderSlots(); renderBadge(); renderBar(); }

  document.addEventListener("click", (e) => {
    const inc = e.target.closest("[data-inc]");
    const dec = e.target.closest("[data-dec]");
    if (inc) setQty(inc.dataset.inc, (cart[inc.dataset.inc] || 0) + 1);
    if (dec) setQty(dec.dataset.dec, (cart[dec.dataset.dec] || 0) - 1);
  });

  $$(".cart__mode input").forEach((r) => {
    r.checked = r.value === mode;
    r.addEventListener("change", () => { mode = r.value; persist(); renderCart(); renderBar(); });
  });
  notesField.addEventListener("input", renderCart);

  function openCart() {
    if (menu.open) menu.close();
    cartDialog.showModal();
    renderBar();
  }
  cartDialog.addEventListener("close", renderBar);
  $$("[data-open-cart]").forEach((b) => b.addEventListener("click", openCart));
  $$("[data-close-cart]").forEach((b) => b.addEventListener("click", () => cartDialog.close()));
  cartDialog.addEventListener("click", (e) => {
    if (e.target !== cartDialog) return;
    const r = cartDialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) cartDialog.close();
  });

  render();

  /* ---------- Mais pedidas: foco na mesa ---------- */
  const table = $("[data-table]");
  const tableTag = $("[data-table-tag]");
  const ranks = $$("[data-rank]");
  const hotspots = $$("[data-pick]");
  function pick(id) {
    ranks.forEach((li) => {
      const active = li.dataset.rank === id;
      li.classList.toggle("is-active", active);
      li.querySelector(".rank__head").setAttribute("aria-expanded", String(active));
      if (active) {
        const [x, y, r] = li.dataset.spot.split(" ");
        table.style.setProperty("--sx", x);
        table.style.setProperty("--sy", y);
        table.style.setProperty("--sr", r);
        tableTag.textContent = CATALOG[id].name;
      }
    });
    hotspots.forEach((h) => {
      h.classList.toggle("is-active", h.dataset.pick === id);
      h.setAttribute("aria-pressed", String(h.dataset.pick === id));
    });
  }
  ranks.forEach((li) => li.querySelector(".rank__head").addEventListener("click", () => pick(li.dataset.rank)));
  hotspots.forEach((h) => h.addEventListener("click", () => pick(h.dataset.pick)));
  pick("ortolana");

  /* ---------- Cardápio: abas ---------- */
  const tabs = $$("[data-tab]");
  const ink = $(".tabs__ink");
  const tabList = $("[data-tabs]");
  function moveInk(tab) {
    const padL = tab === tabs[0] ? 0 : 18;
    ink.style.width = `${tab.offsetWidth - padL - 18}px`;
    ink.style.transform = `translateX(${tab.offsetLeft + padL}px)`;
  }
  function selectTab(tab, { focus = false } = {}) {
    tabs.forEach((t) => {
      const on = t === tab;
      t.setAttribute("aria-selected", String(on));
      t.tabIndex = on ? 0 : -1;
      const panel = $(`#${t.getAttribute("aria-controls")}`);
      panel.hidden = !on;
      if (on && !reduceMotion) {
        panel.classList.remove("is-entering"); void panel.offsetWidth; panel.classList.add("is-entering");
      }
    });
    moveInk(tab);
    if (focus) tab.focus();
    const left = tab.offsetLeft - 24;
    tabList.scrollTo({ left: Math.max(0, left), behavior: reduceMotion ? "auto" : "smooth" });
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => selectTab(t));
    t.addEventListener("keydown", (e) => {
      let next;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft") next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (e.key === "Home") next = tabs[0];
      if (e.key === "End") next = tabs[tabs.length - 1];
      if (next) { e.preventDefault(); selectTab(next, { focus: true }); }
    });
  });
  $$("[data-goto-tab]").forEach((a) => a.addEventListener("click", () => selectTab($(`[data-tab="${a.dataset.gotoTab}"]`))));
  moveInk(tabs[0]);
  document.fonts && document.fonts.ready.then(() => moveInk($('[data-tab][aria-selected="true"]')));
  window.addEventListener("resize", () => moveInk($('[data-tab][aria-selected="true"]')));

  /* ---------- Fermentação: a massa cresce com a rolagem ---------- */
  const stepsList = $("[data-steps]");
  const steps = $$(".step", stepsList);
  const dough = $("[data-dough]");
  const hoursEl = $("[data-dough-hours]");
  const stageEl = $("[data-dough-stage]");
  const HOURS = steps.map((s) => Number(s.dataset.hours));
  let markerY = [];
  function measureSteps() {
    const base = stepsList.getBoundingClientRect().top + window.scrollY;
    markerY = steps.map((s) => {
      const m = s.querySelector(".step__marker").getBoundingClientRect();
      return m.top + m.height / 2 + window.scrollY;
    });
    stepsList.style.setProperty("--l-top", `${markerY[0] - base}px`);
    stepsList.style.setProperty("--l-h", `${markerY[markerY.length - 1] - markerY[0]}px`);
  }
  function updateFerment() {
    const anchor = window.scrollY + window.innerHeight * 0.58;
    let idx = -1;
    markerY.forEach((y, i) => { if (anchor >= y) idx = i; });
    let t = 0, hours = 0, pv = 0;
    if (idx >= steps.length - 1) { hours = HOURS[HOURS.length - 1]; pv = 1; }
    else if (idx >= 0) {
      t = (anchor - markerY[idx]) / (markerY[idx + 1] - markerY[idx]);
      hours = HOURS[idx] + (HOURS[idx + 1] - HOURS[idx]) * t;
      pv = (idx + t) / (steps.length - 1);
    }
    steps.forEach((s, i) => s.classList.toggle("is-reached", i <= idx));
    stepsList.style.setProperty("--line", pv.toFixed(4));
    dough.style.setProperty("--p", pv.toFixed(4));
    hoursEl.textContent = Math.round(hours);
    stageEl.textContent = steps[Math.max(0, idx)].dataset.stage;
  }

  /* ---------- Rolagem e redimensionamento ---------- */
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScrollNav(); updateFerment(); renderBar(); ticking = false; });
  }, { passive: true });
  const remeasure = () => { measureSteps(); updateFerment(); };
  window.addEventListener("resize", remeasure);
  window.addEventListener("load", remeasure);
  document.fonts && document.fonts.ready.then(remeasure);
  if ("ResizeObserver" in window) new ResizeObserver(remeasure).observe(stepsList);
  onScrollNav();
  remeasure();

  /* ---------- Galeria: lightbox ---------- */
  const lb = $("[data-lightbox-dialog]");
  const lbImg = $("[data-lightbox-img]");
  const lbCap = $("[data-lightbox-caption]");
  const lbCount = $("[data-lightbox-count]");
  const shots = $$("[data-lightbox]").map((btn) => {
    const img = btn.querySelector("img");
    return { btn, img, caption: btn.closest("figure").querySelector("figcaption").textContent };
  });
  let current = 0;
  function show(i) {
    current = (i + shots.length) % shots.length;
    const s = shots[current];
    lbImg.src = s.img.currentSrc || s.img.src;
    lbImg.alt = s.img.alt;
    lbCap.textContent = s.caption;
    lbCount.textContent = `${current + 1} de ${shots.length}`;
    lbImg.style.animation = "none"; void lbImg.offsetWidth; lbImg.style.animation = "";
  }
  shots.forEach((s, i) => s.btn.addEventListener("click", () => { show(i); lb.showModal(); }));
  $("[data-lightbox-close]").addEventListener("click", () => lb.close());
  $("[data-lightbox-prev]").addEventListener("click", () => show(current - 1));
  $("[data-lightbox-next]").addEventListener("click", () => show(current + 1));
  lb.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
  lb.addEventListener("click", (e) => { if (e.target === lb || e.target.classList.contains("lightbox__figure")) lb.close(); });

  /* ---------- Copiar endereço ---------- */
  $$("[data-copy]").forEach((btn) => btn.addEventListener("click", async () => {
    const text = btn.dataset.copy;
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const ta = Object.assign(document.createElement("textarea"), { value: text });
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.append(ta); ta.select();
      try { document.execCommand("copy"); } catch (__) {}
      ta.remove();
    }
    const label = btn.querySelector("span");
    const use = btn.querySelector("use");
    label.textContent = "Endereço copiado";
    use.setAttribute("href", "#i-check");
    toast("Endereço copiado");
    setTimeout(() => { label.textContent = "Copiar endereço"; use.setAttribute("href", "#i-copy"); }, 2400);
  }));

  /* ---------- Newsletter ---------- */
  const news = $("[data-news]");
  const newsMsg = $("[data-news-msg]");
  news.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = news.elements.email;
    const value = input.value.trim();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);
    newsMsg.classList.toggle("is-error", !valid);
    newsMsg.classList.toggle("is-ok", valid);
    input.setAttribute("aria-invalid", String(!valid));
    if (!valid) {
      newsMsg.textContent = value ? "Confira o e-mail: falta algo no endereço." : "Digite seu e-mail para assinar.";
      input.focus();
      return;
    }
    newsMsg.textContent = "Inscrição confirmada. Demonstração: nenhum e-mail será enviado.";
    news.reset();
  });

  /* ---------- Ano ---------- */
  $("[data-year]").textContent = new Date().getFullYear();
})();
