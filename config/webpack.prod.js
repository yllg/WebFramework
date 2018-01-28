const webpack = require('webpack');
const conf = require('./webpack.conf');
const path = require('path');
const _ = require("lodash");
const merge = require("webpack-merge");

var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HappyPack = require('happypack');
const os = require("os");
//开辟一个线程池
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const prodOptions = {
    output: {
        path: path.join(__dirname, '../build/assets'),
        publicPath: '/', //将来上线的地址 cdn/a.js
        filename: 'scripts/[name].[hash:5].bundle.js'
    },
    plugins: [
        new ExtractTextPlugin("styles/[name].[hash:5].css"),
        new HappyPack({
            id: 'babel',
            threads: happyThreadPool.size,
            loaders: [{
                loader: "babel-loader",
                query: {
                    presets: [
                        ["env", {
                            "modules": false
                        }]
                    ]
                }
            }]
        }),
        new webpack.optimize.ModuleConcatenationPlugin(),
        //抽取公用的代码,最少引用两次，跟js放在一个目录下
        new webpack.optimize.CommonsChunkPlugin({
            name:"common",
            filename:"scripts/[name].[hash:5].bundle.js",
            minChunks: 2
        }),
        new UglifyJsPlugin({
            uglifyOptions: {
                ie8: false,
                ecma: 8,
                mangle: true,
                output: {
                    comments: false,
                    beautify: false
                },
                compress: {
                    drop_console:true,
                    reduce_vars:true
                },
                warnings: false
            },
            cache:true,
            parallel: os.cpus().length * 2
        }),
        new CopyWebpackPlugin([
            {from: 'src/webapp/views/common/layout.html', to: '../views/common/layout.html'},
            {from: 'src/webapp/widgets/top/top.html', to: '../widgets/top/top.html'}
        ]),
        new HtmlWebpackPlugin({
            filename: '../views/users/index.html',
            template: 'src/webapp/views/users/pages/index.html',
            minify: {
                removeComments:true,
                collapseWhitespace:true
            },
            inject: false
        }),
        new htmlAfterWebpackPlugin()
    ]
}


//不要这么用，容易出错，创建新对象，clone，merge，webpack.merge
const _prodOptions = Object.assign(conf.prod,prodOptions);
// const _prodOptions = _.clone(prodOptions);
// const _prodOptions = merge(conf.prod, prodOptions);

// console.log('prod的配置');
module.exports = _prodOptions;