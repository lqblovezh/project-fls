<script>
import * as servers from 'services/x-read/history'
export default {
	data(){
		return {
			list:[],
		}
	},
	created(){

	},
	methods:{

	}
}
</script>

<template lang="pug">
	.box
		Head(name="章节进度")
		ul
			li
				span.name 第一章
				span.progress 进度
</template>

<style lang="stylus" scoped>
	.box
		height 100vh
		overflow scroll
		ul
			padding 0 0.3rem
			li
				padding 0.3rem 0
				border-bottom 1px solid #efefef
				span
					font-size 0.26rem
					color #333
					line-height 0.2rem
				.name
					width 50%
					float left
				.progress
					width 50%
					float right
</style>
