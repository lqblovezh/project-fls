<script>
import Score from './Score'
export default {
  props: {
    detail: '',
    type: {
      default: false,
    },
    title: {},
    img: {},
    name: {},
    author: {},
    value: {},
    navType: {}
  },
  components: {
    Score
  }
}
</script>

<template lang="pug">
  .comp-circle-detail-card.c_f
    .wrapper
      .main.flex.bg-bg-top
        img(:src="img" v-if="img")
        .icon-circle-bg(v-else)
        .right 
          .name.f16 {{name}}
          .author.f12(v-if="detail.author")  {{author}}
          Star(v-show="type==='reply' && title !== 1")
          .add.bbtn.red.f14(
            v-if="type != 'reply' && Number(navType) !== 3"
            @click="$emit('addCircle')"
          ) {{ detail.user_status ?  '退出书圈' : `+ 加入书圈`}}
          Score(v-else-if="type != 'reply'" :detail="detail")
</template>


<style lang="stylus">
.comp-circle-detail-card
  font-size 16px
  >.wrapper
    >.main
      padding 15px
      position relative
      >img
        width 100px
        height 140px
        object-fit contain
      >.right
        flex 1
        padding-left 20px
        >.author
          margin-top 10px
        >.add
          position absolute
          right 15px
          bottom 25px
</style>
