<script>
export default {
  props: {
    value: {
      default: '1',
    },
  },
  data() {
    return {
      typeList: [
        { name: '话题', type: '1' },
        { name: '书评', type: '3' },
        { name: '圈友', type: '圈友' },
        { name: '热度', type: 'time', sort: 'asc' },
        { name: '时间', type: 'hot', sort: 'asc' },
      ],
    }
  },
  methods: {
    clickHnadler(item) {
      console.log(item)
      if (item.sort) {
        console.log('object')
        const { type, sort } = item
        let order = JSON.stringify({ [type]: sort })
        this.$emit('sort', order, () => {
          if (item.sort === 'asc') {
            item.sort = 'desc'
          } else {
            item.sort = 'asc'
          }
        })
      } else {
        // console.log('change');
        this.$emit('changeType', item)
      }
    },
  },
}
</script>


<template lang="pug">
  .comp-circle-detail-nav.after_bd
    .wrapper 
      .ls.flex 
        .item(v-for="item in typeList" @click="clickHnadler(item)")
          .content(:class="{'after_item': !item.sort && item.type ===  value }")
            span.name {{item.name}}
            .icon.icon-sort( v-if="item.sort" :class="{rt180:item.sort === 'desc'}")
</template>
<style lang="stylus">
.comp-circle-detail-nav
  background #fff
  >.wrapper
    >.ls
      justify-content space-around
      line-height 45px
      >.item
        font-size 14px
        padding 0 15px
        >.content
          &.after_item
            font-weight 600
          >.icon
            margin-left 5px
</style>
