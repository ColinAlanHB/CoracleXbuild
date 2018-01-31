var vm = new Vue({
    el:'#Page',
    data:{
        selected:"1",
        list:[
            {
                isNew:true,
                name:'宁夏扶贫项目',
                phone:'0951-83360909',
                time:'2016-03-15 12:30',
                state:0 // 0-待处理  1-处理中  2-已关闭
            },
            {
                isNew:false,
                name:'宁夏扶贫项目',
                phone:'0951-83360909',
                time:'2016-03-15 12:30',
                state:1
            },
            {
                isNew:true,
                name:'宁夏扶贫项目',
                phone:'0951-83360909',
                time:'2016-03-15 12:30',
                state:2
            },
            {
                isNew:false,
                name:'宁夏扶贫项目',
                phone:'0951-83360909',
                time:'2016-03-15 12:30',
                state:0
            },
            {
                isNew:true,
                name:'宁夏扶贫项目',
                phone:'0951-83360909',
                time:'2016-03-15 12:30',
                state:1
            }
        ]
    },
    computed:{
        stateList:function () {
            var arr=[[],[],[]];
            this.list.forEach(function (v) {
                if(v.state==0){
                    arr[0].push(v);
                }
                if(v.state==1){
                    arr[1].push(v);
                }
                if(v.state==2){
                    arr[2].push(v);
                }
            })
            return arr;
        }
    }
})