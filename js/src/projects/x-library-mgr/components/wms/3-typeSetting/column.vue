<script>
import * as services from 'services/x-read/headerSetting'
import Tree from './tree'

export default {
	components: {
		Tree,
	},
	data() {
		return {
			list: [],
		}
	},
	created() {
	},
	methods: {
	},
}
</script>

<template lang="pug">
div
	.content
		Tree(:dataList="list")
</template>


<style lang="stylus" scoped>
</style>
