<script>
//人物
export default {
  props: ['data'],
  data: function() {
    return {}
  },
	mounted(){
	console.log(this.data);
},
	methods:{
		getColumn(){
			let length=this.data.length
			switch(length){
				case 2:
				return 'img2'
				break;
				case 3:
				default:
				return 'img3'
				break;
			}
		}
	}
}
</script>
<template lang="pug">
.temp-item7
	.div
		.item(v-for="(item,index) in data" @click="$emit('itemClickHandler', item, 7)" :class="getColumn()" v-if="index<3")
			img(:src="item.img_src")
			.name
				span {{item.name}}
</template>
<style lang="stylus" scoped>
.temp-item7
	padding 0.3rem 0.3rem 0 0.3rem
	height 3rem
	.div
		width 100%
		.item
			float left
			margin 0 auto
			img
				width 100%
				height 2rem
		  .img2
				background-size 2rem 1.6rem
				background no-repeat center
				width 47%
				&:first-child
					margin-right 5%
			.img3
				background-size 2rem 1.5rem
				background no-repeat center
				width 30%
				margin-right 0.2rem
			.name
				height 0.5rem
				line-height 0.7rem
				text-align center
				span
					font-size 0.3rem
					color #333
					flex-direction row
</style>
