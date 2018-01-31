new Vue({
    el:'#Page',
    data:{
        value:[]
    },
    methods:{
        location:function (url) {
            if(url==-1){
                history.back();
            }else{
                location.href=url;
            }
        }
    }
})