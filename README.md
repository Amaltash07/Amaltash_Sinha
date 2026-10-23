# Amaltash Sinha — Portfolio (reference guide)

## Folder map
| Path | What it does | Edit often? |
|---|---|---|
| `index.html`, `project.html`, `games.html` | Empty page shells | No |
| `css/style.css` | Look and colors (top `:root` block = palette/fonts) | Rarely |
| `js/main.js` | Builds every page from the data files | Rarely |
| `data/profile.js` | Name, bio, skills, links, education, résumé path | Sometimes |
| `data/projects.js` | One block per project | Often |
| `data/documents.js` | One block per GDD / LDD (Google Docs) | Often |
| `data/experience.js` | Jobs, newest first | Sometimes |
| `assets/images/`, `assets/` | Screenshots, covers, résumé PDF | Often |

## Put it online (free)
1. Rename the repo to `amaltash-sinha` (Settings → General → Repository name). GitHub usernames and repo names can't contain spaces; underscores work in repo names but hyphens are standard.
2. Upload everything in this folder to the repo root (so `index.html` sits at the top, with `css/`, `js/`, `data/`, `assets/` beside it). Delete the old `style.css` and `script.js`.
3. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)` → Save.
4. Site address: `https://amaltash07.github.io/amaltash-sinha/`
   (GitHub gives `username.github.io/repo-name`. A cleaner `amaltash-sinha.github.io` needs a new account named that, or a custom domain.)

## Add a project
1. Copy images into `assets/images/` (use short lowercase names, no spaces).
2. In `data/projects.js`, copy a whole `{ ... }` block, give it a new unique `id`, fill the fields, add a comma between blocks.
3. Pick `layout`: `"gallery"` (screenshots first), `"story"` (alternating image + text), `"docs"` (documentation first).
4. Link documents by listing ids from `documents.js`: `docs: ["ruins-ldd"]`.
5. Video: use the YouTube *embed* form `https://www.youtube.com/embed/VIDEO_ID`.

## Add a GDD / LDD
1. Google Doc → Share → General access → **Anyone with the link: Viewer**.
2. Copy the code between `/d/` and `/edit` in its URL into `docId`.
3. The site then shows **Read here** (embedded), **Download PDF**, and **Open**.

## Résumé and contact form
- Save your résumé as `assets/Amaltash_Sinha_Resume.pdf`.
- The form opens the visitor's email app by default. For real form delivery, make a free account at formspree.io, create a form, and paste its URL into `formAction` in `profile.js`.

## Custom domain later
Buy a domain, then Settings → Pages → Custom domain. Add DNS records GitHub lists (A records for the apex, or a CNAME to `amaltash07.github.io`). Tick "Enforce HTTPS".

## Common problems
- **Unstyled page:** `css/style.css` is missing or in the wrong folder.
- **Blank page:** a typo (missing comma or quote) in a `data/*.js` file. Press F12 → Console to see which line.
- **Image missing:** file name case must match exactly (`Ruins.JPG` ≠ `ruins.jpg`).
- **Changes not showing:** wait 1–2 minutes after pushing, then hard refresh (Ctrl+Shift+R).
- **Preview locally:** double-click `index.html`; it works without a server.

## Games page groups
Each project has `group`: `"steam"` (released on Steam), `"major"` (major projects), or `"system"` (systems you built). The Games page sorts by this. Add a Steam link in a project's `links`.
