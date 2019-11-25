<script>
import * as servers from 'services/x-read/history'
import { canRead } from '@/utils/util'
export default {
	data(){
		return {
			list:[],
		}
	},
	created(){
		this.getList()
	},
	methods:{
		// go(url){
		// 	this.$router.push({path:url})
		// },
		goReader(i){
			this.$go('/reader', i)
		},
		getList(){
			servers.getList().then(res=>{
				this.list=res.data
			})
		}
	}
}
</script>

<template lang="pug">
	.box()
		Head(name="历史记录" hide="true")
		dl
			dd(v-for="item in list" @click="goReader(item)")
				img.tx(:src='item.img_src')
				.txt
					div.d1
						span.name {{item.name}}
				.progress()
					span.name  {{item.proportion}}%
</template>

<style lang="stylus" scoped>
	.box
	    height 100vh
	    overflow scroll
			dl
				padding 0 0.3rem
				dd
					padding 0.3rem 0
					border-bottom 1px solid #e8e8e8
					overflow hidden
					.tx
						width 13%
						margin-right 3%
						float left
					.txt
						width 40%
						float left
						div
							font-size 0.26rem
							margin-top 0.15rem
							span
								display inline-block
								line-height 0.5rem
								width 50%
								overflow hidden
					.progress
							width 30%
							font-size 0.26rem
							float right
							margin-top 0.15rem
							span
								display inline-block
								line-height 0.5rem
								width 50%
								overflow hidden
</style>
