const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
  externals: [webpackNodeExternals()],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  resolve: {
    alias: {
      // @todo: add aliases
    },
  },
  target: 'node',
};
