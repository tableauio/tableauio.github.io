# Tableau Release HTML — Design System Reference

Copy the `<style>` block below verbatim into every new release page.
Then use the component colour matrix to apply the right classes.

---

## Complete `<style>` block

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@300;400;500&display=swap" rel="stylesheet" />
<script src="https://cdn.tailwindcss.com"></script>
<script>
  tailwind.config = {
    theme: { extend: {
      fontFamily: {
        sans: ['Inter','system-ui','sans-serif'],
        mono: ['"JetBrains Mono"','monospace'],
      },
      colors: {
        orange:{50:'#FEF0E8',100:'#FDD9C4',200:'#FBBA96',400:'#F07040',500:'#D95A27',600:'#C24D18',700:'#A03D10'},
      },
    }}
  }
</script>
<style>
  :root{
    --bg:#ffffff; --bg-alt:#f9fafb;
    --card:#ffffff; --border:#e5e7eb; --border-l:#f3f4f6;
    --text:#111827; --muted:#6b7280; --subtle:#9ca3af;
    --accent:#f97316; --accent-bg:#fff7ed; --accent-border:rgba(249,115,22,0.22);
  }
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  html{scroll-behavior:smooth;}
  body{background:var(--bg);font-family:'Inter',system-ui,sans-serif;color:var(--text);-webkit-font-smoothing:antialiased;padding-top:0;}

  /* Typography */
  .hero-version{font-weight:900;font-size:clamp(60px,10vw,130px);line-height:.92;letter-spacing:-4px;color:#111827;} .hero-anim-0{animation:fadeInUp .7s ease .02s both;}
  .sec-title{font-weight:800;font-size:clamp(28px,4.5vw,50px);line-height:1.06;color:var(--text);}
  .sec-num{font-family:'JetBrains Mono',monospace;font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;}

  /* Nav */
  .hero-section{background:#ffffff;}
  .nav-link{font-size:13.5px;font-weight:500;color:#6b7280;text-decoration:none;transition:color .15s;}
  .nav-link:hover{color:#111827;}

  /* Cards */
  .card-base{background:var(--card);border:1px solid #e5e7eb;box-shadow:0 1px 3px rgba(0,0,0,0.05),0 4px 16px rgba(0,0,0,0.07);}
  .feat-card{background:var(--card);border:1px solid var(--border);box-shadow:0 1px 3px rgba(0,0,0,.04),0 4px 16px rgba(0,0,0,.05);transition:transform .22s,box-shadow .22s;}
  .feat-card:hover{transform:translateY(-3px);box-shadow:0 4px 8px rgba(0,0,0,.06),0 16px 40px rgba(0,0,0,.09);}

  /* Animations */
  @keyframes fadeInUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
  @keyframes bounceY{0%,100%{transform:translateY(0) translateX(-50%)}50%{transform:translateY(7px) translateX(-50%)}}
  @keyframes pulseDot{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.35;transform:scale(.72)}}
  .pulse-dot{animation:pulseDot 2.2s ease infinite;}
  .scroll-cue{animation:bounceY 2.2s ease infinite;}
  .hero-anim-1{animation:fadeInUp .7s ease .10s both;}
  .hero-anim-2{animation:fadeInUp .7s ease .22s both;}
  .hero-anim-3{animation:fadeInUp .7s ease .34s both;}
  .hero-anim-4{animation:fadeInUp .7s ease .46s both;}
  .hero-anim-5{animation:fadeInUp .7s ease .56s both;}
  .reveal{opacity:0;transform:translateY(20px);transition:opacity .6s,transform .6s;}
  .reveal.on{opacity:1;transform:none;}
  .rd1{transition-delay:.07s}.rd2{transition-delay:.14s}.rd3{transition-delay:.21s}
  .rd4{transition-delay:.28s}.rd5{transition-delay:.35s}.rd6{transition-delay:.42s}

  /* Chips & Tags */
  .stat-chip{display:inline-flex;align-items:center;gap:6px;padding:8px 18px;border-radius:8px;font-family:'JetBrains Mono',monospace;font-size:12.5px;font-weight:600;}
  .chip-green{background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;}
  .chip-blue{background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;}
  .chip-amber{background:#fef2f2;color:#dc2626;border:1px solid #fecaca;}
  .chip-violet{background:#fffbeb;color:#d97706;border:1px solid #fde68a;}
  .tag{display:inline-flex;align-items:center;padding:2px 9px;border-radius:4px;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;}
  .tag-new,.tag-option{background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;}
  .tag-breaking{background:#fef2f2;color:#dc2626;border:1px solid #fecaca;}
  .tag-tooling{background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;}
  .tag-enhanced{background:#f5f3ff;color:#7c3aed;border:1px solid #ddd6fe;}
  .tag-arch{background:#fffbeb;color:#d97706;border:1px solid #fde68a;}
  .demo-badge{display:inline-flex;align-items:center;padding:2px 10px;border-radius:4px;margin-bottom:10px;font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;}
  .db-new{background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;}
  .db-fix{background:#eff6ff;color:#2563eb;border:1px solid #bfdbfe;}
  .db-breaking{background:#fef2f2;color:#dc2626;border:1px solid #fecaca;}
  .db-dep{background:#fffbeb;color:#d97706;border:1px solid #fde68a;}
  .icode-o{font-family:'JetBrains Mono',monospace;font-size:11.5px;background:#f0fdf4;color:#16a34a;border:1px solid #bbf7d0;padding:1px 6px;border-radius:4px;}

  /* Fix rows */
  .fix-row{border-bottom:1px solid #f3f4f6;transition:background .12s;}
  .fix-row:last-child{border-bottom:none;}
  .fix-row:hover{background:#f9fafb;}

  /* Code blocks — GitHub light */
  .code-blk{background:#fff;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.04),0 4px 12px rgba(0,0,0,0.05);}
  .code-blk-hd{padding:9px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-family:'JetBrains Mono',monospace;font-size:11px;color:#57606a;letter-spacing:.04em;}
  .code-blk-hd::before,.demo-out-hd::before{display:none;}
  .code-blk-bd{padding:14px 16px;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.8;overflow-x:auto;color:#24292f;}
  .c-del{color:#82071e;display:block;background:#ffebe9;margin:0 -16px;padding:0 16px;}
  .c-add{color:#116329;display:block;background:#e6ffec;margin:0 -16px;padding:0 16px;}
  .c-com{color:#6e7781;display:block;}.c-inf{color:#0550ae;display:block;}
  .c-key{color:#cf222e;}.c-val{color:#116329;}.c-str{color:#0a3069;}
  .c-ann{color:#8250df;}.c-typ{color:#953800;}.c-num{color:#0550ae;}.c-fld{color:#24292f;}
  .c-hl{background:#e6ffec;display:block;border-left:2px solid #2da44e;padding-left:14px;margin-left:-16px;margin-right:-16px;padding-right:16px;}
  .c-warn{background:#fff8c5;display:block;border-left:2px solid #d29922;padding-left:14px;margin-left:-16px;margin-right:-16px;padding-right:16px;}

  /* Demo output blocks */
  .demo-out{border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-top:16px;box-shadow:0 1px 3px rgba(0,0,0,0.04),0 4px 12px rgba(0,0,0,0.05);}
  .demo-out-hd{padding:9px 16px;background:#f9fafb;border-bottom:1px solid #e5e7eb;font-family:'JetBrains Mono',monospace;font-size:11px;color:#57606a;letter-spacing:.04em;}
  .demo-out-bd{padding:14px 16px;background:#fff;font-family:'JetBrains Mono',monospace;font-size:12px;line-height:1.8;overflow-x:auto;color:#24292f;}

  /* SBS panels */
  .sbs-wrap{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
  @media(max-width:720px){.sbs-wrap{grid-template-columns:1fr;}}
  .sbs-panel{border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.04),0 2px 8px rgba(0,0,0,0.06);}
  .sbs-hd{padding:8px 14px;font-family:'JetBrains Mono',monospace;font-size:10.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;}
  .sbs-hd-before{background:#fff1ee;color:#a32424;border:1px solid #ffc1be;border-bottom:none;}
  .sbs-hd-after{background:#e6ffec;color:#116329;border:1px solid #abdfba;border-bottom:none;}
  .sbs-bd{padding:14px 18px;font-family:'JetBrains Mono',monospace;font-size:11.5px;line-height:1.85;}
  .sbs-bd-before{background:#ffebe9;border:1px solid #ffc1be;border-top:none;color:#3d1515;}
  .sbs-bd-after{background:#e6ffec;border:1px solid #abdfba;border-top:none;color:#0d3b1f;}
  .ok{color:#116329;}.bad{color:#82071e;text-decoration:line-through;}.warn{color:#953800;}.dim{color:#6e7781;}

  /* Callout */
  .callout{background:#eff6ff;border:1px solid #bfdbfe;border-left:3px solid #2563eb;padding:11px 16px;border-radius:0 8px 8px 0;font-size:13.5px;color:#1e40af;line-height:1.65;}
  .callout code{font-family:'JetBrains Mono',monospace;font-size:11px;background:rgba(37,99,235,0.1);color:#1e40af;padding:1px 5px;border-radius:3px;}

  /* Excel tables */
  .xl-scroll{overflow-x:auto;border:1px solid #d0d7de;border-radius:6px;box-shadow:0 1px 3px rgba(0,0,0,0.05),0 4px 16px rgba(0,0,0,0.08);}
  .xl{border-collapse:collapse;font-family:'JetBrains Mono',monospace;font-size:11.5px;background:#fff;min-width:380px;width:100%;}
  .xl thead th{background:#DDE4EE;color:#4A5878;border:1px solid #B8C4D4;text-align:center;padding:3px 8px;font-size:10.5px;font-weight:600;user-select:none;white-space:nowrap;}
  .xl td{border:1px solid #D0D8E8;padding:5px 10px;color:#1a2434;vertical-align:top;white-space:nowrap;max-width:260px;overflow:hidden;text-overflow:ellipsis;}
  .xl td.rn{background:#E8EDF4;color:#8898A8;text-align:right;padding:4px 7px;font-size:10.5px;user-select:none;width:28px;min-width:28px;}
  .xl tr.xr-name td{background:#DCE8FC;color:#18305E;font-weight:600;}
  .xl tr.xr-type td{background:#D8EDD8;color:#1A4020;font-size:10.5px;white-space:pre-wrap;word-break:break-all;max-width:240px;}
  .xl tr.xr-note td{background:#F5F5F5;color:#5A6878;font-style:italic;}
  .xl tr.xr-data td{background:#fff;}.xl tr.xr-data2 td{background:#FAFBFC;}
  .xl tr.xr-data td.key,.xl tr.xr-data2 td.key{background:#FFFDE8;}
  .xl tr.xr-meta td{background:#F0EEF8;color:#4A3880;}
  .xl-label{font-family:'JetBrains Mono',monospace;font-size:11px;color:#A2A2A2;letter-spacing:.05em;margin-bottom:6px;}

  /* Dependency tags */
  .dep-tag{background:#fff;border:1px solid rgba(0,0,0,.1);padding:7px 15px;border-radius:6px;font-family:'JetBrains Mono',monospace;font-size:12px;color:#626060;transition:all .15s;cursor:default;box-shadow:0 1px 2px rgba(0,0,0,0.04);}
  .dep-tag-new{background:#fff7ed;border-color:rgba(249,115,22,0.3);color:#ea580c;}

  /* Demo block dividers */
  .demo-block{padding-bottom:56px;margin-bottom:56px;border-bottom:1px solid #f3f4f6;}
  .demo-block:last-child{border-bottom:none;padding-bottom:0;margin-bottom:0;}

  /* Breaking cards */
  .breaking-card{background:#fff;border-radius:16px;padding:32px;border:1px solid rgba(0,0,0,.09);border-left:4px solid #dc2626;box-shadow:0 1px 3px rgba(220,38,38,0.05),0 4px 14px rgba(220,38,38,0.08);}

  @media(max-width:640px){
    .hero-version{letter-spacing:-2px;}
    .sec-title{font-size:clamp(24px,8vw,38px);}
  }

  /* Hero grid background */
  .hero-section::before{
    content:''; position:absolute; inset:0; pointer-events:none; z-index:0;
    background-image:
      linear-gradient(rgba(0,0,0,0.025) 1px,transparent 1px),
      linear-gradient(90deg,rgba(0,0,0,0.025) 1px,transparent 1px);
    background-size:80px 28px;
  }

  /* Decorative floating spreadsheet */
  .deco-sheet-wrap{position:absolute;bottom:-30px;right:-24px;pointer-events:none;user-select:none;z-index:1;opacity:0.10;transform:perspective(1100px) rotateY(-14deg) rotateX(5deg);transform-origin:right bottom;transition:opacity .3s;}
  .hero-section:hover .deco-sheet-wrap{opacity:0.16;}
  .deco-sheet{border-collapse:collapse;font-family:'JetBrains Mono',monospace;font-size:11.5px;background:#fff;border:2px solid #9AAAB8;box-shadow:0 8px 40px rgba(0,0,0,0.18);}
  .deco-sheet th{background:#DDE4EE;color:#4A5878;border:1px solid #B8C4D4;text-align:center;padding:4px 12px;font-size:10.5px;font-weight:600;min-width:36px;user-select:none;}
  .deco-sheet th.rn{min-width:28px;max-width:28px;}
  .deco-sheet td{border:1px solid #D0D8E8;padding:5px 12px;white-space:nowrap;color:#1a2434;min-width:80px;}
  .deco-sheet td.rn{background:#E8EDF4;color:#8898A8;text-align:right;padding:4px 7px;font-size:10.5px;width:28px;min-width:28px;}
  .deco-sheet tr.xr-name td{background:#DCE8FC;color:#18305E;font-weight:600;}
  .deco-sheet tr.xr-type td{background:#D8EDD8;color:#1A4020;}
  .deco-sheet tr.xr-note td{background:#F5F5F5;color:#5A6878;font-style:italic;}
  .deco-sheet tr.xr-data td{background:#fff;}.deco-sheet tr.xr-data2 td{background:#FAFBFC;}
  .deco-sheet td.key{background:#FFFDE8;}
  .deco-sheet td.sel,.deco-sheet th.sel{background:rgba(217,90,39,0.15)!important;outline:2px solid rgba(217,90,39,0.5);outline-offset:-2px;}

  /* Section semantic tints */
  .sec-feat{background:linear-gradient(180deg,#fafffe 0%,#fafffe 90%,#f0fdf8 100%);}
  .sec-fix{background:linear-gradient(180deg,#f0f8ff 0%,#f0f8ff 90%,#ffffff 100%);}
  .sec-break{background:linear-gradient(180deg,#fffafa 0%,#fffafa 90%,#fff5f5 100%);}
  .sec-dep{background:linear-gradient(180deg,#fffdf0 0%,#fffdf0 90%,#ffffff 100%);}
  .sec-white{background:#ffffff;}
  .sec-gray{background:linear-gradient(180deg,#f8fafc 0%,#f8fafc 92%,#ffffff 100%);}
  .sec-white-next-gray{background:linear-gradient(180deg,#ffffff 0%,#ffffff 92%,#f8fafc 100%);}
</style>
```

---

## Semantic color matrix

### Sections

The `sec-num` AND `sec-title` of every section MUST be set to the accent colour below — the same colour as the section's matching tag. Title left at the default dark is a bug.

| Section | Number | CSS class | `sec-num` + `sec-title` colour |
|---------|--------|-----------|--------------------------------|
| New Features | 01 | `sec-feat` | `#16a34a` (green) |
| Bug Fixes | 02 | `sec-fix` | `#1d4ed8` (deep blue — readable on the light-blue background) |
| Breaking Changes | 03 | `sec-break` | `#dc2626` (red, or `#b91c1c` for slightly darker) |
| Deprecated | 04 | `sec-dep` | `#d97706` (amber, or `#92400e` for darker) |
| Dependencies | 05 | `sec-white-next-gray` | `#6b7280` (slate) — body title may use `#374151` for contrast |
| Examples | 06 | `sec-gray` | `#7c3aed` (violet) |

### Tags (`.tag` base class)
| Class | Use |
|-------|-----|
| `tag-new` / `tag-option` | New feature, new option — green |
| `tag-breaking` | Breaking change — red |
| `tag-tooling` | Tooling / parser / generator — blue |
| `tag-enhanced` | Enhancement / improvement — violet |
| `tag-arch` | Architecture / config — amber |

### Stat chips (`.stat-chip` base class)
| Class | Use |
|-------|-----|
| `chip-green` | Feature count |
| `chip-blue` | Bug fix count |
| `chip-amber` | Breaking change count (red theme) |
| `chip-violet` | Deprecated count (amber theme) |

### Demo badges (`.demo-badge` base class)
| Class | Use |
|-------|-----|
| `db-new` | New feature demo — green |
| `db-fix` | Bug fix demo — blue |
| `db-breaking` | Breaking change demo — red |
| `db-dep` | Deprecated demo — amber |

---

## GitHub icon SVG (for nav)

```html
<a href="https://github.com/tableauio/tableau/releases/tag/vX.Y.Z" target="_blank"
   title="View on GitHub"
   style="display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:8px;color:#374151;transition:background .15s,color .15s;"
   onmouseover="this.style.background='#f3f4f6';this.style.color='#111827'"
   onmouseout="this.style.background='transparent';this.style.color='#374151'">
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
</a>
```

---

## Hero decorative spreadsheet (copy as-is, update cell content for the release)

```html
<div class="deco-sheet-wrap">
  <table class="deco-sheet">
    <thead>
      <tr>
        <th class="rn"></th>
        <th>A</th><th>B</th><th class="sel">C</th><th>D</th><th>E</th><th>F</th><th>G</th>
      </tr>
    </thead>
    <tbody>
      <tr class="xr-name">
        <td class="rn">1</td>
        <td>ID</td><td>Name</td><td class="sel">Level</td><td>HP</td><td>Attack</td><td>Type</td><td>Validate</td>
      </tr>
      <tr class="xr-type">
        <td class="rn">2</td>
        <td>map&lt;uint32,Hero&gt;</td><td>string</td><td class="sel">int32</td><td>int32</td><td>int32</td><td>enum&lt;HeroType&gt;</td><td>string|{validate:...</td>
      </tr>
      <tr class="xr-note">
        <td class="rn">3</td>
        <td>Hero ID</td><td>Hero name</td><td class="sel">Hero level</td><td>Max HP</td><td>Base attack</td><td>Hero class</td><td>CEL rule</td>
      </tr>
      <tr class="xr-data">
        <td class="rn">4</td><td class="key">1</td><td>Arthur</td><td class="sel">50</td><td>500</td><td>120</td><td>warrior</td><td></td>
      </tr>
      <tr class="xr-data2">
        <td class="rn">5</td><td class="key">2</td><td>Merlin</td><td class="sel">45</td><td>380</td><td>90</td><td>mage</td><td></td>
      </tr>
      <tr class="xr-data">
        <td class="rn">6</td><td class="key">3</td><td>Lancelot</td><td class="sel">55</td><td>620</td><td>150</td><td>knight</td><td></td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## Tableau protobuf type system quick reference

Row 2 of every Excel table uses these type strings:

| Type string | Meaning |
|-------------|---------|
| `map<uint32,MsgName>` | Map keyed by uint32, value is MsgName proto |
| `[MsgName]` | Repeated/list of MsgName |
| `[]{.MsgName}` | Horizontal list struct (union) |
| `string` / `int32` / `bool` / `float` | Scalar proto types |
| `enum<EnumName>` | Enum reference |
| `string\|{validate:"rule"}` | Scalar + CEL validation prop |
| `string\|{validate_complex:"rule"}` | Complex CEL validation |
| `uint32\|{key:true}` | Primary key field |
| `uint32\|{optional:true}` | Optional field |
| `uint32\|{refer:"Sheet.Field"}` | Cross-sheet reference |
