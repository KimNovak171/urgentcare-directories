"use strict";

const fs = require("fs");
const path = require("path");

const outDir = path.join(process.cwd(), "out");

if (!fs.existsSync(outDir)) {
  process.exit(0);
}

/**
 * Recursively delete .txt files (case-insensitive extension), except the
 * robots file (basename matches "robots.txt" case-insensitively).
 */
function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(full);
      continue;
    }
    if (!ent.isFile()) continue;

    const ext = path.extname(ent.name);
    if (ext.toLowerCase() !== ".txt") continue;
    if (ent.name.toLowerCase() === "robots.txt") continue;

    fs.unlinkSync(full);
  }
}

walk(outDir);
