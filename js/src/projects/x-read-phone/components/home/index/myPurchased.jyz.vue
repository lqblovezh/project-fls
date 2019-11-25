<script>
import {
	mapMutations,
	mapState
} from 'vuex'

export default {
	props:['url', 'query', 'name', ],
	data(){
		return{
		}
	},
	methods:{
		setCurr(name) {
			let userInfo = JSON.parse(sessionStorage.userInfo || null)
			switch (name) {
				case 'book':
					if (!userInfo) {
						name = "login"
						this.setIsBook(true)
					}
					break;
				default:
					break;
			}
			// this.setFooterCurr(name);
			this.$router.push({
				path: `/${name}`
			})
		},
		go() {},
		...mapMutations([
			'setIsBook',
		])
	}
}
</script>

<template lang="pug">
.div(@click="setCurr('book')")
	img
</template>

<style lang="stylus" scoped>
.div
	padding 15px 15px 0 15px
	img
		background url('./img/myPurchased.jpg') no-repeat center
		background-size 395px 100px
		width 100%
		height 100px
</style>
