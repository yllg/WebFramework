const webpack = require('webpack');
const conf = require('./webpack.conf');
const path = require('path');
const _ = require("lodash");
const merge = require("webpack-merge");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const htmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin');

var HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const HappyPack = require('happypack');
const os = require("os");
//开辟一个线程池
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

const devOptions = {
    output: {
        path: path.join(__dirname, '../build/assets'),
        publicPath: '/', //将来上线的地址 cdn/a.js
        filename: 'scripts/[name].bundle.js'
    },
    plugins: [
        new ExtractTextPlugin("styles/[name].css"),
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
        //抽取公用的代码,最少引用两次，跟js放在一个目录下
        new webpack.optimize.CommonsChunkPlugin({
            name:"common",
            filename:"scripts/[name].bundle.js",
            minChunks: 2
        }),
        //不用处理，直接copy到build的文件
        new CopyWebpackPlugin([
            {from: 'src/webapp/views/common/layout.html', to: '../views/common/layout.html'},
            {from: 'src/webapp/widgets/top/top.html', to: '../widgets/top/top.html'}
        ]),
        new HtmlWebpackPlugin({
            filename: '../views/users/index.html',
            template: 'src/webapp/views/users/pages/index.html',
            inject: false
        }),
        new htmlAfterWebpackPlugin()
    ]
}


//不要这么用，容易出错，最好使用lodash的克隆
const _devOptions = Object.assign(conf.dev, devOptions);
//使用lodash的克隆，或者merge也可以
// const _options = _.clone(options);
// const _devOptions = merge(conf.dev,devOptions);

// console.log("合并的配置文件",_options);
// console.log('dev的配置');
module.exports = _devOptions;