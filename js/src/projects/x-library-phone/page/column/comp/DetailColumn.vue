<script>
export default {
  props: {
    meta: {},
    item: {},
  },
  data() {
    return {}
  },
  created() {},
}
</script>

<template lang="pug">
  .comp-data-column(v-if="meta[item.key]")
    TopicTitle(name="关联资源" rname="更多"  icon="more" path="/column-resource" :query="{id: $route.query.id, laws: meta.关联资源}" v-if="item.more&&item.key=='关联资源'")
    .list(v-else)
      TopicTitle(:name="item.key" icon="false" rname=" " )
      .content {{meta[item.key]}}
</template>
<style lang="stylus" scoped>
.comp-data-column
  padding 10px
  border-bottom 1px solid #eeeeee
  .content
    color #676a7b
    font-size 12px
    font-family PingFangSC-Regular
    opacity 0.9
    padding 10px
  >>> .comp-home-topic-title
    margin-top -0.1rem
    .name span
      color #373944
</style>
