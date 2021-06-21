const path = require('path');
//const post = require('postcss-preset-env');

module.exports = {
    entry: './source/js/index.js',
    mode: 'development',
    devtool: 'source-map',
    output: {
        filename: 'index.bundle.js',
        path: path.resolve(__dirname, 'production/js'),
    },

    // module: {
    //     rules: [
    //       {
    //         test: /\.scss$/,
    //         use: post.extract({
    //         fallback: 'style-loader',
    //         use: ['css-loader', 'postcss-loader', 'sass-loader'],
    //       }),
    //     }
    //     ],
    //   },
    //   plugins: [
    //     new post('style.css')
    //    ]
};
