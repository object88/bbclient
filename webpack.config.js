var path = require('path');

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const WebpackFileList = require('webpack-file-list-plugin');

module.exports = {
  devtool: '#source-map',
  entry: {
    app: path.resolve(__dirname, 'src', 'app.js'),
    vendor: ['whatwg-fetch'],
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
        }],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'sass-loader'],
        }),
    }],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'bin'),
    sourceMapFilename: '[file].map',
  },
  plugins: [
    new ExtractTextPlugin("[name].[contenthash].css"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      sourceMap: true,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
       return module.context && module.context.indexOf('node_modules') !== -1;
      },
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
    new WebpackFileList({
      filename: 'manifest.json',
      includeMap: true,
      path: path.resolve(__dirname, 'bin'),
      priorities: ['manifest', 'vendor', 'app'],
    }),
  ],
}
