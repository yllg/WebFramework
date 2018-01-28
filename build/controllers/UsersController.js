'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _dec2, _dec3, _dec4, _class, _desc, _value, _class2;

var _awilixKoa = require('awilix-koa');

var _lgAuthenticate = require('../middlewares/lgAuthenticate');

var _lgAuthenticate2 = _interopRequireDefault(_lgAuthenticate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

let UserAPI = (_dec = (0, _awilixKoa.route)('/users'), _dec2 = (0, _awilixKoa.route)('/:id'), _dec3 = (0, _awilixKoa.GET)(), _dec4 = (0, _awilixKoa.before)([(0, _lgAuthenticate2.default)()]), _dec(_class = (_class2 = class UserAPI {
  constructor({ userService, user }) {
    this.userService = userService;
    this.user = user;
  }

  //注册了 /users/:id 的路由哦； users/4 就进入到下面的async函数里
  //拿回来一个promise的API
  //use的方式load所有的controller，所以可以使用ctx

  async getUser(ctx) {
    const DIdata = this.user;
    console.log("DI贯穿的值：", DIdata);
    const serviceData = await this.userService.get(ctx.params.id);
    console.log("userService处理后的数据：", serviceData);
    ctx.body = await ctx.render('users/index', { serviceData: serviceData, DIdata: DIdata });
  }

}, (_applyDecoratedDescriptor(_class2.prototype, 'getUser', [_dec2, _dec3, _dec4], Object.getOwnPropertyDescriptor(_class2.prototype, 'getUser'), _class2.prototype)), _class2)) || _class);
exports.default = UserAPI;