<script>
export default {
  props: {
    value: {}
  },
  data () {
    return {
      content: '',
      lineHeight: 26
    }
  },
  methods: {
    hideInput (evt) {
      if (evt.target.classList.contains('fixed-page')) {
        this.$emit('input', false)
        this.content = ''
      }
    },
    send () {
      if (this.content) {
        this.$emit('reply', this.content)
      }
    }
  }
}
</script>
<template lang="pug">
.fixed-page(v-show="value" @click="hideInput($event)")
  .comp-text.flex
    textarea.text-left.f14(v-model="content" :style="{}" ref="textarea")
    button.text-right.tc.btn-reset.f16(@click="send") 回复
</template>
<style lang="stylus">
.fixed-page
  position fixed
  top 0
  bottom 0
  right 0
  left 0
.comp-text
  position fixed
  bottom 0
  width 100%
  padding 5px 0
  align-items center
  background-color #ddd
  .text-left
    flex 1
    height auto
    padding 5px
    max-height 96px
    margin 0 10px
  .text-right
    width 50px
</style>