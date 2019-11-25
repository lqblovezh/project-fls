<script>
export default {
  props: {
    name: {
      default: '评论',
      type: String,
    },
  },
  data() {
    return {
      userComment: '',
    }
  },
  methods: {
    commit() {
      this.$emit('commit', { text: this.userComment })
    },
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
}
</script>


<template lang="pug">
.replay-comment
  .replay
      Head( @back="$emit('back')" backUrl="no" :name="name" )
      .content
        //- input(type="file" ref="picFile" :accept="$config.imgAccept+',video/mp4'" @change="setfile").hide
        //- .left(@click="$refs.picFile.click()")
        .input
          textarea(type="text" ref="commentInp" v-model="userComment"  placeholder="发表你的看法")
          //- .text(  contenteditable="true"   )  ios mobile safari 体验很差! 移动端不考虑
        .submit()
          .btn(@click="commit" v-if="true" ) 评论
      //- .preview-img(v-if="previewImgUrls.length || previewVideoUrls.length")
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


<style lang="stylus" scoped>
.pic-confirm
  height 1rem
  display flex
  justify-content flex-end
  align-items flex-end
  padding 0.18rem 0
  .right
    text-align center
    width 1.7rem
.replay-comment
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
      padding-left 15px
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
