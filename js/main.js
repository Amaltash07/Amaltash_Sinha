/* One script drives every page. Page type comes from <body data-page="...">.
   Layout never needs editing to add content — edit files in /data instead. */
const P = window.PROFILE, $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ph = t => `<div class="ph">${esc(t)}</div>`;
const img = (src, alt, fallback = "Add image") => src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : ph(fallback);
const gdoc = d => d.url ? { view: d.url, pdf: d.url, embed: "" } : d.docId ? { view: `https://docs.google.com/document/d/${d.docId}/edit`, embed: `https://docs.google.com/document/d/${d.docId}/preview`, pdf: `https://docs.google.com/document/d/${d.docId}/export?format=pdf` } : null;
const ORN = "";

/* ---------- shared header / footer ---------- */
const BLUEPRINT = `<svg viewBox="0 0 480 540" role="img" aria-label="Top-down level blockout showing the player route, a landmark, a sightline, and an optional reward room">
<defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0V20" fill="none" stroke="#fff" stroke-opacity=".05"/></pattern>
<marker id="ar" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="#cdf564"/></marker></defs>
<rect width="480" height="540" fill="url(#g)"/>
<g fill="#181816" stroke="#4b4b43" stroke-width="1.5"><rect x="50" y="390" width="110" height="90"/><rect x="90" y="250" width="30" height="140"/>
<rect x="60" y="130" width="220" height="120"/><rect x="280" y="170" width="90" height="30"/><rect x="370" y="110" width="80" height="110"/>
<rect x="160" y="40" width="160" height="70"/><rect x="230" y="110" width="20" height="20"/></g>
<polygon points="105,235 235,140 265,235" fill="#cdf564" fill-opacity=".09"/>
<polyline class="route" pathLength="1" points="105,470 105,300 105,200 170,190 240,150 240,70" fill="none" stroke="#cdf564" stroke-width="2.5" marker-end="url(#ar)"/>
<polyline points="240,190 330,185 410,165" fill="none" stroke="#8c8b82" stroke-width="1.5" stroke-dasharray="4 5"/>
<circle cx="105" cy="470" r="6" fill="#cdf564"/><circle cx="170" cy="165" r="16" fill="none" stroke="#efeee8" stroke-width="1.5"/><circle cx="170" cy="165" r="4" fill="#efeee8"/>
<g fill="#8c8b82" font-family="DM Mono,monospace" font-size="10" letter-spacing=".6"><text x="58" y="408">START</text><text x="66" y="148">HUB</text>
<text x="190" y="162" fill="#efeee8">LANDMARK</text><text x="378" y="130">OPTIONAL</text><text x="378" y="143">REWARD</text><text x="172" y="60">GOAL</text>
<text x="118" y="290" fill="#cdf564">SIGHTLINE</text><text x="20" y="28">LEVEL BLOCKOUT / TOP-DOWN</text><text x="372" y="28">PORTFOLIO 2026</text><text x="20" y="520">DESIGN WITH INTENT: space, systems, player experience</text></g></svg>`;

function shell() {
  const home = document.body.dataset.page === "home" ? "" : "index.html";
  $("#header").outerHTML = `<header class="site-header"><div class="wrap bar">
    <a class="brand" href="index.html">${esc(P.name)}<span>.</span></a>
    <button class="menu-btn" aria-expanded="false">Menu +</button>
    <nav aria-label="Main"><a href="${home}#projects">Work</a><a href="games.html">Games</a><a href="${home}#documents">GDD / LDD</a>
    <a href="${home}#about">About</a><a href="${home}#experience">Experience</a><a href="${home}#contact" class="nav-cta">Contact ↗</a></nav></div></header>`;
  $("#footer").outerHTML = `<footer class="footer wrap"><span>${esc(P.name)}. ${esc(P.title)}</span><a href="#top">Back to top ↑</a></footer>`;
  const b = $(".menu-btn"), n = $("nav");
  b.onclick = () => b.setAttribute("aria-expanded", n.classList.toggle("open"));
  n.onclick = () => n.classList.remove("open");
}

/* ---------- reusable pieces ---------- */
const projectCard = p => `<a class="card" href="project.html?id=${esc(p.id)}">
  <div class="thumb">${img(p.cover || p.images[0], p.title, "Add cover image")}</div>
  <div class="body"><span class="meta tag">${esc(p.kind)} · ${esc(p.year)}</span><h3>${esc(p.title)}</h3>
  <p>${esc(p.summary)}</p><span class="meta">${esc(p.roles.join(" / "))} · ${esc(p.engine)}</span></div></a>`;

function docRow(d) {
  const g = gdoc(d), ok = d.status === "Complete";
  return `<div><div class="doc">
    <div><span class="tag meta">${esc(d.type)}</span> <span class="status ${ok ? "ok" : ""}">${esc(d.status)}</span>
    <h3 style="font-size:1.05rem;margin:.2rem 0">${esc(d.title)}</h3><span class="meta">${esc(d.desc)}</span></div>
    <div>${g ? `${g.embed ? `<button class="btn" data-embed="${esc(g.embed)}">Read here</button><a class="btn" href="${g.pdf}">Download PDF</a>` : ""}
    <a class="btn" href="${g.view}" target="_blank" rel="noreferrer">${g.embed ? "Open" : "Open PDF"}</a>` : `<span class="meta">Coming soon</span>`}</div></div></div>`;
}
function wireEmbeds(root = document) {
  root.querySelectorAll("[data-embed]").forEach(b => b.onclick = () => {
    const slot = b.closest(".doc").parentElement, open = slot.querySelector(".embed");
    if (open) { open.remove(); b.textContent = "Read here"; return; }
    slot.insertAdjacentHTML("beforeend", `<iframe class="embed" src="${b.dataset.embed}" title="Document viewer"></iframe>`);
    b.textContent = "Close";
  });
}

/* ---------- HOME ---------- */
const head = (t, note = "") => `<div class="sec-head"><h2>${t}</h2><span class="meta">${esc(note)}</span></div>`;
function home() {
  const links = P.links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noreferrer">${esc(l.label)} ↗</a>`).join("");
  $("#app").innerHTML = `
  <section class="hero wrap" id="top"><div class="hero-copy">
    <p class="label"><i class="dot"></i>${esc(P.subtitle)}</p>
    <h1>${esc(P.heroLine)} <em>${esc(P.heroAccent)}</em></h1>
    <p class="intro">${esc(P.intro)}</p>
    <div class="actions"><a class="btn primary" href="#projects">Explore selected work ↘</a><a class="btn ghost" href="#contact">Get in touch ↗</a></div>
    <div class="hero-meta"><div><span class="label">Focus</span>${esc(P.focus)}</div><div><span class="label">Tools</span>${esc(P.tools)}</div></div>
  </div><figure class="hero-art">${P.heroImage ? `<img src="${esc(P.heroImage)}" alt="Featured level">` : BLUEPRINT}</figure></section>

  <section id="projects" class="wrap">${head("Built with <em>purpose.</em>", "Selected work")}
    <div class="grid">${PROJECTS.map(projectCard).join("")}</div></section>

  <section id="documents" class="wrap">${head("Design <em>documents.</em>", "GDD / LDD. Read here or download.")}${DOCUMENTS.map(docRow).join("")}</section>

  <section id="about" class="wrap">${head("The <em>designer.</em>", "About")}<div class="about">
    <div class="bio">${P.bio.map((t, i) => `<p class="${i ? "" : "lead"}">${esc(t)}</p>`).join("")}
      ${P.education.map(e => `<div class="edu"><span class="label">Education</span><strong>${esc(e.degree)}</strong><br><span class="meta">${esc(e.school)} ${esc(e.year)}</span></div>`).join("")}</div>
    <div>${P.skills.map(s => `<div class="skill-row"><span class="label">${esc(s.group)}</span><div>${s.items.map(([n, l]) => `<span class="chip">${esc(n)}${l ? ` <small>${esc(l)}</small>` : ""}</span>`).join("")}</div></div>`).join("")}</div></div></section>

  <section id="process" class="wrap">${head("How I <em>work.</em>", "Process")}
    <div class="steps">${P.process.map(([t, d], i) => `<div class="step"><span class="num">0${i + 1}</span><h3>${esc(t)}</h3><p>${esc(d)}</p></div>`).join("")}</div></section>

  <section id="experience" class="wrap">${head("Experience", "Newest first")}
    ${EXPERIENCE.map(j => `<div class="job"><div><h3>${esc(j.role)}</h3><span class="meta">${esc(j.company)} · ${esc(j.dates)}</span></div><ul>${j.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</section>

  <section id="contact" class="wrap contact">${head("Have a world to <em>build?</em>", "Contact")}
    <div class="contact-grid"><div><p class="intro">Open to game design and level design roles. Send a message or write to me directly.</p>
    <a class="big-mail" href="mailto:${esc(P.email)}">${esc(P.email)} ↗</a><p class="links">${links}</p>
    <a class="btn ghost" href="${esc(P.resume)}">Download résumé ↓</a></div>
    <form id="cf" ${P.formAction ? `action="${esc(P.formAction)}" method="POST"` : ""}>
      <input name="name" placeholder="Your name" aria-label="Your name" required><input name="email" type="email" placeholder="Your email" aria-label="Your email" required>
      <textarea name="message" rows="5" placeholder="Your message" aria-label="Your message" required></textarea><button class="btn primary" type="submit">Send message ↗</button></form></div></section>`;

  wireEmbeds();
  if (!P.formAction) $("#cf").onsubmit = e => {
    e.preventDefault(); const f = new FormData(e.target);
    location.href = `mailto:${P.email}?subject=${encodeURIComponent("Portfolio message from " + f.get("name"))}&body=${encodeURIComponent(f.get("message") + "\n\n" + f.get("email"))}`;
  };
}

/* ---------- PROJECT PAGE (project.html?id=...) ---------- */
function project() {
  const p = PROJECTS.find(x => x.id === new URLSearchParams(location.search).get("id"));
  if (!p) { $("#app").innerHTML = `<section><div class="wrap empty">Project not found. <a class="tag" href="index.html#projects">Back to projects</a></div></section>`; return; }
  document.title = `${p.title} — ${P.name}`;
  const shot = (s, i) => `<div class="thumb">${img(s, `${p.title} screenshot ${i + 1}`)}</div>`;
  const imgs = p.images.length ? p.images : [""];
  const parts = {
    head: `<div class="p-hero wrap"><span class="tag meta">${esc(p.kind)} · ${esc(p.year)}</span><h1>${esc(p.title)}</h1>
      <p class="meta" >${esc(p.summary)}</p>
      <div class="facts"><div><small>ROLE</small>${esc(p.roles.join(", "))}</div><div><small>ENGINE</small>${esc(p.engine)}</div>
      <div><small>TEAM</small>${esc(p.team)}</div><div><small>DURATION</small>${esc(p.duration)}</div></div>
      ${p.links.filter(l => l.url).map(l => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noreferrer">${esc(l.label)}</a>`).join("")}</div>`,
    video: p.video ? `<iframe class="video" src="${esc(p.video)}" title="${esc(p.title)} video" allowfullscreen></iframe>` : "",
    text: `<div class="prose">${(p.mechanics || []).length ? `<h3>Core mechanics</h3><ul>${p.mechanics.map(m => `<li>${esc(m)}</li>`).join("")}</ul>` : ""}${[["The problem", p.problem], ["What I built", p.solution], ["What I learned", p.learned]].filter(x => x[1]).map(([t, v]) => `<h3>${t}</h3><p>${esc(v)}</p>`).join("")}</div>`,
    gallery: `<div class="shots g2">${imgs.map(shot).join("")}</div>`,
    story: imgs.map((s, i) => `<div class="story-block">${shot(s, i)}<div class="prose" style="margin:0"><h3>${["The problem", "The solution", "What I learned"][i % 3]}</h3><p>${esc([p.problem, p.solution, p.learned][i % 3])}</p></div></div>`).join(""),
    docs: `<div class="sec-title" style="margin-top:3rem"><h2>Documentation</h2></div>${(p.docs || []).map(id => DOCUMENTS.find(d => d.id === id)).filter(Boolean).map(docRow).join("") || `<div class="empty">Add document ids to this project's "docs" list.</div>`}`
  };
  const order = { gallery: ["video", "gallery", "text", "docs"], story: ["video", "story", "docs"], docs: ["text", "docs", "gallery", "video"] }[p.layout] || ["gallery", "text"];
  $("#app").innerHTML = parts.head + `<div class="wrap" style="padding-bottom:4rem">${order.map(k => parts[k]).join("")}
    <p style="text-align:center"><a class="btn" href="index.html#projects">Back to projects</a></p></div>`;
  wireEmbeds();
}

/* ---------- GAMES PAGE ---------- */
function games() {
  const label = { browser: "Play in browser", download: "Download", video: "Watch video" };
  $("#app").innerHTML = `<section><div class="wrap"><div class="sec-title">${ORN}<h1 style="font-size:2.2rem">Games</h1></div>` +
    (GAMES.length ? `<div class="grid">${GAMES.map(g => `<a class="card" href="${esc(g.url)}" target="_blank" rel="noreferrer">
      <div class="thumb">${img(g.cover, g.title)}</div><div class="body"><span class="tag meta">${esc(g.year)}</span><h3>${esc(g.title)}</h3>
      <p>${esc(g.blurb)}</p><span class="meta">${label[g.play] || "Open"}</span></div></a>`).join("")}</div>`
      : `<div class="empty">Games are on the way. Meanwhile, play my builds on <a class="tag" href="https://droanzer.itch.io/" target="_blank" rel="noreferrer">itch.io</a>.</div>`) +
    `</div></section>`;
}

shell();
({ home, project, games })[document.body.dataset.page]();
