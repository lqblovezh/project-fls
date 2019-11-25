<script>
export default {
	props: {
		item: {},
	}
}
</script>
<template lang="pug">
.comp-kic.flex-between-center
	.comp-kic__left {{ item.name }}
	.comp-kic__right.key-input
		input(type="checkbox" @change="$emit('check', item)" )
		span.ib
</template>
<style lang="stylus">
.comp-kic
	padding-left 16px
	margin-bottom 10px
</style>
