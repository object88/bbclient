var path = require('path');

const webpack = require('webpack');

module.exports = {
  entry: [path.resolve(__dirname, 'js', 'app.js')],
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
    filename: 'app.bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
      sourceMap: true,
    }),
  ],
}
