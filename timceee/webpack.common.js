const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    app: './resources/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public/src'),
  },
  resolve: {
    modules: [
      'resources',
      'node_modules',
    ],
    extensions: ['.json', '.js', '.jsx'],
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      jquery: 'jquery',
      $: 'jquery',
    }),
    new ExtractTextPlugin('app.css', {allChunks: false}),
  ],
};
