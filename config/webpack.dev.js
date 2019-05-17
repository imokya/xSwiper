const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')

const devConfig =  {
  mode: 'development',
  devServer: {
    contentBase: './build',
    open: false,
    hot: true
  },
  module: {
    rules: [
      { 
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
              import: true
            }
          },
          'sass-loader',
          'postcss-loader'
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
  ],
  optimization: {
    usedExports: true
  }
}

module.exports = merge(commonConfig, devConfig)