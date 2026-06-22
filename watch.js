#!/usr/bin/env node
/**
 * Theme hot-reload watcher.
 * Watches theme.css for changes and reloads it in the running Obsidian instance
 * via the Obsidian CLI (obsidian eval).
 *
 * Usage: node watch.js
 */

const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const TARGET = path.join(__dirname, "theme.css");

// Target vault name — change to match the vault you're testing in.
// Run `obsidian vaults` to list available vault names.
const VAULT = process.env.OBSIDIAN_VAULT || "Islands Theme";

// app.customCss.loadCss() caches the theme file by vault path on first load.
// reloadTheme() re-uses the cache and never re-reads the file.
// Fix: evict the cache entry, then call reloadTheme() so it reads fresh.
const RELOAD_CODE = [
  "(function(){",
  "  var key='.obsidian/themes/Islands/theme.css';",
  "  app.customCss.csscache.delete(key);",
  "  app.customCss.reloadTheme();",
  "})()",
].join("");

function reload() {
  try {
    execSync(
      `obsidian vault="${VAULT}" eval code="${RELOAD_CODE.replace(/"/g, '\\"')}"`,
      { stdio: "pipe" }
    );
    const t = new Date().toLocaleTimeString("ru", { hour12: false });
    console.log(`[${t}] theme.css → reloaded`);
  } catch (e) {
    console.error("Reload failed:", e.message);
  }
}

let timer = null;
let lastMtime = fs.statSync(TARGET).mtimeMs;

fs.watch(TARGET, () => {
  clearTimeout(timer);
  timer = setTimeout(() => {
    const mtime = fs.statSync(TARGET).mtimeMs;
    if (mtime === lastMtime) return;
    lastMtime = mtime;
    reload();
  }, 400);
});

console.log(`Watching ${TARGET}`);
console.log("Save theme.css → Obsidian reloads automatically.\n");
