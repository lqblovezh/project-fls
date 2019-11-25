<script>

import * as commonServices from "services/common/manager"
import {HtmlDecode} from '@/util/domUtil'
import MaskShow from '@/components/common/MaskShow'


export default {
  components:{MaskShow},
  props: ['item'  ],
  created() {
    var item = this.item ;
    log(item.preview)
    // if(item.indexOf("<") == 0){

    // }
    // item.preview = HtmlDecode(item.preview)
    var {preview, name:title , author ,create_time:time } = item
    this.html = {preview, title , author , time }
  },
  mounted() {
  },
  data() {
    return {
      showImgUrl:null, // 封面前端url
      html :{} ,
    };
  },
  methods:{
    test(){
    }
  }
};
</script>

<template lang="pug">
.div
  MaskShow( )
    .phoneWrap
      .phone
        .close( @click="$emit('cancle')"  type="info" )
        .content(  )
          .phoneTop 公众号
          .main
            .title {{html.title}}
            .msg
              span.time {{html.time}}
              span.author {{html.author}}
              //- span
              //-   a.link(href="xxx") 公众号链接
            .rich(v-html="html.preview")

</template>


<style lang="stylus" >
.phoneWrap
  width 100%
  .phone
    margin-top 100px
    margin-left 50%
    transform translateX(-50%)
    display inline-block
    position relative
    height 680px
    width 330px
    background url('../../assets/phone.png') no-repeat
    .close
      position absolute
      width 28px
      height 28px
      background url('../../assets/imgclose.png')
      right -10px
      top -10px
      cursor pointer
    .content
      position absolute
      height 503px
      width 286px
      background white
      left 18px
      top 83px
      .phoneTop
          height 38px
          background #222
          text-align center
          line-height 38px
          font-size 14px
          color #fff
          width 100%
      .main
        overflow-x hidden
        overflow-y  auto
        height 436px
        padding 15px 10px
        .title
          font-size 16px
          margin-bottom  10px
          color #353535
        .msg
          margin-bottom 18px
          line-height 20px
          font-size 14px
          color #8c8c8c
          >span+span
            margin-left 15px
        &::-webkit-scrollbar
          width: 6px;
          height: 6px;
        &::-webkit-scrollbar-thumb
          background-color: #c2c2c2;
          background-clip: padding-box;
          min-height: 28px;
        &::-webkit-scrollbar-track-piece
          background-color #fff

  .rich
    img,video,audio
      max-width 100%
    strong
      font-weight bold
  a
    text-decoration none

</style>
