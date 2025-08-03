const path = require('path');

module.exports = {
  // Remove static export for Render deployment
  reactStrictMode: true,
  swcMinify: true,
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