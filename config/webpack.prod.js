const path = require('path')
const glob = require('glob')
const merge = require('webpack-merge')
const commonConfig = require('./webpack.common.js')
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const prodConfig =  {
  mode: 'production',
  module: {
    rules: [
      { 
        test: /\.styl$/,
        use: [
          MiniCssExtractPlugin.loader,
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
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: 'global',
              import: true
            }
          },
          'postcss-loader'
        ] 
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    })
  ],
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCSSAssetsPlugin({})]
  }
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

const config = merge(commonConfig, prodConfig)


module.exports = (env) => {
  if(env && env === 'imagemin') {
    return merge(config, imageCompressConfig)
  } else {
    return config
  }
}

