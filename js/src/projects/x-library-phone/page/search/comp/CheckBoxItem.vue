<script>
export default {
	props: {
		name: {
			default: 'xx'
		}
	}
}
</script>
<template lang="pug">
.comp-cbi
	.comp-cbi__title.border-title {{ name }}
	slot
</template>
<style lang="stylus">
.comp-cbi
	&__title
		margin-bottom 10px
		&:before
			top 0
</style>
