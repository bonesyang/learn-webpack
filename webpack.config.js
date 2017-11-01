let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let env = (process.env.NODE_ENV || 'development').trim();
let isProd = env !== 'development';

module.exports = {
    entry: { 
    	index: './src/main.js', 
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].min.js'
    },
    module: {
        rules: [
        {
            test: /\.less$/,
            loader: isProd ? ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: 'css-loader!postcss-loader!less-loader'
            }) : 'style-loader!css-loader!postcss-loader!less-loader',
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