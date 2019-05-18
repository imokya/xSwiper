const path = require('path')
const config = require('../app.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      root: path.resolve(__dirname, '../'),
      styles: path.resolve(__dirname, '../styles')
    }
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      config: config,
      inject: false,
      template: 'template/index.ejs',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['*', '!vendors*'],
      root: path.resolve(__dirname, '../')
    })
  ],
}