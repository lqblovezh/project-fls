<script>
import noFooter from '@/mixins/noFooter'
import { mapMutations, mapState } from 'vuex'
import * as bookServices from 'services/x-read/bookCity'

export default {
  mixins: [noFooter],
  created() {
    this.init()
  },
  beforeRouteUpdate: (to, from, next) => {},
  data() {
    return {
      list: [
        {
          img: 'http://xcloud.kf.gli.cn/storage/publish/images/2018/05/16164203_5afbeedb2b61b.jpg',
          name: 'dddddddddddddddddd',
          author: 'li',
        },
      ],
      currType: {},
      title: '全部类别',
    }
  },
  computed: {
    ...mapState({
      citycolumn: state => state.home.citycolumn,
      categoryList: state => state.home.categoryList,
      bookClassificationId: state => state.home.bookClassificationId,
    }),
  },
  methods: {
    ...mapMutations(['setCitycolumn', 'setCityCategoryList', 'setBookClassificationId']),
    init() {
      this.query = this.$route.query
      // if(this.query.id !== this.bookClassificationId){ //查询id变化,查询查询
      //   this.setCitycolumn({})
      //   this.setCityCategoryList({data:[], page:{}}) //清空state数据
      // }else {
      //   this.currType = this.citycolumn[0] // 重新设置第一个选中
      // }
      this.setCitycolumn({})
      this.setCityCategoryList({ data: [], page: {} }) //清空state数据
      this.setBookClassificationId(this.query.id)
      if (this.citycolumn) return //如果store有, 就不再获取
      this.getCitycolumn()
      this.getCityCategoryList()
    },
    getCitycolumn() {
      return bookServices.citycolumn(this.query).then(res => {
        this.setCitycolumn(res)
        this.currType = this.citycolumn[0]
      })
    },
    getCityCategoryList(pageStart = 0, pageOffset = 10) {
      return bookServices.categoryList({ pageStart, pageOffset, ...this.query }).then(res => {
        // if(res.data.length == 0){
        //   return
        // }
        res.data = res.data.concat(this.categoryList.data || [])
        this.setCityCategoryList(res)
      })
    },
    loadMore(cb) {
      cb(true)
    },
    refresh() {},
    changeType(item) {
      this.currType = item
      this.query.id = item.id
      this.setCityCategoryList({ data: [], page: {} }) //清空state数据
      this.getCityCategoryList()
    },
    goDetail(item) {
      if (item.type != 2) {
        this.$go('/bookDetail', { id: item.id })
      } else {
        this.$go('/home/themeDetail', { id: item.id })
      }
    },
  },
}
</script>


<template lang="pug">
.div  
  Head(:name="query.name")
  .main   
    .classification
      .inner
        //- 一定要写v-width="true" 不然编译会报错 
        .item(   v-for="i in citycolumn" @click="changeType(i)" 
          :class="{active: currType.id === i.id}" v-width="true"    ) {{i.name}}
    .line-part
    .content
      Scroll(top='2.1'  @loadMore="loadMore" @refresh="refresh"   )
        Nodata( v-if ="!categoryList")
        .list(v-if="categoryList && categoryList.data") 
          .item( v-for ="item in categoryList.data" @click="goDetail(item) " )
            NormalItem(:item="item" v-if="item.type != 2 ") 
            NormalThemeItem(:item="item" v-else) 

</template>

<style lang="stylus" scoped>
.classification
  height 0.9rem
  overflow hidden
  .inner
    display flex
    max-height 20rem
    overflow auto
    height 0.9rem
    .item
      font-size 0.3rem
      text-align center
      width 1.2rem
      flex 0 0 auto
      height 100%
      line-height 0.9rem
      margin-right 0.3rem
      color #287f77
      box-sizing border-box
      &.active
        border-bottom 2px solid #14afff
        color #14afff
      &:first-child
        margin-left 0.3rem
</style>
