<script>
// import scroll from 'scroll'
import anime from 'animejs'

export default {
  props: {
    item: {},
    comment: {
      default: 0,
    },
  },
  data() {
    return {
      start: {},
      end: {},
    }
  },
  computed: {},
  methods: {
    scrollHandler(e) {
      // console.dir(e.target)
    },
    touchstartHandler(e) {
      // console.log('touchstartHandler')
      this.start = this.getXy(e)
    },
    touchendHandler(e) {
      // console.log('touchendHandler')

      this.end = this.getXy(e)

      let y = this.end.pageY - this.start.pageY
      let x = this.end.pageX - this.start.pageX
      if (Math.abs(y) > 100) return
      // this.open()
      const { root } = this.$refs
      console.log(x)
      if (Math.abs(x) > 20) {
        if (x > 0) {
          // right 滑动
          this.open()
        } else {
          this.hide()
          // left 滑动
          // scroll.left(root, 70, { duration: 200 })
        }
      } else {
        // 移动不够 需要归位!  使用scroll 时 需要
        // if (x > 0) {
        //   // right 滑动
        //   scroll.left(root, 70, { duration: 100 })
        // } else {
        //   console.log('left 滑动 ')
        //   // left 滑动
        //   scroll.left(root, 0, { duration: 100 })
        // }
      }

      this.start = {}
      this.end = {}
    },
    getXy(e) {
      const [Touch] = e.changedTouches
      const { pageX, pageY } = Touch

      // console.log({ pageX, pageY })
      return { pageX, pageY }
    },
    open() {
      // scroll.left(root, 0, { duration: 200 })
      const { root } = this.$refs
      anime({
        targets: root,
        translateX: 0,
        duration: 300,
        easing: 'easeInOutCirc',
      })
    },
    hide() {
      const { root } = this.$refs
      anime({
        targets: root,
        translateX: -70,
        duration: 300,
        easing: 'easeInOutCirc',
      })
    },
    goDetail() {
      this.$emit('goDetail')
    },
  },
}
</script>


<template lang="pug">
  .comp-circle-list-item
    .wrapper.after_bd(
      ref="root"
      @touchstart="touchstartHandler"
      @touchend="touchendHandler"
    )
      .main.vt-all.flex
        .img(@click="goDetail")
          img( v-src="item.img_src" v-if="item.img_src")
          .icon-circle-bg(v-else)
        .content.ib
          .name.f16(@click="goDetail") {{item.book_name}} 
          .author.c_6.f14(v-if="item.author") 作者: {{item.author}}
          .time.c_7.f12
            .left 开始于 {{item.create_time | formateTime}}，最近更新于{{item.update_time}}
          .comment.f12
            .ib 
              span.c_price {{item.home_theme_number}} 
              span 评论
      .add( :class="item.uset_status" @click="$emit('addCircle')")
        .txt.c_f.tc.f14 {{item.user_status ? '退出书圈':'加入书圈'}}
</template>
<style lang="stylus">
.comp-circle-list-item
  overflow hidden
  .wrapper
    display flex
    >.main
      align-items center
      box-sizing border-box
      padding 0 15px
      margin-bottom 15px
      width 7.5rem
      flex none
      >.img
        >img
          vertical-align middle
          width 100px
          height 130px
          object-fit contain
      >.content
        // width calc(100% - 130px)
        flex 1
        margin-left 20px
        >.name
          margin 10px 0
        >.author
          line-height 30px
        >.btn
          height 30px
        >.comment
          margin-top 15px
    >.add
      width 70px
      background #F15A4A
      flex none
      display flex
      flex-direction column
      justify-content space-around
</style>
