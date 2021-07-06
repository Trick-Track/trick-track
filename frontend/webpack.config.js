const path = require('path');
//const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin')




const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

module.exports = {
    mode: 'development',
    entry: './source/js/index.js',
    devtool: 'source-map',
    output: {
<<<<<<< HEAD
        // filename: filename('js'),
        // publicPath: "/static/",
=======
        filename: filename('js'),
       // publicPath: "/static/",
>>>>>>> 13e610f1af584331068592b8d4baf223f66c3315
        filename: "[name].js",
        path: path.resolve(__dirname, 'build'), 
    },
     resolve: {
       extensions: ['.js', '.wav', 'woff2'],
       alias: {
        normalize_css: __dirname + '/node_modules/normalize.css/normalize.css',
       },
       fallback: { "path": false },
      },


     devServer: {
       port: 4200,
       open: true,
     },

        module: {
            rules:
            [{
              test: /s[ac]ss$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader?url=false',
                'sass-loader',
              ]},
              // {
              //   test: /\.s[ac]ss/,

              //   use: MiniCssExtractPlugin.loader({

              //   use: ['style-loader', 'css-loader', 'sass-loader'],
              //   }),
              // },
              {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader'],
              //   options: {
              //     name: "[name].[ext]"
              // }
              },

              {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
                use: ['file-loader'],
                // options: { 
                //   name: "[name].ext"
                // },
              } 
            ],
        },


          plugins: [
            // new HTMLWebpackPlugin({
            //   template: './source/index.html',
            // }),

            new CleanWebpackPlugin(),
            new CopyWebpackPlugin({
              patterns: [
              {
              from: path.resolve(__dirname, 'source/samples'),
              to: path.resolve(__dirname, 'build/samples')
              },
              {
              from: path.resolve(__dirname, 'source/static/image'),
              to: path.resolve(__dirname, 'build/image')
              },

            ]}),
            new MiniCssExtractPlugin({
              filename: "[name].css",
            }),

           ]
    };
