<script>
import { mapState , mapMutations } from 'vuex';
import  * as  bookinfoServices  from 'services/x-read/bookInfo'
import {setFullscreen , isFullscreenEnabled} from '@/utils/util.js'
export default {
  props:['buys','datas'],
  created(){
    // this.init();
  },
  computed:{
    ...mapState({
      isPlayerShow: state => state.player.isPlayerShow,
      fullScreen: state => state.player.fullScreen,
      videos: state => state.bookinfo.videos,
      buyVideos: state => state.bookinfo.buyVideos,
    }),
    totalPrice(){
      let total = 0;
      Object.values(this.buys).forEach(item => {
        if(item){
          total += item.price*1
        }
      })
      // return total
      return '￥'+total.toFixed(2)
    },
    totalChecked(){
      let arr = Object.values(this.buys)
      for (const item of arr) {
        if(item){
          return true
        }
      }
      return false
    }
  },
  methods:{
    ...mapMutations(['setinfo','setIsPlayerShow',
      'setbookId',
      'setvideos',
      'setaudios',
      'setEbooks',
      'setIsPlayerVideoShow','setCurrVideoIndex','setVideoPlayList'
    ]),
    init(){
      this.query = this.$route.query
      this.getvideos();
    },
    getvideos(){
      bookinfoServices.getMedia({...this.query , type:2}).then(res => {

        this.setvideos(res.data.chapters)
      })
    },
    openVideo(index){
      // isPlayerVideoShow:state => state.player.isPlayerVideoShow,
      // 待优化 是否自动下一视频
      this.setCurrVideoIndex(index)
      this.setIsPlayerVideoShow(true)
      this.setVideoPlayList(this.videos)
      // alert(this.isFullscreenEnabled())
      setTimeout(() => {
        let node =  document.querySelector("#video")
        node.play()
        setFullscreen(node)
      }, 20);
    },
    // setFullscreen(element) {
    //   var el = element instanceof HTMLElement ? element : document.documentElement;
    //   var rfs = el.requestFullscreen       ||
    //             el.webkitRequestFullscreen ||
    //             el.mozRequestFullScreen    ||
    //             el.msRequestFullscreen;
    //   if (rfs) {
    //       rfs.call(el);
    //   } else if (window.ActiveXObject) {
    //       var ws = new ActiveXObject("WScript.Shell");
    //       ws && ws.SendKeys("{F11}");
    //   }
    // },
    // isFullscreenEnabled(){
    //   return document.fullscreenEnabled       ||
    //           document.mozFullScreenEnabled    ||
    //           document.webkitFullscreenEnabled ||
    //           document.msFullscreenEnabled || false;
    // },
    bookImgClick(){

      if(!this.videos[0]) return
      this.openVideo(0)
    },
  },
  destroyed(){

  }
}
</script>

<template lang="pug">
.div
  // .msg-price.all
  //   .pay
  //     .total
  //       span 已选择 0 栏
  //       span 总价: 0
  //     .right
  //       span.name 支付方式:
  //       span  微信
  //       img(  src="./img/wecat.png"  )
  //   .line-single
  //   .oper-my
  //     .add-book  加入阅读
  //     .buy
  //       .name( @click="$emit('buyAll' )" ) 全部购买
  //       .price-common
  //         .curr-price(v-text="totalPrice")
  //         .err ￥58
  //       .check(@click=" $emit('buyAll' ) " :class="{true:totalChecked}"  )
  .ls
    .item(v-for="(i,index) in datas.chapters" )
      .line-single
      .content
        .left( @click="$openVideo({index, list:datas.chapters} )")
          img.book(v-lazy="i.img_src")
          img.play(src="./img/play.png")
        .right
          .name.ell
            span  {{i.name}}
            span
          .preview {{i.abs}}
          // .fun
            .time
            .price-common.item
              .curr-price ￥{{i.price}}
              //- .err ￥58
              .check(@click="$emit('buyItem',i)"
                :class="{true: buyVideos[i.id] != null}" )
</template>

<style lang="stylus" scoped>
.div
  padding  0 0.3rem
.ls
  .item
    height 1.6rem
    margin-bottom 0.15rem
  .content
    font-size 14px
    display flex
    padding 0.3rem 0
    .left
      position relative
      overflow hidden
      width 1.1rem
      height 1.1rem
      background #000
      flex none
      img.book
        width 1.1rem
        height 1.1rem
        opacity 0.8
      .play
        position absolute
        width 22px
        height 22px
        left 50%
        top 50%
        transform translate(-50% , -50%)
    .right
      width 5rem
      margin-left 13px
      flex 1 1 auto
      .name
        color #333333
        font-size 0.28rem
        line-height 0.54rem
        width 100%
      .preview
        color #888888
        font-size 0.24rem
      .fun
        width 100%
        display flex
        align-items center
        justify-content space-between
        .time
          height 0.5rem
          line-height 0.55rem
          padding-left 15px
          font-size 0.24rem
          background url('./img/time.png') no-repeat left center
          background-size 12px 12px
        .price-common
          height 0.5rem
          line-height 0.5rem
.price-common
  .curr-price
    font-size 0.26rem
  .err
    font-size 0.24rem
  .check
    display inline
</style>
