<script>
import { mapState } from 'vuex'
import SearchTitle from '../comp/SearchTitle'

export default {
	components: { SearchTitle },
	computed: {
    ...mapState({
      list: state => state.advance.list,
    }),
	},
	methods: {
		async more(item) {
      // if (item.child) return
      // let res = await this.$service.search.searchAdvanceKey({
      //   id: item.id,
      // })
			// this.$set(item, 'child', res.data)
			this.$router.push({
				name: 'search-exact-detail',
				query: {
					id: item.id,
					...this.$route.query,
				}})
    },
	}
}
</script>
<template lang="pug">
.ls.f14
	.part(v-for="item in list" :key="item.id")
		SearchTitle( 
			@more="more(item)"
			:name="item.name"
		)
</template>
<style lang="stylus">
</style>
