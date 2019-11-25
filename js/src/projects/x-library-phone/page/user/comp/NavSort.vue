<script>
export default {
  data () {
    return {
      typeList: [
        { name: '默认', type: 'default' },
        { name: '热度', type: 'hot' },
        { name: '加入时间', type: 'jointime' }
      ]
    }
  }
}
</script>
<template lang="pug">
.com-navsort.flex.tc.f12
  .navsort-item(v-for="item,index in typeList" @click="$emit('input', item.type)")
    p {{item.name}}
    .icon.icon-sort.rt180
  .navsort-item
    p 管理
</template>
<style lang="stylus">
.navsort-item
  flex 1
  color #676A7B
  p
    display inline-block
    margin-right 10px
</style>
