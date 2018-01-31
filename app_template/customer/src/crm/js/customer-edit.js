var vm = new Vue({
    el:'#Page',
    data:{
        visible: false,
        pickType: '',
        pickValTemp: '',
        customer:{
            name:'深圳星光电工有限公司',
            sname:'深圳星光电工有限公司',
            adds:'深圳市龙华新区观澜高新园观清路2号',
            level:'',
            type:'',
            tel:'23444444',
            website:'www.bac.com',
            email:'sss@abc.com',
            count:30000,
            money:3000000000,
            ceo:'王总'
        },
        slots: {
            level: [{
                flex: 1,
                defaultIndex: 0,
                values: ['A级', 'B级', 'C级', 'D级']
            }],
            type: [{
                flex: 1,
                values: ['软件行业', '国际组织', '其他']
            }]
        }
    },
    methods:{
        onChange(picker, values) {
            this.pickValTemp = values[0];
        },
        selectConfirm() {
            this.customer[this.pickType] = this.pickValTemp;
            this.visible = false;
        },
        pick(type) {
            this.pickType = type;
            this.visible = true;
        },
    }
})