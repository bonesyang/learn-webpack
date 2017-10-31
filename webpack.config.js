// var path = require('path');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');

// module.exports = {
//     entry: {
//         index: './main.js'
//     },
//     output: {
//         path: path.resolve(__dirname, 'dist'), //导出路径
//         publicPath:'/dist/',// 指定资源文件引用的目录 
//         filename: '[name].js' //文件名
//     },
//     module: {
//         rules: [{
//             test: /\.(less|css)$/,
//             use: ExtractTextPlugin.extract({
//                 use: ['css-loader', 'less-loader'],
//                 fallback: 'style-loader',
//             }),
//         }, ],
//     },
//     plugins: [
//         new ExtractTextPlugin({
//             filename: './[name].css',
//             disable: false,
//             allChunks: true,
//         }),
//     ]
// };

'use strict';
let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let env = (process.env.NODE_ENV || 'development').trim();
let isProd = env !== 'development';

module.exports = {
    entry: { hotzone: './main.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: 'dist/',
        filename: '[name].min.js',
        library: 'regularHotZone',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
        {
            test: /\.less$/,
            loader: isProd ? ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!less-loader'
            }) : 'style-loader!css-loader!less-loader',
            exclude: /node_modules/
        }
        ]
    },
    externals: {
        regularjs: {
            root: 'Regular',
            commonjs: 'regularjs',
            commonjs2: 'regularjs',
            amd: 'Regular'
        }
    },
    resolve: {
        extensions: ['.js', '.css', '.json']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        hot: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
};

if (isProd) {
    delete module.exports.devtool;
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        new ExtractTextPlugin({
            filename: '[name].min.css',
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            comments: false,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}