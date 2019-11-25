<script>
export default {
  data() {
    return{
      objectClass: {
        'icon-message-read': false,
        'icon-message-unread': false
      },
      Unread: {
        'icon-message-read': false,
        'icon-message-unread': true
      },
      Yread: {
        'icon-message-read': true,
        'icon-message-unread': false
      }
    }
  },
  props: {
    index:0,
    item: {
      type: Object,
      required: true
    }
  },
  mounted() {
    this.Isread()
  },
  methods: {
    Isread() {
      if(this.index==0){
        this.objectClass = this.Unread
      }else{
        this.objectClass = this.Yread
      }
    }
  },
  components: {}
}
</script>
<template lang="pug">
.reply-item.f14
  .reply-item__head.flex-between-center
    .reply-item__user
      .reply-user__tips.ib {{ item.nick_name }} 回复了 你
      .ib(:class="objectClass")
    .reply-item__time.f12 {{ item.create_time }}
  .reply-item__circlename.ellipsis {{item.theme_circle_common}}
  .reply-item__body.flex-between-center
    .reply-item__content(@click="$go('/circle-reply-list', {commentId: item.book_circle_comment_id, type: 3})") {{ item.value }}
    .reply-item__reply(@click="$parent.$emit('showReply', item)") 回复
  .line
</template>
<style lang="stylus">
.reply-item
  padding 15px
  // background-color #DDD
  >.reply-item__head
    line-height 16px
    .reply-user__tips
      margin-right 10px
      color #676A7B
    .reply-item__time
      color #A6AAC1
  >.reply-item__circlename
    margin-top 17px
    margin-bottom 15px
    color #373944
  >.reply-item__body
    padding 11px 14px
    margin-bottom 15px
    background-color #F0F2FE
    border-radius 6px
    >.reply-item__content
      color #676A7B
    >.reply-item__reply
      color #A6AAC1
  >.line
    margin-left -15px
    margin-right -15px
</style>