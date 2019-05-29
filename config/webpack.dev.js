const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig =  {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    contentBase: './build',
    open: false,
    hot: true
  },
  module: {
    rules: [
      { 
        test: /\.styl$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
              import: true
            }
          },
          'postcss-loader',
          'stylus-loader'
        ] 
      },
      { 
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
              import: true
            }
          }
        ] 
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(commonConfig, devConfig)