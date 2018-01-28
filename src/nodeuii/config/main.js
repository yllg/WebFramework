import _ from 'lodash';
import local from './local';
import path from 'path';


const server = {
    "port":8082
};

let config = {
    "viewDir": path.join(__dirname,'../','views'),
    "staticDir": path.join(__dirname,'../','assets'),
    "env": process.env.NODE_ENV
};


//判断生产环境还是开发环境
if(config.env == "production"){
    config = _.extend(config,server);
}else{
    config = _.extend(config,local);
}

export default config;