# WebFramework
## 自己写一个类似egg的前后端通用脚手架

### 运行
#### 开发环境，npm run build:dev
#### 生产环境，npm run build
#### ！脚手架搭好，就可以开始尽情表演了
![Image text](https://github.com/yllg/WebFramework/blob/master/%E6%95%88%E6%9E%9C%E5%9B%BE.png)

### 目录结构
![Image text](https://github.com/yllg/WebFramework/blob/master/%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84.png)


### 用到的包及其作用说明
#### 1.node后台用gulp编译打包
（避免用webpack打包node出现过于冗余代码）
##### （1）babel-plugin-transform-es2015-modules-commonjs，编译import等ES6语法
##### （2）cross-env ，跨平台的设置和使用环境变量NODE_ENV
##### （3）gulp-rollup，tree shaking 代码清理
##### （4）koa-simple-router, 路由中间件
##### （5）koa-swig, 渲染swig模板，koa v2.x需要co包配合。 
##### （6）koa-static，设置静态资源文件
##### （7）log4js，配合ErrorHandler进行容错处理并打印错误日志。
##### （8）awilix，awilix-koa，实现IOC控制反转和DI依赖注入，
##### （9）babel-plugin-transform-decorators-legacy，翻译装饰器语法，使用装饰器语法 优雅的定义路由并设置路由守卫。

#### 2.前端用webpack打包
##### （1）better-npm-run，更方便的运行webpack配置脚本
##### （2）lodash，函数式编程的库，克隆两份配置文件，防止开发环境和生产环境配置发生混淆。
##### （3）babel-loader：翻译前端ES6语法
##### （4）happypack： webpack好盆友，项目大时可明显提升webpack打包速度
##### （5）postcss，面向未来的下一代css，使用了下面两个
##### cssnext：忘掉sass,less,stylus这些旧的预处理器吧。
##### cssnano：像JS的tree shaking一样清理到无用的css，并进行css优化和压缩
##### （6）html-webpack-plugin，webpack中html文件创建的包，用它提供的钩子来扩展我们自己的一个webpack插件，将数据流中的css,js静态文件正确的插入到swig模板的正确位置。
##### （7）uglifyjs-webpack-plugin，生产环境一个超给力的压缩插件，
##### （8）copy-webpack-plugin，不需要处理的文件直接copy到build下
