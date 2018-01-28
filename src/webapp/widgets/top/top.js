
require('./top.css');

const top = {
    init(){
        var app5 = new Vue({
            el: '#app-5',
            data: {
                message: 'Hello Vue.js!'
            },
            methods: {
                reverseMessage: function () {
                    this.message = this.message.split('').reverse().join('')
                }
            }
        });
        console.log('vue init');
    }
}
export default top;