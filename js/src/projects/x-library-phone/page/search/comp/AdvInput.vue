<script>
export default {
  data() {
    return {
      list: ['打撒', '大时代', '等等等等等等等等', '打撒', '等等等', '等等等'],
    }
  },
}
</script>

<template lang="pug">
  .comp-my-test
    .wrapper 
      .item(v-for="item in list")
        .text {{item}}
</template>
<style lang="stylus">
.comp-my-test
  >.wrapper
    overflow-x scroll
    line-height 45px
    display -webkit-box
    >.item
      padding 0 15px
      border 1px solid red
</style>
