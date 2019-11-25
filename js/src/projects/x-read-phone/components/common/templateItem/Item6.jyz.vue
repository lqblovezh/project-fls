<script>
// 专题
export default {
  props: ['data'],
  methods: {
    itemClick(item, type) {
			// debugger
      this.$emit('itemClickHandler', item[0] ,type)
    },
  },
}
</script>


<template lang="pug">
.temp-item3
	div(v-for="item in data")
		img(@click="itemClick(data,6)" :src="item.img_src")
		.name {{item.name}}
</template>

<style lang="stylus" scoped>
.temp-item3
	padding 0.3rem 0.3rem 0 0.3rem
	div
		border-radius 5px
		overflow hidden
		>img
			background no-repeat center
			width 100%
			height 3.2rem
		.name
			text-align center
			line-height 0.7rem
			color #333
			font-size 0.3rem

</style>
