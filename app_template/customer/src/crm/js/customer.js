var vm = new Vue({
    el:'#Page',
    data:{
        buttonBottom: 0,
        list:[
            {
                createDate:'2016-03-25',
                name:'深圳星光电工有限公司',
                address:'深圳市龙华新区观澜高新园区观清路2号',
                contactNum:1,
                chanceNum:2,
                team:1,
                responsible:'陈阳'
            },
            {
                createDate:'2016-03-25',
                name:'深圳星光电工有限公司',
                address:'深圳市龙华新区观澜高新园区观清路2号',
                contactNum:1,
                chanceNum:2,
                team:1,
                responsible:'陈阳'
            },
            {
                createDate:'2016-03-25',
                name:'深圳星光电工有限公司',
                address:'深圳市龙华新区观澜高新园区观清路2号',
                contactNum:1,
                chanceNum:2,
                team:1,
                responsible:'陈阳'
            }
        ],
        popup1: {
            visible1: false,
            activeIndex: 0,
            list: [
                '按跟进时间',
                '按创建时间',
                '按预测金额'
            ]
        },
        popup2: {
            visible1: false,
            typeIndex: 0,
            list: [
                {
                    title: '客户等级',
                    activeIndex: 0,
                    list: [
                        '所有',
                        'A级',
                        'B级',
                        'C级',
                        'D级'
                    ]
                },
                {
                    title: '客户分布',
                    activeIndex: 0,
                    list: [
                        '城市',
                        '华南',
                        '华北',
                        '华北',
                        '华北',
                        '华北',
                        '华北',
                        '华北',
                        '华东',
                        '华西'
                    ]
                }
            ]
        },
        selected: 0,
        wrapperHeight: 0
    },
    computed:{
        selectedVal:function () {
            return this.popup2.list[0].list[this.popup2.list[0].activeIndex] + this.popup2.list[1].list[this.popup2.list[1].activeIndex];
        }
    },
    methods:{
        selectTime:function(index) {
            this.popup1.activeIndex = index;
            this.popup1.visible1 = false;
        },
        select:function(index) {
            this.popup2.list[this.popup2.typeIndex].activeIndex = index;
            this.popup2.visible1 = false;
        },
        selectType:function(index) {
            this.popup2.typeIndex = index;
        }
    },
    mounted:function () {
        this.buttonBottom = this.$refs.button.$el.getBoundingClientRect().bottom;
    }
})