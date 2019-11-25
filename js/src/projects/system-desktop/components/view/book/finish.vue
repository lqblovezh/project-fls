<script>
import { makeMixin, publickMixin } from '@/utils/mixins'
import defaultImage from '@/components/view/img/default.png'
import Store from 'store2'

export default {
  mixins: [makeMixin, publickMixin],
  data() {
    return {
      percent: 0,
      img: '',
    }
  },
  mounted() {
    this.img = ''
  },
  methods: {
    getInfo(task_id) {
      if (task_id) {
        this.task_id = task_id
        this.getProgress(0, res => {
          // console.log('进行中....', res)
          this.percent = res.data.info.speed
        }).then(
          res => {
            // console.log('完成', res)
            this.percent = 100
            this.img = res.data.base_url
          },
          err => {
            this.$message.error('制作失败')
          }
        )
      }
    },
  },
}
</script>

<template lang="pug">
.finish
  div.tip(v-if="!img")
    p 作品制作中...
    el-progress.percent(:text-inside="true" :stroke-width="18" :percentage="percent")
  .text-arew(v-else)
    img.img(:src="img")
    p.text 扫描二维码观看手机预览效果
  p.tool 更多实用功能在系统中创建
</template>

<style lang="stylus" scoped>
.finish
  .img
    max-width 220px
    max-height 220px
    border 2px solid #dedede
    border-radius 5px
  .text
    width 230px
    margin 15px auto
    height 30px
    line-height 30px
    background-color #ebebeb
    border-radius 15px
  .percent
    width 350px
    margin 20px auto
  text-align center
  >>> .el-button
    font-size 18px
  >p
    margin-bottom 20px
  .tool
    font-size 14px
    line-height 22px
    color #f7793e
</style> 

