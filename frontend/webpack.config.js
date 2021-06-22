const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const Post = require('postcss-preset-env');

module.exports = {
    
    //mode: 'development',
    entry: './source/js/index.js',
    devtool: 'source-map',
    output: {
        filename: 'index.[contenthash].js',
        path: path.resolve(__dirname, 'build'),
    },

        module: {
            rules: [
              {
                test: /\.s[ac]ss/,
                use: post.extract({
                fallback: 'style-loader',
                use: ['css-loader', 'postcss-loader', 'sass-loader'],
              }),
            }
            ],
          },
          plugins: [
            new HTMLWebpackPlugin({
              template: './source/index.html',
            }),
            new CleanWebpackPlugin({
              filename: filename('css')
            })
           ]
    };
