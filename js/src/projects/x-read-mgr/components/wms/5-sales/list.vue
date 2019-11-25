<script>
import * as services from 'services/x-read/distribution'
import {publicMixin} from '@/util/mixins'

export default {
    mixins: [publicMixin],
  data() {
    return {
      services,
      pickerOptions: {},
      ctimePick:'',
      list:[] ,
      currentPage:1,
      page:'',
      multipleSelection: [],
      status:[
        {txt:'未结算',value:'0'},
        {txt:'已结算',value:'1'},
        {txt:'驳回兑付',value:'2'},
      ],
      infoData:null,
      backMsg:'',
      stateValue:'',
      value:'',
      where:{pageOffset:10,pageStart:0,order_id:'',user_name:'',phone:'',status:''},
      dialogVisible:false,
      activeName2: 'first'
    };
  },
  methods:{
   getList(where){
           services.getList(where).then(res=>{
              this.list = res.data;
              this.page = res.page;
           })
       },
       addInfo(){
           this.dialogVisible = true;
       },
       del(id){
           services.del({id}).then(_=>{
               this.getList(this.where);
           })
       },
       addsend(forName){
           this.$refs[forName].validate((valid)=>{
                if(valid){
                    services.save(this.infoAdd).then(_=>{
                       this.getList(this.where);
                    })
                    this.dialogVisible = false;
                    this.infoAdd={contents:'',title:'',type:''};
                }else{
                    alert('error submit!!')
                    return false;
                }
           })
           
       },
       search(){
         // log(this.where)
          this.getList(this.where);
       },
      handleSizeChange(val) {
         this.where.pageOffset = val;
         this.getList(this.where);
      },
      handleCurrentChange(val) {
        this.where.pageStart = (val-1)*this.where.pageOffset;
        this.getList(this.where); 
      },
      handleClick(){
             
      },
      detail(id){
         services.detail({id:id}).then(res=>{
             log(res.data,321)
            this.infoData = res.data;
            this.dialogVisible = true;
         })
      },
      backMsgSend(){
          services.save({feedback_id:this.infoData.data.id,content:this.backMsg}).then(_=>{
             this.$message.success('回复成功');
             this.backMsg='';
             this.detail(this.infoData.data.id);
          }) 
      }
    },
   created(){
       this.getList(this.where);
   },
   watch:{
       ctimePick(){
           this.where.time_start = this.ctimePick[0];
           this.where.time_end = this.ctimePick[1];
       }
   },
   computed:{
       pay_type(){
           switch(this.infoData.pay_type){
               case 1 : return '银行卡';
               case 2 : return '支付宝';
               case 3 : return '微信';
               default : return '无法获取'
           }
       }
   }
}
</script>


<template lang="pug">
.box 
    .top.serachWrap 
        form#mainForm
            span.group-inline
                el-input(placeholder="输入手机号搜索"  v-model='where.order_id' name="order_id" clearable)
            span.group-inline
                el-input(placeholder="输入用户搜索"  v-model='where.user_name' name="user_name" clearable)
            span.group-inline
                el-input(placeholder="输入手机号搜索"  v-model='where.phone' name="phone" clearable)
            span.group-inline
                TimePick(:inputsName="['start_time','end_time']" :placeholder="['创建起始时间','创建结束时间']")
            span.group-inline
                el-select(v-model="where.status" placeholder='选择状态搜索')
                    el-option(v-for="item in status"   :label="item.txt" :value="item.value" :key='item.txt')
            span.group-inline.right
                el-button(type="primary" plain @click='search' icon="el-icon-search") 搜索
                el-button(type="primary" plain @click="educe()") 导出查询
    .content 
        table.list
            thead
                tr 
                    td  序号  
                    td(width='150')  订单单号 
                    td(width='150')  用户名
                    td  绑定手机号
                    td  支付时间
                    td  商品数量
                    td  订单金额
                    td  分销用户
                    td  分销金额
                    td  奖励金额 
                    td  结算状态
                    td  操作
            tbody 
                tr(v-for="(item,index) in list")
                   td {{index+1}}
                     input(type="hidden" ref="ids")
                   td {{item.order_id}}
                   td {{item.user_name}}
                   td {{item.phone}}
                   td {{item.pay_time}}
                   td 1
                   td {{item.money}} 
                   td {{item.distributor_info.distributor_nick}}
                   td {{item.distribute_money}} 
                   td {{item.reward_money}} 
                   td {{status[item.status]['txt']}}
                   td 
                      el-button( size='medium' type="primary" plain @click='detail(item.order_id)') 详情
        .page
            el-pagination(@size-change="handleSizeChange" 
                          @current-change="handleCurrentChange" 
                          background
                          :current-page="currentPage" 
                          :page-sizes="[10, 50,100]"
                          :page-size="10" 
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="page.total"
                          )
    el-dialog.dialog( width="800px" :visible.sync="dialogVisible" v-if="dialogVisible")
      .header(slot="title")
        el-tabs(value="detail")
          el-tab-pane(label="详情" name="detail")
      .part
          .lside 订单信息
          .rside
              p 订单编号： {{infoData.id}}
              p 订单状态： {{infoData.pay_status}}
              p 创建时间： {{infoData.create_time}} 
      .part
        .lside 商品信息
        .rside 
            el-table(:data='infoData.goods_info' border show-summary style='width:100%' )
                el-table-column(prop='id' label='商品序号' width="300" )
                el-table-column(prop='name' label='商品名称' )
                el-table-column(prop='type_name',label='所属产品' )
                el-table-column(prop='goods_price',label = '价格')
      .part
        .lside 用户信息
        .rside
          p 用户名： {{infoData.user_name}}
          p 绑定手机号： {{infoData.phone}}
          p 用户积分： {{infoData.credit}}
      .part
        .lside 支付信息
        .rside 
          p 支付方式： {{pay_type}}
          p 支付金额： {{infoData.pay_price}}
          p 支付时间： {{infoData.pay_time}}
      .part 
        .lside 分销信息
        .rside 
            p 分销用户： {{infoData.distributor_info.distributor_nick}}
            p 分销产品： 
                span(v-for="bookName in infoData.goods_info") {{bookName.name}}
            p 分销金额： {{infoData.pay_price}}
            p 分销提成：{{infoData.distributor_info.reward_money}}           
      span(slot="footer" class="dialog-footer")
        el-button(type="info" @click="dialogVisible = false") 关闭
</template>

<style lang="stylus" scoped>
.rside,.lside
  line-height 40px
.box 
    background #ececec
    padding 0 15px
    min-height 650px
    min-width 1660px
    .top
        padding 15px
        background #fff
        margin-bottom 20px
        .group-inline
             margin 0 4px
            .form-control
               width 100%
               height 40px
    .list
        border 15px solid #fff
        background #fff
        width 100%
        line-height 30px
        margin-bottom 50px
        font-size 14px
        thead 
          background #ececec
          tr 
            background #ececec
            td  
                padding 10px
                text-align center
        tbody
            tr
                transition 0.1s
                &:nth-child(2n)
                    background #eee
                td  
                    line-height 25px
                    text-align center
                    padding 10px
                    vertical-align: middle;
    .page
        text-align center;
        padding-bottom 50px
  .dialog
    .part
      border-bottom  1px dashed #e8e8e8
      overflow  hidden
      padding 10px 0
      .lside 
        float left
        padding 0 50px 0 30px
      .rside
        float left

</style>
