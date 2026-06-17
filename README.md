# Islands — Obsidian Theme

A minimal Obsidian theme that turns workspace panels into floating islands — separated by gaps instead of dividers — with Safari-style pill tabs.

No color changes, no font changes. Works on top of any base color scheme and accent color.

---

## What it does

- **Island layout** — every panel (main editor, left sidebar, right sidebar) becomes a rounded floating card with a shadow. Gaps between panels replace traditional dividers.
- **Safari-style tabs** — pill-shaped tabs float inside the tab bar. The active tab gets a subtle filled background. Inactive tabs show their close button only on hover.
- **Thumb-only scrollbar** — scrollbar track is hidden; thumb appears on hover only.
- **Status bar** — styled as a small floating island in the bottom-right corner.

---

## Architecture (for AI / contributors)

Understanding how the CSS is structured is essential before making changes.

### The two-layer model

| Layer | Element | Style |
|-------|---------|-------|
| Sea | `body` | `--background-secondary` |
| Island (card) | `workspace-tab-container` | `--background-primary` + `border-radius` + `box-shadow` |

Every element **inside** a card (`workspace-leaf`, `view-header`, `view-content`, `workspace-tab-header-container`, etc.) is set to `background: transparent` so the white card surface shows through.

### Key selectors

```
.workspace-split.mod-root .workspace-tab-container        → main editor card
.workspace-split.mod-left-split .workspace-tab-container  → left sidebar card
.workspace-split.mod-right-split .workspace-tab-container → right sidebar card
.workspace-sidedock-vault-profile                         → vault profile card (bottom of left sidebar)
.status-bar                                               → status bar island
```

### Gaps

- Left/right gap: `margin-left/right: var(--islands-gap)` on `.workspace`
- Bottom gap: `padding-bottom: var(--islands-gap)` on `.horizontal-main-container`
- Gap between vertical splits: `gap: var(--islands-gap)` on `.workspace-split.mod-vertical`
- Gap between sidebar and main: `margin-right/left` on the sidebar split (conditional on `is-left-sidedock-open`)

### Tab specificity problem

`app.css` has high-specificity overrides for sidebar tab containers:
```css
.mod-left-split .workspace-tab-header-container .workspace-tab-header-container-inner { … }
.mod-right-split .workspace-tab-header-container .workspace-tab-header-container-inner { … }
```
To beat these, `theme.css` repeats all four selectors in one rule:
```css
.workspace-tab-header-container-inner,
.mod-root .workspace-tab-header-container-inner,
.mod-left-split .workspace-tab-header-container .workspace-tab-header-container-inner,
.mod-right-split .workspace-tab-header-container .workspace-tab-header-container-inner { … }
```

### Squircle tabs (removed)

Obsidian's default tabs use squircle connectors via `::before` / `::after` pseudo-elements and a `margin: 6px -5px` on the inner container to compensate. This theme removes those:
- `display: none` on `::before`, `::after`, `::after` of `workspace-tab-header-inner`
- `margin-inline-start: 0` on `workspace-tab-header-new-tab` (resets -4px default)
- `padding: 0` on `workspace-tab-header-container-inner` (resets `1px 15px 0` default)

---

## Installation

### Symlink for live editing (macOS, recommended)

```bash
ln -s "/Users/Bulat.Davletov/Cursor Projects/obsidian-islands-theme" \
      "/path/to/vault/.obsidian/themes/Islands"
```

Then: **Settings → Appearance → Themes → Islands**.

CSS changes take effect immediately on save — no Obsidian restart needed.

### Manual

Copy the folder into `<vault>/.obsidian/themes/Islands/`. The folder name must match the `name` field in `manifest.json` exactly (`Islands`).

---

## Tuning

```css
body {
  --islands-gap: 8px;     /* space between panels */
  --islands-radius: 10px; /* corner radius of each card */
}
```

---

## Known issues

See `ISSUES.md` for the current list of open problems.

---

## Compatibility

- Tested on Obsidian 1.4+
- Light and dark mode
- No plugin dependencies
- Desktop only (all rules are scoped to `body:not(.is-mobile)`)
