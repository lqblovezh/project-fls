<script>
import * as services from 'services/system/about.js'
import {
  getTask
} from 'services/system/home'
export default {
  data() {
    return {
      type:'demo',
      dialogVisible:false,
      tableData:[],
      ids:[],
      form:{
        id:'',
        name:'',
        video_src:'',
        video:''
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(){
      services.getList().then(res=>{
        log(res.data)
        this.tableData = res.data
      })
    },
    change(type){

    },
    //获取选中值 el-table 内置方法
    handleSelectionChange(val) {
      this.ids = val.map(el=>{
          return el.id
      })
      this.multipleSelection = val;
    },
    open(data){
      if(this.tableData.length>7){
        this.$message.error('数量不能超过7个')
        return
      }
      this.dialogVisible = true
      if(data){
        this.form = data
      }else{
        this.form={
            id:'',
            name:'',
            video_src:'',
            video:''
          }
      }
    },
    handleClose(){
      this.dialogVisible = false
    },
    upload(e,dom){
      this.$refs[dom].src=URL.createObjectURL(e.target.files[0]);
    },
    async sendMessage(file){
      log(this.$refs[file[0]],file[0])
      const file1 = this.$refs[file[0]].files[0]
      const file2 = this.$refs[file[1]].files[0]
      if(file1){
        await getTask(file1).then(res=>{
          this.form.video = res.data.path
        })
      }
      if(file2){
        log(file2,888)
        await getTask(file2).then(res=>{
          this.form.file = res.data.path
        })
      }
      services.save(this.form).then(res=>{
        this.dialogVisible = false
        this.getList()
      })
    },
    del(ids){
      if(!(ids instanceof Array)){
        ids = [ids]
      }
      services.del({id:ids}).then(res=>{
        this.$message.success("删除成功")
        this.getList()
      })
    },
    clear(){
      this.$refs['updateImg1'].value = ''
      this.$refs['updateImg2'].value = ''
    }
  }
}
</script>

<template lang="pug">
div
  .btns 
    el-button(type="primary" @click="open") 新增
    el-button(type="danger" @click="del(ids)") 批量删除
  el-table(ref="table"
          stripe
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"  
          @selection-change="handleSelectionChange"
          )
    el-table-column(type="selection" width="55" fixed)
    el-table-column( prop="name" label="名称" width="200")
    el-table-column(label="视频")
      template(slot-scope="scope")
        video(:src="scope.row.video_src" width="320" height="200" controls )
    el-table-column( prop="nick_name" label="文字介绍" width="300")
      template(slot-scope="scope")
        pre {{scope.row.text}}
    el-table-column( prop="file_code" label="文档" width="100")
    el-table-column( label="操作")
      template(slot-scope="scope")
        el-button(type="primary" size="small" @click="open(scope.row)") 修改
        el-button(type="danger" size="small" @click="del(scope.row.id)") 删除
  el-dialog(:visible.sync="dialogVisible" width="816px" :before-close="handleClose" @opened="clear")
    .box
      .part
        .img
          video(:src="form.video_src" ref="img1" height="250px" controls="controls")
        input.hide(type="file" @change="upload($event,'img1')" ref="updateImg1" accept="audio/3gpp, video/3gpp,audio/mp4, video/mp4,	application/ogg, audio/ogg")
        el-button(type="primary" size="small" @click="$refs.updateImg1.click()" plain) 视频上传
      .part
        .img.file {{form.file_code}}
        input.hide(type="file" @change="form.file_code=$refs.updateImg2.files[0].name" ref="updateImg2" )
        el-button(type="primary" size="small" @click="$refs.updateImg2.click()" plain) 文档上传
    el-input.name(placeholder="请填写导航名称" v-model="form.name")
    el-input(type="textarea"
            :rows="6"
            placeholder="请输入介绍内容"
            v-model="form.text"
          )
    .footer(slot="footer" class="dialog-footer")
      el-button.right(type="primary" @click="sendMessage(['updateImg1','updateImg2'])" size="small") 确定
</template>

<style lang="stylus" scoped>
.btns 
  border-bottom 3px solid #e8e8e8
  padding-bottom 10px
.box
  display flex
  .part 
    flex 1
    text-align center
    margin-bottom 20px
    .file 
      line-height 250px
    .img 
      height 250px
      background #e8e8e8
      margin 20px 
      text-align center
      img
        max-width 100%
        height 100%
.pic 
  height 100px
  background 0 center no-repeat
  background-size auto 100%
.name 
  margin-bottom 10px
pre 
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
</style>
