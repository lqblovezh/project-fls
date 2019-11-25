<script>
import Swiper from 'swiper/dist/js/swiper.min.js'
import service from 'services/x-library/front'

export default {
  data() {
    return {
      list: [],
    }
  },
  // 这个组件不是, 属于路由匹配组件, 因此服务端不会走这个组件的asyncData
  asyncData() {
    return service.home.bannerList()
  },
  created() {},
  methods: {
    initSwiper() {
      setTimeout(() => {
        // 自带的样式不要直接用, 避免复用的时候混乱
        this._mySwiper = new Swiper('#home-swiper', {
          loop: true, // 循环模式选项
          autoplay: false, //等同于以下设置
          // 如果需要分页器
          pagination: {
            el: '#home-swiper-pagination',
          },
        })
      }, 50)
    },
  },
  async mounted() {
    await this.dataPromise.then(res => {
      this.list = res.data
    })
    this.initSwiper()
  },
}
</script>

<template lang="pug">
  .comp-banner
    .wrapper
      #home-swiper.swiper-container
        .swiper-wrapper
          .swiper-slide(
            v-for="item in list" :key="item.id"
          )
            a( :href="item.src")
              img(
                :src="item.img_src"
              )
        #home-swiper-pagination.swiper-pagination
</template>

<style lang="stylus">
.comp-banner
  min-height 120px
  margin-top 52px
  &.path_1
    position fixed
    top 0
    width 100%
    height auto 
    left 0
    right 0
    z-index -2
  >.wrapper
    #home-swiper
      z-index 0
      >.swiper-wrapper
        >.swiper-slide
          img
            width 100%
            height 3.3rem
    #home-swiper-pagination
      transform translateY(-15px)
      .swiper-pagination-bullet
        height 4px
        width 4px
        background #fff
        &.swiper-pagination-bullet-active
          background #df9631
          width 14px
          border-radius 3px
          height 4px
</style>
