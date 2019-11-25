<script>
export default {
  props: ['item'],
  methods: {
    replayClickHandler(type, item) {
      this.$emit('replayClickHandler', type, item)
    },
  },
}
</script>


<template lang="pug">
.comments
  .citem-wrap
    .left 
      img( :src="item.user_picture")
    .right 
      .name 
        .author {{item.nick_name}}
        .author-type(v-if="item.user_roles")  {{item.user_roles}}
      .time {{item.create_time}}
      .img-wrap.replay(v-if="item.img_src && item.img_src.length" )
        .imgs()
          .img(v-for="items in item.img_src" v-if="!$isVideo(items)" )
            img(:src="items")
        .videos-warp 
          .video(v-for="pic in item.img_src" v-if="$isVideo(pic)"  ) 
            video(controls :src="pic" controlslist="nodownload" )  
      .content {{item.value}}
      IconZan(@click.native="replayClickHandler(2, item)"  type="replay")
      .rightIcon 
        IconZan(@change="$emit('thumbsup',item)" type="up") {{item.info_good_num}}
</template>
<style lang="stylus" scoped>
.comments
  padding-left 0.3rem
  .citem-wrap
    padding-top 0.3rem
    border-bottom 1px solid #e5e5e5
    &:last-child
      border none
  .rightIcon
    position absolute
    right 0
    top 0
</style>
