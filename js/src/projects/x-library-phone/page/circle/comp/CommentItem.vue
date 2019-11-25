<script>
export default {
  props: {
    name: {},
    item: {},
  },

  methods: {
    clickHandler(e) {
      console.log(e.path)
      console.log(e.currentTarget)
      e.path.forEach(item => {
        let flag = item === e.currentTarget
        console.log(flag)
      })
    },
    reply() {
      console.log('reply')
      this.$emit('reply')
    },
    like() {
      console.log('like')
      this.$emit('like')
    },
    clickHnadler(e) {
      const { like, txt } = this.$refs
      const root = e.currentTarget
      const path = this.$getEventPath(e)
      for (const item of e.path) {
        // console.log(item)
        if (item === like) {
          this.like()
        } else if (item === txt) {
          this.reply()
        }
        if (root === item) return
      }
    },
  },
}
</script>

<template lang="pug">
  .comp-circle-comment-item
    .wrapper
      .content  
        .left
          img(:src="item.user_picture")
        .right.after_bd.f14(@click="clickHnadler")
          .flex
            .name.c_3.ellipsis {{item.user_nick}}
              span.tc.ib.c_f.f12.tag(v-show="item.is_owner") 题主
              span.ib.c_gray1 回复
              span {{item.replay_nick}}
            span.ib.vm-all.like(ref="like")
              .icon(:class="item.is_good ? 'icon-like-checked' : 'icon-like'")
              span {{ item.info_good_num }}
          .txt.c_4( ref="txt"  )
            span {{item.value}}
            br
            span.time.c_9.f12  {{item.update_time}}
          .imgs(v-if="item.img_src.length")
            FileImg( type="2" :files="item.img_src" )
</template>
<style lang="stylus">
.comp-circle-comment-item
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
        >.flex
          >.name
            flex 1
            >.tag
              margin-left 10px
              width 34px
              height 16px
              line-height 16px
              background-color #ff7b6d
              border 1px solid #F15A4A
              border-radius 4px
            >.c_gray1
              margin 0 10px
          >.time
            margin 5px 0
          >.txt
            margin 10px 0
          >.like
            margin-top 0px
          >.imgs
            width 5.8rem
          >.vm-all
            width 37px
            span
              margin-left 10px
</style>
