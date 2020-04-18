const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StripLoader = require('strip-loader');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

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
        use: [
          'babel-loader',
          {
            loader: StripLoader.loader('debugger', 'console.log', 'console.info'),
          },
        ],
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.styl$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minify: true,
              },
            }, 'stylus-loader'],
        }),
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minify: true,
              },
            }, 'less-loader'],
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                minify: true,
              },
            },
          ],
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
    new UglifyJSPlugin(),
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      jquery: 'jquery',
      $: 'jquery',
    }),
    new ExtractTextPlugin('app.css', {allChunks: false}),
  ],
};
