<script>
import {mapState , mapMutations} from 'vuex'
import  * as  bookinfoServices  from 'services/x-read/bookInfo'

export default {
  props:['totalPrice' , 'totalChecked' , 'currBuys','datas'],
  created(){
    this.init();
  },
  data(){
    return {
      // buyAudios:{

      // }
    }
  },
  computed:{
    ...mapState({
      isPlayerShow: state => state.player.isPlayerShow,
      fullScreen: state => state.player.fullScreen,
      audios: state => state.bookinfo.audios,
      buyAudios: state => state.bookinfo.buyAudios,
      currAudioIndex: state => state.player.currAudioIndex,
    }),
  },
  methods:{
    ...mapMutations([
      'setIsPlayerShow','setCurrAudioIndex',
      'setBuyAudios','setBuyAudiosAll',
      'setAudioPlayList','setaudios','setIsPaused',
      'setFullScreenStatus',
    ]),
    buyItem(i){
      this.setBuyAudios(i)
    },
    buyAll(){
      let nodes = document.querySelectorAll('.price-common.item .check.true')
      // 部分选=>全选  全选=>全不选

      // return 
      const data = {} //初始全不选
      
      if(nodes.length !== this.audios.length){  // 部分选中, 没选的情况下, 全部选择
        this.audios.forEach(i => {
          data[i.id] = i
        });
      }
      this.setBuyAudiosAll(data)
      return 
      
    },
    init(){
      this.query = this.$route.query
      this.getaudios()
      this.setFullScreenStatus(true)
    },
    getaudios(){
      bookinfoServices.getMedia({...this.query , type:1}).then(res => {
        this.setaudios(res.data.chapters)
      })
    },
    openAudio(index){
      // 把id和index保存在本地
      let id = this.query.id
      // 存的时候
      localStorage.setItem('audioBookId',JSON.stringify(this.query.id))
      localStorage.setItem('localAudiosIndex',JSON.stringify(index))


      this.setIsPlayerShow(true);
      this.setCurrAudioIndex(index);
      this.setAudioPlayList(this.audios);
      // this.setFullScreenStatus(true)

      this.setIsPaused(false) //设置样式
      // 设置按钮
      // 把播放操作放在这里, 而不是watch监测, 一是移动端不支持, 而是存放本地时,再打开不会因为watch监测立即播放
      setTimeout(() => {
          let node = document.querySelector("#audio")
          node.play()
      }, 21);

    },
    bookImgClick(){
      if(!this.audios[0]) return 
      // 待优化: 判断当前id和播放书的id
      if(this.audios[this.currAudioIndex]){ // 当前index存在,就走idnex,不存在就
        this.openAudio(this.currAudioIndex)
      }else {
        this.openAudio(0)
      }
    },
    
  },
  destroyed(){
  },
  
}
</script>

<template lang="pug">
.div(v-show="!fullScreen || !isPlayerShow") 
  .ls
    .item(v-for="(i,index) in datas.chapters" )
      .line-single    
      .content  
        // .icon-free
        .name.ell( @click="$openAudio({index, list:datas.chapters})") 
          //- span.chapter 第一章
          span {{i.name}} 
        .time
          // .txt  20:22
          .icon
        // .price-common.item( @click="$emit('buyItem',i)"  ) 
        //   .curr-price ￥{{i.price}}
        //   //- .err ￥58
        //   .check( :class="{true:buyAudios[i.id] != null  }" ) 
</template>

<style lang="stylus" scoped>

.price-common.item 
  .curr-price   
    font-size 13px
  .err 
    font-size 12px
  .check   
    display inline  

.div 
  padding  0 0.3rem
.ls 
  .item 
    height 0.85rem
    line-height 0.85rem
    text-align left
    .content 
      display flex
      height 100%
      justify-content space-between
      .name 
        flex auto
        color #333
        font-size 14px
        .chapter 
          margin-right 10px
      .time
        flex none
        width 1.3rem
        display flex
        .txt 
          font-size 12px
          color #999999
        .icon
          flex auto  
          background url('./img/audio.png') no-repeat  right center
          background-size  0.38rem 0.32rem
      .icon-free 
        flex none
        width 0.8rem
        height 100%
        background url('./img/free.png') no-repeat  left center
        background-size  0.52rem 0.32rem
</style>
