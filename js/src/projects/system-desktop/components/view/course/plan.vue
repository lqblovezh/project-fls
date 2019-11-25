<script>
import Media from '../book/media'
import { publickMixin } from '@/utils/mixins'
import defaultImage from '@/components/view/img/default.png'

export default {
  mixins: [publickMixin],
  data() {
    return {
      radio2: 1,
      defaultImage,
      detailInfo: {
        name: '',
        abs: '',
      },
      xRead: {}, // x-read信息
    }
  },
  components: { Media },
  mounted() {},
  methods: {},
  computed: {
    resources() {
      let videoList = this.$refs.Media.videoList.map(item => {
        return {
          img: item.video_img,
          name: item.video_name,
          preview: item.video_preview,
        }
      })
      let audioList = this.$refs.Media.audioList.map(item => {
        return {
          img: item.audio_img,
          name: item.audio_name,
          preview: item.audio_preview,
        }
      })
      return videoList.concat(audioList)
    },
  },
}
</script>

<template lang="pug">
.info
  p.title 学习计划（必填）
  VaForm(ref="detailForm")
    form.detailForm
      .group
        .label.must 计划名称：
        input.small.form-control(v-va="{ type:'required' }" v-model='detailInfo.name' size='small')
      .group
        .label.must 计划简介：
        textarea.small.textarea(v-va="{ type:'required' }" v-model='detailInfo.abs' size='small')
      .group
        .label
        span.tip
          span 预览只提供一个课时，创建更多课时前往 
          el-button(type="text" @click="") 控制台
          span  创建
      .group
        .label.must 学习时长：
        .large.time
          input.mini.form-control(v-va="{ type:'required' }" v-model='detailInfo.time' size='small' type="number")
          span 秒
      Media(ref="Media" title='资源' isMust=true)
        p.prevew(slot="title")
          span 预览资源暂只支持图片，音频（MP3），视频（mp4），更多类型在 
          el-button(type="text" @click="") 控制台
          span  创建吧。
</template>

<style lang="stylus" scoped>
.prevew
  display inline-block
  color #999999
  font-size 14px
  padding-left 10px
.large.time
  display inline-block
  font-size 14px
  color #666
  span
    padding 0 10px
.tip
  font-size 14px
  color #999
  padding-left 10px
</style> 

