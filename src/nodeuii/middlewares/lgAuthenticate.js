const lgAuthenticate = () =>{
    return (target, property, descriptor)=>{
        //拦截了原本的 /users/4 的路由
        //target是目标的类UserAPI，
        //property本来是方法getUser，asyncy异步了这里是next()
        // console.log("路由守护 target内容：", target);
        // console.log("路由守护 property内容：", property);

        //条件满足就继续，不满足就拦截重定向，可用作登陆验证
        //这里先写死，通过验证
        const result = 'ok';
        if(result == 'ok'){
            console.log("路由守护，通过验证");
            return property();
        }else{
            target.redirect('http://www.baidu.com');
        }
    }
}

export default lgAuthenticate;