'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _dec2, _dec3, _class, _desc, _value, _class2;

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

let IndexAPI = (_dec = (0, _awilixKoa.route)('/'), _dec2 = (0, _awilixKoa.GET)(), _dec3 = (0, _awilixKoa.before)([(0, _lgAuthenticate2.default)()]), _dec(_class = (_class2 = class IndexAPI {
  constructor({ indexService }) {
    console.log("拿到注入的indexService！");
    this.indexService = indexService;
  }

  //注册了/默认路由

  async getIndex(ctx) {
    // console.log("准备进入indexService");
    const result = this.indexService.init();
    console.log("indexService处理后的数据：", result);
    ctx.body = await ctx.render('users/index', { serviceData: result });
  }

}, (_applyDecoratedDescriptor(_class2.prototype, 'getIndex', [_dec2, _dec3], Object.getOwnPropertyDescriptor(_class2.prototype, 'getIndex'), _class2.prototype)), _class2)) || _class);
exports.default = IndexAPI;