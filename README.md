# tableauio.github.io

The documentation and marketing site for [Tableau](https://github.com/tableauio/tableau) — a configuration converter that turns Excel / CSV / XML / YAML into JSON / Text / Bin.

## Requirements

- **Node.js** ≥ 24 ([download](https://nodejs.org/en/download/))
  - macOS: `brew install node`
- Hugo is installed automatically by `npm install` (pinned via `otherDependencies.hugo` in `package.json`). No global Hugo needed.

## Quick start

```bash
npm install              # also installs Hugo into node_modules/.bin/hugo
npm run start            # dev server on http://localhost:1313 with live reload
npm run build            # production build into ./public
npm run lint             # all linters (scripts + styles + markdown)
```

CI runs `npm run lint:markdown` and `npm run build` on every push to `master`. Run `npm run lint` locally before opening a PR.

## Adding content

Content lives under `content/<lang>/<section>/`, with parallel `en/` and `zh/` trees:

| Section | Path | Notes |
|---|---|---|
| Docs | `content/<lang>/docs/` | Sidebar-driven, Doks-style docs. |
| Blog | `content/<lang>/blog/` | Card list at `/blog/`. |
| Release | `content/<lang>/release/` | Card list at `/release/`. Add `iframe: "/release/<file>.html"` in front-matter to embed a standalone HTML report from `static/release/`. |

Front-matter follows the Doks convention (`title`, `description`, `lead`, `date`, `weight`, `toc`, …). For releases, `weight` controls sidebar order — newer releases use higher numeric weights so they sort above older ones.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy-github.yml`, which lints, builds, and publishes `./public` to GitHub Pages via [`peaceiris/actions-gh-pages`](https://github.com/peaceiris/actions-gh-pages). CI pins Node 24.

## Project layout

```
config/_default/         # site config, menus, params, languages
content/{en,zh}/         # multilingual content
layouts/                 # template overrides on top of @hyas/doks
assets/scss/             # styles (entry: app.scss)
assets/js/               # scripts (entry: index.js)
static/                  # files served as-is at the URL root
.github/workflows/       # CI: lint + build + GitHub Pages deploy
```
