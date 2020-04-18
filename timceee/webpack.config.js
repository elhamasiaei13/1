const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './resources/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/src'),
  },
  resolve: {
    modules: [
      'resources',
      'node_modules',
    ],
    extensions: ['.json', '.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'stylus-loader'],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'less-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader'],
        }),
      },
      {
        test: /\.(jpg|jpeg|gif|png)$/,
        loader: 'url-loader?limit=1024&name=images/[name].[ext]',
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=1024&name=fonts/[name].[ext]',
      },
    ],
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
