const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const rollup = require('gulp-rollup');
const replace = require('rollup-plugin-replace');

//开发环境
gulp.task('builddev', () => {
    return watch('./src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeuii/**/*.js')
            .pipe(babel({
                babelrc: false,
                "plugins": [
                    "transform-decorators-legacy",
                    "transform-es2015-modules-commonjs"
                ]
            }))
            .pipe(gulp.dest('./build/'))
    })
});


//第一版开发环境的配置
//生产环境 babel+rollup 清理无用代码 
//任务1，babel编译，排除掉app.js文件
gulp.task('buildbabel', () => {
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(babel({
            babelrc: false,
            "ignore":["./src/nodeuii/app.js"],
            "plugins": [
                "transform-decorators-legacy",
                "transform-es2015-modules-commonjs"
            ]
        }))
        .pipe(gulp.dest('./build/'))
});
//任务2，rollup进行tree-shaking
gulp.task('buildrollup', () => {
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(rollup({
            input: ['./src/nodeuii/app.js'],
            format: 'cjs',
            "plugins": [
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production')
                })
            ]
        }))
        .pipe(gulp.dest('./build/'))
});
//将上面俩个任务合并成prod任务
gulp.task('buildprod', ["buildbabel","buildrollup"]);

const _flag = (process.env.NODE_ENV == "production");
gulp.task('default', [_flag ? "buildprod" : "builddev"]);