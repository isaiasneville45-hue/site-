/* Forno Lume — interações da landing page (sem dependências).
   Os dados do negócio ficam em js/config.js. */
(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });
  const brlShort = (v) => (Number.isInteger(v) ? `R$ ${v}` : brl.format(v));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const icon = (id) => `<svg class="ico" aria-hidden="true"><use href="#${id}"/></svg>`;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const CFG = Object.assign({ demo: true, endereco: {}, contato: {}, horarios: {}, taxaEntrega: null, fermentacaoHoras: null }, window.FORNO_LUME || {});
  const DEMO = CFG.demo !== false;
  const WHATSAPP = !DEMO && /^\d{10,15}$/.test(CFG.contato.whatsapp || "") ? CFG.contato.whatsapp : "";
  const FEE = typeof CFG.taxaEntrega === "number" ? CFG.taxaEntrega : null;

  $$("[data-demo-only]").forEach((el) => { el.hidden = !DEMO; });

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

  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (_) {
      const ta = Object.assign(document.createElement("textarea"), { value: text });
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.append(ta); ta.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (__) {}
      ta.remove();
      return ok;
    }
  }

  /* ---------- Dados configuráveis: endereço, contato, horários ---------- */
  const addressLines = (CFG.endereco.linhas || []).filter(Boolean);
  $$("[data-cfg-address]").forEach((el) => {
    el.innerHTML = addressLines.map(esc).join("<br>");
    el.closest(".footer__col, .visit__block").hidden = addressLines.length === 0;
  });
  const copyAddressBtn = $("[data-copy-address]");
  copyAddressBtn.hidden = addressLines.length === 0;
  copyAddressBtn.addEventListener("click", async () => {
    const ok = await copyText(addressLines.join(", "));
    const label = copyAddressBtn.querySelector("span");
    const use = copyAddressBtn.querySelector("use");
    if (!ok) { toast("Não foi possível copiar. Selecione o endereço e copie manualmente."); return; }
    label.textContent = "Endereço copiado";
    use.setAttribute("href", "#i-check");
    toast("Endereço copiado");
    setTimeout(() => { label.textContent = "Copiar endereço"; use.setAttribute("href", "#i-copy"); }, 2400);
  });
  const mapLink = $("[data-map-link]");
  if (CFG.endereco.mapaUrl && !DEMO) { mapLink.href = CFG.endereco.mapaUrl; mapLink.hidden = false; }

  // Em modo demonstrativo os contatos aparecem como texto, sem links que levariam a lugar nenhum.
  const c = CFG.contato;
  const contacts = [
    c.telefone && { label: "Telefone", text: c.telefone, href: `tel:+55${c.telefone.replace(/\D/g, "")}` },
    (c.whatsappExibicao || c.whatsapp) && { label: "WhatsApp", text: c.whatsappExibicao || c.whatsapp, href: WHATSAPP ? `https://wa.me/${WHATSAPP}` : "" },
    c.email && { label: "E-mail", text: c.email, href: `mailto:${c.email}` },
  ].filter(Boolean);
  const contactValue = (item) => (DEMO || !item.href)
    ? `<span class="contact-list__value">${esc(item.text)}</span>`
    : `<a class="contact-list__value" href="${esc(item.href)}"${item.href.startsWith("http") ? ' target="_blank" rel="noopener"' : ""}>${esc(item.text)}</a>`;
  const contactList = $("[data-contact-list]");
  contactList.innerHTML = contacts.map((i) => `<li>${contactValue(i)}<span>${i.label}</span></li>`).join("");
  contactList.closest(".visit__block").hidden = contacts.length === 0;
  const footerContact = $("[data-footer-contact]");
  footerContact.innerHTML = contacts.map((i) => `<li>${contactValue(i)}</li>`).join("");
  footerContact.closest(".footer__col").hidden = contacts.length === 0;

  const socials = $("[data-socials]");
  if (!DEMO) {
    const items = [];
    if (c.instagram) items.push(`<li><a href="https://instagram.com/${encodeURIComponent(c.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${icon("i-instagram")}</a></li>`);
    if (WHATSAPP) items.push(`<li><a href="https://wa.me/${WHATSAPP}" target="_blank" rel="noopener" aria-label="WhatsApp">${icon("i-whatsapp")}</a></li>`);
    if (c.email) items.push(`<li><a href="mailto:${esc(c.email)}" aria-label="E-mail">${icon("i-mail")}</a></li>`);
    socials.innerHTML = items.join("");
    socials.hidden = items.length === 0;
  }

  if (CFG.fermentacaoHoras) {
    const fh = $("[data-ferment-hours]");
    fh.textContent = ` O tempo total de fermentação é de ${CFG.fermentacaoHoras} horas.`;
    fh.hidden = false;
  }

  /* ---------- Horários ---------- */
  const DAY_NAMES = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];
  const toMin = (hhmm) => { const [h, m] = hhmm.split(":").map(Number); return h * 60 + (m || 0); };
  const SCHEDULE = {};
  for (let d = 0; d < 7; d++) SCHEDULE[d] = (CFG.horarios[d] || []).map(([a, b]) => [toMin(a), toMin(b)]);
  const fmtTime = (m) => {
    const h = Math.floor(m / 60) % 24, min = m % 60;
    return min ? `${h}h${String(min).padStart(2, "0")}` : `${h}h`;
  };
  const fmtRange = ([a, b]) => `${fmtTime(a)} ${b === 24 * 60 ? "à" : "às"} ${fmtTime(b)}`;
  $$("[data-hours-body] tr").forEach((tr) => {
    const ranges = SCHEDULE[Number(tr.dataset.day)];
    tr.querySelector("td").textContent = ranges.length ? ranges.map(fmtRange).join(" e ") : "Fechado";
  });

  function nowInSaoPaulo() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23",
    }).formatToParts(new Date());
    const get = (t) => parts.find((p) => p.type === t).value;
    return { day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
  }
  function openStatus() {
    const { day, minutes } = nowInSaoPaulo();
    const today = SCHEDULE[day];
    const current = today.find(([a, b]) => minutes >= a && minutes < b);
    if (current) return { open: true, day, text: `Aberto agora, até ${fmtTime(current[1])}` };
    const later = today.find(([a]) => a > minutes);
    if (later) return { open: false, day, text: `Fechado agora. Abre hoje às ${fmtTime(later[0])}` };
    for (let i = 1; i <= 7; i++) {
      const d = (day + i) % 7;
      if (SCHEDULE[d].length) return { open: false, day, text: `Fechado agora. Abre ${i === 1 ? "amanhã" : DAY_NAMES[d]} às ${fmtTime(SCHEDULE[d][0][0])}` };
    }
    return { open: false, day, text: "Fechado" };
  }
  function renderStatus() {
    const s = openStatus();
    $$(".hours__table tr").forEach((tr) => tr.classList.toggle("is-today", Number(tr.dataset.day) === s.day));
    // O status "aberto/fechado" só aparece com horários reais.
    $$("[data-status]").forEach((el) => {
      el.hidden = DEMO;
      el.classList.toggle("is-open", s.open);
      el.querySelector("[data-status-text]").textContent = s.text;
    });
  }
  renderStatus();
  setInterval(renderStatus, 60 * 1000);

  /* ---------- Navbar ---------- */
  const nav = $("[data-nav]");
  const hero = $(".hero");
  let lastY = window.scrollY;
  function onScrollNav() {
    const y = window.scrollY;
    nav.classList.toggle("is-solid", y > hero.offsetHeight - nav.offsetHeight - 10);
    if (y > lastY + 4 && y > 600) nav.classList.add("is-hidden");
    else if (y < lastY - 4 || y < 600) nav.classList.remove("is-hidden");
    lastY = y;
  }
  const navLinks = $$(".nav__links a");
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("is-current", a.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  [hero, ...navLinks.map((a) => $(a.getAttribute("href")))].forEach((s) => s && sectionObserver.observe(s));

  /* ---------- Menu móvel ---------- */
  const menu = $("[data-menu]");
  $("[data-open-menu]").addEventListener("click", () => menu.showModal());
  $$("[data-close-menu]").forEach((b) => b.addEventListener("click", () => menu.close()));
  $$(".mobile-menu__links a").forEach((a) => a.addEventListener("click", () => menu.close()));
  window.matchMedia("(min-width: 1021px)").addEventListener("change", (e) => { if (e.matches && menu.open) menu.close(); });

  /* ---------- Cardápio: preços vêm de um só lugar (data-price) ---------- */
  const CATALOG = {};
  $$("[data-dish]").forEach((el) => {
    const price = Number(el.dataset.price);
    CATALOG[el.dataset.dish] = { name: el.dataset.name, price };
    $(".dish__price", el).textContent = brlShort(price);
  });
  $$("[data-price-of]").forEach((el) => { el.textContent = brlShort(CATALOG[el.dataset.priceOf].price); });
  $$("[data-count-of]").forEach((el) => { el.textContent = $$(".dish", $(`#${el.dataset.countOf}`)).length; });

  /* ---------- Pedido ---------- */
  const STORE_KEY = "fornolume:pedido";
  let cart = {};
  let mode = "retirada";
  try {
    const saved = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    if (saved.items) Object.entries(saved.items).forEach(([id, q]) => { if (CATALOG[id] && q > 0) cart[id] = Math.min(q, 20); });
    if (saved.mode === "entrega" || saved.mode === "retirada") mode = saved.mode;
  } catch (_) { /* armazenamento indisponível: segue sem persistir */ }

  const cartDialog = $("[data-cart]");
  const notesField = $("#cart-notes");
  const preview = $("[data-preview]");
  const checkoutLink = $("[data-checkout]");
  const reviewBtn = $("[data-review]");
  checkoutLink.hidden = !WHATSAPP;
  reviewBtn.hidden = !!WHATSAPP;

  const persist = () => { try { localStorage.setItem(STORE_KEY, JSON.stringify({ items: cart, mode })); } catch (_) {} };
  const count = () => Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = () => Object.entries(cart).reduce((sum, [id, q]) => sum + CATALOG[id].price * q, 0);
  const fee = () => (mode === "entrega" && FEE !== null ? FEE : 0);
  const total = () => subtotal() + fee();

  function setQty(id, qty) {
    const prev = cart[id] || 0;
    qty = Math.max(0, Math.min(20, qty));
    if (qty === 0) delete cart[id]; else cart[id] = qty;
    persist();
    render();
    if (qty > prev) {
      toast(`${CATALOG[id].name} no pedido (${qty})`);
      const badge = $("[data-cart-count]");
      badge.classList.remove("bump"); void badge.offsetWidth; badge.classList.add("bump");
    } else if (qty === 0 && prev > 0) {
      toast(`${CATALOG[id].name} removida do pedido`);
    }
  }

  function stepperHTML(id, qty) {
    const name = esc(CATALOG[id].name);
    return `<div class="stepper" role="group" aria-label="Quantidade de ${name}">
      <button type="button" data-dec="${id}" aria-label="${qty === 1 ? "Remover" : "Diminuir"} ${name}">${icon(qty === 1 ? "i-close" : "i-minus")}</button>
      <output aria-live="polite">${qty}</output>
      <button type="button" data-inc="${id}" aria-label="Aumentar ${name}">${icon("i-plus")}</button>
    </div>`;
  }

  function renderSlots() {
    $$("[data-qty-slot]").forEach((slot) => {
      const id = slot.dataset.qtySlot;
      const qty = cart[id] || 0;
      if (slot.dataset.state === String(qty)) return;
      const hadFocus = slot.contains(document.activeElement);
      const focusedInc = hadFocus && document.activeElement.hasAttribute("data-inc");
      slot.dataset.state = String(qty);
      slot.innerHTML = qty
        ? stepperHTML(id, qty)
        : `<button class="add-btn" type="button" data-inc="${id}" aria-label="Adicionar ${esc(CATALOG[id].name)} ao pedido">${icon("i-plus")}Adicionar</button>`;
      if (hadFocus) (slot.querySelector(focusedInc ? "[data-inc]" : "[data-dec]") || slot.querySelector("button")).focus();
    });
  }

  function orderMessage() {
    const lines = [`Olá, Forno Lume! Quero fazer um pedido para ${mode === "entrega" ? "entrega" : "retirada no balcão"}:`, ""];
    Object.entries(cart).forEach(([id, q]) => lines.push(`${q}x ${CATALOG[id].name}: ${brl.format(CATALOG[id].price * q)}`));
    lines.push("", `Subtotal: ${brl.format(subtotal())}`);
    if (mode === "entrega") lines.push(`Entrega: ${FEE === null ? "a combinar" : brl.format(FEE)}`);
    lines.push(`Total: ${brl.format(total())}${mode === "entrega" && FEE === null ? " + entrega" : ""}`);
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
        $(".cart__name", li).textContent = name;
        list.append(li);
      }
      $(".cart__unit", li).innerHTML = `<span>${brl.format(price)} cada</span><strong class="cart__line">${brl.format(price * cart[id])}</strong>`;
    });
    const delivery = mode === "entrega";
    $("[data-sum-sub]").textContent = brl.format(subtotal());
    $("[data-fee-row]").hidden = !delivery;
    $("[data-sum-fee]").textContent = FEE === null ? "A combinar" : brl.format(FEE);
    $("[data-fee-note]").hidden = !(delivery && FEE === null);
    $("[data-sum-total]").textContent = brl.format(total());
    const msg = orderMessage();
    if (WHATSAPP) checkoutLink.href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;
    $("[data-preview-text]").textContent = msg;
    if (ids.length === 0) preview.hidden = true;
  }

  function renderBadge() {
    const n = count();
    const badge = $("[data-cart-count]");
    badge.hidden = n === 0;
    badge.textContent = n;
    $(".btn--order").setAttribute("aria-label", n ? `Abrir seu pedido, ${n} ${n === 1 ? "item" : "itens"}` : "Abrir seu pedido");
  }

  // Atalho flutuante: o menu se esconde ao rolar, então o pedido continua a um toque.
  const cartBar = $("[data-cart-bar]");
  function renderBar() {
    const n = count();
    const on = n > 0 && window.scrollY > hero.offsetHeight * 0.8 && !cartDialog.open && !menu.open;
    cartBar.classList.toggle("is-on", on);
    document.body.classList.toggle("has-bar", on);
    cartBar.tabIndex = on ? 0 : -1;
    cartBar.setAttribute("aria-hidden", String(!on));
    $("[data-bar-count]").textContent = `${n} ${n === 1 ? "item" : "itens"}`;
    $("[data-bar-total]").textContent = brl.format(total());
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

  reviewBtn.addEventListener("click", () => {
    preview.hidden = false;
    renderCart();
    preview.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest" });
  });
  $("[data-copy-order]").addEventListener("click", async () => {
    const ok = await copyText(orderMessage());
    toast(ok ? "Mensagem do pedido copiada" : "Não foi possível copiar. Selecione o texto e copie manualmente.");
  });

  function openCart() {
    if (menu.open) menu.close();
    preview.hidden = true;
    cartDialog.showModal();
    renderBar();
  }
  $$("[data-open-cart]").forEach((b) => b.addEventListener("click", openCart));
  $$("[data-close-cart]").forEach((b) => b.addEventListener("click", () => cartDialog.close()));
  cartDialog.addEventListener("close", renderBar);
  cartDialog.addEventListener("click", (e) => {
    if (e.target !== cartDialog) return;
    const r = cartDialog.getBoundingClientRect();
    if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) cartDialog.close();
  });

  render();

  /* ---------- Sabores em destaque: foco na mesa ---------- */
  const table = $("[data-table]");
  const tableTag = $("[data-table-tag]");
  const ranks = $$("[data-rank]");
  const hotspots = $$("[data-pick]");
  function pick(id) {
    ranks.forEach((li) => {
      const active = li.dataset.rank === id;
      li.classList.toggle("is-active", active);
      $(".rank__head", li).setAttribute("aria-expanded", String(active));
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
  ranks.forEach((li) => $(".rank__head", li).addEventListener("click", () => pick(li.dataset.rank)));
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
      if (on && !reduceMotion) { panel.classList.remove("is-entering"); void panel.offsetWidth; panel.classList.add("is-entering"); }
    });
    moveInk(tab);
    if (focus) tab.focus();
    tabList.scrollTo({ left: Math.max(0, tab.offsetLeft - 24), behavior: reduceMotion ? "auto" : "smooth" });
  }
  tabs.forEach((t, i) => {
    t.addEventListener("click", () => selectTab(t));
    t.addEventListener("keydown", (e) => {
      const next = { ArrowRight: tabs[(i + 1) % tabs.length], ArrowLeft: tabs[(i - 1 + tabs.length) % tabs.length], Home: tabs[0], End: tabs[tabs.length - 1] }[e.key];
      if (next) { e.preventDefault(); selectTab(next, { focus: true }); }
    });
  });
  $$("[data-goto-tab]").forEach((a) => a.addEventListener("click", () => selectTab($(`[data-tab="${a.dataset.gotoTab}"]`))));
  const activeTab = () => $('[data-tab][aria-selected="true"]');
  moveInk(tabs[0]);

  /* ---------- A massa: a bola cresce conforme as etapas ---------- */
  const stepsList = $("[data-steps]");
  const steps = $$(".step", stepsList);
  const dough = $("[data-dough]");
  const stepEl = $("[data-dough-step]");
  const stageEl = $("[data-dough-stage]");
  let markerY = [];
  function measureSteps() {
    const base = stepsList.getBoundingClientRect().top + window.scrollY;
    markerY = steps.map((s) => {
      const m = $(".step__marker", s).getBoundingClientRect();
      return m.top + m.height / 2 + window.scrollY;
    });
    stepsList.style.setProperty("--l-top", `${markerY[0] - base}px`);
    stepsList.style.setProperty("--l-h", `${markerY[markerY.length - 1] - markerY[0]}px`);
  }
  function updateFerment() {
    const anchor = window.scrollY + window.innerHeight * 0.58;
    let idx = -1;
    markerY.forEach((y, i) => { if (anchor >= y) idx = i; });
    let pv = 0;
    if (idx >= steps.length - 1) pv = 1;
    else if (idx >= 0) pv = (idx + (anchor - markerY[idx]) / (markerY[idx + 1] - markerY[idx])) / (steps.length - 1);
    steps.forEach((s, i) => s.classList.toggle("is-reached", i <= idx));
    stepsList.style.setProperty("--line", pv.toFixed(4));
    dough.style.setProperty("--p", pv.toFixed(4));
    const current = Math.max(0, idx);
    stepEl.textContent = current + 1;
    stageEl.textContent = steps[current].dataset.stage;
  }

  /* ---------- Rolagem e redimensionamento ---------- */
  let ticking = false;
  window.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { onScrollNav(); updateFerment(); renderBar(); ticking = false; });
  }, { passive: true });
  const remeasure = () => { measureSteps(); updateFerment(); moveInk(activeTab()); };
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
  const shots = $$("[data-lightbox]").map((btn) => ({ img: $("img", btn), caption: $("figcaption", btn.closest("figure")).textContent, btn }));
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

  /* ---------- Ano ---------- */
  $("[data-year]").textContent = new Date().getFullYear();
})();
