new Vue({
    el:'#Page',
    data:{
        newskv:[
            {"imgsrc":"images/news1.jpg","title":"姚明3岁女儿1米3，遗传公式推测未来身高超1米9"},
            {"imgsrc":"images/news2.jpg","title":"哭泣的丽都"},
            {"imgsrc":"images/news3.png","title":"客机失联谜团或永远无法解开"}
        ],
        newskvStr:'',
        list:[
            {"id":1,"newsimg":"images/newsImg1.png","title":"国务院严格控制新设行政许可","msg":"国务院总理李克强21日主持召开国务院常务会议，决定出台严格控制新设行政许可的","replynum":78},
            {"id":2,"newsimg":"images/newsImg1.png","title":"国务院严格控制新设行政许可","msg":"国务院总理李克强21日主持召开国务院常务会议，决定出台严格控制新设行政许可的","replynum":78},
            {"id":3,"newsimg":"images/newsImg1.png","title":"国务院严格控制新设行政许可","msg":"国务院总理李克强21日主持召开国务院常务会议，决定出台严格控制新设行政许可的","replynum":78},
            {"id":4,"newsimg":"images/newsImg1.png","title":"国务院严格控制新设行政许可","msg":"国务院总理李克强21日主持召开国务院常务会议，决定出台严格控制新设行政许可的","replynum":78},
            {"id":5,"newsimg":"images/newsImg1.png","title":"国务院严格控制新设行政许可","msg":"国务院总理李克强21日主持召开国务院常务会议，决定出台严格控制新设行政许可的","replynum":78}
        ],
        allLoaded: false,
        bottomStatus: '',
        wrapperHeight: 0,
        selected:'新闻'
    },
    methods: {
        location:function (url) {
            location.href=url;
        },
        handleChange: function(i){
            this.newskvStr= this.newskv[i].title;
        },
        handleBottomChange: function(status) {
            this.bottomStatus = status;
        },
        loadBottom: function() {
            var _this=this;
            setTimeout(function(){
                var len = _this.list.length;
                 if (len < 10) {

                } else {
                    _this.allLoaded = true;
                }
                _this.$refs.loadmore.onBottomLoaded();
             }, 1500);
        }
    },
    mounted: function() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top-this.$refs.tabbar.getClientRects()[0].height;
        this.newskvStr= this.newskv[0].title;
    }
})