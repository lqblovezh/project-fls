<script>
export default {
  props:['msg'],
  data(){
    return {
      msgDialog: false, // 消息提示是否显示
    }
  },
  methods: {
    showMsgDialog() {
      this.msgDialog = true
    },
    hideMsgDialog() {
      this.msgDialog = false
    }
  }
}
</script>
<template lang="pug">
el-dialog(
  :center="true"
  :visible.sync="msgDialog"
  :close-on-click-modal="false"
  :show-close="false"
  width="400px"
  )
  span {{msg}}

  span.dialog-footer( slot="footer" class="")
    el-button( @click="hideMsgDialog" type="primary") 确定

</template>

<style lang="stylus" scoped>
.el-dialog
  span
    display: inline-block
    text-align: center
    line-height: 24px
</style>
