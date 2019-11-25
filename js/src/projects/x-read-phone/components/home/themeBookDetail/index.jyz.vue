<script>
import  { mapMutations , mapState} from 'vuex'
import  * as  bookinfoServices  from 'services/x-read/bookInfo'
import * as homeServices from 'services/x-read/home'


export default {
  created(){
    this.init();
  },
  data(){
    return {
      items:[
        {name:'听读' , icon:'icon-listen' , show:false},
        {name:'视读' , icon:'icon-see', show:false},
        {name:'电子书' , icon:'icon-book', show:true},
        {name:'书友圈' , icon:'icon-friend', show:false},
      ],
      detail:null
    }
  },
  computed:{
    ...mapState({
      bookId : state => state.bookinfo.bookId,
      // info : state => state.bookinfo.info.books_info,
      bookinfo : state => state.bookinfo.info,
      videos : state => state.bookinfo.videos,
      audios : state => state.bookinfo.audios,
      Ebooks : state => state.bookinfo.Ebooks,
      xList : state => state.bookinfo.xList,
    }),
    // currBook(){
    //   return this.detail.books_info.components.books.find(item => item.book_id === this.query.book_id) || {} 
    // },
    info(){
      return this.detail
    }
  },
  methods:{
    ...mapMutations(['setinfo','setIsPlayerShow',
      'setbookId',
      'setvideos',
      'setaudios',
      'setEbooks',
    ]),
    init(){
      this.query = this.$route.query
      // this.getDetail()
      this.setIsPlayerShow(false)
      this.setbookId(this.query.id)
      this.getThemeBookDetail(); // 查书的信息
    },
    getAccessCodes(data){
      bookinfoServices.getAccessCode(data).then(res => {
      })
    },
    getThemeBookDetail(){ //获取主题的所有内容
      bookinfoServices.getThemeBookDetail(this.query).then(res => this.detail = res.data);
    },
    // (1听读,2视读,3电子书)
    getaudios(){
      bookinfoServices.getMedia({...this.query , type:1}).then(res => {

        this.setaudios(res.data)
      })
    },
    getvideos(){
      bookinfoServices.getMedia({...this.query , type:2}).then(res => {

        this.setvideos(res.data)
      })
    },
    getEbooks(){
      bookinfoServices.getMedia({...this.query , type:3}).then(res => {

        this.setEbooks(res.data)
      })
    },
    up(){

    },
    go(i){
      switch (i.icon) {
        case 'icon-listen':
          this.$go('/home/themeBookMedia',{type:'Audio',...this.query})
          break;
        case 'icon-see':
          this.$go('/home/themeBookMedia',{type:'Video',...this.query})
          break;
        case 'icon-book':
          this.$go('/home/themeBookMedia',{type:'Read',...this.query})
          break;
        case 'icon-friend':  

          // return 
          this.$go('/bookCircleList/comment', {type:'circle',id:this.bookinfo.book_circle_id} )
          break;
      }
    },
  }
}
</script>

<template lang="pug">
.div(v-if="detail")
  Head( :name="info.name")
  .main
    .detail
      .msg(v-if="info.name")
        .img 
          img( :src="info.img_src")
        .right 
          .name {{info.name}}
          .author 
            span.shadow 作者:
            span.info {{info.author}}
          //- .time 
          //-   span.shadow 出版时间：
          //-   span.info 2017-7
          //- .isbn 
          //-   span.shadow ISBN：
          //-   span.info 9787544288910
          .obj(v-for="i in info.attributes") 
            span.shadow {{i.key}} ：
            span.info {{i.value}}
      .media()
        .ls
          .item(v-for="i in items " v-if="i.show" @click="go(i)") 
            .content 
              .name( :class="i.icon" ) {{i.name}}
              .right 
            .line-single
    .line-part 
    .preview
      ContentTitle(name="内容简介")
      .content.fix
        .txt(v-text="info.abs")
        //- .more.shadow 查看更多  

</template>

<style lang="stylus" scoped>
.xbook
  width 100%
  height 0.7rem
  background url('./img/x.png') no-repeat 45% center
  background-size 0.38rem
  text-align center
  line-height 0.75rem
  text-indent 1rem
.txt 
  color #666666 
  font-size 0.28rem
  line-height 0.4rem
  text-indent 0.5rem
.content
    padding 0.3rem  
.media   
  margin-top 0.3rem
  .ls 
    .item
      height 0.93rem
      .content  
        display flex 
        justify-content space-between
        padding 0px
        height 100%
        line-height 0.93rem
        .name 
          color #333333
          padding-left 0.6rem
          font-size 0.28rem
          &.icon-listen
            background url('./img/listen.png') no-repeat left 0.22rem
            background-size 0.38rem 0.38rem
          &.icon-see
            background url('./img/see.png') no-repeat left 0.22rem
            background-size 0.38rem 0.38rem
          &.icon-book
            background url('./img/book.png') no-repeat left 0.22rem
            background-size 0.38rem 0.38rem
          &.icon-friend
            background url('./img/firend.png') no-repeat left 0.22rem
            background-size 0.38rem 0.38rem
        .right
          padding-right 0.4rem
          font-size 0.24rem
          color #999999
          background url('../bookMall/img/more.png') no-repeat right
          background-size 0.13rem 0.22rem

            

.comment
  .content
    .ls 
      .item 
        margin-top 0.3rem
        display flex 
        .head 
          width 0.65rem 
          height 0.65rem
          border-radius 50%
          flex 0 0 auto
        .right 
          margin-left 10px
          .txt
            text-indent 0px   
            margin-bottom 0.2rem
          .name 
            height 0.65rem
            line-height 0.65rem
            color   rgba(8,71,102,0.8)
            .up 
              float right 
              font-size 0.22rem
              padding-left 0.4rem
              background url('./img/up.png') no-repeat left  
              background-size 0.26rem 0.28rem
              &.isUp 
                background url('./img/upIs.png') no-repeat left  
                background-size 0.26rem 0.28rem
.relate      
  .content 
    overflow scroll
    .ls
      display flex
      .item 
        flex 0 0 auto
        margin-right 0.35rem
        width 1.78rem
        img  
          width 1.78rem
          height 2.46rem
        .name
          font-size 0.26rem
          color #555555
          height 0.6rem
          line-height 0.6rem
.preview
  .content
    .more
       background url('./img/more.png') no-repeat right   center
       background-size 0.25rem 0.2rem
       text-align right 
       padding-right 0.4rem
       font-size 0.24rem
       float right
       height 0.4rem
       line-height 0.4rem
.detail
  padding 0.3rem
  .msg 
    display flex 
    justify-content space-between
    .img 
      >img 
        width 1.92rem
        height 2.65rem
        box-shadow: 2px 3px 15px 0px rgba(6, 91, 164, 0.22)
        border-radius 0.08rem
    .right 
      margin-left 0.56rem
      width 4.3rem
      >div 
        margin 0 0.1rem
        font-size 0.24rem
        line-height 0.4rem
        margin-right 0px
      .star
        display flex    
        align-items center
        justify-content space-between
        .share 
          color #14afff
          padding-right 0.45rem
          height 0.28rem
          background url('./img/share.png') no-repeat right 
          background-size 0.28rem 0.28rem
          font-size 0.22rem
          line-height 0.28rem
      .info 
        color   #666666
        margin-left 5px
      .name 
        font-size 0.34rem
        line-height 0.4rem
        margin-top 0
        color #333333
        margin-bottom 0.4rem
</style>

