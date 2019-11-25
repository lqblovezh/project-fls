<script>
import Demo from './template/demo'
import About from './template/about'
import Cooperate from './template/cooperate'
import Partner from './template/partner'
import Banner from './template/banner'
export default {
  components: { Demo, About, Cooperate, Partner, Banner },
  data() {
    return {
      tabs: [
        { name: '产品DEMO', isActive: true },
        { name: '了解X-BOOK', isActive: false },
        { name: '合作意向', isActive: false },
        { name: '合作单位', isActive: false },
        { name: '首页banner', isActive: false },
      ],
      type: 0,
    }
  },
  mounted() {},
  methods: {
    change(type) {
      this.type = type
      this.tabs.forEach((el, i) => {
        el.isActive = i == type
      })
    },
  },
}
</script>

<template lang="pug">
.content()
  .tabs
    el-button(:type="item.isActive?'primary':'info'" @click="change(i)" :key="item.name" v-for="(item,i) in tabs") {{item.name}}
  .box
    Demo(v-if="type==0")
    About(v-if="type==1")
    Cooperate(v-if="type==2")
    Partner(v-if="type==3")
    Banner(v-if="type==4")
</template>

<style lang="stylus" scoped>
.content
  padding 15px
  min-width 1600px
  .tabs
    background #fff
    line-height 80px
    border-radius 5px
    padding 0 20px
    box-sizing border-box
  .box
    background #fff
    height 780px
    margin-top 20px
    border-radius 5px
    padding 20px
    box-sizing border-box
</style>

