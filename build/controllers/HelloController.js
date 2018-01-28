'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _dec, _dec2, _class, _desc, _value, _class2;

var _awilixKoa = require('awilix-koa');

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

let TestAPI = (_dec = (0, _awilixKoa.route)('/test'), _dec2 = (0, _awilixKoa.GET)(), _dec(_class = (_class2 = class TestAPI {
  constructor({ testService }) {
    console.log("拿到注入的testService！");
    this.testService = testService;
  }

  //注册了/test路由

  async getTest(ctx) {
    // console.log("准备进入testService");
    const result = this.testService.find();
    console.log("testService处理后的数据：", result);
    ctx.body = await ctx.render('users/index', { serviceData: result });
  }

}, (_applyDecoratedDescriptor(_class2.prototype, 'getTest', [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, 'getTest'), _class2.prototype)), _class2)) || _class);
exports.default = TestAPI;