/* ==========================================================
   Site settings — change the brand name and contact here once,
   and every page updates.
   ========================================================== */
const SITE = {
  name: "ROMXI",                      // working name
  email: "hello@example.com",          // PLACEHOLDER enquiry address
  instagram: "",                       // e.g. "https://instagram.com/yourbrand"
  currency: "USD",
  showPrices: false                    // prices hidden for now; set true to show them
};

(function () {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  let io;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const money = n => new Intl.NumberFormat("en-US", { style: "currency", currency: SITE.currency, maximumFractionDigits: 0 }).format(n);

  /* ---- Brand name & contact everywhere ---- */
  $$("[data-brand]").forEach(el => (el.textContent = SITE.name));
  $$("[data-email]").forEach(el => { el.textContent = SITE.email; el.href = "mailto:" + SITE.email; });
  $$("[data-instagram]").forEach(el => { if (SITE.instagram) el.href = SITE.instagram; else el.closest("li")?.remove(); });
  $$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));
  if (document.title.includes("{brand}")) document.title = document.title.replace("{brand}", SITE.name);

  /* ---- Hero title: split into letters for the reveal ---- */
  const heroTitle = $(".hero__title");
  if (heroTitle) {
    const text = heroTitle.textContent.trim();
    heroTitle.setAttribute("aria-label", text);
    heroTitle.innerHTML = [...text].map((c, i) =>
      `<span class="char" aria-hidden="true" style="--i:${i}">${c === " " ? "&nbsp;" : c}</span>`).join("");
  }
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add("is-ready")));

  /* ---- Header: solid after scrolling, tucks away on scroll down ---- */
  const header = $(".header");
  if (header) {
    let lastY = window.scrollY, ticking = false;
    const solidAlways = header.hasAttribute("data-solid");
    const update = () => {
      const y = window.scrollY;
      header.classList.toggle("is-scrolled", solidAlways || y > 20);
      const menuOpen = document.body.classList.contains("menu-open");
      header.classList.toggle("is-hidden", !menuOpen && y > 400 && y > lastY + 4);
      if (y < lastY - 4 || y < 400) header.classList.remove("is-hidden");
      lastY = y; ticking = false;
    };
    window.addEventListener("scroll", () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } }, { passive: true });
    update();
  }

  /* ---- Mobile menu ---- */
  const menuBtn = $(".menu-btn");
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      const open = document.body.classList.toggle("menu-open");
      menuBtn.setAttribute("aria-expanded", open);
      $(".mobile-menu")?.setAttribute("aria-hidden", !open);
    });
    $$(".mobile-menu a").forEach(a => a.addEventListener("click", () => document.body.classList.remove("menu-open")));
    document.addEventListener("keydown", e => {
      if (e.key === "Escape" && document.body.classList.contains("menu-open")) menuBtn.click();
    });
  }

  /* ---- Product cards ---- */
  const media = p => p.images && p.images.length
    ? `<img src="${p.images[0]}" alt="${p.name}" loading="lazy">`
    : window.pieceArt(p.art, p.name);

  const card = (p, i = 0) => `
    <a class="card reveal" style="--d:${(i % 4) * 0.12}s" href="piece.html?id=${p.id}" data-category="${p.category}">
      <div class="card__media">${media(p)}</div>
      <div class="card__body">
        <span class="card__name">${p.name}</span>
        <span class="card__meta">${p.finish}</span>
        ${SITE.showPrices ? `<span class="card__price">${money(p.price)}</span>` : ""}
      </div>
    </a>`;

  const featured = $("[data-featured]");
  if (featured && window.PIECES) featured.innerHTML = PIECES.filter(p => p.featured).map(card).join("");

  const collection = $("[data-collection]");
  if (collection && window.PIECES) {
    const params = new URLSearchParams(location.search);
    let active = params.get("c") && CATEGORIES[params.get("c")] ? params.get("c") : "all";
    const filters = $(".filters");
    filters.innerHTML = [["all", "All"], ...Object.entries(CATEGORIES)]
      .map(([k, v]) => `<button type="button" data-filter="${k}" aria-pressed="${k === active}">${v}</button>`).join("");

    const render = () => {
      const list = PIECES.filter(p => active === "all" || p.category === active);
      collection.innerHTML = list.map(card).join("");
      observe($$(".reveal", collection));
    };
    filters.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      active = b.dataset.filter;
      $$("button", filters).forEach(x => x.setAttribute("aria-pressed", x === b));
      const url = new URL(location.href);
      active === "all" ? url.searchParams.delete("c") : url.searchParams.set("c", active);
      history.replaceState(null, "", url);
      collection.style.opacity = 0;
      setTimeout(() => { render(); collection.style.opacity = 1; }, reduceMotion ? 0 : 350);
    });
    collection.style.transition = "opacity .35s ease";
    render();
  }

  /* ---- Single piece page ---- */
  const pieceEl = $("[data-piece]");
  if (pieceEl && window.PIECES) {
    const id = new URLSearchParams(location.search).get("id");
    const p = PIECES.find(x => x.id === id) || PIECES[0];
    document.title = `${p.name} — ${SITE.name}`;
    const shots = p.images && p.images.length
      ? p.images.map(src => `<div class="piece__shot"><img src="${src}" alt="${p.name}"></div>`).join("")
      : `<div class="piece__shot">${window.pieceArt(p.art, p.name)}</div>`;
    $(".piece__gallery", pieceEl).innerHTML = shots;
    $("[data-p-cat]", pieceEl).textContent = CATEGORIES[p.category];
    $("[data-p-cat]", pieceEl).href = `collection.html?c=${p.category}`;
    $("[data-p-name]", pieceEl).textContent = p.name;
    $("[data-p-finish]", pieceEl).textContent = p.finish;
    $("[data-p-desc]", pieceEl).textContent = p.description;
    $("[data-p-enquire]", pieceEl).href = `enquire.html?piece=${p.id}`;
    $(".specs", pieceEl).innerHTML = Object.entries(p.specs)
      .map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("");

    const related = $("[data-related]");
    if (related) related.innerHTML = PIECES.filter(x => x.id !== p.id)
      .sort((a, b) => (b.category === p.category) - (a.category === p.category)).slice(0, 4).map(card).join("");
  }

  /* ---- Enquiry form (opens the visitor's email app until a form service is connected) ---- */
  const form = $("[data-enquire]");
  if (form && window.PIECES) {
    const select = $("select[name=piece]", form);
    select.innerHTML = `<option value="">A general enquiry</option>` +
      PIECES.map(p => `<option value="${p.id}">${p.name} — ${p.finish}</option>`).join("");
    const pre = new URLSearchParams(location.search).get("piece");
    if (pre) select.value = pre;

    form.addEventListener("submit", e => {
      e.preventDefault();
      const d = new FormData(form);
      const piece = PIECES.find(p => p.id === d.get("piece"));
      const subject = piece ? `Enquiry: ${piece.name}` : "Enquiry";
      const body = [
        `Name: ${d.get("name")}`,
        `Email: ${d.get("email")}`,
        d.get("phone") ? `Phone: ${d.get("phone")}` : "",
        `Interested in: ${piece ? `${piece.name} (${piece.finish})` : "General enquiry"}`,
        `I'd like to: ${d.get("intent")}`,
        "",
        d.get("message") || ""
      ].filter(Boolean).join("\n");
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  /* ---- Scroll reveals ---- */
  function observe(els) {
    if (reduceMotion || !("IntersectionObserver" in window)) { els.forEach(el => el.classList.add("is-in")); return; }
    io = io || new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach(el => io.observe(el));
  }
  observe($$(".reveal"));
})();
