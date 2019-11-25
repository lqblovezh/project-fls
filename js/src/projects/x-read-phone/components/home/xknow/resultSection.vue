<script>
export default {
  props: ['name', 'hide'],
  created() {
    this.isHide = this.hide
  },
  data() {
    return {
      isHide: false,
    }
  },
  methods: {
    fold() {
      this.isHide = !this.isHide
    },
  },
}
</script>

<template lang="pug">
.section.chapters 
  .title 
    .name(@click="fold" :class="{true:isHide}") 
      .icon
      span(v-text="name")
  .content(v-show="!isHide") 
    slot
</template>

<style lang="stylus" scoped>
.section
  padding 0.3rem
  padding-bottom 0
  padding-top 0.2rem
.title
  .name
    height 0.7rem
    font-size 0.3rem
    color #333
    display flex
    line-height 0.75rem
    .icon
      width 0.4rem
      height 100%
      background url('./img/open-true.png') no-repeat left center
      background-size 0.2rem 0.15rem
    &.true
      .icon
        background url('./img/open.png') no-repeat left center
        background-size 0.15rem 0.2rem
</style>
