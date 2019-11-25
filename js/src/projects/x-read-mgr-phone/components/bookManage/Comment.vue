<script>
import Item from './CircleItem'
import ReplayItem from './ReplayItem'
import {imgCompress} from '@/utils/util.js'
import ImageCompressor from 'image-compressor.js';
import  * as circleBookServices  from 'services/x-read/circleBook'
import  * as circleThemeServices  from 'services/x-read/circleTheme'
// import  * as circleBookServices  from 'services/x-read//circleBook'
import  * as common  from 'services/x-publish/common'
import {getTask} from 'services/common'
import  { mapMutations , mapState} from 'vuex'

export default {
  name:"comment",
  components:{Item ,ReplayItem},
  created(){
    // this.init();
  },
  activated(){
    log(321)
    this.init();
  },
  data(){
    return {
      imgAccept:'image/jpeg,image/jpg,image/png',
      imgFiles:[],
      previewImgUrls:[],
      imageCompressor : new ImageCompressor(),
      query:{},
      detail:null,
      userComment:'', // 用户评论
      addImgs:[], // 添加的图片
      addType:null, // 1  主题  2 评论
      commentList:[],
      page:{},
      imgUpload:false,
      currentComment: null, // 当前评论
    }
  },
  computed:{
    // previewImgUrls(){
    //   let arr = []
    //   this.imgFiles.forEach( i => {
    //     let url = window.URL.createObjectURL(i)
    //     arr.push({url,checked:true})
    //   })
    //   return arr
    // }
  },
  methods:{
    ...mapMutations(['setCommentSingleDetail']),
    test1(){
    },
    init(){
      this.commentList = []
      this.addType = null
      this.query = this.$route.query
      this.getDetail();
      this.refresh();
    },
    getDetail(){
      circleThemeServices.info(this.query).then(res => {
        this.detail = res.data

      })
    },
    getComment(pageStart=0 , pageOffset = 10 , isClean = false ){
      return circleThemeServices.getList({pageStart,pageOffset,  ...this.query}).then(res => {
        log(res)
        if(res.data.length !== 0){
          // this.commentList =  res.data
          this.commentList =  this.commentList.concat(res.data)
          this.page = res.page
          return false // 还有数据,  用于loadMore调用判断
        }
        return true // 全部数据已获取
      })
    },
    refresh(pageStart=0 , pageOffset = 10 , ){
      return circleThemeServices.getList({pageStart,pageOffset,  ...this.query}).then(res => {
          this.commentList =  res.data
          this.page = res.page
      })
    },
    loadMore(miniRefresh){
      // let start = this.page.start +  this.page.offset ;
      // 从数组结尾处取数据, 如果有数据删除
      let start = this.commentList.length ;
      this.getComment(start, 10 ).then(res => {
        miniRefresh.endUpLoading(res);
      }).catch( err => {
        miniRefresh.endUpLoading(true); // true 为没有了
      })
    },
    async setfile(e){ // perfect
      dir(e.target)
      let file = e.target.files[0]
      if (!file) return
      // if(file.size > 1024 * 1024 *1.5){ //大于1.5m
      //   await this.imageCompressor.compress(file, {quality: .8,}).then(res => {
      //     file = res
      //   })
      // }
      let i = {
          url:window.URL.createObjectURL(file),
          checked:true,
          file:file,
          size : file.size
      }
      this.previewImgUrls.push(i)
    },
    async commit(){
      // 压缩图片
      let value = this.userComment
      let type = this.addType
      let book_circle_id
      if(type === 1){
        book_circle_id = this.query.id
      }else if( type === 2) {
        book_circle_id = this.currentComment.id
      }
      let img = this.addImgs
      if(!value ){
        // 弹出
        return
      }
      if(this.previewImgUrls.length > 0){
        this.$showLoading()
        const imageCompressor =  new ImageCompressor()
        let t = []
        this.previewImgUrls.forEach( i => {
          // log(i.file , i.file.size )
          if(i.checked){
            if(i.size　< 1024 *1024 *1) { // 小1m
              t.push(i.file)
            }else {
              t.push(imageCompressor.compress(i.file, {quality: .7 ,}))
            }
          }
        })
        let res = await Promise.all(t);
        let uploadRes = await Promise.all(res.map( i => getTask(i) ))
        uploadRes.forEach(res => {
          this.addImgs.push(res.data.path)
        })
        this.$closeLoading()
      }
      await circleBookServices.add({value,type ,book_circle_id ,img}).then(res => {
      })
      // 评论后再获取10条数据 , 隐藏输入框
      this.userComment = ''
      if(type === 1){ // 如果是主题. 在获取10条
          this.getComment(this.commentList.length, 10).then(res => {
          });

      }else if( type === 2 ) { // 获取主题的评论
        circleBookServices.commentDetail({id:book_circle_id}).then(res => {
          // 加入当前主题的评论
          // this.commentList.find( item => item.id === book_circle_id )
          // this.currentComment.res_info.res = res.data
          this.$set(this.currentComment.res_info , 'res' , res.data )
          this.currentComment.res_info.total = res.page.total
        })
      }

      this.addType = null
      this.previewImgUrls = []; //图片初始化
      // 上传图片
      // 提交评论
    },
    commentIconClick(i) {// 主题评论
      this.currentComment = i
      this.comment(2)
      // this.$go('/bookCircleList/themeReplayLsit' , {id:i.id})
    },
    thumbsUp(item){//点赞
      circleBookServices.assist({id:item.id}).then(res => {
        // 0
        // this.getComment(0 , )
        item.info_good_num = item.info_good_num + 1
      })
    },
    comment(type) {//评论
      this.addType = type
      // this.imgUpload = type
    },
    screen() {//筛选

    },
    replayMore(item){
      this.setCommentSingleDetail(item)
      this.$go('/bookCircleList/themeReplayLsit' , {id:item.id} )
    },
    lock(){
      // 1未开启 2开启 3锁定
      let item = this.detail
      let status , resStatus  ;
      if(item.status === 1){
        status = 2
      }else if(item.status === 2) {
        status = 3
      }else if(item.status === 3) { // 解锁就是开启 , 不管锁定前是未开启还是开启
        status = 2
      }
      circleBookServices.modify({id:item.id , status}).then(res => {
        item.status = status
      })
    },
    oper(e,item, index){ // 对主题的操作
      let className = e.target.className
      if(className.indexOf('del') > 0){
        // confirm弹出
        this.$confirm("是否删除该图书?").then(res => {
          circleThemeServices.del({id:item.id}).then(res => {
            // 删除该条记录
            // 向下获取的时候,起始应该是当前数组的当船
            // this.commentList.splice(index , 1)
            // 小于10条的时候查询查询,
            if(this.commentList.length > 10){
              this.commentList.splice(index , 1)
            }else {
              this.refresh(0 , 10 )
            }
          })
        }).catch(err => {

        })

      }else if(className.indexOf('shield') > 0){
        //屏蔽
        circleThemeServices.modify({id:item.id , status:1}).then(res => {
          this.$Toast('操作成功')
        })

      }else if(className.indexOf('over') > 0){
        // 结束, 主题没有禁言
        circleThemeServices.modify({id:item.id , status:3}).then(res => {
          this.$Toast('操作成功')
        })
      }else if(className.indexOf('open') > 0){
        // 开启
        circleThemeServices.modify({id:item.id , status:2}).then(res => {
          this.$Toast('操作成功')
        })
      }
    }
  }
}
</script>

<template lang="pug">
.div( v-if="detail" )
  Head(:name="detail.name")
  Scroll(top='0.9' bottom="0"  @loadMore="loadMore" @refresh="refresh"   )
    .main
      .top
        Item(type="detail"  :page="page" :item="detail"  )
      .line-single
      .oper(@click="lock")
        label(v-if="detail.status == 2")
          img.lock( src="./img/lock.png")
          span 锁定该书圈
        label(v-if="detail.status != 2")
          img.lock( src="./img/unlock.png")
          span 开启该书圈
      .line-part
      .comment.commentList(v-if="commentList")
        ContentTitle( name="全部主题" :num="page.total")
          //- .select(@click='screen')  筛选
        .ls
          .item(v-for="(i,index) in commentList" :key="i.id"  @click="replayMore(i)")
            ReplayItem(:i="i"
              @commentIconClick="commentIconClick(i)"
              @thumbsup="thumbsUp")
              .relay-content
                .line-single
                .replay-bottom(@click.stop="oper($event,i , index)")
                  .wrap.shield
                    .text-icon.shield.true 屏蔽
                  .wrap.over
                    .text-icon.over.true 结束
                  .wrap.del
                    .text-icon.del.true 删除
            .line-part

  .footer(v-if="addType")
    .replay
      .content
        input(type="file" ref="picFile" :accept="imgAccept" @change="setfile").hide
        .left(@click="$refs.picFile.click()")
        .input
          textarea(type="text" ref="commentInp" v-model="userComment" placeholder="发表你的看法")
          //- .text(  contenteditable="true"   )  ios mobile safari 体验很差! 移动端不考虑
        .submit()
          .btn(@click="commit" v-if="previewImgUrls.length === 0" ) 评论
      .preview-img(v-if="previewImgUrls && previewImgUrls.length > 0")
        .line-single
        .imgs-wrap
          .ls
            .item(v-for="i in previewImgUrls"  @click="i.checked = !i.checked ")
              .check(:class="{true: i.checked }")
              img( :src="i.url"  )
        .line-single
        .pic-confirm
          .left
          .right
            .btn(@click="commit") 确定


</template>

<style lang="stylus" scoped>
.replay-bottom
  display flex
  .wrap
    flex auto
    text-align center
    padding 15px 0
.pic-confirm
  height 1rem
  display flex
  justify-content flex-end
  align-items flex-end
  padding 0.18rem 0
  .right
    text-align center
    width 1.7rem
.commentList
  .ls
    >.item
      border-bottom 1px solid #ddd
.preview-img
  .imgs-wrap
    padding 0.2rem
    .ls
      display flex
      margin 0.2rem 0
      overflow scroll
      .item
        height 2.15rem
        position relative
        &:last-child
          .check
            right 0.08rem
          >img
            margin-right 0
        .check
          width 23px
          height 23px
          background url('./img/pic-check.png') no-repeat
          background-size 23px
          position absolute
          right 0.28rem
          top 0.08rem
          &.true
            background url('./img/pic-check-true.png') no-repeat
            background-size 23px
        >img
          height 100%
          width auto
          margin-right 0.2rem
 .footer
  // height 1.5rem
  .replay
    position fixed
    bottom 0
    background #fff
    z-index 2
    left 0
    right 0
    .content
      display flex
      align-items flex-end
      padding 0.18rem 0
      background #e6e6e6
      .left
        background url('./img/pic.png') no-repeat center
        background-size 25px 21px
        width 1rem
        height 0.58rem
        flex none
      .input
        width 4rem
        flex auto
        >textarea
          width 100%
          min-height 35px
          padding 0.15rem
          user-select auto
          font-size 0.28rem
          border solid 1px #d9d9d9
          border-radius 2px
          max-height 1.5rem
          line-height 0.32rem
          overflow scroll
          outline none
          transform translateY(3px)
      .submit
        width 1.7rem
        height 0.58rem
        flex none
        text-align center


.select
  background url('./img/select.png') no-repeat left
  background-size 0.28rem
  padding-left 0.35rem
  font-size 0.3rem
  line-height 0.5rem
  height 0.45rem
  width 1rem
  color #14afff
.oper
  color #333
  font-size 14px
  height 0.85rem
  line-height 0.85rem
  text-align center
  label
    >span
      vertical-align middle
    img
      width 13px
      margin-right 10px
      vertical-align middle
      // margin-top 0.23rem
</style>
