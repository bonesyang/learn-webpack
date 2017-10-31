var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        index: './main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'), //导出路径
        publicPath:'/dist/',// 指定资源文件引用的目录 
        filename: '[name].js' //文件名
    },
    module: {
        rules: [{
            test: /\.(less|css)$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'less-loader'],
                fallback: 'style-loader',
            }),
        }, ],
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './[name].css',
            disable: false,
            allChunks: true,
        }),
    ]
};