

const HappyPack = require('happypack');
const os = require("os");
//开辟一个线程池
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

module.exports.plugins = [
    new HappyPack({
        id: 'babel',
        threads: happyThreadPool.size,
        loaders: [{
            loader: "babel-loader",
            query: {
                presets: [["env",{"modules":false}]]
            }
        }]
    })
];



