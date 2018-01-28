'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dev = {
    init: function () {
        //可以把local和main两个js文件合并到这里，
        const localConfig = {
            "port": 8081
        };
        const server = {
            "port": 80
        };
        let config = {
            "viewDir": _path2.default.join(__dirname, '../', 'views'),
            "staticDir": _path2.default.join(__dirname, '../', 'assets'),
            "env": process.env.NODE_ENV
        };

        if (process.env.NODE_ENV == "development") {
            console.log('development');
            //判断生产环境还是开发环境
            if (config.env == "production") {
                config = _lodash2.default.extend(config, server);
            } else {
                config = _lodash2.default.extend(config, localConfig);
            }
            console.log(config);
            //返回出去，app.js就不需要import main.js中的配置文件了
            return config;
        }

        if (process.env.NODE_ENV == "testing") {
            console.log('testing');
        }

        //生产环境时，上面两个都tree shaking删掉，只留这一个
        if (process.env.NODE_ENV == "production") {
            console.log('production');

            //判断生产环境还是开发环境
            if (config.env == "production") {
                config = _lodash2.default.extend(config, server);
            } else {
                config = _lodash2.default.extend(config, localConfig);
            }
            return config;
        }
    }
};

exports.default = dev;