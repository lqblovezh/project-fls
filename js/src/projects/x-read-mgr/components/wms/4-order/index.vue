<script>
import {publicMixin} from '@/util/mixins'
import formSerialize from "form-serialize"
import * as services from 'services/x-read/order'


export default {
  mixins: [publicMixin],
  data () {
    return {
      services,
      list: null,
      page: null,
      type:{
        value: '',
        list: [
          {name:'所有',value:''},
          {name:'等待支付',value:'0'},
          {name:'支付完成',value:'1'},
          {name:'支付关闭',value:'-1'},
        ],
      },
      timePick:null,
      ctimePick:null,
      detailVisible:null,
      detailDate:null,
    }
  },
  computed: {
    totalPrice() {//计算总价格
      let price = 0
      this.detailDate.goods_info.forEach(item => {
        price+=item.goods_price
      })
      return price.toFixed(2)
    }
  },
  methods: {
    async getList(pageNum=this.page&&this.page.num||1 , pageOffset=this.page&&this.page.offset||10, query) {//获取列表信息
      const data = {
        pageNum,
        pageOffset,
        ...query,
      }
      await services.getList(data).then(res => {
        this.page = res.page
        this.list = res.data
         log(this.list);
      })
    },
    opneDetail(item) {//订单详情
      services.detail({id:item.id}).then(res =>{
        log(res)
        this.detailDate = res.data
        this.detailDate.order = []
        this.detailVisible = true
      })
    },
  }
}
</script>


<template lang="pug">
.clearfix
  .mainRight
    .contentWrap
      .contentLeft
        .maindata
          .serachWrap
            .title
            form#mainForm
              span.group-inline
                el-input(placeholder="输入单号搜索" name="order" clearable v-model="searchQuery.order")
              span.group-inline
                el-input(placeholder="输入用户搜索" name="user_name" clearable v-model="searchQuery.user_name")
              span.group-inline
                el-input(placeholder="输入手机号搜索" name="phone" clearable v-model="searchQuery.phone")
              span.group-inline
                TimePick(:inputsName="['start_time','end_time']" :placeholder="['创建起始时间','创建结束时间']")
              span.group-inline
                TimePick(:inputsName="['start_pay','end_pay']" :placeholder="['支付起始时间','支付结束时间']")
              span.group-inline
                select.form-control.width-small(name="pay_status")
                  option(value="") 所有
                  option(value="0") 等待支付
                  option(value="1") 支付完成
                  option(value="-1") 支付关闭
                //- el-select(v-if="type.list" v-model="type.value" name="pay_status" placeholder="选择状态搜索" clearable)
                //-   el-option(
                //-     v-for="item in type.list"
                //-     :key="item.value"
                //-     :label="item.name"
                //-     :value="item.value"
                //-   )
              span.group-inline
                el-button(size="mediu" type="primary" icon="el-icon-search" @click="seareHandeler" plain ) 搜索
                el-button(size="mediu" type="primary" icon="el-icon-search" @click="educe()" plain ) 导出
          .tableWrap
            table.table
              thead
                tr
                  th(width=40) 序号
                  th 订单单号
                  th 用户名
                  th 绑定手机号
                  th 创建时间
                  th 商品数量
                  th 订单金额
                  th 订单状态
                  th 支付时间
                  th(width=40) 操作
              tbody(v-if="list")
                tr(v-for="item,index in list")
                  td
                    span {{index+1}}
                    input(type="hidden" :value="item.id" ref="ids")
                  td.th-name(:title="item.id") {{item.id}}
                  td
                    div(:title="item.user_nick||item.user_name") {{item.user_nick||item.user_name}}
                  td {{item.phone}}
                  td {{item.create_time}}
                  td {{item.goods_num}}
                  td {{item.pay_price}}
                  td {{item.pay_status}}
                  td {{item.pay_time}}
                  td
                    .btns
                      span.icon.icon-detail(size="mini" title="详情" @click="opneDetail(item)"  type="primary"  plain)
          .pageWrap(v-if="page")
            el-pagination(
              :small="false"
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.num"
              :page-sizes="[10, 50, 100]"
              :page-size="page.offset"
              layout="total, sizes,prev, pager, next, jumper"
              :total="page.total")

    //- 详情dialog
    el-dialog(:visible.sync="detailVisible" width="1000px" top="50px" v-if="detailDate")
      .header(slot="title")
        el-tabs(value="detail")
          el-tab-pane(label="订单详情" name="detail")
      el-form
        el-form-item(label="订单信息:" label-width="120px")
          p
            span 订单编号：
            span {{detailDate.id}}
          p
            span 订单状态：
            span {{detailDate.pay_status}}
          p
            span 创建时间：
            span {{detailDate.create_time}}
        el-form-item(label="商品信息" label-width="120px")
          table.table(width="100%")
              thead
                tr
                  th 商品序号
                  th 商品名称
                  th 所属产品
                  th 价格
              tbody(v-if="detailDate.goods_info.length")
                tr(v-for="item,index in detailDate.goods_info")
                  td(v-text='index+1')
                  td {{item.name}}
                  td {{item.type_name}}
                  td {{item.goods_price}}
                tr
                  td(style="text-align: right" colspan="3") 合计:
                  td(v-text="totalPrice")
        el-form-item(label="用户信息:" label-width="120px")
          p
            span 用户名：
            span {{detailDate.user_nick||detailDate.user_name}}
          p
            span 绑定手机号：
            span {{detailDate.phone}}
          p
            span 用户积分：
            span {{detailDate.credit}}
        el-form-item(label="支付信息:" label-width="120px")
          p
            span 支付方式：
            span {{detailDate.pay_name}}
          p
            span 支付金额：
            span {{detailDate.pay_price}}
          p
            span 支付时间：
            span 2016-12-25 15:23:26
        el-form-item(label="分销信息:" label-width="120px")
          p
            span 分销用户：
            span {{detailDate.distributor_info.distributor_name}}
          p
            span 分销产品：
            span {{detailDate.distributor_info.distributor_name}}
          p
            span 分销金额：
            span {{detailDate.distributor_info.distribute_money}}
          p
            span 分销提成：
            span {{detailDate.distributor_info.reward_money}}
      div(slot="footer" class="dialog-footer")
        el-button(type="info"  @click="detailVisible = false" size="small") 取消
</template>


<style lang="stylus" scoped>
.table th,
.table td
  text-align center
.table tbody tr td
  line-height 40px
  height 40px
</style>
