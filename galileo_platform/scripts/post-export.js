const { join } = require('path');
const { existsSync, copyFileSync } = require('fs');

// repo name passed via env var NEXT_PUBLIC_BASE_PATH
const repo = process.env.NEXT_PUBLIC_BASE_PATH;
if (!repo) {
  console.log('No basePath set – skipping post-export copy.');
  process.exit(0);
}

const from = join(__dirname, '..', 'out', repo, 'index.html');
const to = join(__dirname, '..', 'out', 'index.html');

if (existsSync(from)) {
  copyFileSync(from, to);
  console.log(`Copied ${from} → ${to}`);
} else {
  console.warn(`Source file not found: ${from}`);
}