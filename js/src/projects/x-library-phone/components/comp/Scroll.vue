<script>
export default {
  props: {
    top: {
      default: '100px',
    },
    bottom: {
      default: '0px',
    },
    isAutoLoad: {
      // 高度未满, 自动加载
      default: false,
    },
  },
  data() {
    return {
      // 是否显示加载图标
      isLoadIcon: true,
      //防止误触, 到底部时, 发出多次请求
      isDown: false,
      // 是否没有更多数据了
      isEnd: false,
    }
  },
  mounted() {
    this.init()
  },
  beforeDestroy() {
    this.destory()
  },
  methods: {
    init() {
      let { root, wrapper } = this.$refs
      root.addEventListener('scroll', this.scrollHandler)

      // 获取内容高度, 如果没有匹配, 就再请求一次数据
      setTimeout(() => {
        let { scrollHeight, scrollTop, clientHeight } = root
        let { clientHeight: wrapperClientHeight } = wrapper
        if (clientHeight - wrapperClientHeight > 10) {
          if (this.isAutoLoad) {
            this.$emit('loadMore', this.backHandler)
          } else {
            // 高度不够 就没有下拉, 就永远无法触发loadmore, 慎用isAutoLoad=false
            this.backHandler(true)
          }
        }
      }, 0)
    },
    destory() {
      let { root, wrapper } = this.$refs
      root.removeEventListener('scroll', this.scrollHandler)
    },
    reset() {
      this.destory()
      this.init()
    },
    scrollHandler(e) {
      this.$emit('scroll', e)
      this.touchMoveHandler()
    },
    backHandler(flag) {
      this.isDown = flag // 用于暂时性, 锁定到底部 不再请求
      this.isLoadIcon = !flag // 是否显示加载图标
      this.isEnd = flag // 用于判断永久不在请求(数据已经全部加载完了)
    },
    touchMoveHandler(e) {
      // 永久锁定和暂时锁定, 均阻止
      if (this.isEnd || this.isDown) return
      let { root, wrapper } = this.$refs
      let { scrollHeight, scrollTop, clientHeight } = root
      if (Math.abs(scrollHeight - clientHeight - scrollTop) === 0) {
        this.isDown = true //请求一次, 即锁定
        console.log('[Scroll]:  发出请求')
        this.$emit('loadMore', this.backHandler)
      }

      // console.dir(this.$refs.root)
      // console.log('scrollHeight', scrollHeight)
      // console.log('scrollTop', scrollTop)
      // console.log('clientHeight', clientHeight)
      // @touchmove="touchMoveHandler" 不适用于pc端
    },
  },
}
</script>


<template lang="pug">
  .comp-scroll(  :style="{top,bottom}" ref="root" @scroll="touchMoveHandler"  )
    .scroll-wrapper(ref="wrapper")
      div(   )
        slot
      .load(v-show="isLoadIcon") 
        svg( class="scroll-circular" viewBox="25 25 50 50")
          circle(  cx="50" cy="50" r="20" fill="none" class="path")
        .txt 加载中
      .end(v-if="isEnd") 法律人的底线
</template>


<style lang="stylus">
.comp-scroll
  position absolute
  bottom 0
  left 0
  right 0
  overflow scroll
  -webkit-overflow-scrolling touch
  >.scroll-wrapper
    >.load
      position absolute
      margin 5px 0
      color #c3a780
      text-align center
      left 0
      right 0
      >.scroll-circular
        animation pre-loading 1s linear infinite
        height 30px
        width 30px
        color #fff
        stroke-dasharray 90, 150
        stroke-dashoffset 0
        stroke-width 4
        stroke #c3a780
        stroke-linecap round
      >.txt
        font-size 12px
    >.end
      text-align center
      font-size 12px
      color #666
      line-height 40px
</style>
