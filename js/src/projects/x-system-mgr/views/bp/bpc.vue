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
          i.dy_icon.dy_primary.el-icon-success(title="冻结" @click="disabled()" v-if="isUse")
          i.dy_icon.dy_primary.el-icon-warning(title="解冻" @click="disabled()" v-else)
          i.dy_icon.dy_danger.el-icon-delete(title="删除" @click="del(scope.row.id)")  
    el-dialog(:visible.sync="dialogVisible" width="500px" :before-close="handleClose")
      .message 
        .title 发送私信
        .p.showInfo 
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
    .group
      .item
        span 头像：
        img(src="#")
      .item 
        span 用户名：
        el-input.width(size="small")
      .item 
        span 真实姓名：
        el-input.width(size="small")
      .item 
        span 登录密码：
        el-button(size="small") 重置
    .group 
      .item 
        span 出生年月：
        el-input.width(size="small")
      .item 
        span 绑定手机号：
        el-input.width(size="small")
      .item 
        span 联系邮箱：
        el-input.width(size="small")
      .item 性别：
        el-radio(v-model="sex" label="1") 男
        el-radio(v-model="sex" label="2") 女
    .group 
      .item(style="display:flex")
        span x-read角色权限：
        el-checkbox-group
          el-checkbox(label="专家")
          el-checkbox(label="作者") 
    .group 
      .item 消费金额： 20 
      .item x-read消费金额： 500
      .item x-teach消费金额：20
      .item x-read分销金额 20
      .item x-read分销奖励累计：20
      .item 金额累积提现： 20
      .item 积分： 20
      .item 订单数： 20
      .item x-read 分销次数：20
    .group 
      el-tabs()
        el-tab-pane(label="x-read拥有产品")
          .list
            img(src="#")
        el-tab-pane(label="x-teach拥有产品")

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
.detail .group
  display flex
  flex-wrap wrap
  line-height 30px
  .item 
    margin 20px  10px
  .width
    width 180px
  .num 
    width 50px

</style>

