function htmlAfterWebpackPlugin(options){
    //需要打包的数据流
    this.options = options;
}

function assetsHelp(arrs){
    let css=[],js=[];
    const dir = {
        js:item=>`<script src="${item}"></script>`,
        css:item=>`<link rel="stylesheet" href="${item}"></link>`
    }
    for(let jsitem of arrs.js){
        js.push(dir.js(jsitem));
    }
    for(let cssitem of arrs.css){
        css.push(dir.css(cssitem));
    }
    return{
        css,
        js
    }
}

htmlAfterWebpackPlugin.prototype.apply = function(complier){
    complier.plugin('compilation',function(compilation){
        compilation.plugin('html-webpack-plugin-before-html-processing',function(htmlPluginData,callback){
            //htmlPluginData能拿到所有的静态资源
            // console.log("htmlPlugin获取的数据：",htmlPluginData.assets);
            //把要处理的html拿过来
            let _html = htmlPluginData.html;
            const result = assetsHelp(htmlPluginData.assets);
            // console.log(result);
            _html = _html.replace("<!--injectcss-->",result.css.join(""));
            _html = _html.replace("<!--injectscripts-->",result.js.join(""));
            //把处理后的html数据放回去
            htmlPluginData.html = _html;
            callback(null,htmlPluginData);
        });
    })
};

module.exports = htmlAfterWebpackPlugin;


