# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

The documentation/marketing site for [Tableau](https://github.com/tableauio/tableau) (a configuration converter that turns Excel/CSV/XML/YAML into JSON/Text/Bin), published at https://tableauio.github.io. It is a [Hugo](https://gohugo.io/) site built on the [Doks](https://getdoks.org) theme using Doks' "child-theme" pattern: the upstream theme is consumed via `node_modules/@hyas/doks` and is mounted into Hugo through `[module.mounts]` in `config/_default/config.toml`. Files under `layouts/`, `assets/`, `static/`, `data/`, etc. in this repo override (or extend) the same paths from the upstream theme — see the mount list at the bottom of that config to understand precedence.

Hugo itself is downloaded by `npm install` (via `hugo-installer`) into `node_modules/.bin/hugo/hugo`; the `otherDependencies.hugo` field in `package.json` pins the version. There is no global Hugo dependency — always invoke through npm scripts.

## Common commands

```bash
npm install              # also installs Hugo into node_modules/.bin/hugo
npm run start            # dev server on 0.0.0.0:1313 with --disableFastRender
npm run build            # production build (--gc --minify) into ./public
npm run build:preview    # build with drafts and future content (-D -F)
npm run clean            # rm -rf public resources

npm run lint             # all linters (scripts + styles + markdown)
npm run lint:scripts     # eslint over assets/js, config, functions
npm run lint:styles      # stylelint over assets/scss/**
npm run lint:markdown    # markdownlint-cli2 over *.md and content/**/*.md
npm run lint:markdown-fix
```

`npm run lint:markdown` is the gating check on CI — see `.github/workflows/deploy-github.yml`. Run it before committing markdown changes; the rule config lives in `.markdownlint-cli2.jsonc` (notably MD013/MD024/MD026/MD033/MD034 are disabled).

There is no test framework — `npm test` is aliased to `npm run -s lint`.

## Architecture / things worth knowing before editing

### Multilingual content layout

Two languages are configured in `config/_default/languages.toml`: `en` (default, `content/en/`) and `zh` (`content/zh/`). Every doc page that should exist in both languages must have a counterpart at the same relative path under each `content/<lang>/` tree. Menus are split per-language in `config/_default/menus/menus.<lang>.toml`.

### Config layering

Hugo merges `config/_default/` with `config/<environment>/`. `production/` is used by `npm run build`; `next/` is used by Netlify's `context.next` (sets `HUGO_ENV=next`). When changing site-wide settings, the default goes in `_default/` and only deltas go in the env-specific dirs.

### Site params and version pins

`config/_default/params.toml` holds SEO metadata, feature toggles (`[options]` block — `kaTex`, `flexSearch`, `darkMode`, `spreadsheetJS`, …), and two version values that show up on the rendered site:

- `tableaucVersion` — surfaced via the `{{< tableauc-version >}}` shortcode and used in download links. Bump this when a new `tableauc` release should be the default download.
- `docsVersion` (commented out) and the version groups in `data/docs-versions.yml` drive the docs version selector when `docsVersioning` is enabled.

### Custom shortcodes (in `layouts/shortcodes/`)

These are project-specific extensions on top of Doks; review them before changing markdown that uses them:

- `sheet.html` + `spreadsheet.html` — render Excel-like tabbed tables. `spreadsheet` splits its `.Inner` on the literal HTML marker `<p hidden>--break-me-here--</p>` (emitted by `sheet`) to separate sheets, then renders each as a Bootstrap tab. The corresponding download/render JS is `assets/js/spreadsheet.js`, gated by `params.options.spreadsheetJS`.
- `tableauc-version.html` — emits `site.Params.tableaucVersion`.
- `alert`, `details`, `email`, `mermaid`, `video` — thin wrappers; check before assuming Hugo defaults.

### Asset pipeline

SCSS lives in `assets/scss/` (entry `app.scss`); JS in `assets/js/` (entry `index.js`, with feature modules like `darkmode.js`, `spreadsheet.js`, `mermaid.js`, `katex.js` loaded conditionally based on `[options]` in params.toml). Vendor libs (`flexsearch`, `katex`, `mermaid`) are mounted from `node_modules` into `assets/js/vendor/` by Hugo module mounts — do not vendor them manually.

### Output formats

`config.toml` defines custom output formats `REDIRECTS` and `HEADERS` that produce Netlify's `_redirects` and `_headers` from `layouts/index.redirects` and `layouts/index.headers`, plus a `SITEMAP` format for per-section `sitemap.xml`. The home page emits all four in addition to HTML/RSS.

### Deployment

**GitHub Pages** (see `.github/workflows/deploy-github.yml`) — on push to `master`, runs `npm install`, `npm run lint:markdown`, `npm run build`, then publishes `./public` via `peaceiris/actions-gh-pages@v3`. CI pins Node 24.

Treat upstream Doks files (delivered via `node_modules/@hyas/doks`) as read-only; override by creating same-path files in this repo's `layouts/`, `assets/`, etc.

## Adding a release page

The Release section (`/release/`) lists release entries from `content/<lang>/release/` as Bootstrap cards. Each entry is a `.md` page; the iframe field in front-matter determines whether it renders the markdown body or embeds a standalone HTML report.

### Two flavors

**Markdown release** — author release notes as plain Hugo markdown:

1. Create `content/en/release/<slug>.md` and `content/zh/release/<slug>.md` with parallel content.
2. Use the same front-matter shape as `docs/` (`title`, `description`, `lead`, `date`, `lastmod`, `weight`, `toc`, …).
3. The page renders in the blog-style centered article layout with an optional right-side TOC.

**HTML release** — embed a pre-built standalone HTML report:

1. Place the artifact at `static/release/<slug>.html`. It is served as-is at `/release/<slug>.html` (no theme wrapping). For multi-repo disambiguation (e.g., the `loader` repo and the `tableau` repo can both reach v0.6.0), prefix the slug with the repo name: `loader-v0-6-0.html`, `tableau-v0-16-0.html`.
2. Inside the artifact, wrap the brand link with `target="_top"` so navigation escapes the iframe.
3. Create stub markdown files `content/en/release/<slug>.md` and `content/zh/release/<slug>.md` with the docs front-matter plus an extra field:

   ```yaml
   ---
   title: "Loader v0.6.0"
   description: "Loader v0.6.0 release report."
   lead: "One-line summary of the headline features."
   date: 2026-06-11T04:17:48+00:00
   lastmod: 2026-06-11T04:17:48+00:00
   draft: false
   images: []
   weight: 1610
   toc: false
   iframe: "/release/loader-v0-6-0.html"
   ---
   ```

   The body is empty; the iframe renders inside a full-width frame with breadcrumb + open-in-tab + fullscreen-toggle action bar. Reading time on the card is computed by reading the artifact's prose at build time (see `layouts/partials/main/release-meta.html`).

### Generating the HTML report

The `tableau-release-html` skill (in `.claude/skills/tableau-release-html/`) generates the styled standalone HTML for a Tableau-family release from a GitHub release tag. Pipeline:

1. Invoke the skill with the repo + version: `gh release view <tag> --repo <repo>` is used internally to fetch the release body.
2. The skill produces a self-contained HTML file (Inter + JetBrains Mono fonts via Google Fonts CDN, Tailwind via CDN, all CSS inline) following the design system in `.claude/skills/tableau-release-html/references/design-system.md`.
3. Move the output to `static/release/<slug>.html`.
4. Author the en + zh markdown stubs as above.

### Sort order

The card list uses `weight` ascending — lower weight sorts to the top. Convention: newer releases use lower weights (e.g., v0.16.0 = 1600, v0.15.0 = 1700). For multi-repo entries, choose weights that preserve the desired chronological order across repos.
