<script>
export default {
  props: ['text'],
  // data() {
  //      return {
  //        dialogVisible: false
  //      };
  //    },
  //    methods: {
  //      handleClose(done) {
  //        this.$confirm('确认关闭？')
  //          .then(_ => {
  //            done();
  //          })
  //          .catch(_ => {});
  //      }
  //    }
}
</script>

<template lang="pug">
  //- el-button(type="text" @click="dialogVisible = true") 点击打开Dialog
  //- el-dialog(title="提示"
  //-   :visible.sync="dialogVisible"
  //-   width="30%"
  //-   :before-close="handleClose")
  //-   span {{text}}
  //-   span(slot="footer" class="dialog-footer")
  //-     el-button(@click="dialogVisible = false") 取 消
  //-     el-button( type="primary" @click="dialogVisible = false") 确定
  span {{text}}
</template>


<style lang="stylus" scoped>
  body
    position relative
    .popover
      width 600px
      height 200px
      position absolute
      z-index 3000
      background #ccc
    button
      width 50px
      height 20px
      background green
</style>
