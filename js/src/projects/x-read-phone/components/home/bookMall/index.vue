<script>
import noFooter from '@/mixins/noFooter'
import { mapMutations, mapState } from 'vuex'
import * as bookServices from 'services/x-read/bookCity'

export default {
  mixins: [noFooter],
  created() {
    this.init()
  },
  computed: {
    ...mapState({
      cityList: state => state.home.cityList,
    }),
  },
  methods: {
    ...mapMutations(['setCityList']),
    init() {
      this.getCityList()
    },
    getCityList() {
      return bookServices.cityList().then(res => {
        this.setCityList(res)
      })
    },
    loadMore() {},
    refresh() {},
    goD({ id, type, name }) {
      this.$go('/bookClassification', { id, type, name })
    },
  },
}
</script>

<template lang="pug">
.div 
  Head(name="书城")
  .main(v-if="cityList")  
    .section
      .item(v-for="(i,index) in cityList.head_book"  v-if="index < 4" @click="goD(i)") 
        .name {{i.name}}
        .imgs 
          img( v-lazy="i.img_src")
    .line-part
    .list(v-if="cityList")
      .li( v-for="i in cityList.cate_list" ) 
        .item(@click="goD(i)")
          .imgs 
            img( v-lazy="i.img_src")
          .name {{i.name}}
          .right 共{{i.total}}册
        .line-single  

</template>

<style lang="stylus" scoped>
.main
  .list
    padding 0.3rem
    .item
      display flex
      align-items center
      height 2rem
      font-size 17px
      .imgs
        width 2rem
        flex 0 0 auto
        height 1.4rem
        position relative
        >img
          position absolute
          width 50px
          height 70px
          z-index 4
          box-shadow 2px 3px 12px 0px rgba(6, 91, 164, 0.22)
          transform-origin bottom left
          &.two
            transform translateX(0.6rem) scale(0.8)
            z-index 3
          &.three
            transform translateX(1.2rem) scale(0.6)
            z-index 2
      .name
        flex 1 1 auto
        width 0.2rem
      .right
        width 1.4rem
        flex 0 0 auto
        font-size 14px
        vertical-align center
        background url('./img/more.png') no-repeat right 0px
        background-size 6.5px 11px
        color #999
  .section
    display flex
    // height 4.5rem
    background #fff
    padding 0.3rem
    padding-top 0.2rem
    flex-flow row wrap
    justify-content space-between
    .item
      display inline-block
      box-sizing border-box
      flex 0 0 auto
      width 3.3rem
      height 1.85rem
      background #f4f5f7
      margin-top 0.2rem
      display flex
      align-items center
      justify-content space-around
      .name
        // height 0.5rem
        width 1.2rem
        font-size 0.3rem
        word-break break-all
      .imgs
        width 60px
        height 60px
        img
          position absolute
          height 1.1rem
          z-index 6
          &+img
            z-index 5
            transform scale(0.8) translateX(15px)
</style>
