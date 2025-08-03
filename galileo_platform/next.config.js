const path = require('path');

// When deploying to GitHub Pages set env NEXT_PUBLIC_BASE_PATH=<repo-name>
const repo = process.env.NEXT_PUBLIC_BASE_PATH || '';
const isGhPages = repo !== '';

module.exports = {
  output: 'export', // generate static HTML in `out/`
  basePath: isGhPages ? `/${repo}` : '',
  assetPrefix: isGhPages ? `/${repo}/` : '',
  reactStrictMode: true,
  webpack: (config) => {
    // CesiumJS requires access to static files at runtime
    config.resolve.alias['cesium'] = path.resolve(__dirname, 'node_modules/cesium');

    // Strip debug pragmas from Cesium production build
    config.module.rules.push({
      test: /cesium[/\\]Build[/\\]Cesium/,
      use: { loader: 'strip-pragma-loader', options: { pragmas: { debug: false } } },
    });

    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};