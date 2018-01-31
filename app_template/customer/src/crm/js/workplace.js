var vm = new Vue({
    el:'#Page',
    data:{
        searchval:'',
        isopen:false,
        wrapHeight:0
    },
    methods:{
        togglemenu:function (val) {
            this.isopen=val;
        }
    },
    mounted:function () {
        document.getElementById('Page').style.visibility='visible';
        this.wrapHeight=document.documentElement.clientHeight;
    }
})