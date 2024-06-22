# tableauio.github.io
This website is based on [Doks](https://getdoks.org). And we choose [child-theme](https://getdoks.org/docs/prologue/quick-start/#child-theme).

## Install Requirements

- Install **hugo**: https://gohugo.io/getting-started/installing/. If **go** has been installed, just run `go install github.com/gohugoio/hugo@latest`.
- Install **nodejs**: https://nodejs.org/en/download/.

## Quick Start

Change to this repo's working directory:

- Install dependencies: `npm install`
- Start development server: `npm run start`

## Lint Markdown

> Please lint the markdown format before commit.

- Run: `npm run lint:markdown`

## Upgrade Doks

1. Get new repo: `git clone https://github.com/h-enk/doks.git my-doks-site`
2. Install dependencies: `npm install`
3. Replace with our repo's files:
   - README.md
   - .github/
   - content/
   - config/_default/
   - i18/
   - layout/index.html
4. Run: `npm start`
5. Push to GitHub: `git push https://github.com/tableauio/tableauio.github.io master:master -f`
