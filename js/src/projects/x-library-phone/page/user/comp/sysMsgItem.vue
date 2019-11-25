<script>
export default {
	props: {
		item: {}
	},
  components: {}
}
</script>
<template lang="pug">
.reply-item.f14
  .reply-item__head.flex-between-center
    .reply-item__user
      .reply-user__tips.ib 系统消息
      span 新消息
    .reply-item__time.f12 {{ item.create_time }}
  .reply-item__circlename 书籍圈子名称
  .line
</template>
<style lang="stylus" scoped>
.reply-item
  .reply-item__user
    span
      color #B1936A
</style>
