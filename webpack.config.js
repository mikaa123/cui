/* eslint-disable */
'use strict'

let path = require('path')
let webpack = require('webpack')

var config = {
  context: path.join(__dirname, './src'),
  entry: {
    js: ['babel-polyfill', './index.js'],
    vendor: [ 'react' ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [ '.js', '.jsx' ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' })
  ],
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: [
          'babel-loader'
        ],
        exclude: /node_modules/
      },
      {
         test: /\.(ttf|otf|eot|woff(2)?)(\?[a-z0-9]+)?$/,
         loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.svg$/,
        loader: 'url-loader'
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}

module.exports = config
