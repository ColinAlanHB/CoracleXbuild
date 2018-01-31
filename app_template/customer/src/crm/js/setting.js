var vm = new Vue({
    el:'#Page',
    data: {
        version: '3.0.1'
    },
    filters: {
        vPrefix: function (str) {
            return 'v' + str;
        }
    }
});