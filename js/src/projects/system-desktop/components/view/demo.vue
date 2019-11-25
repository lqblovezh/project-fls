<script>
import {getList} from 'services/system/systemDesktop/demo'
import urlJoin from 'url-join'
export default {
  components:{},
  data(){
    return {
      leftMenu:[],
      crumbs:''
    }
  },
  mounted(){
    getList().then(res=>{
      if(res.data.length){
        this.crumbs = res.data[0].name
      }
      this.leftMenu = res.data.map((el,i)=>{
        el.isActive = i==0
        return el
      })
    })
  },
  methods:{
    change(i){
      this.leftMenu.forEach((el,index)=> {
        if(index == i){
          this.crumbs = el.name
        }
        el.isActive = index == i
      });
    },
    go(path){
      this.$router.push({path:urlJoin(baseUrl,path)})
    }
  }
}
</script>

<template lang="pug">
.demo
  .banner
  .dy
    ul.crumbs 
      li(@click="go('home')") X-BOOK云平台
      li /
      li 产品demo
      li /
      li.ops {{crumbs}}
    .content
      ul.leftMenu
        li(v-for="(item,i) in leftMenu")
          p(@click="change(i)" :class="{ 'active' : item.isActive }") {{item.name}}
      .discribe(v-for="item in leftMenu" v-if="item.isActive")
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
  background url('./img/banner.png') center center no-repeat
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
    transition .8s
    cursor pointer
    width 151px
    p
      height 54px
      justify-content center
      align-items center
      display flex
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
  .discribe
    flex 1
    padding 0 20px 80px
    margin-left 20px
    background #fff
    border-radius 5px
  .pic 
    display flex
    justify-content center
    align-items center
    padding 30px
    img 
      padding 0 50px 
      &.small
        width 200px
      &.big
        width 440px
  .text
    padding 0 30px
    .title 
      color #f7793e
      margin 10px 0 20px 0
      .left 
        text-indent 30px
        background url('./img/icon_au11.png') no-repeat
    .w 
      font-size 14px
      line-height 24px
pre
  white-space pre-wrap
  word-wrap break-word
  // text-indent 2em
@keyframes ani
  from
    width 100px
  to
    width 170px
</style>

