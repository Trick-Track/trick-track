const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');




const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

// const optimization = () => {
//   const config = {
//     splitChunks: {
//       chunks: 'all',
//     },
//   }
// }


module.exports = {
    mode: 'development',
    entry: './source/js/index.js',
    devtool: 'source-map',
    output: {
        filename: 'index.[contenthash].js',
        path: path.resolve(__dirname, 'build'),
    },
     resolve: {
       extensions: ['.js', '.wav'],
       alias: {
        normalize_css: __dirname + '/node_modules/normalize.css/normalize.css',
      }
       
     },

        module: {
            rules: 
            [{
              test: /s[ac]ss$/,
              use: [
                MiniCssExtractPlugin.loader,
                'css-loader?url=false',
                'sass-loader',
              ]}
              // {
              //   test: /\.s[ac]ss/,
               
              //   use: MiniCssExtractPlugin.loader({
             
              //   use: ['style-loader', 'css-loader', 'sass-loader'],
              //   }),
              // },
              // {
              //   test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
              //   use: ['file-loader'],
              //   options: { 
              //     name: filename('wav'),
              //   },
              // } 
            ],
        },
      
        // module: {
            // rules: [
              // {
                // test: /\.s[ac]ss/,
                // use: post.extract({
                // fallback: 'style-loader',
          //       use: ['css-loader', 'postcss-loader', 'sass-loader'],
          //     }),
          //   }
          //   ],
          // },
          plugins: [
            new HTMLWebpackPlugin({
              template: './source/index.html',
            }),

            new CleanWebpackPlugin(),
            new MiniCssExtractPlugin({
              filename: filename('css')
            }),

           ]
    };
