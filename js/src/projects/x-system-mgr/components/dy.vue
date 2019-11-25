<template lang="pug">
.dy_layout
  .dy_search(v-if="!ctl.search")
    slot(name="search")
  .dy_body
    slot(name="list")
    .page
      el-pagination(
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10,50,100]"
        :page-size="10"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        )
    el-dialog.dialog(
      :visible.sync= "dialogVisible"
      :before-close="handleClose"
      :lock-scroll="false"
      :close-on-click-modal="false"
      width="1100px"
    )
      .header(slot="title")
        el-tabs(value="detail" type="card" )
          el-tab-pane(label="详情" name="detail")
            slot.detailColor(name="detail")
      div(slot="footer" class="dialog-footer")
        el-button(type="info" @click="handleClose" size="small" ) 取消
        el-button(type="primary" @click="$parent.save()" size="small") 确定
</template>

<script>
export default {
  props:['closed','total'],
  data(){
    return {
      ctl:null,
      currentPage:1,
      dialogVisible:false,
    }
  },
  created(){
    this.ctl = this.closed || {}
  },
  methods:{
     handleSizeChange(val) {
        this.$emit('sizeChange',val)
      },
    handleCurrentChange(val) {
        this.$emit('currentChange',val)
      },
    handleClose(){
        this.dialogVisible = false
    },
  }
}
</script>

<style lang="stylus" scoped>
.dy_primary.el-icon-edit
  color red
.dy_layout
  padding 20px
  min-width 390px
  .dy_search
    padding 15px 15px 7px 15px
    line-height 30px
    background #fff
    margin-bottom 15px
    border-radius 5px
    .dy_inputWidth
      width 200px
      margin 0 8px 8px 0
  .dy_body 
    padding 15px
    border-radius 5px
    background #fff
/* icon dy color */
.page 
  text-align center
  padding 40px 0
  overflow auto
.dialog
  color #555
</style>