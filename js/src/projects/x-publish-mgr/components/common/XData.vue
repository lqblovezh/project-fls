<script type="text/javascript">
	import Top from "./Top"

	export default{
		data(){
			return {
				url: global.config.xDataUrl,
			}
		},
		created () {
			log(this.$route)
		},
		components: {
			Top
		},
		methods:{

		}
	}
</script>
<template lang="pug">
div
	Top(currentPlant='X-Data')
	iframe(:src="url" )

</template>

<style lang="stylus" scoped>
	iframe
		margin-top 50px
		min-width 1903px
		height 100%
		min-height 906px
</style>
