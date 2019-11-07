const path = require('path')
const webpack = require('webpack')
const config = require('../app.json')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ManifestWebpackPlugin = require('../plugins/manifest-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

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
      img: path.resolve(__dirname, '../src/img'),
      assets: path.resolve(__dirname, '../src/assets'),
      root: path.resolve(__dirname, '../'),
      src: path.resolve(__dirname, '../src'),
      css: path.resolve(__dirname, '../src/css')
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
              emitFile: true,
              limit: 8192,
              context: 'src',
              name: '[path][name].[ext]?v='+config.version
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ManifestWebpackPlugin({
      disable: false,
      source: '../src/img',
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
      template: 'src/index.ejs',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['*'],
      root: path.resolve(__dirname, '../')
    }),
    new CopyPlugin([
      { from: 'src/term.html', to: 'term.html' },
      { from: 'src/img', to: 'img' },
      { from: 'src/assets', to: 'assets' },
    ]),
  ],
  performance: false,
  optimization: {
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /node_modules|vendors/,
          name: 'vendors'
        },
        styles: {
          test: /\.(css|styl)$/,
          name: 'styles'
        }
      }
    }
  }
}