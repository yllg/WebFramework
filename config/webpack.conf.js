const webpack = require('webpack');
const fs = require('fs');
const path = require('path');

const _ = require("lodash");
const conf = require('./happywebpack');

const pagesPath = path.join(__dirname, '../src/webapp/views');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const jsEntris = {}; //开发入口文件

//使用node的文件接口读取js文件
//o是路径，文件名，index是遍历的索引
fs.readdirSync(pagesPath).map((o, index) => {
    //内层的文件夹
    const _fd = pagesPath + "/" + o;
    //对.DS_store等乱七八糟文件的处理,只留下文件夹类型的继续遍历
    if (fs.lstatSync(_fd).isDirectory()) {
        fs.readdirSync(_fd).map((innero, innerfile) => {
            if (/.entry.js$/.test(innero)) {
                //index.entry.js -> index
                //{index: '___/index.entry.js'}
                jsEntris[innero.replace(".entry.js", "")] = path.join(pagesPath, o, innero);
            }
        });
    }
});
// console.log("遍历的入口文件", jsEntris);

//js可以用happypack，css兼容有问题没有用它
const _modules = {
    rules: [{
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: 'happypack/loader?id=babel'
    }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [{
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
                'postcss-loader'
            ]
        })
    }]
};


//克隆两份，防止引用类型互相影响了
const _devDntris = _.cloneDeep(jsEntris);
const _prodDntris = _.cloneDeep(jsEntris);

const _devLoaders = _.cloneDeep(_modules);
const _prodLoaders = _.cloneDeep(_modules);

const _devPlugins = _.cloneDeep(conf.plugins);
const _prodPlugins = _.cloneDeep(conf.plugins);


const webpackConfig = {
    dev: {
        entry: _devDntris,
        module: {
            rules: _devLoaders.rules
        },
        plugins: _devPlugins
    },
    prod: {
        entry: _prodDntris,
        module: {
            rules: _prodLoaders.rules
        },
        plugins: _prodPlugins
    }
};

// export default webpackConfig;
module.exports = webpackConfig;