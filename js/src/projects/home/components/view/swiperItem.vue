<script>
import Swiper from 'swiper/dist/js/swiper.min.js'

export default {
  props: ['data'],
  mounted() {
    setTimeout(() => {
      this.initSwiper()
    }, 0)
  },
  methods: {
    itemClick(item) {
      this.$emit('itemClickHandler', item, 'theme')
    },
    initSwiper() {
      var mySwiper = new Swiper('#themeSwiper', {
        autoplay: {
          delay: 4000,
        }, //可选选项，自动滑动,
        slidesPerView: 'auto',
        // pagination: {
        //   el: ".swiper-pagination"
        // },
      })
    },
  },
}
</script>


<template lang="pug">
.themeSwiepr
  #themeSwiper.swiper-container
    .swiper-wrapper
      .swiper-slide( @click="itemClick(item)" v-for="item in data" ) 
        img( :src="item.url" )
</template>
<style lang="stylus" scoped>
.themeSwiepr
  height 100%
  width 100%
  .swiper-container
    height 100%
    width 100%
    .swiper-slide
      background-color #eaeaea
      background-size contain
      background-position center
      background-repeat no-repeat
      position relative
      img
        object-fit cover
        width 100%
        height 100%
</style>

