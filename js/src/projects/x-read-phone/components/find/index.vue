<script>
import * as servers from 'services/x-read/find'
import Swiper from 'swiper/dist/js/swiper.min.js'
// import Swiper from 'swiper'

export default {
  created() {
    this.init()
  },
  mounted() {},
  updated() {},
  data() {
    return {
      list: [
        {
          img_src:
            'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1531474387509&di=ac023d632a662deff2e4ba99e3e265f8&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F150504%2F14-150504142545R1.jpg',
        },
        {
          img_src:
            'http://xcloud.kf.gli.cn/storage/publish/images/2018/06/small_26105837_5b31abdd29907.jpg.jpg',
        },
      ],
      page: 1, //
      open: false,
      end: false,
      last_position: 0,
    }
  },
  watch: {
    list() {
      this.initSwiper()
    },
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      this.open = false // 似乎必须要重新创建dom才行, 不能用已有的dom结构

      servers.find({ page: this.page, last_position: this.last_position }).then(res => {
        // 当res.data为[] 的时候, list没有变化, 就没有执行监听的函数, 此时open为false, 因此节点没有了!
        if (res.data.length !== 0) {
          this.list = res.data.discover_list
          this.last_position = res.data.last_position
        } else {
          this.end = true
        }
      })
    },
    changeList() {
      this.page++
      this.getList()
    },
    initSwiper() {
      this.open = true
      setTimeout(() => {
        let mySwiper = new Swiper('#find-swiper', {
          autoplay: false, //可选选项，自动滑动,
          // disableOnInteraction: true,
          // slidesPerView: 1,
          preventClicks: false, //默认true //是否阻止点击
          loop: false,
          // pagination: {
          //   el: ".swiper-pagination"
          // },
        })
      }, 50)
    },
    goBook(item) {
      if (item.book_type == 2) {
        this.$go('/home/themeDetail', { id: item.book_id })
      } else {
        this.$go('/bookDetail', { id: item.book_id })
      }
    },
    test2() {
      const test = sessionStorage.test
      if (!sessionStorage.test) {
        sessionStorage.test = true
        location.reload()
        return
      }
    },
    replace() {
      this.$router.replace('/bookMall')
    },
  },
}
</script>

<template lang="pug">
.div
  .fix
    .send-btn.change(@click="changeList") 换一批
  #find-swiper.swiper-container(v-if="open")
    .swiper-wrapper
      .swiper-slide( v-for="(item , index ) in list" :key="item.id"  )
        .content( @click="goBook(item)")
          .img
            img( :src="item.img_src"  )
          .title {{item.name}}
          .author {{item.author}}
          .send-btn {{item.type_name}}
          .abs
            .txt {{item.abs + item.abs}}
  .no-more(v-if="end") 没有啦!
    //- 这里之所以不用open , 因为open会频繁切换!


</template>

<style lang="stylus" scoped>
.no-more
  text-align center
  margin-top 100px
  font-size 16px
.send-btn
  font-size 12px
  letter-spacing 2px
  &.change
    margin-top 15px
    float right
    transform translateX(-50px)
.div
  position fixed
  top 0
  left 0
  right 0
  z-index 2
  bottom 1.5rem
  background #fff
.swiper-container
  height 100%
  .swiper-wrapper
    .swiper-slide
      background-size cover
      background-position center
      background-repeat no-repeat
      .content
        width 6.9rem
        height 7.8rem
        margin 0 auto
        text-align center
        box-shadow 2px 2px 15px 1px rgba(6, 91, 164, 0.22)
        border-radius 10px
        background-color #ffffff
        overflow-y auto
        margin-top 1.2rem
        text-align center
        .title
          height 50px
          line-height 50px
          font-size 20px
          color #111
          margin-top 2.2rem
        .author
          font-size 12px
          color #999
          height 20px
          line-height 20px
          margin-bottom 15px
        .abs
          margin-top 15px
          text-align left
          padding 0 30px
          height 3rem
          color #666
          font-size 14px
          padding-bottom 20px
          overflow scroll
          .txt
            padding-bottom 10px
            font-size 15px
            letter-spacing 2px
            text-indent 0.5rem
            line-height 0.4rem
        .img
          position absolute
          z-index 100000
          width 100%
          >img
            height 2.8rem
            width 1.9rem
            margin-top -50px
            border-radius 8px
            transform translateX(-0.3rem)
</style>
