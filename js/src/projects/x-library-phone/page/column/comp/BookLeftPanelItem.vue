<script>
import { mapState } from 'vuex'
export default {
	name: 'book-left-panel-item',
	props: {
		data: {
			required: true,
			type: Object
		},
		level: {
			type: Number,
			default: -1
		},
		rid:{
			required: false,
			type: String
		}
	},
	data(){
		return{
			rotate:false,
			catalog_two:null,
			openDiv:false
		}
	},
	computed: {
		...mapState('category', {
			item: state => state.itemDetail,
			meta: state => state.itemDetail.components,
		}),
		rewrite_level() {
			return this.level+1
		}
	},
	methods: {
		async toggleLeftPanel () {
			this.showLeftPanel = !this.showLeftPanel
			let res = await this.$service.category.getAccessCode({ id: this.item.id })
			localStorage.access_code = res.data
			let extraParams = {
				version: 'release',
				content_version: 'release',
				access_code: localStorage.getItem("access_code"),
				product_id: this.meta.read_product,
				release_id: this.meta.read_product
			}
			this.$readerService.get_catalogs({
				bookId: this.meta.read_book,
				chapterId: this.data.catalogID
				},
				{extraParams})
			.then(res => {
				this.catalog_two = res
			})
			.catch(err => {
				console.log(err)
			})
		},
		openDivF() {
			this.openDiv= !this.openDiv
			this.rotate=!this.rotate
		},
		async goRead() {
      if (!this.$isLogin()) return
      let price = parseFloat(this.meta.price)
      if (!this.$isFree(this.meta)) {
        this.createOrder()
        this.$go('/order', {redirect_url: window.location.href})
        return
      } 
      const { read_product: product_id, read_book: book_id } = this.meta
      let res = await this.$service.category.getAccessCode({ id: this.item.id })
			localStorage.access_code = res.data
			
      this.$go('/reader', { product_id, book_id, chapter_id: this.data.catalogID, chapter_rid: this.rid})
    },
	}
}
</script>
<template lang="pug">
.book-left-panel-item(v-if="data.catalogNode==1")
	.panel-item__parent.flex-between-center( @click.stop="toggleLeftPanel")
		.panel-item__parent-left(@click="goRead()") {{ data.catalogName }} 
		img(src="../../../common/img/product-triangle.png" v-if="data.catalogNum > 1" @click="openDivF()" :class="[rotate?'go':'aa']")
	.panel-item__child.c( v-if="catalog_two && catalog_two.length && openDiv") 
		book-left-panel-item(v-for="i in catalog_two" :data="i" :level="rewrite_level" :rid="rid")
</template>
<style lang="stylus">
.aa
	transition: all 0.3s
.go
	transform:rotate(-90deg)
	transition: all 0.3s
.c
	font-size 14px
	color #373944
	letter-spacing -0.34px
.panel-item__parent-left
	min-height 21px
	overflow hidden
	display -webkit-box
	text-overflow ellipsis
	max-height 100%
	-webkit-box-orient vertical
	-webkit-line-clamp 2
	margin-right 20px
.icon-lock
	background-color red
	width 1px
	height 1px
</style>