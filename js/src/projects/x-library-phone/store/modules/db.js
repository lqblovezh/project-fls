import service from 'services/x-library/front'

export default {
  namespaced: true,
  state: () => ({
    page: {},
    keyword: [],
    homeInfo: {},
  }),
  actions: {
    getData(ctx, query = {}) {
      return Promise.all([
        ctx.dispatch('homeInfo', query),
        ctx.dispatch(
          'search/getHot',
          { pageStart: 0, pageOffset: 10 },
          { root: true }
        ),
      ])
    },
    homeInfo(ctx, query) {
      return service.db.home().then(
        res => {
          ctx.state.homeInfo = res.data.column
          ctx.state.keyword = res.data.keyword
        },
        err => {
          console.log('数据错误')
        }
      )
    },
  },
}
