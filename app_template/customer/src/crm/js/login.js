var vm = new Vue({
    el:'#Page',
    data: {
        user: 'sales',
        pwd: '',
        options: [
            {
                label: "记住密码",
                value: 0
            }
        ],
        checks: []
    },
    computed: {
        isRembPwd: function () {
            return this.checks.filter(function (checked) {
                    return 0 == checked.value;
                }).length > 0;
        },
        // 用户名验证
        alertMsg: function () {
            if(!this.user){
                return '用户名为空！';
            }
            else if(!this.pwd){
                return '密码为空！'
            }
            return ''
        }
    },
    mounted: function () {
        // co-field 未暴露原生 input 元素事件
        // 查询已挂载元素
        var pwdEl = document.querySelector('#pwd input');
        pwdEl.addEventListener('focus', function() {
            if(this.pwd){
                pwdEl.select();
            }
        });
    },
    methods: {
        login: function () {
            if (this.alertMsg) {
                this.$messagebox({
                    title: '温馨提示！',
                    message: this.alertMsg,
                    showCancelButton: false
                });
                return;
            }

            this.$indicator.open({
                text: '正在登录...',
                spinnerType: 'fading-circle'
            });
            location.href='index.html';

            // Ajax 请求
            setTimeout(function () {
                this.$indicator.close();

                this.$toast({
                    message: '用户名或密码错误',
                    duration: 1024
                })
            }, 3000);
        }
    }
})