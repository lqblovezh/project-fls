<script>
export default {
  props: {
    type: {
      type: String,
      default: 'list',
    },
    item: Object,
  },
  methods: {
    goDetai(e) {
      const name = e.target.className
      let type
      if (/see/.test(name)) {
        type = 'Video'
      } else if (/listen/.test(name)) {
        type = 'Audio'
      } else if (/book/.test(name)) {
        type = 'Read'
      }else {
        // 三个都不是
        return 
      }
      this.$go('/bookMedia', { type, id: this.item.book_id })
    },
  },
}
</script>

<template lang="pug">
.div.circle-item-wrap 
  .main() 
    .top  
      .left 
        .img(@click="$emit('detail')") 
          img( v-lazy="item.img_src")
      .right
        .title.ell(@click="$emit('detail')") {{item.book_name}}
        .list(v-show="type == 'list'") 
          .author()  
            .span.ell 作者：{{item.author}}
            //- .span.ell 作者：是枝裕和 已加入
          .theme
            .name 
              |共有
              span.num {{item.home_theme_number}}
              |个主题
            .add.true(   v-if="!item.user_status " @click="$emit('addQuan',item)" )
        .detail(v-show="type == 'detail'")  
          .author.time
            .span.ell 开始日期：{{item.create_time}}
            .span.ell 最近更新：{{item.update_time}}
          .icons(v-show="type == 'detail'" @click="goDetai")  
            .icon.listen(v-if="item.put_audio")  
            .icon.book(v-if="item.put_books")    
            .icon.see(v-if="item.put_video")    
    .line-single(v-show="type == 'list'")           
    .bottom( v-show="type == 'list' ") 
      .time 开始{{item.create_time}}
      .update  更新{{item.update_time}}
</template>

<style lang="stylus" scoped>
.div
  padding 0.3rem
  padding-bottom 0
.circle-item-wrap
  width 

.num
  color #14afff
.bottom
  display flex
  font-size 0.22rem
  color #666
  height 0.67rem
  line-height 0.67rem
  justify-content space-between
.top
  display flex
  padding-bottom 0.3rem
  .right
    padding-left 0.23rem
    width 5rem
    .title
      font-size 0.32rem
      height 0.4rem
      text-indent 1rem
      background url('./img/quan.png') no-repeat left center
      background-size 0.7rem 0.34rem
      line-height 0.45rem
    .icons
      display flex
      align-items center
      .icon
        width 0.5rem
        height 0.5rem
        margin 0 3px
        &.listen
          background url('./img/listen.png') no-repeat left
          background-size 0.38rem 0.34rem
        &.listen
          background url('./img/listen.png') no-repeat left
          background-size 0.38rem 0.34rem
        &.book
          background url('./img/Ebook.png') no-repeat left
          background-size 0.38rem 0.34rem
        &.see
          background url('./img/see.png') no-repeat left
          background-size 0.38rem 0.34rem
    .author
      font-size 0.24rem
      color #999
      padding 0.1rem 0
      &.time
        color #666
      .span
        height 0.35rem
        line-height 0.35rem
    .theme
      font-size 0.28rem
      color #333333
      display flex
      justify-content space-between
      line-height 0.43rem
      .add
        width 1.32rem
        height 0.38rem
        background url('./img/add.png') no-repeat left center
        background-size 100%
        &.true
          background url('./img/add-true.png') no-repeat left center
          background-size 100%
  .left
    width 1.66rem
    height 1.66rem
    flex none
    .img
      text-align center
      border-radius 50%
      overflow hidden
      border 2px solid #14afff
      box-sizing border-box
      height 100%
      >img
        width 1.22rem
        height 1.66rem
</style>
