const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const filename = ext => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`

module.exports = {

  entry: './frontend/js/index.js',
  devtool: 'source-map',
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, './frontend/build'),
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
    [
      {
        test: /s[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader?url=false',
          'sass-loader',
        ]},
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource',
        use: ['file-loader'],
      },

      {
        test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3)$/,
        type: 'asset/resource',
        use: ['file-loader'],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
    patterns: [
    {
    from: path.resolve(__dirname, './frontend/samples'),
    to: path.resolve(__dirname, './frontend/build/samples')
    },
    {
    from: path.resolve(__dirname, './frontend//image'),
    to: path.resolve(__dirname, './frontend/build/image')
    },
    {
      from: path.resolve(__dirname, './frontend/fonts'),
      to: path.resolve(__dirname, './frontend/build/fonts')
      },

    ]}),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ]
};
