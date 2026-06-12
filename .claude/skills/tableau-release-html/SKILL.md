---
name: tableau-release-html
description: >
  Generate a complete, beautiful styled HTML release notes page for a Tableau Go library
  release (github.com/tableauio/tableau). Produces a self-contained light-theme HTML file
  with sticky nav, animated hero, semantic color sections (Features / Bug Fixes / Breaking /
  Deprecated / Dependencies / Examples), GitHub-light code blocks, Excel spreadsheet demo
  tables, and scroll-reveal animations. Use this skill whenever the user asks to generate,
  create, or update a Tableau release page, release notes HTML, or release poster —
  even if they just say "make the release page for v0.17.0" or "new release, same style".
---

# Tableau Release HTML Generator

Produce a polished, self-contained HTML release notes page for a Tableau Go library release.
Everything you need is inside this skill — read `references/design-system.md` (bundled here)
for the complete CSS block and all component HTML patterns before writing any code.

---

## Step 1 — Gather release content

If the user hasn't provided details, ask for (or infer from the GitHub releases page):

| Field | Example |
|-------|---------|
| Version | `v0.17.0` |
| Release date | `July 15, 2026` |
| Features | List of titles + short descriptions + key proto/YAML snippets |
| Bug fixes | List of short fix descriptions (9–15 typical) |
| Breaking changes | Items requiring migration, with before/after code |
| Deprecated items | Anything deprecated, with notes |
| Dependency updates | Package name + old version → new version |
| Spreadsheet examples | Excel-style demos for key features |

You can also read the GitHub release tag using `gh release view vX.Y.Z --repo tableauio/tableau`
or inspect commit history to fill in details automatically.

---

## Step 2 — Plan the sections

Standard section order (omit sections with no content):

```
01  New Features        green   (#16a34a)
02  Bug Fixes           blue    (#2563eb)
03  Breaking Changes    red     (#dc2626)
04  Deprecated          amber   (#d97706)
05  Dependency Updates  slate   (#6b7280)
06  Spreadsheet Examples violet (#7c3aed)
```

---

## Step 3 — Generate the HTML

Output a single self-contained HTML file named `release-vX.Y.Z-light.html`.

Read `references/design-system.md` now for the complete CSS block and component HTML patterns
before writing any code. This is critical — the classes, colors, and structures must match
exactly for the page to look correct.

### Page skeleton

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tableau vX.Y.Z — Release Notes</title>
  <!-- Google Fonts: Inter + JetBrains Mono -->
  <!-- Tailwind CDN -->
  <!-- Tailwind config (extend fontFamily + orange palette) -->
  <!-- Full <style> block — copy verbatim from design-system.md -->
</head>
<body>
  <!-- Nav -->
  <!-- Hero section -->
  <!-- 01 Features section (if any) -->
  <!-- 02 Bug Fixes section (if any) -->
  <!-- 03 Breaking Changes section (if any) -->
  <!-- 04 Deprecated section (if any) -->
  <!-- 05 Dependencies section (if any) -->
  <!-- 06 Examples section (if any) -->
  <!-- Footer -->
  <!-- Scroll-reveal script -->
</body>
</html>
```

### Key generation rules

**Nav** — always version-specific:
- Left: logo (22px) + "Tableau" bold + version badge (grey pill)
- Right: nav links matching the sections present + GitHub icon SVG link to the release tag

**Hero** — five animated elements:
1. `hero-anim-0`: brand row (logo 28px + "Tableau" + `|` + version badge + `|` + green released-pill with pulse dot)
2. `hero-anim-1`: "RELEASE NOTES" eyebrow (JetBrains Mono, 10.5px, 0.3em letter-spacing, `#9ca3af`)
3. `hero-anim-2`: giant version `<span style="color:#16a34a">v</span>X.Y.Z` using `.hero-version`
4. `hero-anim-3`: descriptive subtitle (list the top 3–4 headline features, muted `#6b7280`, max-width 580px)
5. `hero-anim-4`: stat chips row (`.stat-chip .chip-green/blue/amber/violet`) + `|` + tech tags

Background: CSS grid (`::before`) + ghosted watermark version text + `deco-sheet-wrap` (3D spreadsheet table, absolute positioned bottom-right).

**Section structure** — each major section. The `sec-num` and the `sec-title` MUST share the section's accent colour (the same colour as the section's tag style). This colour pairing is non-negotiable — never leave the title at the default dark.

```html
<section class="py-24 px-6 lg:px-14 xl:px-20 sec-feat|sec-fix|sec-break|sec-dep|sec-white-next-gray" id="features|fixes|breaking|deprecated|deps|examples">
  <div class="max-w-7xl mx-auto">
    <div class="flex items-center gap-3 mb-14 reveal">
      <span class="sec-num" style="color:#16a34a">01</span>
      <h2 class="sec-title" style="color:#16a34a;">New Features</h2>
    </div>
    <!-- section body -->
  </div>
</section>
```

**Section accent colour matrix** (identical to `tag-*` colours — see `references/design-system.md` for the full matrix):

| Section | `sec-num` + `sec-title` colour | Matching tag |
|---------|--------------------------------|--------------|
| New Features | `#16a34a` (green) | `tag-new`, `tag-option` |
| Bug Fixes | `#1d4ed8` (blue, deep) — pair with section background `sec-fix` | `tag-tooling` |
| Breaking Changes | `#dc2626` (red) | `tag-breaking` |
| Deprecated | `#d97706` (amber) | `tag-arch` |
| Dependencies | `#6b7280` (slate) — body title may use `#374151` for contrast | n/a |
| Examples | `#7c3aed` (violet) | `tag-enhanced` |

**Feature cards** — grid layout, `border-t-2` accent:
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div class="feat-card rounded-2xl p-8 border-t-2 reveal rd1" style="border-top-color:#16a34a;">
    <div class="flex gap-2 mb-4 flex-wrap">
      <span class="tag tag-new">NEW</span>
      <span class="tag tag-tooling">TOOLING</span>  <!-- as appropriate -->
    </div>
    <h3 class="text-lg font-bold mb-3" style="color:#111827;">Feature Title</h3>
    <p class="text-sm leading-relaxed mb-5" style="color:#6b7280;">Description…</p>
    <!-- optional: code block, demo badge, excel table -->
  </div>
</div>
```

**Bug fix rows** — inside a `.card-base rounded-2xl`:
```html
<div class="card-base rounded-2xl overflow-hidden reveal">
  <div class="fix-row flex items-start gap-4 px-7 py-5">
    <span class="text-green-500 mt-0.5 flex-shrink-0">✓</span>
    <div>
      <p class="font-semibold text-sm mb-1" style="color:#111827;">Fix title</p>
      <p class="text-sm" style="color:#6b7280;">Brief description.</p>
    </div>
    <span class="tag tag-tooling ml-auto flex-shrink-0">PARSER</span>
  </div>
  <!-- repeat fix-row divs -->
</div>
```

**Breaking change cards** — `.breaking-card` with red top border:
```html
<div class="breaking-card reveal rd1" style="border-top-color:#dc2626;">
  <div class="flex gap-2 mb-4"><span class="tag tag-breaking">BREAKING</span></div>
  <h3 class="text-lg font-bold mb-3" style="color:#111827;">Change title</h3>
  <p class="text-sm leading-relaxed mb-5" style="color:#6b7280;">Description…</p>
  <!-- migration guide: sbs-wrap before/after panels -->
</div>
```

**Before/after panels**:
```html
<div class="sbs-wrap mb-5">
  <div class="sbs-panel">
    <div class="sbs-hd sbs-hd-before">✗ Before (vOLD)</div>
    <div class="sbs-bd sbs-bd-before">...old code...</div>
  </div>
  <div class="sbs-panel">
    <div class="sbs-hd sbs-hd-after">✓ After (vNEW)</div>
    <div class="sbs-bd sbs-bd-after">...new code...</div>
  </div>
</div>
```

**Code blocks** — GitHub light style. **Always wrap the body in `<pre><code>` with literal newlines** (one source line per line). Do NOT use one inline `<span>` per line — Prettier and other formatters collapse whitespace inside `<div>` flow content but preserve it inside `<pre>`, so this is the only formatter-proof pattern. Long lines must scroll horizontally inside the block (CSS already sets `overflow-x: auto` on `.code-blk-bd > pre`); never let long lines wrap or push the surrounding card wider.

```html
<div class="code-blk">
  <div class="code-blk-hd">▸ filename.go</div>
  <div class="code-blk-bd"><pre><code><span class="c-com">// comment</span>
<span class="c-key">func</span> <span class="c-fld">Example</span>() <span class="c-typ">error</span> {
<span class="c-hl">  <span class="c-com">// highlighted new line</span></span>
}</code></pre></div>
</div>
```

The same rule applies to `.demo-out-bd` blocks: wrap content in `<pre><code>...</code></pre>`.

**Important.** The `<pre><code>` open and close tags MUST sit immediately adjacent to their content — no whitespace between `<code>` and the first character, no whitespace between the last character and `</code>`. The very first character after `<code>` becomes column 0; any leading newline or indent will show up as a blank line in the rendered output.
Syntax color classes: `c-key` (red `#cf222e`), `c-str` (dark blue `#0a3069`), `c-typ` (brown `#953800`), `c-ann` (purple `#8250df`), `c-num` (blue `#0550ae`), `c-val` (green `#116329`), `c-fld` (default `#24292f`), `c-com` (grey `#6e7781`).
Highlight classes: `c-hl` (green bg, good), `c-warn` (yellow bg, caution), `c-add` (green line), `c-del` (red line).

**Excel spreadsheet tables** — always use 3-header-row convention:
```html
<div class="xl-label">▸ SheetName.xlsx — SheetTab</div>
<div class="xl-scroll">
  <table class="xl">
    <thead><tr>
      <th class="rn"></th>
      <th>A</th><th>B</th><th>C</th><!-- column letters -->
    </tr></thead>
    <tbody>
      <tr class="xr-name"><td class="rn">1</td><td>FieldName</td>...</tr>  <!-- Row 1: field names -->
      <tr class="xr-type"><td class="rn">2</td><td>map&lt;uint32,Msg&gt;</td>...</tr>  <!-- Row 2: types -->
      <tr class="xr-note"><td class="rn">3</td><td>Note text</td>...</tr>  <!-- Row 3: notes -->
      <tr class="xr-data"><td class="rn">4</td><td class="key">1</td>...</tr>  <!-- data rows -->
      <tr class="xr-data2"><td class="rn">5</td>...</tr>  <!-- alternating -->
    </tbody>
  </table>
</div>
```

**Footer**:
```html
<footer class="py-16 px-6 lg:px-14 xl:px-20 sec-white" style="border-top:1px solid #e5e7eb;">
  <div class="max-w-5xl mx-auto flex items-center justify-between flex-wrap gap-6">
    <div class="font-bold text-xl" style="color:#D95A27">Tableau</div>
    <div class="font-mono text-xs text-stone-400">vX.Y.Z · Released DATE · github.com/tableauio/tableau</div>
    <div class="flex gap-6">
      <a href="https://github.com/tableauio/tableau/releases/tag/vX.Y.Z" class="font-mono text-xs text-stone-500">↗ GitHub Release</a>
      <a href="https://github.com/tableauio/tableau" class="font-mono text-xs text-stone-500">↗ Repository</a>
    </div>
  </div>
</footer>
```

**Scroll-reveal script** — include verbatim at bottom of `<body>`:
```html
<script>
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  document.querySelectorAll('.fix-row').forEach(row => {
    row.addEventListener('mouseenter', () => row.style.background = '#F5F4F1');
    row.addEventListener('mouseleave', () => row.style.background = '');
  });
</script>
```

---

## Step 4 — Output

Save the file as `release-vX.Y.Z-light.html` in the current working directory (or wherever
the user specifies — ask if unclear).

After writing, take a Playwright screenshot to verify the rendered look. Locate `node_modules/playwright`
in the project directory and adapt the paths accordingly:
```js
const {chromium} = require('playwright');  // or path to local node_modules
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({width:1440, height:900});
  await page.goto('file://<absolute-path-to-output-html>').catch(()=>{});
  await page.waitForTimeout(2800);
  await page.screenshot({path:'preview-vX.Y.Z.png', fullPage:false});
  await browser.close();
})();
```

Show the screenshot to the user and ask if any changes are needed.

---

## Design system quick reference

See `references/design-system.md` for:
- Complete `<style>` block to copy verbatim into every new page
- All CSS class names and their usage
- Semantic color tokens by section
- Tag / chip / badge color matrix
