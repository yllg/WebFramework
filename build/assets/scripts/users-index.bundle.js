webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__widgets_top_top_js__ = __webpack_require__(1);



__WEBPACK_IMPORTED_MODULE_0__widgets_top_top_js__["a" /* default */].init();

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

__webpack_require__(2);

var top = {
    init: function init() {
        var app5 = new Vue({
            el: '#app-5',
            data: {
                message: 'Hello Vue.js!'
            },
            methods: {
                reverseMessage: function reverseMessage() {
                    this.message = this.message.split('').reverse().join('');
                }
            }
        });
        console.log('vue init');
    }
};
/* harmony default export */ __webpack_exports__["a"] = (top);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
],[0]);