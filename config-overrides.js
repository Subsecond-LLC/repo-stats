const webpack = require('webpack');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    stream: require.resolve('stream-browserify'),
    path: require.resolve('path-browserify'),
    os: require.resolve('os-browserify/browser'),
    fs: require.resolve('browserify-fs'),
    url: require.resolve('url'),
    buffer: require.resolve('buffer'),
    util: require.resolve('util'),
    _stream_transform: require.resolve(
      'readable-stream/lib/_stream_transform.js'
    ),
    constants: require.resolve('constants-browserify'),
  });
  config.resolve.fallback = fallback;

  config.resolve.alias = {
    'eslint-visitor-keys': require.resolve('eslint-visitor-keys'),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  );

  config.plugins.push(
    new webpack.DefinePlugin({
      'process.versions.node': '"16.16.0"',
    })
  );

  config.module.rules = [
    ...config.module.rules,
    {
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    },
  ];

  return config;
};
