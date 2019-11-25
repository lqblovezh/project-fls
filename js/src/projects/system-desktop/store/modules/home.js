import * as services from 'services/system/home'

export default {
  namespaced: true,
  state: () => ({
    name: 'home',
    page: {},
    list: [],
    book: [],
    library: [],
    course: [],
    partner: [],
    banner: [],
  }),
  actions: {
    async getData(ctx, query) {
      return Promise.all([
        ctx.dispatch('getList', query),
        ctx.dispatch('getPartner'),
        ctx.dispatch('getBanner'),
      ])
    },
    getList({ commit, state }, data = {}) {
      return services.getList({ ...data }).then(res => {
        state.list = res.data.splice(0,5)
        // state.book = res.data.find(item => item.type == 'read').data.splice(0,8)
        // state.library = res.data.find(item => item.type == 'library').data.splice(0,5)
        // state.course = res.data.find(item => item.type == 'teach').data.splice(0,4)
      })
    },
    getPartner({ commit, state }, data = {}) {
      return services.getPartner({ ...data, type: 'press' }).then(res => {
        state.partner = res.data
      })
    },
    getBanner({ commit, state }, data = {}) {
      return services.getPartner({ ...data, type: 'banner' }).then(res => {
        state.banner = res.data
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
