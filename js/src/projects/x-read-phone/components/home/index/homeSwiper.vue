<script>
import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  props: {
    list: Array,
  },
  mounted() {
    setTimeout(() => {
      this.initSwiper()
    }, 0)

    // 如果是loop 情况下, 虚拟的swiper不会拥有animeclass
    setTimeout(() => (this.anime = true), 300)
  },
  data() {
    return {
      anime: false,
    }
  },
  methods: {
    initSwiper() {
      let mySwiper = new Swiper('#homeSwiper', {
        autoplay: true, //可选选项，自动滑动,
        initialSlide: 0,
        loop: true,
        disableOnInteraction: true,
        centeredSlides: true, //设定为true时，active slide会居中，而不是默认状态下的居左。
        slidesPerView: 'auto', // 设置slider容器能够同时显示的slides数量
        spaceBetween: 30,
        pagination: {
          el: '.swiper-pagination',
        },
      })
      // 如果是loop 情况下, 虚拟的swiper  @click事件 不会存在
      // 离开页面,组件内的节点会全部消失, 因此不用考虑注销事件, 假如在app上绑定事件, 就需要注销事件绑定
      // this.$refs.homeSwiper.removeEventListener('click', this.go)
      // 尽量使用$refs, queryselector 查询似乎有延迟, 无法在beforeDestory 获取节点
      this.$refs.homeSwiper.addEventListener('click', this.go)
    },
    go(e) {
      let node = e.target
      if (/^img$/i.test(node.tagName) && node.attributes.gourl) {
        location.href = node.attributes.gourl.value
      }
    },
  },
}
</script>
<template lang="pug">
.div
  #homeSwiper.swiper-container(ref="homeSwiper")
    .swiper-wrapper
      .swiper-slide( v-for="item in list"  :key="item.id"   )
        img( :goUrl="item.src"  :src="item.img_src" :class="{anime}")
    //- .swiper-pagination
</template>
<style lang="stylus" scoped>
#homeSwiper
  padding 25px 0
.swiper-slide-duplicate > img // 虚拟的swiper的高度
  transition transform 0.3s linear
.swiper-slide
  max-height 3rem
  background-color rgba(0, 0, 0, 0.3)
  background-size cover
  background-position center
  background-repeat no-repeat
  width 5.3rem
  >img
    width 100%
    height 100%
    border-radius 8px
    box-shadow 2px 5px 15px rgba(6, 91, 164, 0.28)
    &.anime
      transition transform 0.3s linear
  &.swiper-slide-active > img
    // 放在swiper-slide-active上 scale的中心位置有偏差!, 所以放在图片上,
    transform scale(1.15)
  &.swiper-slide-duplicate-active > img
    // 放在swiper-slide-active上 scale的中心位置有偏差!, 所以放在图片上,
    transform scale(1.15)
.swiper-pagination
  bottom 0.05rem
</style>

