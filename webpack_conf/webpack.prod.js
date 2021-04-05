const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    main: './src/index.js',
  },
  mode: 'production',
  plugins: [
    new HtmlWebpackPlugin({
      // Prevent auto-request as a static file.
      filename: 'main.html',
      inject: true,
      template: path.resolve(__dirname, '..', 'src', 'main.html'),
      // Include favicon in the head.
      // favicon: resolve(__dirname, '..', 'src', 'favicon.png'),
      alwaysWriteToDisk: true,
    }),
  ],
  module: {
    rules: [
      {
        // Regex for which files to run Babel on.
        test: /\.(js|mjs|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
});
