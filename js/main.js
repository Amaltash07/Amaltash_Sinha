/* One script drives every page. Page type comes from <body data-page="...">.
   Layout never needs editing to add content — edit files in /data instead. */
const P = window.PROFILE, $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ph = t => `<div class="ph">${esc(t)}</div>`;
const img = (src, alt, fallback = "Add image") => src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy">` : ph(fallback);
const gdoc = d => d.docId ? { view: `https://docs.google.com/document/d/${d.docId}/edit`, embed: `https://docs.google.com/document/d/${d.docId}/preview`, pdf: `https://docs.google.com/document/d/${d.docId}/export?format=pdf` } : null;
const ORN = '<div class="orn">◆</div>';

/* ---------- shared header / footer ---------- */
function shell() {
  const home = document.body.dataset.page === "home" ? "" : "index.html";
  $("#header").outerHTML = `<header class="site-header"><div class="wrap">
    <a class="brand" href="index.html">${esc(P.name.toUpperCase())}</a>
    <button class="menu-btn" aria-expanded="false">MENU</button>
    <nav aria-label="Main">
      <a href="${home}#projects">Projects</a><a href="games.html">Games</a><a href="${home}#documents">GDD / LDD</a>
      <a href="${home}#about">About</a><a href="${home}#experience">Experience</a><a href="${home}#contact">Contact</a>
    </nav></div></header>`;
  $("#footer").outerHTML = `<footer class="footer">${ORN}© ${new Date().getFullYear()} ${esc(P.name)} · ${esc(P.title)}</footer>`;
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
    <div>${g ? `<button class="btn" data-embed="${esc(g.embed)}">Read here</button><a class="btn" href="${g.pdf}">Download PDF</a>
    <a class="btn" href="${g.view}" target="_blank" rel="noreferrer">Open</a>` : `<span class="meta">Coming soon</span>`}</div></div></div>`;
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
function home() {
  const links = P.links.map(l => `<a href="${esc(l.url)}" target="_blank" rel="noreferrer">${esc(l.label)}</a>`).join("");
  $("#app").innerHTML = `
  <section class="hero"><div class="wrap">
    ${ORN}<h1>${esc(P.name)}</h1><div class="role">${esc(P.subtitle)}</div>
    <p class="tagline">${esc(P.tagline)}</p>
    <a class="btn" href="#projects">View projects</a><a class="btn" href="${esc(P.resume)}">Download résumé</a></div></section>

  <section id="projects"><div class="wrap"><div class="sec-title">${ORN}<h2>Selected Work</h2></div>
    <div class="grid">${PROJECTS.map(projectCard).join("")}</div>
    <p style="text-align:center;margin-top:2rem"><a class="btn" href="games.html">Browse all games</a></p></div></section>

  <section id="documents"><div class="wrap"><div class="sec-title">${ORN}<h2>Design Documents</h2>
    <p class="meta">Game Design and Level Design documents. Read them here or download a PDF.</p></div>
    ${DOCUMENTS.map(docRow).join("")}</div></section>

  <section id="about"><div class="wrap"><div class="sec-title">${ORN}<h2>About</h2></div><div class="about">
    <div>${P.bio.map(t => `<p>${esc(t)}</p>`).join("")}
      ${P.education.map(e => `<div class="edu"><strong>${esc(e.degree)}</strong><br><span class="meta">${esc(e.school)} ${esc(e.year)}</span></div>`).join("")}</div>
    <div class="skills">${P.skills.map(s => `<h4>${esc(s.group.toUpperCase())}</h4>${s.items.map(([n, l]) => `<span class="chip">${esc(n)}${l ? `<small>${esc(l)}</small>` : ""}</span>`).join("")}`).join("")}</div>
  </div></div></section>

  <section id="experience"><div class="wrap" style="max-width:760px"><div class="sec-title">${ORN}<h2>Experience</h2></div>
    ${EXPERIENCE.map(j => `<div class="job"><h3 style="font-size:1.1rem">${esc(j.role)}</h3>
      <span class="meta">${esc(j.company)} · ${esc(j.dates)}</span><ul>${j.points.map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>`).join("")}</div></section>

  <section id="contact"><div class="wrap contact"><div class="sec-title">${ORN}<h2>Get in touch</h2></div>
    <p>Open to game design and level design roles. Send a message or reach me directly.</p>
    <form id="cf" ${P.formAction ? `action="${esc(P.formAction)}" method="POST"` : ""}>
      <input name="name" placeholder="Your name" required><input name="email" type="email" placeholder="Your email" required>
      <textarea name="message" rows="5" placeholder="Your message" required></textarea><button class="btn" type="submit">Send message</button></form>
    <p><a href="mailto:${esc(P.email)}" class="tag">${esc(P.email)}</a></p><p class="links">${links}</p></div></section>`;

  wireEmbeds();
  if (!P.formAction) $("#cf").onsubmit = e => {          // fallback: open the visitor's email app
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
      <p class="meta" style="max-width:60ch;margin:1rem auto">${esc(p.summary)}</p>
      <div class="facts"><div><small>ROLE</small>${esc(p.roles.join(", "))}</div><div><small>ENGINE</small>${esc(p.engine)}</div>
      <div><small>TEAM</small>${esc(p.team)}</div><div><small>DURATION</small>${esc(p.duration)}</div></div>
      ${p.links.filter(l => l.url).map(l => `<a class="btn" href="${esc(l.url)}" target="_blank" rel="noreferrer">${esc(l.label)}</a>`).join("")}</div>`,
    video: p.video ? `<iframe class="video" src="${esc(p.video)}" title="${esc(p.title)} video" allowfullscreen></iframe>` : "",
    text: `<div class="prose"><h3>The problem</h3><p>${esc(p.problem)}</p><h3>The solution</h3><p>${esc(p.solution)}</p><h3>What I learned</h3><p>${esc(p.learned)}</p></div>`,
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
