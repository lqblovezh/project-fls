<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { accessible } from 'services/system/home'
import Swiper from 'swiper'

export default {
  data() {
    return {
      info: null,
      bannerSwiper: {},
      certifySwiper: {},
      navList: [
        { title: '制作小数据库', exp: '创建你的数据库', icon: 'library' },
        { title: '制作多媒体电子书', exp: '快速制作电子书籍', icon: 'book' },
        { title: '制作课程课件', exp: '创建你的课程学习', icon: 'course' },
        { title: '制作动态杂志', exp: '创建独特的杂志', icon: 'magazine' },
      ],
      modify: 1,
    }
  },
  computed: {
    ...mapState({
      bannerList: state => state.home.banner,
      bookList: state => state.home.book,
      libraryList: state => state.home.library,
      courseList: state => state.home.course,
      partnerList: state => state.home.partner,
      homeList: state => state.home.list,
    }),
  },
  created() {
    this.getAllDate()
  },
  methods: {
    getAllDate() {
      this.getData().then(res => {
        this.$nextTick(() => {
          this.bannerSwiper = new Swiper('#nav-swiper', {
            autoplay: true, //可选选项，自动滑动,
            initialSlide: 0,
            // loop: true,
            disableOnInteraction: true,
            centeredSlides: true, //设定为true时，active slide会居中，而不是默认状态下的居左。
            slidesPerView: 'auto',
            spaceBetween: 30,
            pagination: {
              el: '.nav-swiper-pagination',
              bottom: 30,
            },
          })
          // this.certifySwiper = new Swiper('#certify-swiper', {
          //   watchSlidesProgress: true,
          //   slidesPerView: 'auto',
          //   centeredSlides: true,
          //   loop: true,
          //   loopedSlides: 5,
          //   autoplay: true,
          //   // navigation: {
          //   //   nextEl: '.swiper-button-next',
          //   //   prevEl: '.swiper-button-prev',
          //   // },
          //   // pagination: {
          //   //   el: '.swiper-pagination',
          //   // },
          //   on: {
          //     progress: function(progress) {
          //       for (let i = 0; i < this.slides.length; i++) {
          //         let slide = this.slides.eq(i)
          //         let slideProgress = this.slides[i].progress
          //         if (Math.abs(slideProgress) > 1) {
          //           this.modify = (Math.abs(slideProgress) - 1) * 0.3 + 1
          //         }
          //         let translate = slideProgress * this.modify * 40 + 'px'
          //         let scale = 1 - Math.abs(slideProgress) / 15
          //         let zIndex = 999 - Math.abs(Math.round(10 * slideProgress))
          //         slide.transform(
          //           'translateX(' + translate + ') scale(' + scale + ')'
          //         )
          //         slide.css('zIndex', zIndex)
          //         slide.css('opacity', 1)
          //         if (Math.abs(slideProgress) > 3) {
          //           slide.css('opacity', 0)
          //         }
          //       }
          //     },
          //     setTransition: function(transition) {
          //       for (var i = 0; i < this.slides.length; i++) {
          //         let slide = this.slides.eq(i)
          //         slide.transition(transition)
          //       }
          //     },
          //   },
          // })
        })
      })
    },
    async navClick(index) {
      if (index == 4) {
        return this.$message.warning('开发中...敬请期待')
      }
      await accessible({
        type: this.getType(index),
      }).then(
        res => {
          switch (index) {
            case 1:
              this.$go('/library')
              break
            case 2:
              this.$go('/book')
              break
            case 3:
              this.$go('/course')
              break
            case 4:
              this.$go('/magazine')
              break
            default:
              break
          }
        },
        err => {
          if (err.code == 20401) {
            this.setLoginDialog(true)
            return
          }
          this.$message.error(err.message)
        }
      )
    },
    getType(index) {
      switch (index) {
        case 1:
          return 'library'
          break
        case 2:
          return 'read'
          break
        case 3:
          return 'teach'
          break
        case 4:
          return 'magazine'
          break
        default:
          break
      }
    },
    on_mouse_enter(index) {
      if (this.bannerSwiper.slideTo) {
        this.bannerSwiper.slideTo(index, 1000, true)
        this.bannerSwiper.autoplay.stop()
      }
    },
    on_mouse_leave(index) {
      this.bannerSwiper.autoplay && this.bannerSwiper.autoplay.start()
    },
    on_bot_enter(index) {
      if (index == 1) {
        this.bannerSwiper.autoplay && this.bannerSwiper.autoplay.stop()
      } else {
        this.certifySwiper.autoplay && this.certifySwiper.autoplay.stop()
      }
    },
    on_bot_leave(index) {
      if (index == 1) {
        this.bannerSwiper.autoplay && this.bannerSwiper.autoplay.start()
      } else {
        this.certifySwiper.autoplay && this.certifySwiper.autoplay.start()
      }
    },
    ...mapActions('home', ['getData']),
    ...mapMutations(['setLoginDialog']),
  },
}
</script>

<template lang="pug">
.container
  .banner
    .swiper-container#nav-swiper(@mouseenter="on_bot_enter(1)" @mouseleave="on_bot_leave(1)")
      .swiper-wrapper
        .swiper-slide(v-for="item,index in bannerList" :key="index" @click="navClick(index)")
          img.cp(:src="item.img_src")
      .swiper-pagination.nav-swiper-pagination
    ul.nav.part
      //- li(@click="navClick(index+1)" v-for="item,index in navList")
      li(@click="navClick(index+1)" v-for="item,index in navList" @mouseenter="on_mouse_enter(index+1)" @mouseleave="on_mouse_leave(index+1)")
        .icon(:class="`icon-mack-${item.icon}`")
        .right 
          span.name {{item.title}}
          span {{item.exp}}
  .group
    .WORKS
    .part.cfx
      ul.list.worksList
        li(v-for="item,index in homeList" :key="index")
          .img-box
            .icon(:class='item.work_type')
            img.img(:src="item.img_src")
            .exp
              img(:src="item.base_url")
          .text
            p.name(:title="item.name") {{item.name}}
            p.abs(:title="item.abs") {{item.abs}}
  //- .group(v-if="libraryList.length")
  //-   .title 精品小数据库
  //-   .part.cfx
  //-     ul.list.library
  //-       li(v-for="item,index in libraryList" :key="index")
  //-         img.img(:src="item.img_src")
  //-         p.text {{item.name}}
  //-         .exp
  //-           img(:src="item.base_url")
  //- .group(v-if="bookList.length")
  //-   .title 精品电子书作品
  //-   .part.cfx
  //-     .swiper-container#certify-swiper(@mouseenter="on_bot_enter(2)" @mouseleave="on_bot_leave(2)")
  //-       ul.swiper-wrapper
  //-         li.swiper-slide(v-for="item,index in bookList" :key="index")
  //-           img.img(:src="item.img")
  //-           .exp
  //-             img(:src="item.base_url")
  //-             .exp-text
  //-               p.name {{item.name}}
  //-               p.abs {{item.abs}}
  //- .group(v-if="courseList.length")
  //-   .title 精品课程课件
  //-   .part.cfx
  //-     ul.list
  //-       li(v-for="item,index in courseList" :key="index")
  //-         img.img(:src="item.img")
  //-         .text
  //-           p.name {{item.name}}
  //-           p.abs {{item.abs}}
  //-         .exp
  //-           img(:src="item.base_url")
  //- .group
  //-   .title 精品动态杂志鉴赏
  //-   .part.cfx
  //-     ul.list.magazine
  //-       li(v-for="item,index in bannerList" ref="magazine" :key="index" :style="{left:'-'+index*20+'px'}" )
  //-         img.img(:src="item.src")
  //-         .text
  //-           p.name {{item.name}}
  //-           p.abs {{item.abs}}
  .group.shift
    .title 火鸟文档助手
    p 上传Pdf或word文件，即刻获取移动端阅读页面、查看内容元数据、下载XML、WORD、EPub等格式
    .part.cfx
      .core.core1
        .img.icon-shift-quick
        h3 快捷转档
      .core.core2
        .img.icon-shift-distribut
        h3 移动端分发
      .core.core3
        .img.icon-shift-download
        h3 多格式下载 
      .core.core4
        .img.icon-shift-edit
        h3 快捷编辑
    //- el-button(type="primary" class='use') 立即使用
  .group(v-if="partnerList.length")
    .title 合作单位
    .part.cfx
      ul.list.partner
        li(v-for="item,index in partnerList" ref="magazine" :key="index")
          a(:href='item.text' target="_blank")
            img.img(:src="item.img_src")
</template>

<style lang="stylus" scoped>
@import '../../utils/css/home.styl'
</style> 

