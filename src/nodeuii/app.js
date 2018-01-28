import koa from 'koa';
import router from 'koa-simple-router';
import render from 'koa-swig';
import co from 'co';
import serve from 'koa-static';
import log4js from 'log4js';

import config from './config/main';
// import InitController from './controllers/InitController';
import { createContainer,asClass,Lifetime, asValue,register } from 'awilix';
import { loadControllers, scopePerRequest } from 'awilix-koa'
import ErrorHandler from './middlewares/ErrorHandler';
// import TestService from './models/TestService';
// import dev from './config/env';
//开发环境全部开关
// const config = dev.init();
// console.log(config);

const app = new koa();


//灵魂 IOC容器
const container = createContainer();

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
      lifetime: Lifetime.SCOPED
    }
  });


//关键点，将所有的container的service服务到每一个路由中去，实现DI
//Service中心，注入到对应的Controller中
app.use(scopePerRequest(container));

//还可以注册 一些贯穿变量到容器中，同样在控制器的构造函数中直接取
//放在scopePerRequest之后
app.use((ctx,next)=>{
    ctx.state.container.register({
        user: asValue("DI")
    });
    return next();
});

//log4js的配置
log4js.configure({
    appenders: { lglog: { type: 'file', filename: './logs/lg.log' } },
    categories: { default: { appenders: ['lglog'], level: 'error' } }
  });


//koa-swig渲染路由
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    writeBody: false,
    varControls:['[[',']]']
}));


//容错log4打印日志
const logger = log4js.getLogger('lglog');
ErrorHandler.error(app,logger);


//初始化所有路由🍺
// InitController.getAllrouter(app, router);
//使用awilix-koa来注册所有路由
//使用use保证上下文顺利的传输
app.use(loadControllers('controllers/*.js', { cwd: __dirname }));


//配置静态资源路径
app.use(serve(config.staticDir));


app.listen(config.port, () => {
    console.log('Server is start,端口：开发环境8081，生产环境8082');
});