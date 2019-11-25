<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  computed: {
    ...mapState({
      currBottom: state => state.currBottom,
    }),
  },
  methods: {
    isCurr(name) {
      if (name === this.currBottom) {
        return 'active'
      }
      return 'plain'
    },
    go(path) {
      console.log(path)
    },
    eyeClickHandler() {
      console.log('object')
      this.$go('/search-advanced')
    },
  },
}
</script>

<template lang="pug">
.comp-footer.c_3
  //- .center-bottom
  //- .center-bottom-icon.icon(:class="`icon-eye3`") 
  //- .line-circle-shadow 
  .wrapper
    .ls.f12.vm-list
      .ib.item(@click="$go('/home')")
        .icon(:class="`icon-home-${currBottom === 'home' ?'active active' :'plain'}`") 
        .txt 首页
      .ib.item(@click="$go('/find')")  
        .icon(:class="`icon-find-${currBottom === 'find' ?'active2  active' :'plain2'}`") 
        .txt 发现
      .ib.item.center
        .circle-shadow
        .circle-shadow-mask
        .wrapper(@click="eyeClickHandler")
          .icon.vm(:class="`icon-eye3`") 
      .ib.item(@click="$go('/circle')")    
        .icon(:class="`icon-star-${currBottom === 'circle' ?'active  active' :'plain'}`") 
        .txt 圈子
      .ib.item(@click="$go('/user')")      
        .icon(:class="`icon-user-${currBottom === 'user' ?'active  active' :'plain'}`") 
        .txt 我的
</template>

<style lang="stylus">
// 需要放上三个层级来显示
.comp-footer
  >.line-circle-shadow
    box-shadow 0 3px 12px 2px rgba(132, 136, 153, 0.22)
    height 1.2rem
    width 1.2rem
    position fixed
    bottom 60px
    left 50%
    border-radius 50%
    transform translate(-50%, 30%)
  >.wrapper
    height 50px
    width 100%
    position fixed
    bottom 0px
    left 0
    z-index 11
    background #f3f0ea
    box-shadow 0 3px 12px 2px rgba(132, 136, 153, 0.22)
    >.ls
      height 50px
      display flex
      justify-content space-between
      >.item
        height 50px
        width 1.2rem
        text-align center
        line-height 25px
        >.icon.active + .txt
          color #c99c5e
        &.center
          width 1.2rem
          border-radius 50%
          transform translateY(-0.36rem)
          background green
          background #f3f0ea
          height 1.2rem
          position relative
          >.circle-shadow, .circle-shadow-mask
            position absolute
            width 1.2rem
            height 1.2rem
            z-index -10
          >.circle-shadow
            border-radius 50%
            box-shadow 0 3px 12px 2px rgba(132, 136, 153, 0.22)
          >.circle-shadow-mask
            z-index 10
            background #f3f0ea
            transform translateY(30%) scaleX(1.2)
            /* * 遮住阴影 */
          >.wrapper
            line-height 1.2rem
            width 1.2rem
            position absolute
            z-index 10
</style>
