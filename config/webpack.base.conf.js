/* eslint-disable */

const path = require('path');
const webpack = require('webpack');
const npmCfg = require('../package.json');
const projectRoot = path.resolve(__dirname, '../');

const { VueLoaderPlugin } = require('vue-loader');

var banner = [
    'vue-carousel-3d v' + npmCfg.version,
    '(c) ' + (new Date().getFullYear()) + ' ' + npmCfg.author,
    npmCfg.homepage
].join('\n')

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'vue-carousel-3d.js',
        library: 'Carousel3d',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js', '.vue'],
        modules: [
            path.join(__dirname, 'node_modules')
        ],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
        }
    },
    resolveLoader: {
        modules: [
            path.join(__dirname, '..', 'node_modules')
          ]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env']
                          ],
                          comments: false
                    }
                },
                include: projectRoot,
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [ 'vue-style-loader', 'css-loader' ]
            }
        ]
    },
    plugins: [
        new webpack.BannerPlugin(banner),
        new VueLoaderPlugin()
    ]
}
