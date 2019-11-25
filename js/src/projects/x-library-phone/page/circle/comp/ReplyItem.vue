<script>
export default {
  components: {},
  props: {
    name: {},
    item: {},
  },

  methods: {
    clickHandler(e) {
      let node = this.$getTarget(e)
      // console.log(node)
      if (!node) return
      if (node.classList.contains('like')) {
        console.log('like')
        this.$emit('like')
      }
    },
  },
  filters: {
    compareTime (time) {
      const duration = (new Date().getTime() - new Date(time).getTime())/1000
      let str = ''
      if (duration < 60) {
        str = `${duration}秒前`
      } else if (duration < 3600) {
        str = `${parseInt(duration/60)}分钟前`
      } else if (duration < 60 * 60 * 24) {
        str = `${parseInt(duration/3600)}小时前`
      } else if (duration < 60 * 60 * 24 * 30) {
        str = `${parseInt(duration/86400)}天前`
      } else if (duration < 660 * 60 * 24 * 30 * 12) {
        str = `${parseInt(duration/2592000)}个月前`
      } else {
        str = `${parseInt(duration/2592000/12)}`
      }
      return str
    }
  }
}
</script>

<template lang="pug">
  .comp-circle-reply-item 
    .wrapper
      .content  
        .left
          img(:src="item.user_picture")
        .right.after_bd.f14(@click="$emit('goDetail')" )
          .name.c_3 {{ item.nick_name }}
          .time.c_9.f12 {{ item.create_time|compareTime }}
          .title.c_4(v-if="item.title") # {{item.title}} #
          .txt.c_4 
            span {{item.value}}
          .imgs(v-if=" item.img_src && item.img_src.length")
            FileImg( type="2" :files="item.img_src" )
          .btns(@click.stop="clickHandler")
            span.vm-all.like.target
              .icon(:class="item.is_good ? 'icon-like-checked' : 'icon-like'")
              span  {{item.info_good_num}}
            span.vm-all(@click.stop="$emit('goDetail')")
              .icon.icon-comment
              span  {{item.home_theme_number}}
            //- span.vm-all.fr
              .icon.icon-share
</template>
<style lang="stylus">
.comp-circle-reply-item
  >.wrapper
    >.content
      display flex
      padding 15px
      >.left
        flex none
        >img
          width 38px
          height 38px
          border-radius 4px
      >.right
        width 100%
        padding-left 15px
        position relative
        >.time
          margin 5px 0
        >.txt
          margin 10px 0
        >.imgs
          width 5.8rem
        >.btns
          margin-bottom 10px
          line-height 30px
          >.like
            margin-right 30px
</style>
