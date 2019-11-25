<script>
import {
  mapState,
  mapMutations
} from 'vuex'
import * as bookinfoServices from 'services/x-read/bookInfo'
import {
  canRead
} from '@/utils/util.js'
import * as dbiServices from 'services/x-read/dbi'
import {
  mediaMixin
} from './mixins.js'
export default {
	props:['artiCatalogue'],
  mixins: [mediaMixin],
  created() {
    this.init()
  },
  data() {
    return {
      access_code: '',
      articleCataVis: true,
    }
  },
  computed: {
    ...mapState({
      isPlayerShow: state => state.player.isPlayerShow,
      fullScreen: state => state.player.fullScreen,
    }),
    selectNumber() {
      let i = 1
      // for (const key in this.checkedItemsObj) {
      //   if (this.checkedItemsObj.hasOwnProperty(key)) {
      //     let element = this.checkedItemsObj[key]
      //     if (element) {
      //       i++
      //     }
      //   }
      // }
      Object.values(this.checkedItemsObj).forEach(item => {
        if (item) {
          i++
        }
      })
      return Object.values(this.checkedItemsObj).length
    },
  },
  methods: {
    ...mapMutations(['setIsPlayerShow']),
    init() {
      this.query = this.$route.query
    },
    goReader(i) {
      if (i === undefined) {
        i = this.list[10]
        console.log(this.list);
        delete i.chapter_id
        i.chapter_name = ''
        i.index = 'root'
      }
      if (!this.$canRead(i)) return
      // i.access_code = this.access_code
      i.chapter_root = i.index // i.id 需要被覆盖
      this.$go('/reader', { ...i,
        ...this.query
      })
    },
    spread() {
      this.articleCataVis = !this.articleCataVis
			// var item = this.$refs.artiCatalogue
		  var item = document.getElementsByClassName("ls");
			for(var i=0;i<item.length;i++){
				item[i].index=i;
				item[i].onclick=function(){
					document.getElementsByClassName("retract").style.display = "block"
					document.getElementsByClassName("spread").style.display = "none"
					document.getElementById("artiCatalogue").innerHTML = item[i].innerHTML
				}
			}
    },
  },
  destroyed() {},
}
</script>

<template lang="pug">
.div(v-show="!fullScreen || !isPlayerShow")
	.msg-price.all(v-if="!data.is_all_buy")
		.oper-my
			.totals
				span.choosen 已选择 {{checkedItems.length}} 栏
				span.curr-price 总计:
				span.price-color {{totalPrice}}
			.buy
				.send-btn.pay-btn( @click="$emit('payChapters')" ) 栏目购买
				//- .price-common
					.curr-price(v-text="totalPrice")
					.err ￥58
				.check(@click=" $emit('buyAll') " :class="{true:checkedItems.length}"  )
	.ls( v-if="list.length "  )
		.item(v-for="(i,index) in list" :key="i.id" )
			.line-single
			.content
				.spread(@click="spread()")
				.retract
				.name.ell( @click="goReader(i)" )
					span.chapter 栏目{{index+1}}
					span {{i.chapter_name}}
				.price-common.item(v-if="!data.is_all_buy")
					.curr-price(v-if="i.price*1") ￥{{i.price}}
					//- .err ￥58
					.check(@click="$emit('buyItem',i)"
						:class="{true: checkedItemsObj[i.id] != null}" )
				.icon-free(v-show="!i.price")
			.div(name="文章目录")
				ul(id="artiCatalogue"  ref="artiCatalogue")
					li(v-for="(item,index) in artiCatalogue" v-if="!articleCataVis")
						span {{item.chapter_name}}
				//- ul
				//- 	li
				//- 		span 11
				//- ArticleCatalogue(name="文章目录" v-if="!articleCataVis")
</template>

<style lang="stylus" scoped>
.price-common.item
  .curr-price
    font-size 13px
  .err
    font-size 12px
  .check
    display inline
	.spread
		width 0.4rem
		height 0.85rem
		background url('./img/spread.png') no-repeat left center
		line-height 0.85rem
	.retract
		width 0.4rem
		height 0.85rem
		background url('./img/retract.png') no-repeat right center
		line-height 0.85rem
		display none
.div
  padding 0 0.3rem
.ls
  .item
    height auto
    line-height 0.85rem
    text-align left
    .content
      display flex
      height 100%
      justify-content space-between
      .name
        flex auto
        color #333333
        font-size 0.28rem
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
          background url('./img/audio.png') no-repeat right center
          background-size 0.38rem 0.32rem
      .icon-free
        flex none
        width 0.8rem
        height 100%
        background url('./img/free.png') no-repeat right center
        background-size 0.52rem 0.32rem
</style>
