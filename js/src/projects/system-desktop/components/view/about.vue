<script>
import { getList } from 'services/system/systemDesktop/about'
import { getList as demoList } from 'services/system/systemDesktop/demo'
import urlJoin from 'url-join'
export default {
  components: {},
  data() {
    return {
      leftMenu: [],
      crumbs: '',
      rightMenu: [],
      currentIndex: 0,
    }
  },
  mounted() {
    this.demoList()
    getList().then(res => {
      if (res.data.length) {
        this.crumbs = res.data[0].name
      }
      this.leftMenu = res.data.map((el, i) => {
        el.isActive = i == 0
        return el
      })
      this.leftMenu.push({
        name: '演示Demo',
        type: 'demo',
      })
      console.log(this.leftMenu)
    })
  },
  methods: {
    demoList() {
      demoList().then(res => {
        this.rightMenu = res.data
      })
    },
    change(i) {
      this.leftMenu.forEach((el, index) => {
        if (index == i) {
          this.crumbs = el.name
        }
        el.isActive = index == i
      })
    },
    go(path) {
      this.$router.push({ path: urlJoin(baseUrl, path) })
    },
  },
}
</script>

<template lang="pug">
.demo
  .banner
  .dy
    .content
      ul.leftMenu
        li(v-for="(item,i) in leftMenu")
          p(@click="change(i)" :class="{ 'active' : item.isActive }") {{item.name}}
      .discribe(v-for="item in leftMenu" v-if="item.isActive")
        .div(v-if='item.type!="demo"')
          .pic
            video(:src="item.video_src"  height="500px" width="880px" controls="controls")
          .text 
            .title
              .left {{item.name}}介绍
              .right 
                a(:href="item.file__src" ) 文档下载
            .w
              pre {{item.text}}
        .rightMenu(v-else)
          ul.nav
            li(v-for="(item,index) in rightMenu" @click="currentIndex = index" :class="{ 'active' : currentIndex == index }") {{item.name}}
          .div(v-for="(item,index) in rightMenu" v-if="currentIndex == index")
            .pic
              img.big(:src="item.img_src")
              img.small(:src="item.img_code_src")
            .text 
              .title
                .left {{item.name}}介绍
              .w
                pre {{item.text}}
</template>
<style lang="stylus" scoped>
.dy
  width 1200px
  margin 0 auto
  font-size 16px
  margin-bottom 70px
.banner
  height 216px
  min-width 1200px
  background url('./img/x-banner.png') center center no-repeat
.crumbs
  display flex
  line-height 68px
  li
    padding 0 5px
    cursor pointer
    &:hover
      color #f7793e
  .ops
    color #f7793e
    cursor default
.leftMenu
  width 170px
  li
    line-height 1
    height 54px
    background #fff
    text-align center
    // transition .8s
    cursor pointer
    width 151px
    p
      height 54px
      justify-content center
      align-items center
      display flex
      line-height 1.5
      &.active
        background url('./img/select.png') left center no-repeat
        color #fff
        position relative
        width 100%
        padding-right 20px
        animation ani 0.2s linear
ul
  list-style none
.content
  display flex
  margin-top 30px
  .discribe
    width 1025px
    padding 0 20px 80px
    background #fff
    margin-left 20px
    border-radius 5px
    .rightMenu
      .text
        .title
          .left
            background url('./img/icon_au11.png') no-repeat
      .pic
        .big
          max-width 270px
          max-height 524px
          margin-right 130px
        .small
          max-width 166px
          max-height 166px
      .nav
        margin-top 40px
        li
          min-width 80px
          padding 0 10px
          height 32px
          line-height @height
          text-align center
          font-size 14px
          color #f7793e
          border solid 1px #f7793e
          border-radius 16px
          display inline-block
          margin-right 32px
          cursor pointer
          &:last-child
            margin 0
          &.active
            background-color #f7793e
            color #fff
  .pic
    display flex
    justify-content center
    align-items center
    padding 50px
  .text
    color #555
    .title
      font-size 18px
      color #f7793e
      border-bottom 1px solid #efefef
      margin 10px 30px 18px 30px
      display flex
      padding-bottom 10px
      justify-content space-between
      .left
        text-indent 30px
        background url('./img/icon_au12.png') no-repeat
      .right
        text-indent 30px
        line-height 30px
        font-size 14px
        width 100px
        cursor pointer
        border-radius 5px
        background #f7793e url('./img/icon_au13.png') 8px center no-repeat
        a
          text-decoration none
          color #fff
    .w
      font-size 14px
      line-height 24px
pre
  white-space pre-wrap
  word-wrap break-word
  // text-indent 2em
  text-align justify
  padding 0 30px
@keyframes ani
  from
    width 100px
  to
    width 170px
</style>

