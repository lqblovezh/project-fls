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
      isUse:true
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
    el-input.dy_inputWidth(placeholder="用户"  clearable v-model="query.name")
    el-input.dy_inputWidth(placeholder="电话" clearable v-model="query.phone")
    TimePick(@getTime="getTime")
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
      el-table-column( prop="name" label="用户")
      el-table-column( prop="phone" label="电话" )
      el-table-column(label="获取渠道")
      el-table-column(label="积分")
      el-table-column( prop="create_time" label="创建时间" show-overflow-tooltip)
      el-table-column(label="操作" fixed="right")
        template(slot-scope="scope")
          i.dy_icon.dy_primary.el-icon-message(title="私信" @click="dialogVisible= true")
          i.dy_icon.dy_primary.el-icon-edit(title="详情" @click="$refs.child.dialogVisible= true")
          i.dy_icon.dy_danger.el-icon-delete(title="删除" @click="del(scope.row.id)")  
    el-dialog(:visible.sync="dialogVisible" width="500px" :before-close="handleClose")
      .message 
        .title 发送私信
        p.showInfo 
          span 吴念真
          a(href="javascript:") 查看私信记录
        el-input.content(
          type="textarea"
          :autosize="{ minRows: 7}"
          placeholder="私信内容"
        )
        el-checkbox(v-model="pt.teach") x-teach
        el-checkbox(v-model="pt.read") x-read
      div(slot="footer" class="dialog-footer")
        el-button(type="primary" @click="sendMessage()" size="small") 确定
  .detail(slot="detail")
    .showInfo 
      .item 
        img.headPic(src="http://www.jf258.com/uploads/2013-07-11/140625671.jpg")
      .item 
        p 姓名：搜索
        p 性别：男
        p 出生日期：2018-02-03
        p 
          span x-teach销售分成比例：
          el-input.width(size="small")
            template(slot="append") %
        p 
          span 可提现金额：50
      .item
        p 学历：博士
        p 电话：15555555555
        p 邮箱：l5555@qq.column
        p 单位：马克思
      .item
        p 职务：教师
        p 简介：研究xxxxxxxxxxxxxxx
        p 
          el-button(type="primary" size="small") 重置密码
          span.badge 登录密码重置为123456
    el-table.hight(:data="tableData" border style="width: 100%" show-summary)
          el-table-column(label="提现记录" )
          el-table-column(label="金额" )
          el-table-column(label="时间" )
          el-table-column(label="提现账户" )
</template>



<style lang="stylus" scoped>
.message 
  color #444
  .title 
    text-align center
    font-size 20px
    padding 15px 0 30px 0
  .showInfo
    display flex
    justify-content space-between
    padding-bottom 20px
    a 
      color #0084ff
  .content
    margin-bottom 20px
.detail
  .showInfo
    display flex
    margin-bottom 20px
    .item
      min-width 200px
      line-height 30px 
      margin-right 15px
.width
  width 110px
.badge
  color #999
  font-size 14px
.headPic
  border-radius 150px
  width 150px
</style>

