new Vue({
    el:'#Page',
    data:{
        isShowReply:false,
        wrapperHeight:0,
        topStatus: '',
        comment:[{
            "avator":"news_comment/css/myImg/comImg.png",
            "username":"xxxxxxxx",
            "time":"1小时前",
            "city":"青岛市",
            "content":"kjskdjk",
            "followReply":[{
                "replyName":"shoujia",
                "replyContent":"good point"
            },{
                "replyName":"oooo",
                "replyContent":"werwrrwrwr"
            }],
            "praise":"10"
        },
            {
            "avator":"news_comment/css/myImg/comImg.png",
            "username":"jjjjjj",
            "time":"30分钟前",
            "city":"南阳市",
            "content":"sdasdfsfasewsdgg",
            "followReply":[{
                "replyName":"45454545",
                "replyContent":"ssddddffdsfds"
            },{
                "replyName":"88888",
                "replyContent":"asdafasfdsabf"
            }],
            "praise":"5"
        }],
        addComment:''
    },
    methods:{
        location:function(url) {
            location.href=url;
        },
        handleTopChange:function(status) {
            this.topStatus = status;
        },
        loadTop:function() {
            setTimeout(() => {
            this.comment.push({
                "avator":"news_comment/css/myImg/comImg.png",
                "username":"xxxxxxxx",
                "time":"1小时前",
                "city":"青岛市",
                "content":"kjskdjk",
                "followReply":[{
                    "replyName":"shoujia",
                    "replyContent":"good point"
                },{
                    "replyName":"oooo",
                    "replyContent":"werwrrwrwr"
                }],
                "praise":"10"
            });
            this.$refs.loadmore.onTopLoaded();
        }, 1500);
        },
        submitComment:function () {
            if(this.addComment==''){
                this.$toast({
                    message: '请填写评论',
                    position: 'bottom',
                    duration: 2000
                });
                return;
            }

            this.isShowReply=false;
            this.addComment='';
            this.$toast({
                message: '提交成功',
                duration: 2000
            });
        }
    },
    mounted: function() {
        this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top + document.getElementById('Footer').clientHeight;
    }
})