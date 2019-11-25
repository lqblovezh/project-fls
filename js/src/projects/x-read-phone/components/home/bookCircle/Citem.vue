<script>
export default {
  props: ['i'],
  methods: {
    replayClickHandler(type, item = {}) {
      //  还是不在在这里组织, 需要的东西需要外部穿进来
    },
  },
}
</script>


<template lang="pug">
  .citem-wrap
    .left(@click="$emit('goMore',i)")   
      img(  :src="i.user_picture")
    .right
      .name(@click="$emit('goMore',i)") 
        .author {{i.nick_name}} 
        .author-type  主题
      .time {{i.create_time}}
      .icon-essence(v-show="i.essence_type !='false'")
      .img-wrap(v-if="i.img_src && i.img_src.length"  )
        .imgs
          .img(v-for="pic in i.img_src"   v-if="!$isVideo(pic)"  ) 
            img(:src="pic")
        .videos-warp 
          .video(v-for="pic in i.img_src" v-if="$isVideo(pic)"  ) 
            video(controls :src="pic" controlslist="nodownload" )      
      .content {{i.value}}
      .icons()
        .leftIcons
          IconZan(@change="$emit('thumbsup',i)" type="up" :data-num='i.info_good_num') {{i.info_good_num}}
          IconZan(@click.native="$emit('replayClickHandler',2 )" type="replay") {{i.home_theme_number}} 
        .rightIcon 
          //- IconZan(@setUp=" " type="share" )  
          .mark 
          .share
</template>


<style lang="stylus" scoped>
.icon-essence
  position absolute
  right 0
  top 0
.author-type
  background #efac21  
</style>
