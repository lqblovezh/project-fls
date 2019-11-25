<script>
import { mapState } from 'vuex'
export default {
  props: {
    name: {},
    className: {},
    item: {},
    checked: {},
  },
  data() {
    return {
      itemClildKey: {
        contrast: { name: '对比关系', list: [] },
        desc: { name: '关联关系', list: [] },
        initiation: { name: '引发关系', list: [] },
        interactive: { name: '交互关系', list: [] },
        relation: { name: '联系关系', list: [] },
        represent: { name: '代表词', list: [] },
      },
      // wordList: [],
    }
  },
  watch: {
    checked(flag) {
      console.log(flag)
      if (!flag) {
        this.wordList.splice(0, this.wordList.length)
      }
    },
  },
  computed: {
    ...mapState({
      wordList: state => state.advance.wordList,
    }),
    isDescCheck() {
      return function(word) {
        let index = this.wordList.indexOf(word)
        if (index > -1) {
          return true
        }
      }
    },
  },
  methods: {
    check() {
      this.$emit('check')
    },
    splitWord(key) {
      return this.item.describe[key].split(';')
    },
    handlerItemAll(e) {
      // console.log(e)
      let node = this.$getTarget(e)
      if (!node) return

      let key = node.getAttribute('mkey')
      let word = node.getAttribute('word')
      // console.log(node)
      console.log(key, word)
      let index = this.wordList.indexOf(word)
      if (index > -1) {
        this.wordList.splice(index, 1)
      } else {
        this.wordList.push(word)
      }

      console.log(this.wordList)
    },
  },
}
</script>


<template lang="pug">
  .comp-search-item-check(
    :class="className"
    @click="handlerItemAll"
  )
    .content.flex-between-center(@click.stop="check")
      .name {{name}}
      .right 
        Checked(:checked="checked")
    .item-child(v-if="checked")
      .group(
        v-for="obj,key in itemClildKey"
        v-if="item.describe[key]"
        :key="key"
      )
        .name.c_6.f14 {{obj.name}}
        .value.f12.c_7
          .ib.target(
            v-for="word in splitWord(key)" 
            :word="word"  
            :mkey="key"
            :key="word"
          )
            Checked(:checked="isDescCheck(word)")
            span.word {{word}}
</template>


<style lang="stylus">
.comp-search-item-check
  position relative
  >.content
    display flex
    line-height 2em
    justify-content space-between
    color #676A7B
    font-size 15px
    padding-left 15px
    > .right
      margin-left 5px
  &.child
    >.content
      color #373944
      padding-left 15px
  >.item-child
    >.group
      padding 10px
      padding-left 25px
      padding-top 5px
      >.value
        margin 3px
        >.ib
          margin-left 5px
          >.word
            margin-left 4px
</style>
