# Islands

A minimal Obsidian theme that turns workspace panels into floating islands — separated by gaps instead of dividers — with Safari-style pill tabs.

That's it. No color changes, no font changes. Works on top of any base color scheme and any accent color.

## What it does

- **Island layout** — every panel (main editor, left sidebar, right sidebar) becomes a rounded floating card. Gaps between panels replace traditional dividers and resize handles.
- **Safari-style tabs** — pill-shaped tabs float inside the tab bar. The active tab gets a subtle filled background. Inactive tabs show their close button only on hover.

## Installation

### Manual (recommended for development)

1. Copy (or symlink) the `Islands` folder into your vault's themes directory:

```
<your-vault>/.obsidian/themes/Islands/
```

The folder must contain `manifest.json` and `theme.css`. The folder name must match the `name` field in `manifest.json` exactly (`Islands`).

2. In Obsidian: **Settings → Appearance → Themes** → select **Islands**.

### Symlink for live editing (macOS)

```bash
ln -s "/path/to/obsidian-islands-theme" "/path/to/vault/.obsidian/themes/Islands"
```

Then select the theme in Obsidian. CSS changes take effect immediately after saving — no restart needed.

## Tuning

All sizing is controlled by two variables in `theme.css`:

```css
body {
  --islands-gap: 12px;    /* space between panels */
  --islands-radius: 10px; /* corner radius of each card */
}
```

Change these to taste, save, and Obsidian hot-reloads the style.

## Compatibility

- Tested on Obsidian 1.4+
- Works with light and dark mode
- No plugin dependencies
