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
  plugins: [
    new MiniCssExtractPlugin({
      hmr: true,
      reloadAll: true,
      filename: 'css/[name].css'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  }
}

module.exports = merge(commonConfig, devConfig)