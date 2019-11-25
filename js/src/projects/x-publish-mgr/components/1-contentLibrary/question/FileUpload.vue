<script>
import * as common from 'services/common'

export default {
  props: ['data'],
  data() {
    return {
      uploadDialog: false, //图片上传
      previewImgUrl: null,
      uploadType: 'img', //上传类型
    }
  },
  created() {
    this.previewImgUrl = this.data && this.data.img_src
  },
  mounted() {},
  destroyed() {},
  methods: {
    async previewImg(e) {
      var node = e.target
      var file = node.files[0]
      let loading = this.$loading({
        text: '正在上传',
        background: 'rgba(0, 0, 0, 0.8)',
      })
      let { data } = await common.getTask(file).catch(err => {
        loading.close()
      })
      this.previewImgUrl = data.url
      this.$emit('change', data.path, data.url, this.data)
      loading.close()
    }, //预览图
  },
  computed: {
    switchTypeName() {
      switch (this.uploadType) {
        case 'img':
          return '图片'
        case 'video':
          return '视频'
        case 'voice':
          return '音乐'
      }
    },
  },
}
</script>

<template lang="pug">
.fileUpload(@click="$refs.file.click()")
  img.img(:src="previewImgUrl" v-if="previewImgUrl")
  .box(v-else)
    .el-icon-plus
    .icon-name() 添加图片
  input.hide(type="file" ref="file" accept="image/*" @change="previewImg")
</template>


<style lang="stylus" scoped>
.fileUpload
  width 70px
  height @width
  border 1px solid #ddd
  cursor pointer
  background #fff
  display inline-block
  position relative
  .img
    width 70px
    height @width
    object-fit contain
    position absolute
  .box
    padding-top 20px
    .el-icon-plus:before
      color #44c3aa
  div
    display block
    text-align center
</style>
