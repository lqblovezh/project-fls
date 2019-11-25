<script>
export default {
  props: {
    text: '',
    index:'',
    len: {
      default: 30,
    },
  },
  data(){
    return {
      searchPage:false,
    }
  },
  mounted() {
    this.ISsearchPage()
  },
  methods: {
    ISsearchPage(){
      if(this.$route.name == 'search'){
        this.searchPage = true
      }
    }
  },
  computed: {
    show() {
      // return this.text
      if (this.text.length <= this.len) {
        return this.text
      }
      try {
        let reg = new RegExp(`.{${this.len}}(.*)`)
        let match = this.text.match(reg)[1]
        return this.text.replace(match, '...')
      } catch (error) {
        return this.text
      }
    },
  },
}
</script>


<template lang="pug">
  .comp-hide-text.ib.ellipsis 
    span(class="index" v-if="searchPage==true") {{index+1}}、
    .btn-columns(v-if="searchPage==true") {{show}}
    .btn-column(v-if="searchPage==false") {{show}}
</template>


<style lang="stylus">
.comp-hide-text
  max-width 6.4rem
  margin 0 0.5em 0 0
  >.index
    color #C99C5E
    font-size 14px
  >.btn-columns
    padding 0 1em
    background #f0f2fe
    color #676a7b
    display inline-block
    border-radius 2px
    text-align center
    line-height 30px
    font-size 14px
    text-align left
    width 100%
    font-size 14px
    box-sizing border-box
  >.btn-column
    width 100%
    font-size 12px
    box-sizing border-box
</style>

