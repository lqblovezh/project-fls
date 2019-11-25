<script>
import Swiper from 'swiper/dist/js/swiper.min.js'

export default {
  props: ['list'],
  mounted() {
    this.initSwiper()
  },
  data() {
    return {}
  },
  watch: {
    list() {},
  },
  methods: {
    itemClick(item, e) {
      let className = e.currentTarget.className
      if (/swiper-slide-active/.test(className)) {
        this.$emit('itemClickHandler', item)
      }
    },
    initSwiper() {
      // setTimeout 0 保证dom结构已经渲染完成
      setTimeout(() => {
        const mySwiper = new Swiper('.templateDetail .templateSwiper', {
          loop: false,
          observer: true, // 动态追加数据 //启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）
          autoplay: false, //可选选项，自动滑动,
          slidesPerView: 'auto', //设置slider容器能够同时显示的slides数量(carousel模式)。
          centeredSlides: true, //设定为true时，active slide会居中，而不是默认状态下的居左。
          spaceBetween: 15,
          slidesOffsetBefore: 0, //设定slide与左边框的预设偏移量（单位px）。
          slidesOffsetAfter: 0,
          pagination: {
            // el: '.swiper-pagination',
          },
          on: {
            reachEnd: () => {
              this.$emit('loadMore')
            },
          },
        })
      }, 0)
    },
  },
}
</script>

<template lang="pug">
  .templateDetail 
    .templateSwiper.swiper-container
      .swiper-wrapper
        .swiper-slide( v-for="item in list" @click="itemClick(item, $event)"  :key="item.b_id")
          img( :src="item.img_src")
          .title {{item.books_name}}
          .author 作者:  {{item.author}} 
          .abs {{item.abs}} 
      .swiper-pagination
    .left 
</template>

<style lang="stylus" scoped>
.templateSwiper
  margin-top 1rem
  height 10rem
  .swiper-slide
    width 5.9rem
    height 9rem
    background-size cover
    background-position center
    background-repeat no-repeat
    box-shadow 3px 4px 15px 0px rgba(6, 91, 164, 0.22)
    border-radius 10px
    marigin-bottom 15px
    >img
      width 100%
      height 4rem
    .title
      font-size 17px
      color #111
      text-align center
      height 35px
      line-height 35px
    .author
      text-align center
      font-size 14px
      height 27px
      line-height 27px
      color #084766
    .abs
      font-size 13px
      line-height 16px
      color #123456
      padding 15px
  .swiper-pagination
    bottom 0.05rem
</style>
