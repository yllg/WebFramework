"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

const ErrorHandler = {
    error(app, logger) {
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch (err) {
                //打印错误内容
                logger.error(err);
                ctx.status = err.status || 500;
                ctx.body = 500;
            }
        });
        //404的处理方法
        app.use(async (ctx, next) => {
            await next(); //先断一下，没找到再回来判断
            //没毛病直接放回，有问题就打印
            if (404 != ctx.status) return;
            logger.error("没有找到地址");
            ctx.status = 404;
            ctx.body = "容错处理:捕获404或者500错误，让页面不报红;" + "跳转到公益页面，或者自定义有趣的404和500页面哦";
        });
    }
};

exports.default = ErrorHandler;