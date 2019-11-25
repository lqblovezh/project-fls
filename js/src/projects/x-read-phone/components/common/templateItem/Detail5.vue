<script>
import Swiper from 'swiper/dist/js/swiper.min.js'

export default {
  props: ['list'],
  mounted() {
    this.initSwiper()
  },
  data() {
    return {
      curr: 0,
    }
  },
  computed: {
    currItem() {
      return this.list[this.curr]
    },
  },
  watch: {
    list() {},
  },
  methods: {
    itemClick() {
      this.$emit('itemClickHandler', this.list[this.curr])
    },
    initSwiper() {
      // setTimeout 0 保证dom结构已经渲染完成
      let lastPageX, moveX, lastMoveX
      setTimeout(() => {
        const mySwiper = new Swiper('.templateDetail .templateSwiper', {
          initialSlide: this.curr, // 设定初始化时slide的索引。
          loop: false,
          observer: true, // 动态追加数据 //启动动态检查器(OB/观众/观看者)，当改变swiper的样式（例如隐藏/显示）
          autoplay: false, //可选选项，自动滑动,
          watchSlidesProgress: true, //开启这个参数来计算每个slide的progress
          slidesPerView: 'auto', //设置slider容器能够同时显示的slides数量(carousel模式)。
          centeredSlides: true, //设定为true时，active slide会居中，而不是默认状态下的居左。
          spaceBetween: 35,
          slidesOffsetBefore: 0, //设定slide与左边框的预设偏移量（单位px）。
          slidesOffsetAfter: 0,
          slideToClickedSlide: true, //设置为true则点击slide会过渡到这个slide。
          pagination: {
            // el: '.swiper-pagination',
          },
          on: {
            touchEnd: () => {
              setTimeout(() => {
                this.curr = mySwiper.activeIndex
              }, 0)
            },
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
    .bg
    .curr 
      .wrap(ref="wrap" @click="itemClick") 
        .name {{currItem.books_name}}
        .author {{currItem.author}}
        img(:src="currItem.img_src")
    .templateSwiper.swiper-container
      .swiper-wrapper
        .swiper-slide( v-for="item in list" :key="item.b_id" )
          img.img( :src="item.img_src")
          //- .title {{item.books_name}} 55555555
          //- .author 作者:  {{item.author}} 
      .swiper-pagination
    .left 
</template>

<style lang="stylus" scoped>
.bg
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  background #faf8f6
  z-index -1
.curr
  text-align center
  .wrap
    animation show 0.5s ease-in-out
    width 5.2rem
    height 7rem
    background #fff
    display inline-block
    margin-top 30px
    // transform translate(50px)
    transition all 0.5s ease
    box-shadow 3px 4px 15px rgba(6, 91, 164, 0.22)
    .name
      color #333
      font-size 18px
      padding 10px 0
    .author
      color #888
      font-size 15px
      margin-bottom 5px
    img
      width 3.6rem
      height 5rem
.templateSwiper
  .swiper-slide
    width 1.6rem
    height 2.1rem
    background-size cover
    background-position center
    background-repeat no-repeat
    border-radius 10px
    margin 35px 0
    transition transform 0.3s linear
    >img
      width 100%
      height 100%
      box-shadow 3px 4px 15px 0px rgba(6, 91, 164, 0.22)
    &.swiper-slide-active
      transform scale(1.2)
</style>
