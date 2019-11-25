<script>
import Xsearch from './xsearch'
import Xresult from './xresult'
import {mapMutations, mapState } from 'vuex';
import  * as  bookinfoServices  from 'services/x-read/bookInfo'

export default {
  components:{Xresult , Xsearch},
  name:'Xknow',
  created(){
    this.init();
  },
  data(){
    return {
      choose:[],
      currComp:'Xsearch', // 动态组件需要由query的参数来控制, 不能用本地state来控制
      readerAccessCode:'',
      query:{},
    }
  },
  computed:{
    ...mapState({
      bookId: state => state.bookinfo.bookId,
      xList: state => state.bookinfo.xList,
      xInfo: state => state.bookinfo.xInfo,
    })
  },
  methods:{
    // 在这个组件请求参数传给动态组件
    ...mapMutations(['setxList','setxInfo']),
    init(){
      this.query = this.$route.query
      this.getXlist();
      // this.getEbooks();
      this.getAccessCodes({id:this.query.id , type:3}) // 3表示书籍的code
    },
    getAccessCodes(data){
      bookinfoServices.getAccessCode(data).then(res => {
        this.readerAccessCode = res.data 
      })
    },
    getXlist(){
      bookinfoServices.xList(this.query).then(res => {
        this.setxList(res)
      })
    },
    getEbooks(){
      bookinfoServices.getMedia({...this.query , type:3}).then(res => {
        this.setEbooks(res.data)
      })
    },
    getXinfo(ids){
      bookinfoServices.xInfo({id:this.query.id , ids}).then(res => {
        this.setxInfo(res)
      })
    },
    confirm(){
      var ids = [];
      this.choose.forEach(i => {
        ids.push(i.id)
      })
      if(ids.length === 0){
        return  
      }
      this.getXinfo(ids)
      this.currComp = 'Xresult'
    },
    
    check(e,i){
      // 先判断是否有
      let node = e.target
      if(node.className.indexOf('true') != -1){
        // 移除
        node.classList.remove('true')
      }else {
        this.choose.push(i)
        node.classList.add('true')
      }
    },
    addItem(i){
      this.choose.push(i)
    },
    moveItem(i){

      let index = this.choose.findIndex( item => {
        return item.id === i.id
      })
      this.choose.splice(index , 1)
    },
    back2(){

      // 一定要在这里, 回归初始状态
      this.currComp = 'Xsearch'
      // this.$destroy(); // 为什么这里会对阅读器返回有影响?
      this.choose = []
      this.setxList({})

    },
  },
  
}
</script>
<template lang="pug">
.div(v-if="xList && xList.length > 0") 
  Head(name="X一下"  key="xkonw"  @back="back2")
  .main 
      .top  
        .choose
          span.name(v-show="choose.length == 0") 已选主题 
          .item-know.true(v-for="i in choose" v-show="choose.length != 0")  {{i.name }}
        span.confirm(@click="confirm" v-show="currComp == 'Xsearch'" ) 确认 
        span.confirm(@click="currComp = 'Xsearch'" v-show="currComp != 'Xsearch'" ) 返回
      .line-part
      keep-alive
        component( :is="currComp" 
          @addItem="addItem"
          @moveItem="moveItem"
          :choose="choose"
          :list="xList"
          :readerAccessCode="readerAccessCode"
        ) 
      //- .know 
      //-   .title 
      //-     .name 知识结构
      //-     .down
      //-   .ls 
      //-     .item-know(v-for="(i,item) in 10"  @click="check($event,i,item)")  知识点
      //- .line-part    
</template>

<style lang="stylus" scoped>
.xknow-enter-active, .xknow-leave-active 
  transition all  0s ease 

.xkonw-enter
  opacity 0
.xknow-leave-to
  opacity 0

.item-know 
  height 0.55rem
  background #f6f6f6
  color #555555
  display inline-block
  padding 0.15rem 0.35rem
  border-radius 0.08rem
  margin-right 0.15rem
  margin-top 0.2rem
  font-size 0.26rem
  &.true 
    background rgba(20,175,255,0.1)
    color #14afff
.know 
  padding  0.3rem 
  .ls 
    margin-top 5px
  .title 
    font-size 0.3rem
    display flex
    justify-content space-between
    height 0.4rem
    align-items center
    .choose
      width 5rem
      .name  
        color #333
    .down 
      width 0.4rem
      height 100%
      background url('./img/open.png') no-repeat right center
      background-size 0.15rem 0.2rem
.top 
  padding 0.2rem 0.3rem
  display flex
  justify-content space-between
  align-items center
  .name 
    color #999 
    height: 0.55rem;
    display: inline-block;
    padding: 0.15rem 0.35rem;
    border-radius: 0.08rem;
    margin-right: 0.15rem;
    margin-top: 0.2rem;
    font-size: 0.26rem;
  .confirm 
    margin-top 0.2rem
    width 1.1rem
    height 0.48rem
    background #14afff
    border-radius 0.08rem
    color #fff 
    font-size 0.26rem
    text-align center
    line-height 0.55rem
    flex none
    box-sizing border-box
</style>
