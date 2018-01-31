new Vue({
    el:'#Page',
    data:{
        photolist:[{
            "newsImg":"news_photoList/css/myImg/huoban.png",
            "imgTit":"它的小伙伴们",
            "commentNum":"24",
            "imgNum":"4"
            }, {
                "newsImg":"news_photoList/css/myImg/lvse.png",
                "imgTit":"绿色生活",
                "commentNum":"90",
                "imgNum":"14"
            }],
        topStatus: '',
        wrapperHeight: 0
    },
    methods:{
        location:function (url) {
          location.href=url;
        },
        handleTopChange:function (status) {
            this.topStatus = status;
        },

        loadTop:function() {
            var _this= this;
            setTimeout(function(){
                _this.photolist.unshift({
                    "newsImg":"news_photoList/css/myImg/huoban.png",
                    "imgTit":"它的小伙伴们",
                    "commentNum":"24",
                    "imgNum":"4"
                });
                _this.$refs.loadmore.onTopLoaded();
             }, 1500);
        }
    },
    mounted() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
    }
})