'use strict';

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaSimpleRouter = require('koa-simple-router');

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _koaSwig = require('koa-swig');

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _co = require('co');

var _co2 = _interopRequireDefault(_co);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _main = require('./config/main');

var _main2 = _interopRequireDefault(_main);

var _awilix = require('awilix');

var _awilixKoa = require('awilix-koa');

var _ErrorHandler = require('./middlewares/ErrorHandler');

var _ErrorHandler2 = _interopRequireDefault(_ErrorHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import TestService from './models/TestService';
// import dev from './config/env';
//开发环境全部开关
// const config = dev.init();
// console.log(config);

const app = new _koa2.default();

//灵魂 IOC容器

// import InitController from './controllers/InitController';
const container = (0, _awilix.createContainer)();

//注册各种业务类，使用装饰器后就不需要这个了
// container.register({
//     testService: asClass(TestService)
// });

//先把所有的model注册到容器中
container.loadModules(['models/*.js'], {
    //把model大写的文件名改为驼峰形式testService
    formatName: 'camelCase',
    registrationOptions: {
        //register: asClass,
        lifetime: _awilix.Lifetime.SCOPED
    }
});

//关键点，将所有的container的service服务到每一个路由中去，实现DI
//Service中心，注入到对应的Controller中
app.use((0, _awilixKoa.scopePerRequest)(container));

//还可以注册 一些贯穿变量到容器中，同样在控制器的构造函数中直接取
//放在scopePerRequest之后
app.use((ctx, next) => {
    ctx.state.container.register({
        user: (0, _awilix.asValue)("DI")
    });
    return next();
});

//log4js的配置
_log4js2.default.configure({
    appenders: { lglog: { type: 'file', filename: './logs/lg.log' } },
    categories: { default: { appenders: ['lglog'], level: 'error' } }
});

//koa-swig渲染路由
app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
    root: _main2.default.viewDir,
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    writeBody: false,
    varControls: ['[[', ']]']
}));

//容错log4打印日志
const logger = _log4js2.default.getLogger('lglog');
_ErrorHandler2.default.error(app, logger);

//初始化所有路由🍺
// InitController.getAllrouter(app, router);
//使用awilix-koa来注册所有路由
//使用use保证上下文顺利的传输
app.use((0, _awilixKoa.loadControllers)('controllers/*.js', { cwd: __dirname }));

//配置静态资源路径
app.use((0, _koaStatic2.default)(_main2.default.staticDir));

app.listen(_main2.default.port, () => {
    console.log('Server is start,端口：开发环境8081，生产环境8082');
});