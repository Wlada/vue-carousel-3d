/* eslint-disable */

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const base = require('./webpack.base.conf')

var config = Object.assign({}, base)

config.output.filename = 'vue-carousel-3d.min.js'

config.plugins = (config.plugins || []).concat([
  new UglifyJsPlugin({
      sourceMap: false
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  })
])

config.mode = 'production'

module.exports = config
