<script>
import Menu from '@/components/common/Menu'
import Top from '@/components/common/Top'
import UploadMsg from '@/components/common/Msg'
import * as myServices from 'services/x-publish/home'
import {main} from '@/util/mixins'
import UploadAll from '@/components/common/UploadAll'

export default {
  mixins: [main],
  components: {Menu, Top, UploadMsg, UploadAll},
  data() {
    return {
      myServices,
      msg: '', // 提示消息内容
    }
  },
  methods: {
    async importAllFiles(data) {
      await myServices.sendTemp(data)
    }
  }
}
</script>
<template lang="pug">
.indexs.clearfix
  Top(currentPlant="X-PUBLISH")
  Menu(curr="/upload")
  .mainRight
    .verticalDialog
      UploadAll(@upload="importAllFiles")
</template>
<style lang="stylus" scoped>
.mainRight
  position relative
  height 90vh
  background-color #fff
  .verticalDialog
    transform translate(-50%,-50%)
    position absolute
    top 50%
    left 50%
</style>
