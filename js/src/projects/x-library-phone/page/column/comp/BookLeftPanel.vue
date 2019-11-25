<script>
import BookLeftPanelItem from './BookLeftPanelItem'
export default {
	props: {
		value: {
			type: Boolean,
			default: false,
		},
		catalogsList:null
	},
	data () {
		return {
		}
	},
	components: { BookLeftPanelItem },
	methods: {
		/**
		 * @TODO 获取目录列表
		 * 在监听到value变成true（显示），并且list为空的情况
		 * 下才请求数据
		 * 如果获取的数据结构不正确，务必处理成树形结构
		 */
		none_open(){
		}
	}
}
</script>
<template lang="pug">
.book-left-panel(v-show="value" @click="$emit('input', false)")
	transition(name="slide-in")
		.panel(v-show="value" @click.stop="none_open()")
			.panel-head.flex.c-bg-f
				.panel-head__item(:class="{'panel-head__item-active': true}")
					a 目录
			.panel-body.c_f_bg
				div
					BookLeftPanelItem(v-for="i in catalogsList" :data="i" :rid="i.catalogID")
</template>
<style lang="stylus">
.book-left-panel
	position fixed
	top 0
	bottom 0
	left 0
	right 0
	background-color rgba(0,0,0,.3)
	z-index 15
	.panel
		position relative
		width 90%
		height 100%
		background-color #f4f5f5
		&-head
			position absolute
			top 0
			width 100%
			height 0.7rem
			line-height 0.7rem
			margin-bottom 0.1rem
			box-shadow 0 0.1rem 0.02rem rgb(244,245,245)
			&__item
				flex 1
				text-align center
				&-active
					a
						padding 5px 0
						font-weight bold
						border-bottom 4px solid  #b1936a
		&-body
			padding-top 0.8rem
			height 100%
			box-sizing border-box
			>div
				height 100%
				overflow-y auto
				>.book-left-panel-item
					.panel-item__parent
						padding 8px 15px
						border-bottom 1px solid #ebf2f1
					>.panel-item__parent
						padding-left 23px
						font-weight bold
						position relative
						&:before
							content ''
							position absolute
							display inline-block
							height 18px
							width 4px
							left 15px
							background linear-gradient(to bottom, #F6D27E, #B1936A)
							border-radius 2px
					.p10
						padding-left 10px
	.slide-in-enter-active,
	.slide-in-leave-active
		transition all 0.4s 0.05s
	.slide-in-enter,
	.slide-in-leave-to
		transform translateX(-100%)
</style>