var vm = new Vue({
    el:'#Page',
    data:{
        list:[
            {
                name:'第三届深圳互联网展览会',
                organiser:'中国深圳市政府',
                date:'2016-04-14',
                state:0 // 0-未开始   1-已开始  2-已结束
            },
            {
                name:'第三届深圳互联网展览会',
                organiser:'中国深圳市政府',
                date:'2016-04-14',
                state:1
            },
            {
                name:'第三届深圳互联网展览会',
                organiser:'中国深圳市政府',
                date:'2016-04-14',
                state:2
            }
        ]
    },
    filters:{
      getState:function (state) {
          if(state == 0){
              return '未开始'
          }
          if(state == 1){
              return '已开始'
          }
          if(state == 2){
              return '已结束'
          }
      }
    }
})