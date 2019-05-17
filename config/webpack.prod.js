const merge = require('webpack-merge')
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
  }
}

module.exports = merge(commonConfig, prodConfig)