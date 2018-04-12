const webpack = require('webpack');
const path = require('path');

let config = {
  entry: './main.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  devtool: 'source-map'
}

module.exports = config;