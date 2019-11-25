<script>
import { getIconStyle } from '@/util/mixins'
import { getDispense, dispense } from 'services/x-publish/dispense'

export default {
  props: {
    examineDialog: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      radio2: '替换新版本'
    }
  },
  created() {
  },
  methods: {
    colse() {
      this.$emit('update:examineDialog', false)
    },
    save() {
      let id = []
      this.$refs.dispense.querySelectorAll("input[type=checkbox]:checked").forEach(element => {
        id.push(element.value)
      })
      if (!id.length) {
        this.$message.error('请选择你要发布的平台')
        return
      }
      this.$emit('dispenseSave', id)
    },
  }
}
</script>

<template lang="pug">
  div
    el-dialog(
      :center="false"
      :visible="examineDialog"
      top="50px"
      width="500px"
      :show-close="false"
      title='说明'
      )
      .coverContent
        el-radio-group(v-model="radio2")
          el-radio(label="替换新版本") 替换新版本
          el-radio(label="创建新版本") 创建新版本
      .footer(slot="footer" class="dialog-footer")
        el-button( @click="$emit('update:examineDialog',false)" type="info" ) 取消
        el-button( @click="$emit('saveExamine',radio2)" type="primary" ) 确定

</template>


<style lang="stylus" scoped>
@import '~common/stylus/mixin'

.btns
  text-align right
.el-icon-close
  position absolute
  cursor pointer
  float right
  display block
  width 20px
  height 20px
  right 20px
  z-index 2
.coverContent
  text-align center
  label
    display block
    margin 0
    padding 10px 0
  button
    display block
    margin 20px auto
.content
  >li
    margin-right 60px
    margin-bottom 20px
    display inline-block
    text-align center
    width 187px
    &:nth-child(4n)
      margin-right 0
    .icon
      min-width 178px
      height 56px
      line-height 56px
      border-radius 5px
      border 1px solid #e1e1e1
      position relative
      display block
      margin-right 0
      div
        width 33px
        height 33px
        display inline-block
        margin-right 10px
        position relative
        top 50%
        margin-top -18px
        &.Xbook
          bg-image('icon-Xbook')
        &.weChat
          bg-image('icon-weChat')
        &.sina
          bg-image('icon-sina')
        &.ECommerce
          bg-image('icon-ECommerce')
      span
        max-width 130px
        display inline-block
        no-wrap()
    .text
      font-size 12px
      margin 10px 0
    label
      cursor pointer
      display inline-block
      position relative
      .right
        width 30px
        height 30px
        font-size 30px
        position absolute
        bottom 0
        top 0
        z-index 1
        right 0
        display none
      input
        opacity 0
        width 30px
        height 30px
        position absolute
        bottom 0
        top 0
        z-index 1
        right 0
        &:checked+i
          display block
          color #fe4902 !important
  .defect
    margin 10px 0
    li
      background #ffefef
      border 1px solid #ffbbba
      color #ff0a0a
      line-height 25px
      &.pass
        border none
        background none
        color #44c3aa
</style>


