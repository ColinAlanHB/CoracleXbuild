var vm = new Vue({
    el:'#Page',
    data:{
        selected:"1",
        list:[
            {
                isAllot:true,
                name:'广东省兴康饮食有限公司',
                phone:'0951-83360909',
                time:'2016-03-15  12:30'
            },
            {
                isAllot:false,
                name:'广东省兴康饮食有限公司',
                phone:'0951-83360909',
                time:'2016-03-15  12:30'
            },
            {
                isAllot:true,
                name:'广东省兴康饮食有限公司',
                phone:'0951-83360909',
                time:'2016-03-15  12:30'
            },
            {
                isAllot:false,
                name:'广东省兴康饮食有限公司',
                phone:'0951-83360909',
                time:'2016-03-15  12:30'
            },
            {
                isAllot:true,
                name:'广东省兴康饮食有限公司',
                phone:'0951-83360909',
                time:'2016-03-15  12:30'
            }
        ]
    },
    computed:{
        allotList:function () {
            var arr=[[],[]];
            this.list.forEach(function(val){
                if(val.isAllot == true){
                    arr[0].push(val)
                }else{
                    arr[1].push(val)
                }
            })
            return arr;
        }
    }
})