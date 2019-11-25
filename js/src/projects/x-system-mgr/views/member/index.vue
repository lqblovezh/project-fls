<script>
import {
    main
} from '@/util/dy'
import * as service from 'services/system/member'
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
         lock_status:''
      },
      sex:'男',
      positions:[],
      date_of_birth:'',
      reset_pass: false ,
      ids:[],
      dialogVisible:false,
      info:{},
      isUse:true,
      roleList:{}
    }
  },
  methods:{
    getTime(time){
       if(!time){
         time=['',''] 
       }
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
      this.dialogVisible= false
    },
    disabled(id,type){
       this.isUse = !this.isUse
       if(type!="use"){
          service.lock({id}).then(res=>{
            this.getList(this.query)
          })
       }else{
         service.unlock({id}).then(res=>{
            this.getList(this.query)
          })
       }
       
    },
   async detail(id){
      this.$refs.child.dialogVisible= true
      await service.detail({id}).then(res=>{
          log(res.data)
         this.info.name = res.data.name
         this.info.nick_name = res.data.nick_name
         this.info.picture_absolute = res.data.picture_absolute
         this.info.phone = res.data.phone
         this.sex = res.data.sex
         this.info.id = res.data.id
         this.date_of_birth = res.data.date_of_birth
         this.info.email = res.data.email
         if(this.reset_pass){
           this.info.reset_pass = 1
         }
         this.positions = res.data.positions.map(e=>{
           return e.id
         })
      })
     await service.auth().then(res=>{
         this.roleList = res.data
      })
    },
    save(){
      this.info.sex = this.sex
      this.info.positions = this.positions
      this.info.date_of_birth = this.date_of_birth
      this.service.save(this.info).then(res=>{
         this.getList(this.query);
         this.$refs.child.dialogVisible= false
      })
    },
    educe(ids){
      if(!ids.length){
        this.$message.error('请先选择导出的数据')
        return
      }
      service.educe({id:ids}).then(res=>{
        window.location.href = res.data.url
      })
    }
  }
}
</script>

<template lang="pug">
Dy(@sizeChange="handleSizeChange" @currentChange= "handleCurrentChange"  :total="total" ref="child")
  .search(slot="search")
    el-input.dy_inputWidth(placeholder="输入用户名搜索"  clearable v-model="query.name")
    el-input.dy_inputWidth(placeholder="输入手机号搜索" clearable v-model="query.phone")
    TimePick(@getTime="getTime")
    //el-select.width(v-model="query.lock_status" placeholder="请选择")
      el-option(value="" label="所有")
      el-option(value="normal" label="正常") 
      el-option(value="locked" label="冻结") 
    el-button(type="primary" @click="seareHandeler(query)") 搜索
    el-button(type="primary" plain @click="educe(ids)" ) 批量导出
  .list(slot="list")
    el-table(ref="table"
            stripe
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"  
            @selection-change="handleSelectionChange"
            )
      el-table-column(type="selection" width="55" fixed)
      el-table-column( prop="name" label="用户名")
      el-table-column( prop="nick_name" label="姓名")
      el-table-column( prop="phone" label="电话" )
      el-table-column( prop="email" label="邮箱" width="200")
      el-table-column( prop="create_time" label="创建时间" width='200')
      el-table-column(label="操作" fixed="right" width="240")
        template(slot-scope="scope")
          //i.dy_icon.dy_primary.el-icon-message(title="私信" @click="dialogVisible= true")
          el-button(title="解冻" size="mini" type="info" plain @click="disabled(scope.row.id,'use')" v-if="scope.row.login_info && scope.row.login_info.lock_status=='locked'") 解冻
          el-button(title="冻结" size="mini" type="success"  plain @click="disabled(scope.row.id)" v-else) 冻结
          el-button(title="详情" size="mini" type="primary"  plain @click="detail(scope.row.id)") 详情
          //el-button(title="删除" size="mini" type="danger" @click="del(scope.row.id)") 删除 
  .detail(slot="detail")
    .top
      .tx
        img(:src="info.picture_absolute" v-if="info.picture_absolute")
      .group
        .item 
          span 用户名：
          el-input.width(size="small" v-model="info.name" disabled)
        .item 
          span 姓名：
          el-input.width(size="small" v-model="info.nick_name")
        .item 
          span 邮箱：
          el-input.width(size="small" v-model="info.email")
        .item 
          span 绑定手机：
          el-input.width(size="small" v-model="info.phone")
        .item 
          span 出生日期：
          el-date-picker.width(size="small" v-model="date_of_birth" value-format="yyyy-MM-dd" type="date" placeholder="选择日期")
        
        .item 
          span 性别：
          el-radio.sex(v-model="sex" label='男') 
          el-radio.sex(v-model="sex" label='女') 
          el-radio.sex(v-model="sex" label='保密') 
        .item 
          el-checkbox(v-model="reset_pass") 
            span.name 重置密码
          span.infoMsg ( 勾选保存后密码重置为123456 )
    .group 
      .item(style="display:flex")
        span x-read角色：
        el-checkbox-group(v-model="positions")
          el-checkbox(:label="vo.id" v-for="vo in roleList" :key="vo.id" ) 
            span.name {{vo.name}}

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
    .sex 
      margin-top 8px
    .name 
      display inline-block
      line-height 30px
  .num 
    width 50px
.detail .top
  display flex
  .tx
    img 
      max-width 130px
      max-height 130px
.infoMsg
  font-size 13px
  color #999
  margin-left 10px
.width
  width 150px
  margin-right 10px
</style>

