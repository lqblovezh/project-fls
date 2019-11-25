<script>
import * as services from 'services/system/partner'
import { getTask } from 'services/system/home'
export default {
  data() {
    return {
      type: 'partner',
      dialogVisible: false,
      tableData: [],
      ids: [],
      form: {
        id: '',
        name: '',
        text: '',
        img_src: '',
        type: 'press',
      },
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      services.getList({ type: 'press' }).then(res => {
        log(res.data)
        this.tableData = res.data
      })
    },
    change(type) {},
    //获取选中值 el-table 内置方法
    handleSelectionChange(val) {
      this.ids = val.map(el => {
        return el.id
      })
      this.multipleSelection = val
    },
    open(data) {
      console.log(this.form)
      if (this.tableData.length > 7) {
        this.$message.error('数量不能超过7个')
        return
      }
      this.dialogVisible = true
      if (data) {
        this.form = data
      } else {
        this.form = {
          id: '',
          name: '',
          text: '',
          img_src: '',
          type: 'press',
        }
      }
    },
    handleClose() {
      this.dialogVisible = false
    },
    upload(e, dom) {
      this.form.img_src = URL.createObjectURL(e.target.files[0])
      // this.$refs[dom].src = URL.createObjectURL(e.target.files[0])
    },
    async sendMessage(file) {
      log(this.$refs[file[0]], file[0])
      const file1 = this.$refs[file[0]].files[0]
      if (file1) {
        await getTask(file1).then(res => {
          this.form.img = res.data.path
        })
      }
      services
        .save(this.form)
        .then(res => {
          this.dialogVisible = false
          this.getList()
        })
        .catch(({ payload }) => {
          this.$message.error(payload.message)
        })
    },
    del(ids) {
      if (!(ids instanceof Array)) {
        ids = [ids]
      }
      services.del({ id: ids }).then(res => {
        this.$message.success('删除成功')
        this.getList()
      })
    },
    clear() {
      this.$refs['updateImg1'].value = ''
      this.$refs['updateImg2'].value = ''
    },
  },
}
</script>

<template lang="pug">
div
  .btns 
    el-button(type="primary" @click="open()") 新增
    el-button(type="danger" @click="del(ids)") 批量删除
  el-table(ref="table"
          stripe
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"  
          @selection-change="handleSelectionChange"
          )
    el-table-column(type="selection" width="55" fixed)
    el-table-column( prop="name" label="名称")
    el-table-column(label="图片")
      template(slot-scope="scope")
        .pic(:style="{backgroundImage:'url(' + scope.row.img_src + ')'}")
    el-table-column( prop="nick_name" label="跳转地址" width="600")
      template(slot-scope="scope")
        pre {{scope.row.text}}
    el-table-column( label="操作")
      template(slot-scope="scope")
        el-button(type="primary" size="small" @click="open(scope.row)") 修改
        el-button(type="danger" size="small" @click="del(scope.row.id)") 删除
  el-dialog(:visible.sync="dialogVisible" width="800px" :before-close="handleClose")
    .box
      .part
        .img
          img(:src="form.img_src" ref="img1")
        input.hide(type="file" @change="upload($event,'img1')" ref="updateImg1")
        el-button(type="primary" size="small" @click="$refs.updateImg1.click()" plain) 图片上传
      el-input.name(placeholder="请输入名称" v-model="form.name")
      el-input.url(placeholder="请输入跳转地址" v-model="form.text")
    .footer(slot="footer" class="dialog-footer")
      el-button.right(type="primary" @click="sendMessage(['updateImg1'])" size="small") 确定
</template>

<style lang="stylus" scoped>
.btns
  border-bottom 3px solid #e8e8e8
  padding-bottom 10px
.box
  display flex
  .part
    flex 0 0 250px
    text-align center
    margin-bottom 20px
    .img
      height 150px
      background #e8e8e8
      margin 20px
      text-align center
      img
        width 100%
        height 100%
        object-fit contain
.pic
  height 100px
  background center no-repeat
  background-size contain
.name, .url
  position relative
  top 79px
  display inline-block
  height 50px
.name
  flex 0 0 200px
pre
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
</style>
