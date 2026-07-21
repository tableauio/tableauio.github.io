# AGENTS.md

Guidance for AI coding agents working in this repository.

## What this repo is

The docs/marketing site for [Tableau](https://github.com/tableauio/tableau) (a config converter: Excel/CSV/XML/YAML → JSON/Text/Bin), published at https://tableauio.github.io. It's a [Hugo](https://gohugo.io/) site on the [Doks](https://getdoks.org) theme via Doks' "child-theme" pattern: the upstream theme ships in `node_modules/@hyas/doks` and is mounted by `[module.mounts]` in `config/_default/config.toml`. Same-path files in this repo's `layouts/`, `assets/`, `static/`, `data/` override the upstream theme — see the mount list at the bottom of that config for precedence.

Hugo has no global install: it's pulled in by `npm install` and pinned via `otherDependencies.hugo` in `package.json`. Always invoke it through npm scripts.

## Common commands

```bash
npm install              # also installs Hugo
npm run start            # dev server on 0.0.0.0:1313 (--disableFastRender)
npm run build            # production build (--gc --minify) into ./public
npm run build:preview    # build with drafts + future (-D -F)
npm run clean            # rm -rf public resources
npm run lint             # scripts + styles + markdown
npm run lint:markdown    # CI gate — run before committing markdown
```

`npm run lint:markdown` is the CI gate (`.github/workflows/deploy-github.yml`). Rule config: `.markdownlint-cli2.jsonc` (MD013/MD024/MD026/MD033/MD034 disabled). No test framework — `npm test` aliases `npm run -s lint`.

## Editing content

### Keep en and zh aligned

Two languages: `en` (default, `content/en/`) and `zh` (`content/zh/`), configured in `config/_default/languages.toml`; per-language menus in `config/_default/menus/menus.<lang>.toml`. Every page has a counterpart at the same path in both trees — never edit one language and leave the other stale; apply the parallel change in the same commit (e.g. `b76c11e43` touches both).

- **Translate prose; keep code verbatim.** Translate text and headings, but leave identifiers, option names (`range`, `unique`, `sequence`), type names (`map<uint32, Item>`), enum values, error codes, and filenames untranslated. The zh `title` commonly follows `中文（English）` (e.g. `字段属性（Field property）`).
- **Front-matter:** same keys in both files. `description` is a short SEO label; `lead` is a real one-sentence page summary — translate both, don't duplicate the title into `lead`.
- **Translated headings change anchors.** A heading's anchor follows its language — `#option-patch` (en) vs `#选项-patch` (zh) — so a `{{< relref ".../#anchor" >}}` must use the target language's anchor. To share one across both, pin it with an explicit ID: `#### 隐式固定大小 {#implicit-fixed-size}` yields `#implicit-fixed-size` in both trees. Verify cross-links resolve in both.
- Same `spreadsheet`/`sheet`/`details` shortcodes and sheet/column structure in both files; only prose differs.
- Lint both before committing. `lastmod` is optional per edit; bump only on a material refresh.

### Config layering

Hugo merges `config/_default/` with `config/<env>/` (`production` for `npm run build`; `next` for Netlify's `context.next`, `HUGO_ENV=next`). Defaults go in `_default/`; only deltas in env dirs.

### Site params (`config/_default/params.toml`)

- `tableaucVersion` — emitted by `{{< tableauc-version >}}` and used in download links. Bump when a new `tableauc` release should be the default download.
- `docsVersion` + `data/docs-versions.yml` drive the docs version selector when `docsVersioning` is enabled (both currently commented out).

### Custom shortcodes (`layouts/shortcodes/`)

- `sheet.html` + `spreadsheet.html` — Excel-like tabbed tables. `spreadsheet` splits `.Inner` on the literal marker `<p hidden>--break-me-here--</p>` (emitted by `sheet`) into Bootstrap tabs. JS: `assets/js/spreadsheet.js`, gated by `params.options.spreadsheetJS`.
- `tableauc-version.html` — emits `site.Params.tableaucVersion`.
- `alert`, `details`, `email`, `mermaid`, `video` — thin wrappers over Hugo defaults.

### Asset pipeline

SCSS in `assets/scss/` (entry `app.scss`); JS in `assets/js/` (entry `index.js`, feature modules loaded conditionally from `[options]`). Vendor libs (`flexsearch`, `katex`, `mermaid`) are mounted from `node_modules` into `assets/js/vendor/` — don't vendor them manually.

## Release pages

The `/release/` section lists entries from `content/<lang>/release/` as Bootstrap cards. Each is a `.md` page; front-matter `iframe` decides whether the markdown body renders, or a standalone HTML report is embedded.

- **HTML (iframe) flavor** — place the artifact at `static/release/<slug>.html` (served as-is, no theme). For multi-repo disambiguation (both `loader` and `tableau` can reach v0.6.0), prefix the slug: `loader-v0-6-0.html`, `tableau-v0-16-0.html`. Give the artifact's brand link `target="_top"` so navigation escapes the iframe. Copy `content/en/release/loader-v0-6-0.md` (and its `content/zh/` counterpart) as a front-matter template — empty body, the `iframe` field points at the artifact. Card reading time is computed from the artifact's prose at build time (`layouts/partials/main/release-meta.html`).
- **Markdown flavor** — author release notes as plain Hugo markdown (same front-matter as `docs/`); renders in the blog article layout with an optional TOC.

### Generating the HTML report

The `tableau-release-html` skill (canonical source at `skills/tableau-release-html/`) builds the styled standalone HTML from a GitHub release tag — invoke it with repo + version; it fetches the body via `gh release view <tag> --repo <repo>`. Move the output to `static/release/<slug>.html`, then author the en + zh stubs. See [Skills management](#skills-management) for how skills are installed across agents.

### Sort order

Cards sort by `weight` ascending (lower = top). Newer releases use lower weights (e.g. v0.16.0 = 1600, v0.15.0 = 1700). For multi-repo entries, pick weights that preserve chronological order across repos.

## Skills management

Agent skills (Claude Code, Codex, CodeBuddy) are managed with [`npx skills`](https://skills.sh). Two tracked sources of truth, both committed:

- `skills-lock.json` — pins GitHub-sourced skills (`frontend-design` from `anthropics/skills`, `playwright-cli` from `microsoft/playwright-cli`).
- `skills/` — canonical source for the local `tableau-release-html` skill.

The generated dirs (`.agents/skills/`, `.codebuddy/skills/`, and the symlinks under `.claude/skills/`) are **gitignored** — they're regenerated from the sources above. Never hand-edit them; edit the canonical source and reinstall.

### After cloning this repo

```bash
npx skills experimental_install    # restore frontend-design + playwright-cli from the lock
npx skills add ./skills -a claude-code -a codex -a codebuddy -s tableau-release-html -y
```

The local-skill step is separate because `npx skills` records an **absolute, machine-specific path** for `sourceType: "local"` entries in `skills-lock.json`, so `experimental_install` does not reliably restore the local skill on another machine. Re-running the `add ./skills` command installs it correctly regardless of clone path.

### Adding / updating skills

- **New GitHub skill:** `npx skills add <owner/repo>@<skill> -a claude-code -a codex -a codebuddy -s <skill> -y`
- **Edit the local skill:** edit files under `skills/tableau-release-html/`, then re-run the `npx skills add ./skills ...` command to propagate into all three agent dirs.
- **List installed skills:** `npx skills list`.
- **Remove:** `npx skills remove -s <skill> -a <agent> -y`.

Agent IDs must be passed as repeated `-a` flags (a comma-separated string is rejected). Note the ID is `claude-code`, not `claude`. Codex reads the universal `.agents/skills/` dir; Claude Code and CodeBuddy get symlinks into it.

## Deployment

**GitHub Pages** (`.github/workflows/deploy-github.yml`): on push to `master`, runs `npm install` → `npm run lint:markdown` → `npm run build` → publishes `./public` via `peaceiris/actions-gh-pages@v3`. CI pins Node 24. `config.toml` also defines custom output formats (`REDIRECTS`/`HEADERS` for Netlify, `SITEMAP` per section) emitted by the home page alongside HTML/RSS.

Treat upstream Doks files (`node_modules/@hyas/doks`) as read-only; override via same-path files in this repo.
