"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
let IndexService = class IndexService {
    constructor() {}
    get(id) {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve("Hello World" + "【" + id + "】,users/:id 的id可以随意");
                //`${id}` ES6的写法
            }, 1000);
        });
    }
};
exports.default = IndexService;