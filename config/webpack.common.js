const path = require('path')
const webpack = require('webpack')
const config = require('../app.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestWebpackPlugin = require('../plugins/manifest-webpack-plugin')

module.exports = {
  entry: {
    app: './src/app.js'
  },
  output: {
    publicPath: config.publicPath,
    path: path.resolve(__dirname, '../build'),
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      img: path.resolve(__dirname, '../build/img'),
      root: path.resolve(__dirname, '../'),
      styles: path.resolve(__dirname, '../src/styles')
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
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src', 'link:href']
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              emitFile: false,
              name: 'img/[name].[ext]?v='+config.version
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ManifestWebpackPlugin({
      disable: false,
      source: '../build/img',
      exclude: 'exclude',
      output: '../src'
    }),
    new HtmlWebpackPlugin({
      minify: {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      },
      config: config,
      inject: false,
      template: 'template/index.ejs',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['*', '!img*'],
      root: path.resolve(__dirname, '../')
    })
  ],
  performance: false,
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      name: true,
      cacheGroups: {
        vendors: {
          test: /\.js$/,
          name: 'vendors'
        },
        styles: {
          test: /\.(css|scss)$/,
          name: 'styles',
          enforce: true
        }
      }
    }
  }
}