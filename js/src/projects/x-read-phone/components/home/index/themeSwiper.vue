<script>
import Swiper from 'swiper/dist/js/swiper.min.js'
export default {
  props:{
    list:Array
  },
  mounted() {
    this.initSwiper()
  },
  methods: {
    initSwiper() {
      var mySwiper = new Swiper("#themeSwiper", {
        autoplay: true, //可选选项，自动滑动,
        // disableOnInteraction:true ,
        slidesPerView :2.5,
        spaceBetween: 30,
        // pagination: {
        //   el: ".swiper-pagination"
        // },
      });
    }
  }
};
</script>
<template lang="pug">
.themeSwiepr
  #themeSwiper.swiper-container
    .swiper-wrapper
      .swiper-slide( @click="$emit('themeClick',item)" v-for="item in list" ) 
        .name 
          .img 
            img( v-lazy="item.img_src" )
          .img-mask  
            .content {{item.books_name}}
            //- img( v-lazy="item.img_src" )
</template>
<style lang="stylus" scoped>
.themeSwiepr
  margin 0.15rem
.swiper-slide 
  background-color #eaeaea
  background-size contain 
  background-position center
  background-repeat no-repeat
  height: 1.84rem
  position relative
  // margin-right 0.15rem
  .name 
    .img 
      >img 
        width 100%
    .img-mask
      position absolute  
      top 0
      left 0
      right 0
      bottom 0
      background rgba(0,0,0,.4)
      color #fff
      font-size 13px
      z-index 5
      text-align center
      .content
        word-break break-all
        position absolute 
        width 2rem
        top 50%
        left 50%
        transform translate(-50% , -50%)
</style>

