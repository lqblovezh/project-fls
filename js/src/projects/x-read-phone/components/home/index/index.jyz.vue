<script>
import MyPurchased from './myPurchased'
import ContentTitle from './contentTitle'
import HomeSwiper from './homeSwiper'
import ThemeSwiper from './themeSwiper'
import * as bookinfoServices from 'services/x-read/bookInfo'
import * as homeServices from 'services/x-read/home'
import * as commonServices from 'services/common/member'
import * as weixinServices from 'services/x-read/weixin'
import merge from 'merge'
import {
  mapMutations,
  mapState
} from 'vuex'
import {
  getHistoryLastAudio,
  isWeixin
} from '@/utils/util'
export default {
  components: {
    ContentTitle,
    HomeSwiper,
    ThemeSwiper,
    MyPurchased,
  },
  created() {
    this.init()
    this.myPurchased()
  },
  data() {
    return {
      keywords: '',
      isDisserVis: true,
      isContentTitleVis: true,
    }
  },
  computed: {
    ...mapState({
      bannerList: state => state.home.bannerList,
      buttonList: state => state.home.buttonList,
      recomList: state => state.home.recomList,
      column: state => state.home.column,
    }),
    _isWeixin() {
      return isWeixin()
    },
  },
  methods: {
    ...mapMutations([
      'setBannerList',
      'setRecomList',
      'setColumn',
      'setButtonList',
      'setIsPlayerShow',
      'setCurrAudioIndex',
      'setAudioPlayList',
      'setaudios',
      'setIsLoginShow',
      'setUserInfo',
    ]),
    async init() {
      this.getBannerList()
      this.getButtons()
      this.getRecomList()
      this.getColumn()
    },
    myPurchased() {
      // if(item.type==2){
      // 	this.isContentTitleVis=false
      // }
    },
    getAudios() {
      //获取之前的音乐列表
      let localAudiosBookId = JSON.parse(localStorage.getItem('audioBookId'))
      let localAudiosIndex = localStorage.getItem('localAudiosIndex') * 1

      if (!localAudiosBookId) return
      bookinfoServices.getMedia({
        id: localAudiosBookId,
        type: 1
      }).then(res => {
        this.setaudios(res.data.chapters)
        // this.setIsPlayerShow(true);
        this.setCurrAudioIndex(localAudiosIndex)
        this.setAudioPlayList(res.data.chapters)
      })
    },
    getBannerList() {
      // if(this.bannerList) return  // 如果存在,不在重新请求
      homeServices.bannerList().then(res => {
        this.setBannerList(res)
      })
    },
    getButtons() {
      homeServices.buttonList().then(res => {
        this.setButtonList(res)
      })
    },
    getRecomList() {
      homeServices.recomList().then(res => {
        this.setRecomList(res)
      })
    },
    getColumn() {
      homeServices.getColumn().then(res => {
				this.setColumn(res)
      })
    },
    async scanCode() {
      if (!isWeixin()) return
      wx.scanQRCode({
        needResult: 0,
        scanType: ['qrCode', 'barCode'],
        success(res) {},
        error(e) {
          this.$Toast({
            message: e.toString(),
          })
        },
      })
    },
    go(url) {
      this.$router.push({
        path: url
      })
    },
    buttonsGo(i) {
      if (i.src_status) {
        if (i.src === 'shuquan') {
          this.$go('/bookCircleList', {
            type: i.src,
            name: i.name
          })
        } else {
          this.$go('/home/mediaList', {
            type: i.src,
            name: i.name
          })
        }
      }
    },
    itemClick(item, mtype) {
      let query = {
        id: item.id,
        name: item.name,
        tmp: item.tmp,
        type: item.type,
      }
      let type = ''
      if (mtype == 4) {
        type = 'Video'
      } else if (mtype == 3) {
        type = 'Audio'
      } else if (mtype == 1) {
        type = 'Read'
      }
      if (type) {
        this.$go('/bookDetail', {
          id: item.b_id,
          inType: type
        })
        // this.$go('/bookMedia', {id:item.b_id , type})
      }
    },
    themeClick(item) {
      this.$go('/home/themeDetail', {
        id: item.b_id
      })
    },
    search() {
      this.$go('/home/search', {
        keywords: this.keywords
      })
    },
    goUrl(item) {
      location.href = item.ted_address
    },
  },
  mounted() {
    log(111111, this.column)
  }
}
</script>

<template lang="pug">
.home
	.top
		.main
			.search
				.input
					form(action="#",method='post' @submit.prevent="search")
						.icon-search(@click="search")
						input(placeholder="书名,作者,关键字" v-model="keywords")
						input(type="submit" style="visibility:hidden;position:absolute;z-index:-1")
					.icon-scale(@click="scanCode" v-if="_isWeixin")
				.icon(@click="$go('/bookMall')")
					.mall 书城
			.swiper
				HomeSwiper( v-if="bannerList"  :list="bannerList")
		.button-items
			.item(v-for="i in buttonList"  @click=" buttonsGo(i) " )
				.icon-listen
					img( v-lazy="i.img_src")
				.name( v-text="i.name")
	.line-part
	.section.edit-section( v-if="recomList && recomList.length" )
		ContentTitle(name="推荐")
		.content
			.section-li(v-for="item in recomList"  @click="goUrl(item)"  )
				.msg
					img(src="./img/quan.png" )
					.name.ell  {{item.name}}
				.line-single
	MyPurchased()
	.column(v-for="item in column" v-if="item.book_list.length||(item.children && item.children.length)")
		.section.listen-section
			ContentTitle( :name="item.name" url="/listJyz2" :query="{id:item.id , name:item.name,tmp:item.tmp , type:item.type}" v-if="isContentTitleVis")
			//- Dissertation(v-if="item.name=='专题'" url="/templateList" :query="{id:item.id , name:item.name,tmp:item.tmp , type:item.type}")
			//- Person(v-if="item.name=='人物'" url="/templateList" :query="{id:item.id , name:item.name,tmp:item.tmp , type:item.type}")
			TemplateItem( :type="item.type" :data="item.type==6||item.type==7?item.children:item.book_list")
			.line-part
</template>

<style lang="stylus" scoped>
.home
  padding-bottom 1rem
  .edit-section
    .content
      .section-li
        padding 0 0.3rem
        &:last-child
          .line-single
            display none
        .msg
          display flex
          font-size 0.3rem
          color #555555
          height 0.95rem
          align-items center
          .name
            width 6rem
            margin-left 0.33rem
            height 0.33rem
            line-height 0.33rem
          >img
            height 0.26rem
            width 0.26rem
            vertical-align middle
  .main
    background url('./img/main.png') no-repeat top
    background-size 100% 50%
    .swiper
      width 100%
      margin-bottom 0.2rem
    .search
      display flex
      padding-top 0.3rem
      padding-bottom 0.3rem
      .input
        margin-left 0.3rem
        border-radius 0.08rem
        width 6.35rem
        height 0.58rem
        color #fff
        line-height 0.58rem
        overflow hidden
        position relative
        .icon-scale
          background url('./img/scale.png') no-repeat center
          background-size 0.36rem 0.36rem
          width 0.36rem
          height 0.58rem
          position absolute
          right 10px
          top 0
          line-height 0.58rem
          z-index 1000
        form
          display flex
          height 0.58rem
          line-height 0.58rem
          .icon-search
            background rgba(245, 245, 245, 0.3) url('./img/search.png') no-repeat center
            background-size 0.28rem 0.28rem
            width 0.58rem
          input
            flex 1 1 auto
            outline none
            border none
            background rgba(245, 245, 245, 0.3)
            font-size 12px
            color #fff
            &:focus
              outline none
      .icon
        flex 1 1 auto
        background url('./img/bookMall.png') no-repeat center top
        background-size 17px 17px
        position relative
        .mall
          font-size 10px
          position absolute
          color #fff
          width 100%
          text-align center
          margin-top 24px
  .button-items
    padding-bottom 0.4rem
    display flex
    overflow scroll
    .item
      text-align center
      flex 0 0 auto
      width 25%
      .icon-listen
        margin 0 5px
        // width 1rem
        min-height 1rem
        overflow hidden
        // >img
        // width 100%
        // height 100%
      .name
        color #555555
        font-size 0.28rem
        text-align center
        margin-top 0.1rem
      img
        max-width 1.28rem
input::placeholder /* Mozilla Firefox 19+ */
  color #fff
input:input-placeholder /* Internet Explorer 10-11 */
  color #fff
</style>
