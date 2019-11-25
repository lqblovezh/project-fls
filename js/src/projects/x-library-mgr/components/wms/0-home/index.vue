<script>
import { getServiceTime } from 'services/x-teach/home'
import * as services from 'services/x-read/sale'
import RunningTime from 'projects/common/runningTime'

export default {
  components: {RunningTime},
  data() {
    return {
      seriverTime: '', //系统时间
      plantInfo: this.$config.plantInfo,
    }
  },
  computed: {},
  created() {
    console.log(this.plantInfo)
    this.getInfo()
  },
  methods: {
    async getInfo() {
      this.seriverTime = new Date()
      getServiceTime().then(res => {
        this.info = res.data
        this.seriverTime = res.data.time
      })
    },
  },
}
</script>

<template lang="pug">
.mainRight
  .headGuide
    .logo
      img(:src="plantInfo?plantInfo.logo_absolute:''", alt="alt")
    .guide
      h2 {{plantInfo?plantInfo.name:''}}
      p {{plantInfo?plantInfo.exp:''}}
      RunningTime(:currentTime='seriverTime' v-if='seriverTime')
        span 服务器当前时间：
  .content
    p 运营管理后台欢迎您
</template>
<style lang="stylus" scoped>
.headGuide
  padding 20px
  width 1600px
  .logo
    width 78px
    height 44px
    display inline-block
    margin-right 10px
    text-align center
    img
      max-width 100%
      max-height 100%
  .guide
    display inline-block
    h2
      padding-bottom 10px
      font-weight bold
      font-size 17px
      color #444
    p
      font-size 14px
      line-height 24px
      color #777
.content
  height 60vh
  padding 0 0 20px 20px
  text-align center
  justify-content center
  align-items center
  display flex
  background #fff
</style>
