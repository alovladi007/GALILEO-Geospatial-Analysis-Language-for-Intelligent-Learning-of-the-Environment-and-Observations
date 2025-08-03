const { join } = require('path');
const { existsSync } = require('fs');

// Check if out directory exists
const outDir = join(__dirname, '..', 'out');

if (existsSync(outDir)) {
  console.log('Static export completed successfully in:', outDir);
} else {
  console.error('Error: out directory not found!');
  process.exit(1);
}