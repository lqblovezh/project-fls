<script>
import { setTimeout, setInterval } from 'timers';
export default {
  data(){
		return {
			time:3,
			msg:true,
		}
	},
	created(){
	var t=setInterval(_=>{
			this.time --
			if(this.time==0){
				clearInterval(t)
				this.msg = false
				window.location.href = this.$store.state.url
			}
			
		},1000)
	},
  methods:{
	
  }
}
</script>

<template lang="pug">
	div
		.msg( v-if="msg") 你没有权限访问System {{time}}s 后 跳转到其他应用
		.msg( v-else) 正在跳转中...
</template>



<style lang="stylus" scoped>
div 
	font-size 30px
</style>




