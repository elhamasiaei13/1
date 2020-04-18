const webpack = require('webpack');
const merge = require('webpack-merge');
const StripLoader = require('strip-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  module: {
    rules: [{
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
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.template$/,
        loader: 'raw-loader',
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
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ],
});
