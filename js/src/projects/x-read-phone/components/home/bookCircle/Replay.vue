<script>
import ImageCompressor from 'image-compressor.js'
import * as common from 'services/x-publish/common'
import {getTask} from 'services/common'
import * as circleBookServices from 'services/x-read/circleBook'

export default {
  props: ['name', 'replayMsg'],
  data() {
    return {
      addType: null,
      previewImgUrls: [],
      previewVideoUrls: [],
      userComment: '',
    }
  },
  watch: {
    // 通过评论动态改变回复框的高度
    userComment() {
      const node = this.$refs.commentInp
      // 必须先清除高度,然后获取s, 高度会影响node.scrollHeight的获取,他们之间应该有内置的关联,
      node.style.height = ''
      let s = node.scrollHeight
      if (s > 60) {
        node.style.height = s + 10 + 'px'
      }
    },
  },
  methods: {
    async setfile(e) {
      // perfect
      let file = e.target.files[0]
      if (!file) return
      if (file.size > 1024 * 1024 * 100) {
        this.$Toast({ message: '视频过大, 请上传小于100M的文件!' })
        return
      }
      let type = file.type.match(/.*\/(.*)/)[1]
      let i = {
        url: window.URL.createObjectURL(file),
        checked: true,
        file: file,
        size: file.size,
      }
      if (type === 'mp4') {
        this.previewVideoUrls.push(i)
      } else {
        this.previewImgUrls.push(i)
      }
    },
    async commit() {
      let imgs = this.previewImgUrls.filter(item => item.checked)
      let videos = this.previewVideoUrls.filter(item => item.checked)
      if (!this.userComment) {
        this.$Toast({ message: '内容不能为空' })
        return
      }
      this.$showLoading()
      let img, videoPath
      try {
        img = await this.uploadImg(imgs)
        videoPath = await this.uploadVideo(videos)
        await circleBookServices
          .add({
            ...this.replayMsg,
            value: this.userComment,
            img: [...img, ...videoPath],
          })
          .then(res => {})
      } catch (error) {
        this.$Toast({ message: error.message })
        this.$closeLoading()
      }
      this.$closeLoading()
      this.$emit('replayComplete')
    },
    async uploadVideo(videos) {
      if (!videos.length) return []

      const arr = await Promise.all(videos.map(item => getTask(item.file)))
      return arr.map(res => res.data.path)
    },
    async uploadImg(imgs) {
      if (!imgs.length) return []

      const imageCompressor = new ImageCompressor()
      let t = []
      let addImgs = []
      imgs.forEach(i => {
        if (i.size < 1024 * 1024 * 1) {
          // 小1m
          t.push(i.file)
        } else {
          t.push(imageCompressor.compress(i.file, { quality: 0.7 }))
        }
      })
      // 等待图片压缩完成
      let res = await Promise.all(t)
      let uploadRes
      uploadRes = await Promise.all(res.map(i => getTask(i)))
      uploadRes.forEach(res => {
        addImgs.push(res.data.path)
      })

      return addImgs
    },
  },
}
</script>

<template lang="pug">
.replay-cmp
  .replay
      Head( @back="$emit('back')" backUrl="no" :name="name" )
      .content
        input(type="file" ref="picFile" :accept="$config.imgAccept+',video/mp4'" @change="setfile").hide
        .left(@click="$refs.picFile.click()")
        .input
          textarea(type="text" ref="commentInp" v-model="userComment"  placeholder="发表你的看法")
          //- .text(  contenteditable="true"   )  ios mobile safari 体验很差! 移动端不考虑
        .submit()
          .btn(@click="commit" v-if="!previewImgUrls.length && !previewVideoUrls.length" ) 评论
      .preview-img(v-if="previewImgUrls.length || previewVideoUrls.length")
        .line-single
        .imgs-wrap
          .ls
            .item(v-for="i in previewImgUrls"  @click="i.checked = !i.checked ")
              .check(:class="{true: i.checked }")
              img( :src="i.url"  )
          .ls-replay-video
            .item(v-for="i in previewVideoUrls"  @click="i.checked = !i.checked ")
              video(controls :src="i.url"  controlslist="nodownload" )
        .line-single
        .pic-confirm
          .left
          .right
            .btn(@click="commit") 确定
</template>


<style lang="stylus" >
.pic-confirm
  height 1rem
  display flex
  justify-content flex-end
  align-items flex-end
  padding 0.18rem 0
  .right
    text-align center
    width 1.7rem
.replay-cmp
  .preview-img
    .imgs-wrap
      padding 0.2rem
      .ls-replay-video
        overflow auto
        .item
          >video
            width 100%
            margin 15px 0
      .ls
        display flex
        margin 0.2rem 0
        overflow scroll
        .item
          height 2.15rem
          position relative
          >video
            width 100%
          &:last-child
            .check
              right 0.08rem
            >img
              margin-right 0
          .check
            width 23px
            height 23px
            background url('./img/pic-check.png') no-repeat
            background-size 23px
            position absolute
            right 0.28rem
            top 0.08rem
            &.true
              background url('./img/pic-check-true.png') no-repeat
              background-size 23px
          >img
            height 100%
            width auto
            margin-right 0.2rem
  .replay
    position fixed
    bottom 0
    top 0
    background #fff
    z-index 200
    left 0
    right 0
    overflow auto
    .content
      display flex
      align-items flex-end
      padding 0.18rem 0
      background #e6e6e6
      .left
        background url('./img/pic.png') no-repeat center
        background-size 25px 21px
        width 1rem
        height 0.58rem
        flex none
      .input
        width 4rem
        flex auto
        >textarea
          width 100%
          padding 0.15rem
          user-select auto
          font-size 14px
          border solid 1px #d9d9d9
          border-radius 2px
          line-height 0.32rem
          height 60px
          outline none
          transform translateY(3px)
          padding-bottom 10px
          letter-spacing 2px
          word-break break-all
      .submit
        width 1.7rem
        flex none
        text-align center
</style>
