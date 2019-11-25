<script>
export default {
  props: {
    name: {
      default: '暂无数据，请前往其他页签查看',
    },
    top: {
      default: '0px',
    },
  },
}
</script>


<template lang="pug">
  div.no-data(:style="{transform:`translateY(${top})`}") {{name}}
</template>

<style lang="stylus">
.no-data
  text-align center
  margin-top 123px
  font-size 12px
  color #666
</style>
