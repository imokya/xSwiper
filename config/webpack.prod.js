const merge = require('webpack-merge')
const glob = require('glob')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const commonConfig = require('./webpack.common.js')

const prodConfig =  {
  mode: 'production',
  module: {
    rules: [
      { 
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css'
    })
  ]
}

const imageCompressConfig =  {
  plugins: [
    new ImageminPlugin({
      pngquant: {
        quality: '60-70'
      },
      externalImages: {
        context: '../build', 
        sources: glob.sync('build/img/**/*.png')
      }
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)

