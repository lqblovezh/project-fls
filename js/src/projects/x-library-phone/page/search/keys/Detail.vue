<script>
import Tree from '../comp/Tree'
import CheckBoxItem from '../comp/CheckBoxItem'
import KeyCheckItem from '../comp/KeyCheckItem'
export default {
	components: { Tree, CheckBoxItem, KeyCheckItem },
	data () {
		return {
			name: 'subSelect',
			list: [],
			alter_words: [
				{ name: '事实描述', type: 'desc', children: [] },
				{ name: '概念引发关系', type: 'initiation', children: [] },
				{ name: '概念关联关系', type: 'relation', children: [] },
				{ name: '概念对比关系', type: 'contrast', children: [] },
				{ name: '实体/程序法交互关系', type: 'interactive', children: [] },
				{ name: '代词表', type: 'represent', children: [] }
			],
			method_obj: {
				test: this.test
			},
			selectItem: null,
			tempSupserItem: null, // 存储顶级的选项获取的数据
			hasSelectSubItem: false, // 是否选择了下级选项
		}
	},
	mounted () {
		this.getList()
	},
	computed: {
		hasChild() {
			return this.alter_words.some(aw => aw.children.length)
		},
		wordList () {
			let a = []
			this.topItem && this.topItem.checked && a.push(this.topItem.name)
			this.selectItem && a.push(this.selectItem.name)
			this.alter_words.forEach(aw => {
				if (aw.children.length) {
					aw.children.forEach(awc => {
						if (awc.checked) {
							a.push(awc.name)
						}
					})
				}
			})
			return a
		},
		topItem () {
			return this.list[0] || {}
		}
	},
	methods: {
		async getList () {
			const { id } = this.$route.query
			try {
				let res = await this.$service.search.searchAdvanceKey({ id })
				this.list = this.$reconsitution(res.data, 'root')
			} catch(e) {
				console.log(e.toString())
			}
		},
    citemCheck(citem) {
      this.$set(citem, 'checked', !citem.checked)
		},
		getItemInfo () {
			this.$set(this.topItem, 'checked', !this.topItem.checked)
			!this.topItem.checked && !this.selectItem &&  this.clear()
			this.topItem.checked && !this.hasSelectSubItem && this.getItemSubInfo(this.topItem, true)
		},
		async getItemSubInfo (item, flag) {
			if (!flag) {
				if (this.selectItem && this.selectItem.id === item.id) {
					this.hasSelectSubItem = false
					this.$set(item, 'checked', false)
					this.clear()
					this.topItem.checked && this.tempSupserItem && this.appendToAlterWords(this.tempSupserItem)
					this.selectItem = null
					return
				}
				this.hasSelectSubItem = true
				this.selectItem && this.$set(this.selectItem, 'checked', false)
				this.$set(item, 'checked', true)
				this.selectItem = item
			}
			try {
				let res = await this.$service.search.getItemSubInfo(item.id)
				if (flag && !this.tempSupserItem) {
					this.tempSupserItem = res.data
				}
				this.appendToAlterWords(res.data)
			} catch(e) {
				console.info(`${e.toString()}`)
			}
		},
		// 将获取到的备选词加入
		appendToAlterWords (res) {
			for (let i in res) {
				if (res[i]) {
					let arr = [], item = this.alter_words.filter(aw => aw.type === i)[0]
					res[i].split(';').forEach(i => arr.push({name: i}))
					this.$set(item, 'children', arr)
				}
			}
		},
		clear () {
			this.alter_words.forEach(i => this.$set(i, 'children', []))
		},
		goExact(){
			let data = {
        keyword: this.wordList,
        list_type: 'advance_keyword',
      }
      this.$go('/normal-list', data)
		}
	},
	provide () {
		return {
			getItemSubInfo: this.getItemSubInfo,
			name: this.name
		}
	}
}
</script>
<template lang="pug">
.ls-detail.f16
	.key-body
		.key-body__title.flex-between-center
			.left {{ topItem && topItem.name }}
			.right.key-input
				input(type="checkbox" @click="getItemInfo()" :disabled="topItem.is_hide === 1" v-model="topItem.checked")
				span.ib
		Tree(:item="item" v-for="item in list[0] && list[0].children" ref="treeitem" level="1")
	.alter-words(v-if="hasChild")
		.alter-words__title.c_f.f14 交叉复选备选词
		.alter-words__body.f16
			CheckBoxItem(:name="item.name" v-for="item in alter_words" v-show="item.type !== 'represent'")
				KeyCheckItem( v-for="citem in item.children" 
					@check="citemCheck(citem)" 
					:item="citem"
					className="child" 
				)
	.btn.tc.search-exact-btn
		.btn-pay-read(@click="goExact") 检索
</template>
<style lang="stylus">
.ls-detail
	.ui-title
		position relative
		padding-left 12px
		line-height 20px
		color #676A7B
		&:before
			position absolute
			content ''
			display inline-block
			left 0
			top 5px
			height 20px
			width 4px
			border-radius 2px
			background linear-gradient(to right, #F6D27E, #B1936A)
	.key-body, .alter-words
		margin-top 20px
		&__title
			margin-bottom 20px
			color #373944
			font-weight bold
		> .tree
			color #373944
			> .tree-title
				> .tree-body
					> .tree
						> .tree-title
							color #676A7B
	.alter-words
		&__title
			width 131px
			height 28px
			margin-left -15px
			padding-left 15px
			line-height 28px
			color #FFF
			border-top-right-radius 999px
			border-bottom-right-radius 999px
			background linear-gradient(to right, #D4D8ED, #A6AAC1)
	.search-exact-btn
		background #fff
		position fixed
		bottom 0
		left 0
		right 0
		height 50px
		line-height 50px
		>.cbtn
			font-size 0.3rem
</style>
