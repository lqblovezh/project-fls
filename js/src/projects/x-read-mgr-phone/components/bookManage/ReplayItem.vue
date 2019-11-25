<script>
export default {
  props: ['i'],
  data() {
    return {}
  },
  computed: {
    list() {
      // return  this.i.res_info.res
      return []
    }
  },
  methods: {
    test() {}
  }
}
</script>

<template lang="pug">
.div 
  .item
    .left 
      img(  v-lazy="i.user_picture")
    .right 
      .name 
        .author {{i.nick_name}}
        //- .author-type  专家
      .time {{i.create_time}}
      .img-wrap
        .imgs(v-if="i.img_src && i.img_src.length > 0")
          .img(v-for="pic in i.img_src") 
            img(v-lazy="pic")
      .content {{i.value}}
      .icons
        .leftIcons
          IconZan(@change="$emit('thumbsup',i)" type="up" :data-num='10')  {{i.info_good_num}}
          // IconZan(@change="$emit('commentIconClick')"  type="replay") 
        .rightIcon 
          IconZan(@setUp=" " type="share" )  
          .mark 
          .share
  .slot
    slot        
  // .line-single(v-if="i.res_info.res.length > 0")
  // ul.comments(v-if="list && list.length > 0")
  //   li.item(v-for="(item,index) in list" v-if="index < 3")
  //     .left 
  //       img( v-lazy="item.user_picture")
  //     .right 
  //       .name 
  //         .author {{item.nick_name}}
  //         //- .author-type  专家
  //       .time {{i.create_time}}
  //       .img-wrap.replay
  //         .imgs(v-if="item.img_src && item.img_src.length > 0")
  //           .img(v-for="items in item.img_src") 
  //             img(v-lazy="items")
  //       .content {{item.value}}
  //       .rightIcon 
  //         // IconZan(@change="$emit('thumbsup',item)" type="up") {{item.info_good_num}}
  //   .replay-more(@click="$emit('replayMore' , i )   ") 更多 
            
</template>


<style lang="stylus" scoped>
.replay-more
  text-align center
  color #14afff
  font-size 12px
  height 0.6rem
  line-height 0.6rem
.div
  padding 0.3rem
  padding-bottom 0
.comments
  padding-left 0.3rem
  .item
    padding-top 0.3rem
    border-bottom 1px solid #e5e5e5
    &:last-child
      border none
  .rightIcon
    position absolute
    right 0
    top 0
.icons
  display flex
  height 0.55rem
  margin-top 0.1rem
  justify-content space-between
  width 100%
  .leftIcons
    display flex
  .rightIcon
    float right
.item
  display flex
  .left
    flex none
    width 0.74rem
    height 0.74rem
    overflow hidden
    border-radius 50%
    >img
      width 100%
      height 100%
  .right
    padding-left 0.2rem
    flex 1 1 0.7rem
    position relative
    .img-wrap
      &.replay
        .imgs
          width 5.4rem
      .imgs
        display flex
        overflow scroll
        width 6rem
        .img
          margin-right 10px
          height 2.2rem
          >img
            height 100%
            width auto
    .name
      font-size 0.28rem
      display flex
      .author
        color rgba(8, 71, 102, 0.8)
        height 0.36rem
        line-height 0.36rem
        padding-right 0.2rem
    .time
      color #999
      font-size 0.24rem
      margin 0.1rem 0rem
    .content
      color #333
      line-height 0.35rem
      margin 0.15rem 0
      word-break break-all
</style>
