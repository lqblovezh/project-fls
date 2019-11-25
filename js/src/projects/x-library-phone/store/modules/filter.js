import service from 'services/x-library/front'

export default {
	namespaced: true,
	state: {
		list: []
	},
	mutations: {
		SET_LIST(state, data) {
			if (data) {
				state.list = data
			}
		}
	},
	actions: {
		async getList(ctx, query) {
			const {
				id,
				category_filter,
				type = ''
			} = query
			try {
				let { data } = type === 'taoxi' ? await service.category.queryFiltersOfSub({ product_id: id, class_id: category_filter }) : await service.category.getColumnKeys(id, { category_filter })
				ctx.commit('SET_LIST', data)
			} catch (e) {
				console.info(`[getlist]: ${e.toString()}`)
			}
		}
	}
}