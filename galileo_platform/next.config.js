const path = require('path');

module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    // CesiumJS requires access to static files at runtime
    config.resolve.alias['cesium'] = path.resolve(__dirname, 'node_modules/cesium');

    // Copy Cesium Assets, Widgets, and Workers to static directory
    config.module.rules.push({
      test: /cesium\\/Build\\/Cesium/, // adjust regex as necessary
      use: { loader: 'strip-pragma-loader', options: { pragmas: { debug: false } } },
    });

    config.experiments = { ...config.experiments, topLevelAwait: true };

    return config;
  },
};