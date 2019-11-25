<script>
import Item from './item'
import * as services from "services/x-publish/video"
import  * as homeServices  from 'services/x-read/home'
import  { mapMutations , mapState} from 'vuex'

export default {
  name:'listenRead',
  components:{Item },
  props:{
    list:Array,
    name:String,
  },
  created(){
    this.init();
  },
  data(){
    return {
      page:{},
      localList:null,
      query:{},
      
    }
  },
  computed:{
    ...mapState({
      columnList : state => state.home.columnList,
    }),
    pageStart(){
      return this.columnList.page.start + this.columnList.page.start.offset
    }
  },
  methods:{
    ...mapMutations(['setColumnList' ]),
    init(){
      // this.getList();
      this.query= this.$route.query;
      this.getColumnList(0,6 , true);
    },
    getColumnList(pageStart=0 , pageOffset = 6 ,isClean=false ){
      return homeServices.columnList({pageStart, pageOffset, ...this.query}).then(res => {
        res.clean = isClean
        this.setColumnList(res)
        if(res.data.length == 0){
          return true //返回给调用者处理, 通常为隐藏下拉旋转按钮
        }
      })
    },
    async getList(pageNum =1 ,pageOffset=6  , query = {}){
      return services.listVideo({ pageNum , pageOffset , ...query}).then(res=>{
        if(res.data.length ===0 ){
          return true
        }
        if(this.localList){
          this.localList = this.localList.concat(res.data)
        }else {
          this.localList = res.data
        }
        this.page = res.page
      })
    },
    loadMore(miniRefresh){
      this.getColumnList(this.columnList.data.length).then(res =>{
        miniRefresh(true); // true 为没有了
      })
    },
    refresh(){
      this.getColumnList(0,6,true)
    },
    itemClick(item){ // 待优化
      let type = ''
      if (this.query.type == 4) {
        type = 'Video'
      }else if(this.query.type == 3){
        type = 'Audio'
      }else if(this.query.type == 1) {
        type = 'Read'
      }else if(this.query.type == 2){
        type = 'theme' 
      }
      if(type !== 'theme'){
        // this.$go('/bookMedia', {id:item.b_id , type})
        this.$go('/bookDetail', {id:item.b_id , inType:type})
      }else  {
        this.$go('/home/themeDetail', {id:item.b_id, type , name:'主题详情 '})
      }
    },
  },
}
</script>

<template lang="pug">
.div
  Head(:name="query.name")
  .main()
    Scroll( @loadMore="loadMore" @refresh="refresh" )
      .ls-book(v-if="query.type != 2")
        .list(v-if="columnList && columnList.data") 
          .item(v-for="item in columnList.data"  )  
            Item(:item="item" @itemClick="itemClick" )
            .line-single  
      .div(v-if="query.type == 2")      
        .ls-theme 
          div(  v-for="item in columnList.data" @click="itemClick(item)" ) 
            NormalThemeItem(:item="item")
</template>
<style lang="stylus" scoped>
.ls-book
  padding 0 0.3rem
// .ls-theme 
//   .content 
//     padding 0.3rem
//     .name
//       margin-top 0.24rem
//       color #666
//     .des 
//       height 0.4rem
//       line-height 0.4rem
//       .theme-name 
//         font-size 14px
//         font-weight 700
//         float left
//         height 100%
//       .time    
//         color #999
//         float right
//         height 100%
//         font-size 12px
//     .img 
//       height 3rem
//       position relative
//       text-align center
//       .abs 
//         position absolute
//         left 0
//         right 0
//         bottom 0
//         height 0.7rem
//         background rgba(0,0,0,.5)
//         margin auto
//         color #fff
//         font-size 15px
//         line-height 0.7rem
//         text-align left 
//         padding-left 0.3rem
//       >img 
//         width 100%
//         height 100%

</style>
