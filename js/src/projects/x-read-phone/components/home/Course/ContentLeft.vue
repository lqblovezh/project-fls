<script>
export default {
  props: ['info'],
}
</script>


<template lang="pug">
div 
  ContentTitle(name="内容简介")
  .abs {{info.books_info.abs}}

</template>

<style lang="stylus" scoped>
.abs 
  text-indent 35px
  padding 10px 15px
  letter-spacing 2px
  line-height 16px
  font-size 14px
  word-break break-all

</style>
