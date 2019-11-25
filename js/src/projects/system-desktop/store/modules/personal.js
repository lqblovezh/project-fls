import * as services from 'services/system/mack'

export default {
  namespaced: true,
  state: () => ({
    name: 'personal',
    page: {
      pageNum: 1,
      pageOffset: 10,
      total: 0,
    },
    list: [],
  }),
  actions: {
    getList({ commit, state }, data = {}) {
      return services.personal({ ...data, ...state.page }).then(res => {
        state.list = res.data
        state.page.total = res.page.total
        state.page.pageNum = res.page.num
      })
    },
  },
  mutations: {
    setList(state, data) {
      state.list = data
    },
    setPage(state, data) {
      state.page = data
    },
  },
}
