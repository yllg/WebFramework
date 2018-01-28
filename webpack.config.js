const DevWebpack = require('./config/webpack.dev');
const ProdWebpack = require('./config/webpack.prod');

switch(process.env.NODE_ENV){
    case 'development':
        module.exports = DevWebpack;
        break;
    case 'production':
        module.exports = ProdWebpack;
        break;
    default:
        module.exports = DevWebpack;
}


