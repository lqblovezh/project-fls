<script>
export default {
  props: {
    text: '',
    keyword: '',
  },

  computed: {
    replaceText() {
      if (!this.text || !this.keyword) {
        return this.text
      }
      if(typeof this.keyword=='string'){
        return this.text.replace(
          this.keyword,
          `<span class="high-light-text">${this.keyword}</span>`
        )
      }else{
        return this.keyword.reduce((text, keyword) => {
          return text.replace(
          keyword,
          `<span class="high-light-text">${keyword}</span>`
        )
        }, this.text)
       
      }
    },
  },
}
</script>


<template lang="pug">
  span(v-html="replaceText" class="high-light-wrapper")
</template>
<style lang="stylus">
.high-light-wrapper
  >.high-light-text
    color #ff5d16
</style>
