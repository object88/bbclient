var path = require('path');

const WebpackFileList = require('webpack-file-list-plugin');
const webpack = require('webpack');

module.exports = {
  devtool: '#source-map',
  entry: {
    app: path.resolve(__dirname, 'js', 'app.js'),
    vendor: ['whatwg-fetch'],
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }],
        test: /\.js$/,
      },
    ],
  },
  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'bin'),
    sourceMapFilename: '[name].[chunkhash].js.map',
  },
  plugins: [
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
