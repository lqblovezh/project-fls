<script>
import {
    main
} from '@/util/dy'
import * as service from "services/common/user"
export default {
  mixins: [main],
  data(){
    return {
      service,
      query:{
         name:'',
         phone:'',
         time_start:'',
         time_end:'',
      },
      ids:[],
      dialogVisible:false,
      pt:{teach:true,read:true},
      sex:"1",
      isUse:true,
      options:[
        {label:'x-teach',value:"teach"},
        {label:'x-read',value:'read'}
        ],
    }
  },
  methods:{
    getTime(time){
       this.query.time_start = time[0];
       this.query.time_end = time[1]
    },
    handleSelectionChange(val) {
      this.ids = val.map(el=>{
          return el.id
      })
      this.multipleSelection = val;
    },
    handleClose(){
      this.dialogVisible= false
      
    },
    sendMessage(){
      log("发送信息")
      this.dialogVisible= false
    },
    disabled(){
       this.isUse = !this.isUse
    }
  }
}
</script>

<template lang="pug">
Dy(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="订单号"  clearable v-model="query.name")
    el-input.dy_inputWidth(placeholder="用户名" clearable v-model="query.phone")
    el-input.dy_inputWidth(placeholder="手机号" clearable v-model="query.phone")
    TimePick(@getTime="getTime")
    el-select.dy_inputWidth(v-model="query.phone" clearable placeholder="请选择平台")
      el-option(v-for="item in options" :key="item.value" :label="item.label" :value="item.value")
    el-button(type="primary" @click="seareHandeler(query)") 搜索
    el-button(type="danger" @click="del(ids)" ) 批量删除
  .list(slot="list")
    el-table(ref="table"
            stripe
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"  
            @selection-change="handleSelectionChange"
            )
      el-table-column(type="selection" width="55" fixed)
      el-table-column( prop="name" label="序号")
      el-table-column( prop="phone" label="订单号" )
      el-table-column( prop="email" label="购买用户")
      el-table-column( prop="address" label="手机号" )
      el-table-column( prop="address" label="金额" )
      el-table-column( prop="create_time" label="交易时间" show-overflow-tooltip)
      el-table-column(label="平台" )
      el-table-column(label="操作" fixed="right")
        template(slot-scope="scope")
          i.dy_icon.dy_primary.el-icon-edit(title="详情" @click="$refs.child.dialogVisible= true")
          i.dy_icon.dy_danger.el-icon-delete(title="删除" @click="del(scope.row.id)")  
  .detail(slot="detail")
    .group
      .lside 订单信息
      .rside
        p 
          span 订单编号
          span xxxxxxxxxx
        p
          span 平台
          span x-teach
        p  
          span 交易时间
          span 2016-12-25 15:23:26
    .group 
      .lside 商品信息
      .rside 
        el-table.hight(:data="tableData" border style="width: 100%" show-summary)
          el-table-column(label="商品序号" width="200")
          el-table-column(label="商品名称" width="200")
          el-table-column(label="类别" width="100")
          el-table-column(label="价格" width="100")
    .group 
      .lside 用户信息
      .rside 
        p 
          span 用户名
          span xxxxxxxxxx
        p
          span 绑定手机号
          span xxxxxxxxxx
        p 
          span 用户积分
          span 355
    .group 
      .lside 支付信息
      .rside
        p
          span 支付方式 
          span xxxxxxxxxx
        p
          span 商品金额
          span 10
        p
          span 支付时间
          span 2016-12-25 15:23:25
        p  
          span 优惠券 
          span 5元优惠券
        p 
          span  实际付款
          span 20
        p 
          span 获得积分
          span 20
    .group(v-if="false")
      .lside  教师收入
      .rside 
        p 
          span 教师名称
          span 教师名称1
        p 
          span 课程名称
          span 产品名称
        p   
          span 提成
          span 0.20
    .group(v-else)
      .lside 分销信息
      .rside
        p 
          span 分销用户
          span xxxxxxxxxx
        p 
          span 分销产品
          span 产品名称
        p 
          span 分销金额
          span 2.00
        p 
          span 分销提成
          span 0.20
</template>



<style lang="stylus" scoped>
borderColor = #e8e8e8
.group 
  border-bottom 1px dashed borderColor
  display flex
  line-height 30px
  padding 10px
  .lside 
    width 150px
    font-weight bold
  .rside 
    span
      display inline-block
      margin-right 20px
      &:nth-child(1)
        width 140px
</style>




