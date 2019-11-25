import service from 'services/x-library/front'

export default {
  namespaced: true,
  state: () => ({
    page: {},
    homeSubjectList: [],
    buttons: [],
    findList: [],
  }),
  actions: {
    getData(ctx, query = {}) {
      console.log('get data home')
      return Promise.all([
        this.dispatch('category/getColumnPageData', query),
        ctx.dispatch('homeSubjectList', query),
      ])
    },
    getFind({ state, dispatch }, query = {}) {
      return Promise.all([
        service.find.find().then(res => {
          console.log(res)
          state.findList = res.data
        }),
      ])
    },
    buttonList(ctx, query) {
      return service.home.buttonList().then(res => {
        ctx.state.buttons = res.data
      })
    },
    async homeSubjectList(ctx, query) {
      try {
        const res = await service.home.homeSubjectList()
        ctx.state.homeSubjectList = res.data
      } catch(e) {
        console.error(`[vuex homeSubjectList]:${e.toString()}`)
      }
    },
  },
}
