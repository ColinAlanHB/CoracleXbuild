new Vue({
    el:'#Page',
    data:{
        isShowReply:false,
        addComment:''
    },
    methods:{
        location:function (url) {
            location.href=url;
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
    }
})